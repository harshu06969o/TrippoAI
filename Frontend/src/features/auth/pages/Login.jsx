import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router' // Ekdum sahi hai yeh
import { useAuth } from '../hooks/useAuth'

// ─── Static content (safe to edit) ───────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

const Login = () => {

  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("")

    try {
      await handleLogin({ email, password })
      navigate('/') // Sirf success pe navigate hoga
    } catch (err) {
      setErrorMsg(err.message || "Failed to login. Please check your credentials.")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
          <p className="text-zinc-500 text-sm tracking-wide">Authenticating…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">

      {/* ── Ambient glow layer ────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Teal blob — top-left */}
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[140px]" />
        {/* Indigo blob — bottom-right */}
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-indigo-500/10 blur-[140px]" />
        {/* Faint center haze */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-400/4 blur-[100px]" />
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 py-5 border-b border-white/5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1 select-none">
          <span className="text-2xl font-bold tracking-tighter text-zinc-100">Trippo</span>
          <span className="text-2xl font-bold tracking-tighter text-teal-400"> AI</span>
        </a>
        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-7 text-sm text-zinc-500">
          <a href="#" className="hover:text-zinc-200 transition-colors duration-200">Features</a>
          <a href="#" className="hover:text-zinc-200 transition-colors duration-200">Pricing</a>
          <a href="#" className="hover:text-zinc-200 transition-colors duration-200">Blog</a>
        </div>
        {/* CTA — hidden on mobile */}
        <div className="hidden md:block">
          <Link
            to="/register"
            className="text-sm font-medium text-zinc-300 border border-white/10 rounded-lg px-4 py-2 hover:border-teal-400/30 hover:text-teal-300 transition-all duration-200"
          >
            Create account
          </Link>
        </div>
      </nav>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row items-center justify-center gap-16 px-6 md:px-14 py-14 lg:py-0 max-w-7xl mx-auto w-full">

        {/* Left: Hero ───────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-8 max-w-lg">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-400/20 bg-teal-400/5 text-teal-400 text-xs font-medium tracking-widest uppercase w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            AI Travel Intelligence
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter leading-[1.08] text-zinc-100">
              Design Your Dream
              <span className="block bg-gradient-to-r from-teal-300 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                Journey in Seconds.
              </span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-sm">
              Deep-engineered AI itineraries built around real-world constraints —
              budget, pace, and preference included.
            </p>
          </div>

          {/* Feature highlights */}
          <ul className="flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex items-start gap-3.5">
                {/* Teal tick mark */}
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-teal-400/10 border border-teal-400/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-teal-400" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200 leading-snug">{f.label}</p>
                  <p className="text-sm text-zinc-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Trust signal */}
          <p className="text-xs text-zinc-700 mt-1">
            Trusted by{' '}
            <span className="text-zinc-400 font-medium">14,000+ travellers</span>{' '}
            across 90 countries.
          </p>

        </div>

        {/* Right: Auth card ─────────────────────────────────────────────── */}
        <div className="w-full max-w-sm flex-shrink-0">
          <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md p-10 shadow-2xl shadow-black/50">

            {/* Inner inset ring for polish */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
              aria-hidden="true"
            />

            {/* Subtle top-edge accent line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-7">

              {/* Card header */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold tracking-tight text-zinc-100">Welcome back</h2>
                <p className="text-sm text-zinc-500">Sign in to continue planning.</p>
              </div>

              {/* Error message */}
              {errorMsg && (
                <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <svg className="mt-0.5 w-3.5 h-3.5 text-red-400 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                    <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm text-red-400 leading-snug">{errorMsg}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full h-12 rounded-lg border border-white/8 bg-white/5 px-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/15 focus:bg-white/[0.07] hover:border-white/15"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Password
                    </label>
                    <a href="#" className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-200">
                      Forgot?
                    </a>
                  </div>
                  <input
                    onChange={(e) => { setPassword(e.target.value) }}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="w-full h-12 rounded-lg border border-white/8 bg-white/5 px-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/15 focus:bg-white/[0.07] hover:border-white/15"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full h-12 rounded-lg bg-teal-400 px-4 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in…" : "Sign in →"}
                </button>

              </form>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/6" />
                <span className="text-xs text-zinc-600">or</span>
                <div className="flex-1 h-px bg-white/6" />
              </div>

              {/* Register CTA — intentional secondary action button */}
              <div className="flex flex-col gap-2.5">
                <p className="text-center text-xs text-zinc-600 tracking-wide">New to Trippo AI?</p>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full h-11 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-teal-400/30 hover:text-teal-300 hover:bg-teal-400/5 active:scale-[0.98]"
                >
                  Create a free account
                </Link>
              </div>

            </div>
          </div>

          {/* Below-card trust note */}
          <p className="mt-4 text-center text-xs text-zinc-700">
            By signing in you agree to our{' '}
            <a href="#" className="underline hover:text-zinc-500 transition-colors">Terms</a>
            {' & '}
            <a href="#" className="underline hover:text-zinc-500 transition-colors">Privacy Policy</a>.
          </p>
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 px-6 md:px-14 py-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-xs text-zinc-700">© 2025 Trippo AI. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-zinc-700">
          <a href="#" className="hover:text-zinc-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-zinc-500 transition-colors">Contact</a>
        </div>
      </footer>

    </main>
  )
}

export default Login
