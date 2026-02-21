import { prisma } from "@/lib/prisma";

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-amber-500/20 text-amber-400",
  failed: "bg-red-500/20 text-red-400",
  cancelled: "bg-white/10 text-white/50",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status;

  const orders = await prisma.order.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { email: true } } },
  });

  const statuses = ["paid", "pending", "failed", "cancelled"];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">
        Orders{" "}
        <span className="text-lg font-normal text-white/50">
          ({orders.length})
        </span>
      </h1>

      {/* Status filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/admin/orders"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            !statusFilter
              ? "bg-white/15 text-white"
              : "text-white/50 hover:text-white"
          }`}
        >
          All
        </a>
        {statuses.map((s) => (
          <a
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              statusFilter === s
                ? "bg-white/15 text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            {s}
          </a>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-white/40"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5">
                  <td className="px-6 py-4 font-mono text-xs text-white/60">
                    #{o.id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 text-white">{o.user.email}</td>
                  <td className="px-6 py-4 text-white">
                    ${(o.totalAmount / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        STATUS_COLORS[o.status] ?? "text-white/50"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/50">
                    {o.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
