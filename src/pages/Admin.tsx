import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [session, setSession] = useState<unknown>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setLoading(false);
    if (error) {
      toast({ title: `${mode === "signin" ? "Sign in" : "Sign up"} failed`, description: error.message, variant: "destructive" });
    } else if (mode === "signup") {
      toast({ title: "Account created", description: "You can now sign in." });
      setMode("signin");
    } else {
      toast({ title: "Signed in", description: "You're now marked online." });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "You're now offline." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-md">
        <h1 className="font-heading text-2xl text-foreground mb-1">Owner Sign In</h1>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Sign in to mark yourself online in the chat widget. Sign out to let the AI helper take over.
        </p>

        {session ? (
          <div className="space-y-4">
            <p className="font-body text-sm text-foreground">
              You are signed in and showing as <span className="font-semibold text-green-600">online</span>.
            </p>
            <Button onClick={signOut} className="w-full">
              Sign out (go offline)
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={6}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="w-full text-xs font-body text-muted-foreground hover:text-foreground"
            >
              {mode === "signin" ? "First time? Create owner account" : "Already have an account? Sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admin;
