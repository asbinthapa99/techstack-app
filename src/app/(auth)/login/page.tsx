import Link from "next/link";
import { login } from "./actions";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; success?: string }>;
}) {
    const { error, success } = await searchParams;
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
                <h1 className="mb-6 text-2xl font-bold text-white">Sign in</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm text-white/80">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7]"
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm text-white/80">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7]"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    {error && (
                        <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
                            {success}
                        </p>
                    )}
                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-xs text-white/50 hover:text-[#00CEC9] hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        formAction={login}
                        className="w-full rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-white/70">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-[#00CEC9] hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
