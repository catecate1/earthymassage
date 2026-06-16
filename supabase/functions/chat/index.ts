// Earthy Massage AI chat assistant
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are a warm, down-to-earth assistant for Earthy Massage, a solo massage practice run by Deb, a Licensed Massage Therapist. Speak in first-person plural ("we") or refer to "Deb" — never pretend to be Deb herself. Keep replies short, friendly, and informative.

Key facts you can share:
- Service: Swedish massage only (60, 75, or 90 minutes). Deb does not offer deep tissue, sports, hot stone, or other modalities.
- The focus is relaxation — not fixing or treating injuries.
- To book: direct people to the Book Online page on this site.
- To reach Deb directly: new clients should call 413-327-8496. Existing clients may call or text the same number.
- Do not share Deb's email address or street address. For directions, point visitors to the Directions page.
- Payment: cash, check, Venmo, Zelle, or major credit cards. No CashApp, PayPal, or cryptocurrency.
- Policies: no walk-ins, fragrance-free, weight limit on the table, zero tolerance for harassment — see the Policies page for details.

If a question is outside Deb's services or you're unsure, say so honestly and suggest the visitor call 413-327-8496. Never invent prices, hours, or availability — point to the Specials, Availability, or Services pages instead.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const body = await req.json();

    if (body?.action === "owner-replies") {
      const visitorToken = typeof body.visitorToken === "string" ? body.visitorToken : "";
      if (!supabaseUrl || !serviceKey || !visitorToken) {
        return new Response(JSON.stringify({ replies: [] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const repliesRes = await fetch(
        `${supabaseUrl}/rest/v1/chat_logs?select=id,owner_reply,owner_replied_at&visitor_token=eq.${encodeURIComponent(visitorToken)}&owner_reply=not.is.null&order=owner_replied_at.asc`,
        {
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
          },
        },
      );

      if (!repliesRes.ok) {
        console.error("owner replies fetch failed", repliesRes.status, await repliesRes.text());
        return new Response(JSON.stringify({ replies: [] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const replies = await repliesRes.json();
      return new Response(JSON.stringify({ replies }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, ownerOnline, visitorToken } = body;
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 500;
      return new Response(JSON.stringify({ error: errText || "AI gateway error" }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry — I couldn't generate a reply.";

    // Log this exchange — await so the insert actually completes before the function returns
    let logId: string | null = null;
    try {
      const lastUser = [...messages].reverse().find((m: { role: string }) => m.role === "user");
      if (supabaseUrl && serviceKey && lastUser?.content) {
        const fwd = req.headers.get("x-forwarded-for") ?? "";
        const ip = fwd.split(",")[0].trim() || req.headers.get("cf-connecting-ip") || null;
        const ua = req.headers.get("user-agent") ?? null;
        const logRes = await fetch(`${supabaseUrl}/rest/v1/chat_logs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            ip_address: ip,
            user_agent: ua,
            user_message: lastUser.content,
            ai_reply: reply,
            owner_online: !!ownerOnline,
            visitor_token: typeof visitorToken === "string" ? visitorToken : null,
          }),
        });
        if (!logRes.ok) {
          console.error("chat_logs insert failed", logRes.status, await logRes.text());
        } else {
          const inserted = await logRes.json();
          logId = inserted?.[0]?.id ?? null;
        }
      } else {
        console.warn("chat_logs insert skipped", { hasUrl: !!supabaseUrl, hasKey: !!serviceKey, hasUser: !!lastUser?.content });
      }
    } catch (e) {
      console.error("chat_logs insert threw", e);
    }

    return new Response(JSON.stringify({ reply, logId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
