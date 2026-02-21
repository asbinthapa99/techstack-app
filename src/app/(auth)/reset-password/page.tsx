import Link from "next/link";
import { resetPassword } from "./actions";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
        <h1 className="mb-2 text-2xl font-bold text-white">Set new password</h1>
        <p className="mb-6 text-sm text-white/60">
          Choose a strong password for your account.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-white/80">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7]"
              placeholder="Min. 8 characters"
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm text-white/80">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7]"
              placeholder="Repeat password"
              required
              autoComplete="new-password"
            />
          </div>
          {searchParams?.error && (
            <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400">
              {searchParams.error}
            </p>
          )}
          <button
            formAction={resetPassword}
            className="w-full rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-4 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Update password
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/70">
          <Link href="/login" className="text-[#00CEC9] hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
