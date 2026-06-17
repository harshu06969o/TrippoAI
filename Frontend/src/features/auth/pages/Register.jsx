import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

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

const Register = () => {
  const navigate = useNavigate()
  
  // 100% Original Logic Maintained
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
          <p className="text-zinc-500 text-sm tracking-wide">Registering...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      
      {/* ── Ambient glow layer ────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-400/4 blur-[100px]" />
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-1 select-none">
          <span className="text-2xl font-bold tracking-tighter text-zinc-100">Trippo</span>
          <span className="text-2xl font-bold tracking-tighter text-teal-400"> AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-zinc-500">
          <a href="#" className="hover:text-zinc-200 transition-colors duration-200">Features</a>
          <a href="#" className="hover:text-zinc-200 transition-colors duration-200">Pricing</a>
          <a href="#" className="hover:text-zinc-200 transition-colors duration-200">Blog</a>
        </div>
        <div className="hidden md:block">
          <Link
            to="/login"
            className="text-sm font-medium text-zinc-300 border border-white/10 rounded-lg px-4 py-2 hover:border-teal-400/30 hover:text-teal-300 transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-6 md:px-14 py-10 lg:py-0 max-w-7xl mx-auto w-full">

        {/* Left: Hero ───────────────────────────────────────────────────── */}
        <div className="w-full lg:flex-1 flex flex-col gap-8 max-w-lg lg:max-w-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-400/20 bg-teal-400/5 text-teal-400 text-xs font-medium tracking-widest uppercase w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Join the Future of Travel
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter leading-[1.08] text-zinc-100">
              Start Planning
              <span className="block bg-gradient-to-r from-teal-300 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                Without Limits.
              </span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-sm">
              Create a free account to unlock deep-engineered AI itineraries and seamless co-planning.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex items-start gap-3.5">
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
        </div>

        {/* Right: Register Card ─────────────────────────────────────────── */}
        <div className="w-full max-w-sm flex-shrink-0">
          <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md p-7 md:p-10 shadow-2xl shadow-black/50">

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" aria-hidden="true" />

            <div className="flex flex-col gap-7 px-1 sm:px-2">

              {/* Card header */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Create an account</h2>
                <p className="text-sm text-zinc-500">Sign up to start designing trips.</p>
              </div>

              {/* Form - 100% Original Submission Logic */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Username Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="username" className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Username
                  </label>
                  <input
                    onChange={(e) => { setUsername(e.target.value) }}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    required
                    className="w-full h-12 rounded-lg border border-white/8 bg-white/5 px-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/15 focus:bg-white/[0.07] hover:border-white/15"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    required
                    className="w-full h-12 rounded-lg border border-white/8 bg-white/5 px-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/15 focus:bg-white/[0.07] hover:border-white/15"
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Password
                  </label>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full h-12 rounded-lg bg-teal-400 px-4 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/6" />
                <span className="text-xs text-zinc-600">or</span>
                <div className="flex-1 h-px bg-white/6" />
              </div>

              {/* Login CTA */}
              <div className="flex flex-col gap-2.5">
                <p className="text-center text-xs text-zinc-600 tracking-wide">Already have an account?</p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full h-11 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-teal-400/30 hover:text-teal-300 hover:bg-teal-400/5 active:scale-[0.98]"
                >
                  Login
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 px-6 md:px-14 py-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-xs text-zinc-700">© 2026 Trippo AI. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-zinc-700">
          <a href="#" className="hover:text-zinc-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-zinc-500 transition-colors">Contact</a>
        </div>
      </footer>

    </main>
  )
}

export default Register