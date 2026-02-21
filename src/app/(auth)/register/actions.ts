"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { welcomeEmailHtml } from "@/lib/emails/welcome";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/ratelimit";

const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().max(100).optional(),
});

export async function signup(formData: FormData) {
  // Rate limit: 5 signups per minute per IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "127.0.0.1";

  const rateLimitRes = await rateLimit(ip, "auth:register", 5, 60);
  if (rateLimitRes) redirect("/register?error=Too many attempts. Please wait.");

  const parsed = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name") || undefined,
  });

  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid input";
    redirect(`/register?error=${encodeURIComponent(message)}`);
  }

  const { email, password, name } = parsed.data;
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !authData.user) {
    redirect("/register?error=Could not create user");
  }

  try {
    await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        name: name ?? null,
      },
    });
  } catch (err) {
    console.error("Failed to create Prisma User:", err);
  }

  // Send welcome email (fire-and-forget — do not block redirect on failure)
  if (resend) {
    resend.emails
      .send({
        from: FROM_EMAIL,
        to: email,
        subject: "Welcome to TechStacker!",
        html: welcomeEmailHtml(name ?? null, email),
      })
      .catch((err: unknown) => console.error("Welcome email failed:", err));
  }

  revalidatePath("/", "layout");
  redirect("/login?success=Account Created. Please sign in.");
}
