import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const visitorTokenKey = "earthy_chat_visitor_token";

const getVisitorToken = () => {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(visitorTokenKey);
  if (existing) return existing;
  const token =
    window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(visitorTokenKey, token);
  return token;
};

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const visitorToken = getVisitorToken();
    if (!visitorToken) return;

    const page = `${location.pathname}${location.search}`;

    const ping = () => {
      supabase.functions
        .invoke("track-visitor", { body: { visitorToken, page } })
        .catch(() => {
          /* silent */
        });
    };

    ping();
    // heartbeat so admin sees who's still on the site
    const interval = setInterval(ping, 30_000);
    return () => clearInterval(interval);
  }, [location.pathname, location.search]);

  return null;
};

export default VisitorTracker;
