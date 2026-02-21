import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [totalUsers, totalOrders, paidOrders, revenueResult] =
    await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: "paid" } }),
      prisma.payment.aggregate({
        where: { status: "completed" },
        _sum: { amount: true },
      }),
    ]);

  const totalRevenueCents = revenueResult._sum.amount ?? 0;

  const stats = [
    { label: "Total users", value: totalUsers.toLocaleString() },
    { label: "Total orders", value: totalOrders.toLocaleString() },
    { label: "Paid orders", value: paidOrders.toLocaleString() },
    {
      label: "Total revenue",
      value: `$${(totalRevenueCents / 100).toFixed(2)}`,
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="mb-1 text-sm text-white/60">{s.label}</p>
            <p className="text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">Recent orders</h2>
        <RecentOrders />
      </div>
    </div>
  );
}

async function RecentOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { user: { select: { email: true } } },
  });

  if (orders.length === 0) {
    return <p className="text-white/50">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/50">
            <th className="pb-3 pr-4">Order ID</th>
            <th className="pb-3 pr-4">User</th>
            <th className="pb-3 pr-4">Amount</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-white/5">
              <td className="py-3 pr-4 font-mono text-xs text-white/60">
                #{o.id.slice(-8)}
              </td>
              <td className="py-3 pr-4 text-white">{o.user.email}</td>
              <td className="py-3 pr-4 text-white">
                ${(o.totalAmount / 100).toFixed(2)}
              </td>
              <td className="py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    o.status === "paid"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
