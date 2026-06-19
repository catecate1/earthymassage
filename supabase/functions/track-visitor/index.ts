// Records visitor page views (token + IP + page) for the Admin live visitors panel.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) {
      return new Response(JSON.stringify({ ok: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const visitorToken = typeof body?.visitorToken === "string" ? body.visitorToken.slice(0, 200) : "";
    const page = typeof body?.page === "string" ? body.page.slice(0, 500) : "";
    if (!visitorToken || !page) {
      return new Response(JSON.stringify({ ok: false, error: "missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fwd = req.headers.get("x-forwarded-for") ?? "";
    const ip = fwd.split(",")[0].trim() || req.headers.get("cf-connecting-ip") || null;
    const ua = req.headers.get("user-agent") ?? null;
    const now = new Date().toISOString();

    // Look up existing session
    const lookup = await fetch(
      `${supabaseUrl}/rest/v1/visitor_sessions?select=id,pages&visitor_token=eq.${encodeURIComponent(visitorToken)}&limit=1`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    const existing = lookup.ok ? await lookup.json() : [];

    if (Array.isArray(existing) && existing.length > 0) {
      const row = existing[0];
      const prevPages: Array<{ path: string; at: string }> = Array.isArray(row.pages) ? row.pages : [];
      const last = prevPages[prevPages.length - 1];
      const pages = last?.path === page
        ? prevPages
        : [...prevPages.slice(-49), { path: page, at: now }];
      await fetch(`${supabaseUrl}/rest/v1/visitor_sessions?id=eq.${row.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          last_seen: now,
          current_page: page,
          pages,
          ip_address: ip,
          user_agent: ua,
        }),
      });
    } else {
      await fetch(`${supabaseUrl}/rest/v1/visitor_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: "resolution=ignore-duplicates",
        },
        body: JSON.stringify({
          visitor_token: visitorToken,
          ip_address: ip,
          user_agent: ua,
          current_page: page,
          pages: [{ path: page, at: now }],
          first_seen: now,
          last_seen: now,
        }),
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
