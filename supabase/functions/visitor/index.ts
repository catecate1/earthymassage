import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const body = await req.json();
    const token = String(body.token ?? "").slice(0, 64);
    if (!/^[a-zA-Z0-9-]{8,64}$/.test(token)) return json({ error: "bad token" }, 400);
    const ip =
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-real-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      null;
    const ua = req.headers.get("user-agent")?.slice(0, 400) ?? null;

    if (body.action === "track") {
      const page = String(body.page ?? "/").slice(0, 200);
      const { data: existing } = await db.from("visitor_sessions").select("pages").eq("visitor_token", token).maybeSingle();
      const pages = Array.isArray(existing?.pages) ? existing!.pages : [];
      pages.push({ page, at: new Date().toISOString() });
      await db.from("visitor_sessions").upsert(
        { visitor_token: token, ip_address: ip, user_agent: ua, current_page: page, pages: pages.slice(-100), last_seen: new Date().toISOString() },
        { onConflict: "visitor_token" },
      );
      return json({ ok: true });
    }

    if (body.action === "send") {
      const message = String(body.message ?? "").trim().slice(0, 2000);
      if (!message) return json({ error: "empty" }, 400);
      const { data: st } = await db.from("owner_status").select("is_online").eq("id", true).maybeSingle();
      await db.from("chat_logs").insert({ visitor_token: token, ip_address: ip, user_agent: ua, user_message: message, owner_online: !!st?.is_online });
      return json({ ok: true });
    }

    if (body.action === "poll") {
      const { data } = await db.from("chat_logs").select("id, created_at, user_message, owner_reply, owner_replied_at")
        .eq("visitor_token", token).order("created_at").limit(100);
      const { data: st } = await db.from("owner_status").select("is_online").eq("id", true).maybeSingle();
      return json({ messages: data ?? [], online: !!st?.is_online });
    }
    return json({ error: "unknown action" }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
