import { supabase } from "@/integrations/supabase/client";

export const getVisitorToken = () => {
  let t = localStorage.getItem("ew_visitor");
  if (!t) {
    t = crypto.randomUUID();
    localStorage.setItem("ew_visitor", t);
  }
  return t;
};

export const callVisitor = (body: Record<string, unknown>) =>
  supabase.functions.invoke("visitor", { body: { token: getVisitorToken(), ...body } });
