import Link from "next/link";
import { login } from "./actions";
import { AuthBackground } from "@/app/components/AuthBackground";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; success?: string }>;
}) {
    const { error, success } = await searchParams;
    return (
        <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
            <AuthBackground />

            {/* card */}
            <div
                className="auth-card relative z-10 w-full max-w-md"
                style={{ animation: "authCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
                {/* gradient border wrapper */}
                <div className="auth-card-border relative rounded-[28px] p-px"
                    style={{ background: "linear-gradient(135deg, rgba(108,92,231,0.5), rgba(9,132,227,0.3), rgba(0,206,201,0.2))" }}>
                    <div className="rounded-[27px] bg-[#0a0a14]/95 p-8 backdrop-blur-2xl">

                        {/* logo mark */}
                        <div className="mb-8 flex flex-col items-center gap-3">
                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(108,92,231,0.25), rgba(9,132,227,0.2))",
                                    border: "1px solid rgba(108,92,231,0.3)",
                                    boxShadow: "0 0 32px rgba(108,92,231,0.15)",
                                    animation: "authLogoGlow 3s ease-in-out infinite",
                                }}
                            >
                                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                    <defs>
                                        <linearGradient id="authLogoGrad" x1="0" y1="0" x2="32" y2="32">
                                            <stop offset="0%" stopColor="#6C5CE7" />
                                            <stop offset="100%" stopColor="#00CEC9" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="4" y="4" width="11" height="11" rx="3" fill="url(#authLogoGrad)" opacity="0.9" />
                                    <rect x="9" y="9" width="11" height="11" rx="3" fill="url(#authLogoGrad)" opacity="0.7" />
                                    <rect x="17" y="17" width="11" height="11" rx="3" fill="url(#authLogoGrad)" opacity="0.5" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                                <p className="mt-1 text-sm text-white/50">Sign in to your TechStacker account</p>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="auth-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#6C5CE7]/60 focus:bg-[#6C5CE7]/5 focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="auth-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#6C5CE7]/60 focus:bg-[#6C5CE7]/5 focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>

                            {error && (
                                <p className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    <span>⚠</span> {error}
                                </p>
                            )}
                            {success && (
                                <p className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                                    <span>✓</span> {success}
                                </p>
                            )}

                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-white/40 transition hover:text-[#00CEC9] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                formAction={login}
                                className="auth-btn relative w-full overflow-hidden rounded-xl py-3.5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(108,92,231,0.5)] active:scale-[0.98]"
                                style={{
                                    background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                                }}
                            >
                                <span className="relative z-10">Sign in</span>
                                <span className="auth-btn-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700" />
                            </button>
                        </form>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-xs text-white/30">OR</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>

                        <p className="mt-4 text-center text-sm text-white/50">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="font-medium text-[#00CEC9] transition hover:text-[#6C5CE7] hover:underline">
                                Create one free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
