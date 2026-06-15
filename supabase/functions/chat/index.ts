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
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();
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

    return new Response(JSON.stringify({ reply }), {
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
