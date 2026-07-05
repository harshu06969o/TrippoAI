import React, { useState, useEffect } from "react";
import { Link } from "react-router";

/* ─── ICONS ──────────────────────────────────────────────────────────────── */
const Ic = ({ d, size = 22, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {[].concat(d).map((p, i) => (
      <path key={i} d={p} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </svg>
);

const Logo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 7.5l-2.89 5.78L8 16.5l2.89-5.78L16.5 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" />
  </svg>
);

const IcMap      = () => <Ic d={["M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z","M9 3v15","M15 6v15"]} />;
const IcClock    = () => <Ic d={["M12 7v5l3.5 3.5"]} size={22}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /></Ic>;
const IcDownload = () => <Ic d={["M12 3v12","M8 11l4 4 4-4","M3 17v1a3 3 0 003 3h12a3 3 0 003-3v-1"]} />;
const IcFork     = () => <Ic d={["M8 7v10","M16 9a4 4 0 01-4 4H8"]} />;
const IcMenu     = () => <Ic d={["M4 6h16","M4 12h16","M4 18h16"]} size={20} />;
const IcClose    = () => <Ic d={["M18 6L6 18","M6 6l12 12"]} size={20} />;
const IcArrow    = () => <Ic d={["M5 12h14","M12 5l7 7-7 7"]} size={18} />;
const IcCheck    = () => <Ic d={["M5 13l4 4L19 7"]} size={16} stroke={2} />;

/* Fix for IcClock which needs a circle child */
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: <IcMap />,      title: "Geographically Clustered Stays",  desc: "AI groups nearby attractions into tight clusters—no backtracking, maximised time at each destination." },
  { icon: <ClockIcon />,  title: "Optimize Travel Times",           desc: "Smart scheduling powered by real-world transit data saves hours of wasted transit time." },
  { icon: <IcDownload />, title: "Zero-Disk PDF Exports",           desc: "Download a beautifully formatted offline itinerary in one click, streamed live from server memory." },
  { icon: <IcFork />,     title: "Personalized Dining",             desc: "Curated restaurant picks at every stop, matched to your budget tier and local preferences." },
];

const STEPS = [
  { n: "01", title: "Describe Your Trip",   desc: "Enter destination, duration, budget tier, and number of travelers." },
  { n: "02", title: "AI Crafts Your Plan",  desc: "Gemini AI analyses thousands of data points to build a geographically-optimised day-by-day itinerary." },
  { n: "03", title: "Download & Explore",   desc: "Review your personalized plan online or export a stunning PDF for offline access." },
];

const STATS = [
  { val: "10,000+", label: "Itineraries Generated" },
  { val: "180+",    label: "Cities Covered" },
  { val: "3,200+",  label: "Happy Travelers" },
];

/* ─── SHARED BUTTON WRAPPERS ─────────────────────────────────────────────── */
/** Primary gradient button rendered as <Link> */
const PrimaryLink = ({ to, children, lg }) => (
  <Link to={to} className={`btn-primary${lg ? " btn-lg" : ""}`}>
    <span className="btn-hover-overlay" aria-hidden="true" />
    <span className="btn-label">{children}</span>
  </Link>
);

/** Primary gradient button rendered as <a> (for hash links) */
const PrimaryAnchor = ({ href, children, lg }) => (
  <a href={href} className={`btn-primary${lg ? " btn-lg" : ""}`}>
    <span className="btn-hover-overlay" aria-hidden="true" />
    <span className="btn-label">{children}</span>
  </a>
);

/** Ghost secondary button as <a> */
const GhostAnchor = ({ href, children, lg }) => (
  <a href={href} className={`btn-ghost${lg ? " btn-lg" : ""}`}>{children}</a>
);

/* ─── FEATURE CARD ───────────────────────────────────────────────────────── */
const FeatureCard = ({ icon, title, desc }) => (
  <article
    className="group flex flex-col gap-5 p-7 rounded-2xl border transition-all duration-300 cursor-default"
    style={{
      background: "rgba(255,255,255,0.025)",
      borderColor: "rgba(255,255,255,0.07)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(6,182,212,0.28)";
      e.currentTarget.style.background  = "rgba(6,182,212,0.04)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      e.currentTarget.style.background  = "rgba(255,255,255,0.025)";
    }}
  >
    {/* Top accent bar on hover — pure CSS via group */}
    <div
      className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.6), transparent)" }}
      aria-hidden="true"
    />
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 48, height: 48,
        borderRadius: 14,
        background: "rgba(6,182,212,0.1)",
        border: "1px solid rgba(6,182,212,0.18)",
        color: "#22d3ee",
        transition: "all 0.3s ease",
      }}
    >
      {icon}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4 }}>{title}</h3>
      <p  style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{desc}</p>
    </div>
  </article>
);

