"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const ForgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function forgotPassword(formData: FormData) {
  const parsed = ForgotSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid email";
    redirect(`/forgot-password?error=${encodeURIComponent(message)}`);
  }

  const { email } = parsed.data;
  const supabase = await createClient();

  const appUrl =
    process.env.APP_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("Password reset error:", error.message);
    // Don't leak whether the email exists — always show success message
  }

  redirect(
    "/forgot-password?success=If that email exists, a reset link has been sent."
  );
}
