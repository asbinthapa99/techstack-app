"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    });

    if (error || !authData.user) {
        redirect("/register?error=Could not create user");
    }

    // Create corresponding user in the public Prisma database
    try {
        await prisma.user.create({
            data: {
                id: authData.user.id,
                email: data.email,
                name: formData.get("name") as string | undefined,
            },
        });
    } catch (err) {
        console.error("Failed to create Prisma User:", err);
    }

    revalidatePath("/", "layout");
    redirect("/login?success=Account Created. Please sign in.");
}
