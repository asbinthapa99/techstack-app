import Link from "next/link";
import { signup } from "./actions";

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
                <h1 className="mb-6 text-2xl font-bold text-white">Create account</h1>
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
                            minLength={8}
                            autoComplete="new-password"
                        />
                    </div>
                    {error && (
                        <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400">
                            {error}
                        </p>
                    )}
                    <button
                        formAction={signup}
                        className="w-full rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        Create account
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#00CEC9] hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
