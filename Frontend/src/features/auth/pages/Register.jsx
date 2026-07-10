import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════════════════ */
const IcCheck = () => (
  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LogoMark = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M16.5 7.5l-2.89 5.78L8 16.5l2.89-5.78L16.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
)

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE LIST DATA
═══════════════════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    label: 'Deep-Constraint Planning',
    desc: 'Itineraries shaped around your real budget, trip pace, and travel dates — not generic templates.',
    color: '#22d3ee',
  },
  {
    label: 'Multi-City Intelligence',
    desc: 'Optimised routing across multiple destinations, including layovers, local transit, and transit times.',
    color: '#818cf8',
  },
  {
    label: 'Live Context Awareness',
    desc: 'Adapts your plan around real-time flights, local weather, and crowd conditions on the ground.',
    color: '#f59e0b',
  },
  {
    label: 'Collaborate & Share',
    desc: 'Invite travel companions to co-plan, vote on stops, and sync everyone to one live itinerary.',
    color: '#10b981',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM INPUT FIELD
═══════════════════════════════════════════════════════════════════════════ */
const PremiumInput = ({ id, label, type = 'text', placeholder, required, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <label
      htmlFor={id}
      style={{
        fontSize: 11, fontWeight: 700, color: '#475569',
        textTransform: 'uppercase', letterSpacing: '0.14em',
      }}
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className="input-premium"
    />
  </div>
)

/* ═══════════════════════════════════════════════════════════════════════════
   FULL-SCREEN LOADING
═══════════════════════════════════════════════════════════════════════════ */
const FullScreenLoader = ({ text }) => (
  <main style={{
    position: 'relative', minHeight: '100vh',
    background: '#050a16',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      <div className="animate-aurora" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
    </div>
    <div
      className="animate-fade-in-up"
      style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 24,
      }}
    >
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 8 }}>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, color: '#f8fafc' }}>Trippo</span>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, color: '#22d3ee' }}> AI</span>
      </a>
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.05)' }} />
        <div className="animate-spin" style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid transparent', borderTopColor: '#22d3ee', borderRightColor: 'rgba(34,211,238,0.35)',
        }} />
        <div className="animate-glow-pulse" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 10, height: 10, borderRadius: '50%',
          background: '#22d3ee', boxShadow: '0 0 16px rgba(34,211,238,0.9)',
        }} />
      </div>
      <p style={{ fontSize: 13, color: '#475569', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{text}</p>
    </div>
  </main>
)

/* ═══════════════════════════════════════════════════════════════════════════
   REGISTER PAGE
═══════════════════════════════════════════════════════════════════════════ */
const Register = () => {
  const navigate = useNavigate()

  /* ── ALL ORIGINAL LOGIC — ZERO MUTATIONS ─────────────────────────────── */
  const [username, setUsername] = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/dashboard")
  }
  /* ──────────────────────────────────────────────────────────────────────── */

  if (loading) return <FullScreenLoader text="Creating your account…" />

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#050a16',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient glow layer ──────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
        <div className="animate-float-slow delay-200" style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 800, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div className="animate-float-slow delay-500" style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: 700, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.012, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', userSelect: 'none' }}>
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 10,
            background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
            boxShadow: '0 4px 16px rgba(34,211,238,0.35)',
            color: '#050a16', flexShrink: 0,
          }}>
            <LogoMark />
          </span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            Trippo <span style={{ color: '#22d3ee' }}>AI</span>
          </span>
        </Link>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28, fontSize: 14, color: '#475569' }}>
          <a href="/#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
            onMouseLeave={e => e.currentTarget.style.color = '#475569'}
          >Features</a>
          <a href="/#how-it-works" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
            onMouseLeave={e => e.currentTarget.style.color = '#475569'}
          >How It Works</a>
        </div>

        <Link
          to="/login"
          style={{
            fontSize: 14, fontWeight: 600,
            color: '#64748b',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          Sign in
        </Link>
      </nav>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1100,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 72,
          flexWrap: 'wrap',
        }}>

          {/* Left: Hero panel (desktop only) */}
          <div
            className="hidden lg:flex animate-fade-in-up"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 480 }}
          >
            <div className="badge-live">
              <span className="dot" aria-hidden="true" />
              Join the Future of Travel
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06,
                color: '#f8fafc', margin: 0,
              }}>
                Start Planning
                <span className="text-shimmer" style={{ display: 'block', marginTop: 4 }}>Without Limits.</span>
              </h1>
              <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, maxWidth: 400, margin: 0 }}>
                Create a free account to unlock deep-engineered AI itineraries and seamless co-planning.
              </p>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 20, listStyle: 'none', margin: 0, padding: 0 }}>
              {FEATURES.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <span style={{
                    marginTop: 2, flexShrink: 0,
                    width: 20, height: 20, borderRadius: '50%',
                    background: `${f.color}15`,
                    border: `1px solid ${f.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: f.color,
                  }}>
                    <IcCheck />
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1', lineHeight: 1.3, margin: 0 }}>{f.label}</p>
                    <p style={{ fontSize: 13, color: '#475569', margin: '3px 0 0', lineHeight: 1.55 }}>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Register card */}
          <div
            className="animate-scale-in w-full"
            style={{ maxWidth: 420, flexShrink: 0 }}
          >
            <div className="glass-card" style={{ borderRadius: 28, overflow: 'hidden' }}>

              {/* Top gradient line */}
              <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(129,140,248,0.6), transparent)' }} aria-hidden="true" />

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 28, padding: 36 }}>

                {/* Card header */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ marginBottom: 4 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(129,140,248,0.15), rgba(34,211,238,0.15))',
                      border: '1px solid rgba(129,140,248,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>🗺️</div>
                  </div>
                  <h2 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 26, fontWeight: 900,
                    letterSpacing: '-0.03em', color: '#f8fafc', margin: 0,
                  }}>
                    Create an account
                  </h2>
                  <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>
                    Sign up to start designing your dream trips.
                  </p>
                </div>

                {/* ── FORM — all onChange handlers preserved ──────────── */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  {/* Username */}
                  <PremiumInput
                    id="username"
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    required
                    onChange={(e) => { setUsername(e.target.value) }}
                  />

                  {/* Email */}
                  <PremiumInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                  />

                  {/* Password */}
                  <PremiumInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                  />

                  {/* Password strength hint */}
                  {password.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[1,2,3,4].map(i => (
                          <div
                            key={i}
                            style={{
                              flex: 1, height: 3, borderRadius: 999,
                              background: password.length >= i * 3
                                ? (password.length >= 10 ? '#22d3ee' : password.length >= 6 ? '#f59e0b' : '#f43f5e')
                                : 'rgba(255,255,255,0.07)',
                              transition: 'background 0.3s',
                            }}
                          />
                        ))}
                      </div>
                      <p style={{
                        fontSize: 11, margin: 0,
                        color: password.length >= 10 ? '#22d3ee' : password.length >= 6 ? '#f59e0b' : '#f43f5e',
                      }}>
                        {password.length >= 10 ? 'Strong password' : password.length >= 6 ? 'Medium strength' : 'Weak — use 10+ characters'}
                      </p>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-submit"
                    style={{ marginTop: 4 }}
                  >
                    <span className="btn-hover-overlay" aria-hidden="true" />
                    <span className="btn-label">
                      {loading ? (
                        <>
                          <span style={{
                            width: 16, height: 16, borderRadius: '50%',
                            border: '2px solid rgba(3,7,15,0.3)',
                            borderTopColor: '#03070f',
                            display: 'inline-block',
                            animation: 'spin 0.85s linear infinite',
                            flexShrink: 0,
                          }} />
                          Creating account…
                        </>
                      ) : (
                        <>Get started free ✨</>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
                  <span style={{ fontSize: 11, color: '#334155', fontWeight: 600 }}>or</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
                </div>

                {/* Login CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ textAlign: 'center', fontSize: 12, color: '#334155', margin: 0 }}>Already have an account?</p>
                  <Link
                    to="/login"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '100%', height: 52,
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.02)',
                      fontSize: 14, fontWeight: 600, color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.background = 'rgba(34,211,238,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    Sign in instead
                  </Link>
                </div>

              </div>

              {/* Bottom gradient line */}
              <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.25), transparent)' }} aria-hidden="true" />
            </div>

            {/* Terms footnote */}
            <p style={{ marginTop: 16, textAlign: 'center', fontSize: 11, color: '#1e293b' }}>
              By registering you agree to our{' '}
              <a href="#" style={{ color: '#334155', textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms</a>
              {' & '}
              <a href="#" style={{ color: '#334155', textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy Policy</a>.
            </p>
          </div>

        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer style={{
        position: 'relative', zIndex: 10,
        padding: '20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <p style={{ fontSize: 12, color: '#1e293b', margin: 0 }}>© 2026 Trippo AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#1e293b' }}>
          {['Privacy','Terms','Contact'].map(l => (
            <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#475569'}
              onMouseLeave={e => e.currentTarget.style.color = '#1e293b'}
            >{l}</a>
          ))}
        </div>
      </footer>

    </main>
  )
}

export default Register