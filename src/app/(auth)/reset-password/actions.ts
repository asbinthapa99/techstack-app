"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const ResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function resetPassword(formData: FormData) {
  const parsed = ResetSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid input";
    redirect(`/reset-password?error=${encodeURIComponent(message)}`);
  }

  const supabase = await createClient();

  // Verify the user is authenticated (came from the reset link)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/forgot-password?error=Reset link expired. Please request a new one.");
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?success=Password updated. Please sign in with your new password.");
}
