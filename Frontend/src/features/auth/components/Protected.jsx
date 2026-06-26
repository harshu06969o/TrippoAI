import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">

                {/* ── Ambient glow layer ─────────────────────────────────── */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-cyan-600/8 blur-[160px] animate-glow-pulse" />
                    <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-[120px]" />
                    <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[120px]" />
                </div>

                {/* ── Animated grid overlay ──────────────────────────────── */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.015]"
                    aria-hidden="true"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* ── Spinner content ────────────────────────────────────── */}
                <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in-up">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-1 select-none mb-2">
                        <span className="text-2xl font-black tracking-tighter text-slate-100">Trippo</span>
                        <span className="text-2xl font-black tracking-tighter text-cyan-400"> AI</span>
                    </a>

                    {/* Spinner ring */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-2 border-slate-800" />
                        <div className="absolute w-16 h-16 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/50 animate-spin" />
                        {/* Inner dot */}
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 animate-glow-pulse shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                    </div>

                    {/* Status text */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-slate-200 text-sm font-semibold tracking-wide">
                            Verifying your session
                        </p>
                        <p className="text-slate-600 text-xs tracking-widest uppercase">
                            Please wait a moment…
                        </p>
                    </div>

                    {/* Animated dots */}
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected