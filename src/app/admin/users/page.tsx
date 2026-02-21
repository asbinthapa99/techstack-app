import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function toggleAdmin(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return;

  const caller = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { isAdmin: true },
  });
  if (!caller?.isAdmin) return;

  const userId = formData.get("userId") as string;
  const currentAdmin = formData.get("currentAdmin") === "true";

  // Prevent self-demotion
  if (userId === authUser.id) return;

  await prisma.user.update({
    where: { id: userId },
    data: { isAdmin: !currentAdmin },
  });
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      isAdmin: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">
        Users{" "}
        <span className="text-lg font-normal text-white/50">
          ({users.length})
        </span>
      </h1>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Admin</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5">
                <td className="px-6 py-4 text-white">{u.email}</td>
                <td className="px-6 py-4 text-white/70">{u.name ?? "—"}</td>
                <td className="px-6 py-4 text-white/70">{u._count.orders}</td>
                <td className="px-6 py-4 text-white/50 text-xs">
                  {u.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {u.isAdmin ? (
                    <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-400">
                      Admin
                    </span>
                  ) : (
                    <span className="text-white/30 text-xs">User</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <form action={toggleAdmin}>
                    <input type="hidden" name="userId" value={u.id} />
                    <input
                      type="hidden"
                      name="currentAdmin"
                      value={String(u.isAdmin)}
                    />
                    <button
                      type="submit"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                    >
                      {u.isAdmin ? "Remove admin" : "Make admin"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
