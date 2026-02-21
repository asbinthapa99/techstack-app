import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser?.id) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { isAdmin: true },
  });

  if (!dbUser?.isAdmin) redirect("/dashboard");

  return (
    <div className="min-h-screen">
      <nav className="border-b border-white/10 bg-white/5 px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-6">
          <span className="font-semibold text-white">Admin</span>
          <Link
            href="/admin"
            className="text-sm text-white/70 hover:text-white"
          >
            Overview
          </Link>
          <Link
            href="/admin/users"
            className="text-sm text-white/70 hover:text-white"
          >
            Users
          </Link>
          <Link
            href="/admin/orders"
            className="text-sm text-white/70 hover:text-white"
          >
            Orders
          </Link>
          <Link
            href="/dashboard"
            className="ml-auto text-sm text-white/50 hover:text-white"
          >
            Back to app
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
