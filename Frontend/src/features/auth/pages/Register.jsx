import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

/* ── Feature highlights (shared identity with Login) ─────────────────────── */
const FEATURES = [
  {
    label: 'Deep-Constraint Planning',
    desc: 'Itineraries shaped around your real budget, trip pace, and travel dates — not generic templates.',
  },
  {
    label: 'Multi-City Intelligence',
    desc: 'Optimised routing across multiple destinations, including layovers, local transit, and transit times.',
  },
  {
    label: 'Live Context Awareness',
    desc: 'Adapts your plan around real-time flights, local weather, and crowd conditions on the ground.',
  },
  {
    label: 'Collaborate & Share',
    desc: 'Invite travel companions to co-plan, vote on stops, and sync everyone to one live itinerary.',
  },
]

/* ══════════════════════════════════════════════════════════════════════════ */
/* REGISTER PAGE                                                               */
/* ══════════════════════════════════════════════════════════════════════════ */
const Register = () => {
  const navigate = useNavigate()

  /* ── ALL ORIGINAL LOGIC — ZERO MUTATIONS ─────────────────────────────── */
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }
  /* ──────────────────────────────────────────────────────────────────────── */

  /* Full-screen loading state */
  if (loading) {
    return (
      <main className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-600/8 blur-[160px] animate-glow-pulse" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in-up">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-slate-800" />
            <div className="absolute w-14 h-14 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
            <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-glow-pulse" />
          </div>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Creating your account…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">

      {/* ── Ambient glow layer ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-56 -right-56 w-[800px] h-[800px] rounded-full bg-blue-600/8 blur-[160px] animate-float-slow" />
        <div className="absolute -bottom-56 -left-56 w-[700px] h-[700px] rounded-full bg-cyan-600/8 blur-[160px] animate-float-slow" style={{ animationDelay: '-6s' }} />
        <div className="absolute top-1/2 right-1/3 w-[500px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      {/* ── Subtle grid overlay ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 py-5 border-b border-white/[0.05]">
        <Link to="/" className="flex items-center gap-0.5 select-none group">
          <span className="text-2xl font-black tracking-tighter text-slate-100 transition-colors duration-200 group-hover:text-white">
            Trippo
          </span>
          <span className="text-2xl font-black tracking-tighter text-cyan-400 transition-colors duration-200 group-hover:text-cyan-300">
            {' '}AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-200 transition-colors duration-200">Features</a>
          <a href="#" className="hover:text-slate-200 transition-colors duration-200">Pricing</a>
          <a href="#" className="hover:text-slate-200 transition-colors duration-200">Blog</a>
        </div>

        <div className="hidden md:block">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 border border-white/10 rounded-xl px-5 py-2.5 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/5 transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row items-center justify-center gap-14 lg:gap-20 px-6 md:px-14 py-12 lg:py-0 max-w-7xl mx-auto w-full">

        {/* Left: Hero ─────────────────────────────────────────────────── */}
        <div className="w-full lg:flex-1 flex flex-col gap-10 max-w-lg lg:max-w-none animate-fade-in-up">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-400 text-xs font-semibold tracking-widest uppercase w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            Join the Future of Travel
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter leading-[1.06] text-slate-50">
              Start Planning
              <span className="block text-shimmer mt-1">Without Limits.</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
              Create a free account to unlock deep-engineered AI itineraries and seamless co-planning.
            </p>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center transition-all duration-200 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50">
                  <svg className="w-2.5 h-2.5 text-cyan-400" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-200 leading-snug">{f.label}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Register card ──────────────────────────────────────── */}
        <div className="w-full max-w-[400px] flex-shrink-0 animate-scale-in" style={{ animationDelay: '0.1s' }}>

          {/* Glass card */}
          <div className="relative rounded-3xl glass-surface shadow-2xl shadow-black/60 overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" aria-hidden="true" />
            {/* Bottom gradient line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" aria-hidden="true" />
            {/* Card inner glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-400/5 blur-3xl rounded-full" aria-hidden="true" />

            <div className="relative flex flex-col gap-7 p-8 md:p-10">

              {/* Card header */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl font-black tracking-tight text-slate-50">
                  Create an account
                </h2>
                <p className="text-sm text-slate-500">Sign up to start designing your dream trips.</p>
              </div>

              {/* ── FORM — all onChange handlers preserved ────────────── */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="username" className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                    Username
                  </label>
                  <input
                    onChange={(e) => { setUsername(e.target.value) }}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    required
                    className="input-premium"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                    Email
                  </label>
                  <input
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    required
                    className="input-premium"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em]">
                    Password
                  </label>
                  <input
                    onChange={(e) => { setPassword(e.target.value) }}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="input-premium"
                  />
                </div>

                {/* CTA button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 relative w-full h-14 rounded-xl font-bold text-sm tracking-wide text-slate-950 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee 0%, #38bdf8 50%, #818cf8 100%)',
                  }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 50%, #6366f1 100%)' }} />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-slate-900/40 border-t-slate-900 animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      <>Get started free <span aria-hidden="true">✦</span></>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-xs text-slate-700 font-medium">or</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>

              {/* Login CTA */}
              <div className="flex flex-col gap-2.5">
                <p className="text-center text-xs text-slate-600 tracking-wide">Already have an account?</p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-500/5 active:scale-[0.98]"
                >
                  Sign in instead
                </Link>
              </div>

            </div>
          </div>

          {/* Terms footnote */}
          <p className="mt-4 text-center text-[11px] text-slate-700">
            By registering you agree to our{' '}
            <a href="#" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Terms</a>
            {' & '}
            <a href="#" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Privacy Policy</a>.
          </p>
        </div>

      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 px-6 md:px-14 py-5 border-t border-white/[0.04] flex items-center justify-between">
        <p className="text-xs text-slate-700">© 2026 Trippo AI. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-slate-700">
          <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Contact</a>
        </div>
      </footer>

    </main>
  )
}

export default Register