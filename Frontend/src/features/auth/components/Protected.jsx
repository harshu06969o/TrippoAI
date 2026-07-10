import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main style={{
                position: 'relative',
                minHeight: '100vh',
                background: '#050a16',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>

                {/* ── Ambient glow layers ──────────────────────────────── */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
                    <div
                        className="animate-aurora"
                        style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: 900, height: 600, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                    <div
                        className="animate-float-slow delay-200"
                        style={{
                            position: 'absolute', top: '-10%', right: '-10%',
                            width: 600, height: 500, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                    <div
                        className="animate-float-slow delay-400"
                        style={{
                            position: 'absolute', bottom: '-10%', left: '-10%',
                            width: 600, height: 500, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                </div>

                {/* ── Subtle grid overlay ───────────────────────────────── */}
                <div
                    style={{
                        position: 'absolute', inset: 0, opacity: 0.012, pointerEvents: 'none',
                        backgroundImage: `linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)`,
                        backgroundSize: '72px 72px',
                    }}
                    aria-hidden="true"
                />

                {/* Noise texture */}
                <div className="noise-overlay" aria-hidden="true" />

                {/* ── Content ───────────────────────────────────────────── */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        position: 'relative', zIndex: 10,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: 32,
                        textAlign: 'center',
                    }}
                >
                    {/* Logo */}
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', userSelect: 'none' }}>
                        <span style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 40, height: 40, borderRadius: 12,
                            background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
                            boxShadow: '0 4px 20px rgba(34,211,238,0.4)',
                            color: '#050a16', flexShrink: 0,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                <path d="M16.5 7.5l-2.89 5.78L8 16.5l2.89-5.78L16.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                        </span>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
                            Trippo <span style={{ color: '#22d3ee' }}>AI</span>
                        </span>
                    </a>

                    {/* Multi-ring spinner */}
                    <div style={{ position: 'relative', width: 72, height: 72 }}>
                        {/* Track */}
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.04)',
                        }} />
                        {/* Outer ring */}
                        <div
                            className="animate-spin"
                            style={{
                                position: 'absolute', inset: 0, borderRadius: '50%',
                                border: '2px solid transparent',
                                borderTopColor: '#22d3ee',
                                borderRightColor: 'rgba(34,211,238,0.3)',
                            }}
                        />
                        {/* Inner ring — counter-rotate */}
                        <div
                            className="animate-spin"
                            style={{
                                position: 'absolute', inset: 10, borderRadius: '50%',
                                border: '2px solid transparent',
                                borderTopColor: 'rgba(129,140,248,0.55)',
                                animationDirection: 'reverse',
                                animationDuration: '0.85s',
                            }}
                        />
                        {/* Innermost pulsing core */}
                        <div
                            className="animate-glow-pulse"
                            style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%,-50%)',
                                width: 10, height: 10, borderRadius: '50%',
                                background: '#22d3ee',
                                boxShadow: '0 0 18px rgba(34,211,238,0.95)',
                            }}
                        />
                    </div>

                    {/* Status text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>
                            Verifying your session
                        </p>
                        <p style={{ fontSize: 11, color: '#334155', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                            Please wait a moment…
                        </p>
                    </div>

                    {/* Animated loading dots */}
                    <div style={{ display: 'flex', gap: 6 }}>
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: 'rgba(34,211,238,0.4)',
                                    animation: 'pulse-glow 1.4s ease-in-out infinite',
                                    animationDelay: `${i * 0.22}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} replace />
    }

    return children
}

export default Protected