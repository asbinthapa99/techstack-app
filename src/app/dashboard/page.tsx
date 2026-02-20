import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "../components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser?.id) redirect("/login");

  const [user, orders, payments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true, email: true, name: true, createdAt: true },
    }),
    prisma.order.findMany({
      where: { userId: authUser.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.payment.findMany({
      where: { userId: authUser.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const hasPaidOrder = orders.some((o) => o.status === "paid");
  const paymentStatus = hasPaidOrder ? "Paid" : "Unpaid";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/pricing"
            className="rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-6 py-2 font-semibold text-white transition hover:opacity-90"
          >
            Upgrade
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-white">Your details</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-white/60">Email</dt>
              <dd className="text-white">{user?.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-white/60">Name</dt>
              <dd className="text-white">{user?.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-white/60">Payment status</dt>
              <dd>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${paymentStatus === "Paid"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                    }`}
                >
                  {paymentStatus}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent orders</h2>
          {orders.length === 0 ? (
            <p className="text-white/60">No orders yet. Upgrade to get started.</p>
          ) : (
            <ul className="space-y-2">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="flex flex-wrap items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
                >
                  <span className="text-white">
                    Order {o.id.slice(-8)} — ${(o.totalAmount / 100).toFixed(2)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${o.status === "paid"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                      }`}
                  >
                    {o.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
