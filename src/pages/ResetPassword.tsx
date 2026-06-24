import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [ready, setReady] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setReady(Boolean(session)));
    return () => sub.subscription.unsubscribe();
  }, []);

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);
    if (error) {
      toast({ title: "Couldn't change password", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated", description: "You can sign in to admin with your new password." });
    window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <section className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-md">
        <h1 className="font-heading text-2xl text-foreground mb-1">Change admin password</h1>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Enter a new password for your admin account.
        </p>

        {!ready ? (
          <div className="space-y-4">
            <p className="font-body text-sm text-muted-foreground">
              Open this page from the password-change email link.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin">Back to admin sign in</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={updatePassword} className="space-y-3">
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
              autoFocus
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving…" : "Update password"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
};

export default ResetPassword;