/* ══════════════════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                              */
/* ══════════════════════════════════════════════════════════════════════════ */
const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Inline style for sections that need exact bg colors */
  const sectionStyle = (bg) => ({
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: bg,
    position: "relative",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#080c18", color: "#f8fafc", overflowX: "hidden" }}>

      {/* ═══════════════════════════════════════════════════════════════════
          NAVBAR — full-width, perfectly centered content via max-w container
      ═══════════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.4s ease",
          ...(scrolled ? {
            background:   "rgba(8,12,24,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            boxShadow:    "0 8px 32px rgba(0,0,0,0.5)",
          } : {
            background: "transparent",
          }),
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
            height: 64,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              textDecoration: "none", userSelect: "none", flexShrink: 0,
            }}
            aria-label="Trippo AI — Home"
          >
            <span style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              boxShadow: "0 4px 16px rgba(6,182,212,0.35)",
              color: "#080c18", flexShrink: 0,
            }}>
              <Logo />
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>
              Trippo <span style={{ color: "#22d3ee" }}>AI</span>
            </span>
            <span style={{
              fontSize: 9, fontWeight: 700, color: "rgba(34,211,238,0.65)",
              border: "1px solid rgba(34,211,238,0.22)", borderRadius: 999,
              padding: "2px 6px", letterSpacing: "0.12em", textTransform: "uppercase",
              lineHeight: 1, display: "inline-flex", alignItems: "center",
              marginTop: 1,
            }}>
              BETA
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
            {[["Features", "#features"], ["How It Works", "#how-it-works"], ["About", "#about"]].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: 14, fontWeight: 500,
                  color: "rgba(148,163,184,0.9)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  position: "relative",
                  padding: "4px 0",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(148,163,184,0.9)"}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
            <Link
              to="/login"
              style={{
                padding: "8px 16px", borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                color: "rgba(148,163,184,0.9)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color="#fff"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="rgba(148,163,184,0.9)"; e.currentTarget.style.background="transparent"; }}
            >
              Log In
            </Link>
            <PrimaryLink to="/register">Sign Up Free</PrimaryLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#94a3b8", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {mobileOpen ? <IcClose /> : <IcMenu />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className="md:hidden"
          style={{
            overflow: "hidden",
            maxHeight: mobileOpen ? 320 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          <div style={{
            background: "rgba(10,15,32,0.97)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 24px",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            {[["Features", "#features"], ["How It Works", "#how-it-works"], ["About", "#about"]].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", padding: "12px 0",
                  fontSize: 15, fontWeight: 500, color: "#94a3b8",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "color 0.2s ease",
                }}
              >
                {label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block", padding: "12px 0",
                fontSize: 15, fontWeight: 500, color: "#94a3b8",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              Log In
            </Link>
            <div style={{ paddingTop: 16 }}>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", padding: "14px 24px",
                  borderRadius: 14, fontSize: 15, fontWeight: 700,
                  color: "#0b1120", lineHeight: 1,
                  background: "linear-gradient(135deg, #22d3ee, #38bdf8 55%, #818cf8)",
                  textDecoration: "none",
                }}
              >
                Sign Up — It's Free ✨
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          ...sectionStyle("#080c18"),
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* BG Image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop"
            alt="Scenic mountain fjord"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            loading="eager"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.42) 50%, #080c18 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.25), transparent 50%, rgba(0,0,0,0.25))",
          }} />
        </div>

        {/* Glow blobs */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} aria-hidden="true">
          <div style={{
            position: "absolute", top: "30%", left: "20%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} />
        </div>

        {/* Hero content — centered, max-width constrained */}
        <div
          style={{
            position: "relative", zIndex: 10,
            width: "100%", maxWidth: 860,
            margin: "0 auto",
            padding: "6rem 1.5rem 3rem",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 28,
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999,
            border: "1px solid rgba(34,211,238,0.28)",
            background: "rgba(6,182,212,0.09)",
            backdropFilter: "blur(12px)",
            color: "#67e8f9",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            lineHeight: 1,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#22d3ee", flexShrink: 0,
              boxShadow: "0 0 8px rgba(6,182,212,0.9)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            Powered by Gemini AI
          </div>

          {/* Headline */}
          <h1 style={{
            margin: 0,
            fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#fff",
            lineHeight: 1.07,
            textShadow: "0 2px 24px rgba(0,0,0,0.5)",
          }}>
            AI-Powered Itineraries.
            <br />
            <span className="text-shimmer">Curated For Your</span>
            <br />
            Next Adventure.
          </h1>

          {/* Subheadline */}
          <p style={{
            margin: 0,
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            color: "rgba(203,213,225,0.8)",
            lineHeight: 1.7,
            maxWidth: 600,
          }}>
            Tell Trippo AI your dream trip details, and we'll craft the perfect,{" "}
            <strong style={{ fontWeight: 600, color: "#fff" }}>geographically clustered</strong>{" "}
            itinerary in seconds. Personalized and optimized.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "center",
            gap: 12, marginTop: 4,
          }}>
            <PrimaryLink to="/login" lg>
              Start Planning for Free <IcArrow />
            </PrimaryLink>
            <GhostAnchor href="#features" lg>See How It Works</GhostAnchor>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            flexWrap: "wrap", gap: "12px 40px",
            marginTop: 8,
          }}>
            {STATS.map(({ val, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: 11, color: "rgba(100,116,139,0.85)", letterSpacing: "0.05em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32,
          left: "50%", transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 4,
          opacity: 0.45, animation: "float-slow 3s ease-in-out infinite",
        }}>
          <span style={{ fontSize: 9, color: "#94a3b8", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" style={{ ...sectionStyle("#0b1019"), padding: "96px 0" }}>
        {/* Top separator */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(6,182,212,0.3), transparent)",
        }} aria-hidden="true" />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, color: "rgba(34,211,238,0.7)",
              letterSpacing: "0.25em", textTransform: "uppercase",
              marginBottom: 16, lineHeight: 1,
            }}>
              Why Trippo AI
            </p>
            <h2 style={{
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              color: "#fff", lineHeight: 1.1,
              marginBottom: 16,
            }}>
              Everything Your Trip Deserves
            </h2>
            <p style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "#64748b", lineHeight: 1.7,
              maxWidth: 480, margin: "0 auto",
            }}>
              Built with real engineering discipline. No fluff—just smart, reliable travel planning.
            </p>
          </div>

          {/* 4-column grid — responsive */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}>
            {FEATURES.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 12,
            marginTop: 72,
          }}>
            <p style={{ fontSize: 14, color: "#475569" }}>Ready to plan your next adventure?</p>
            <PrimaryLink to="/register" lg>Start Your Journey ✨</PrimaryLink>
            <p style={{ fontSize: 12, color: "#334155" }}>No credit card required · Free to start</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ ...sectionStyle("#080c18"), padding: "96px 0" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(99,102,241,0.25), transparent)",
        }} aria-hidden="true" />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, color: "rgba(129,140,248,0.7)",
              letterSpacing: "0.25em", textTransform: "uppercase",
              marginBottom: 16, lineHeight: 1,
            }}>
              How It Works
            </p>
            <h2 style={{
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              color: "#fff", lineHeight: 1.1,
            }}>
              From Idea to Itinerary in Seconds
            </h2>
          </div>

          {/* Steps */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            alignItems: "start",
          }}>
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", textAlign: "center",
                gap: 16, padding: "32px 24px",
              }}>
                <div style={{
                  width: 64, height: 64,
                  borderRadius: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.12))",
                  border: "1px solid rgba(34,211,238,0.18)",
                  fontSize: 24, fontWeight: 900,
                  color: "#22d3ee", lineHeight: 1,
                  flexShrink: 0,
                }}>
                  {n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", margin: 0, lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" style={{ ...sectionStyle("#0b1019"), padding: "80px 0" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(6,182,212,0.2), transparent)",
        }} aria-hidden="true" />

        <div style={{
          maxWidth: 720, margin: "0 auto",
          padding: "0 2rem",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center", gap: 24,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            border: "1px solid rgba(34,211,238,0.25)",
            background: "rgba(6,182,212,0.08)",
            fontSize: 11, fontWeight: 700, color: "#67e8f9",
            letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", flexShrink: 0 }} />
            Now in Beta — Free Access
          </div>

          <h2 style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            fontWeight: 900, letterSpacing: "-0.03em",
            color: "#fff", lineHeight: 1.1, margin: 0,
          }}>
            Plan Your Next Adventure<br />
            <span className="text-shimmer">With AI Precision</span>
          </h2>

          <p style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            color: "#64748b", lineHeight: 1.7, margin: 0, maxWidth: 520,
          }}>
            Join thousands of travelers who've already transformed how they plan trips.
            Create your free account today.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
            <PrimaryLink to="/register" lg>Create Free Account <IcArrow /></PrimaryLink>
            <GhostAnchor href="#features" lg>Explore Features</GhostAnchor>
          </div>

          {/* Checkmarks */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "8px 24px",
            justifyContent: "center", marginTop: 4,
          }}>
            {["No credit card required", "Setup in 30 seconds", "Cancel anytime"].map(t => (
              <div key={t} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 13, color: "#475569",
              }}>
                <span style={{ color: "#22d3ee" }}><IcCheck /></span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#060810",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "28px 2rem",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 16,
        }}>
          <Link to="/" style={{
            display: "flex", alignItems: "center", gap: 8,
            textDecoration: "none", userSelect: "none",
          }}>
            <span style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 26, height: 26, borderRadius: 8,
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              color: "#060810",
            }}>
              <Logo />
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#64748b", letterSpacing: "-0.02em" }}>
              Trippo <span style={{ color: "#22d3ee" }}>AI</span>
            </span>
          </Link>

          <p style={{ fontSize: 12, color: "#334155", margin: 0 }}>© 2026 Trippo AI. All rights reserved.</p>

          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" style={{
                fontSize: 12, color: "#334155", textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#64748b"}
              onMouseLeave={e => e.currentTarget.style.color = "#334155"}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
