import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

/* ═══════════════════════════════════════════════════════════════════════════
   SVG ICON PRIMITIVES
═══════════════════════════════════════════════════════════════════════════ */
const Ic = ({ d, size = 22, stroke = 1.5, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
    {[].concat(d).map((p, i) => (
      <path key={i} d={p} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </svg>
);

const LogoMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16.5 7.5l-2.89 5.78L8 16.5l2.89-5.78L16.5 7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const IcMap      = () => <Ic d={["M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z","M9 3v15","M15 6v15"]} />;
const IcClock    = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcDownload = () => <Ic d={["M12 3v12","M8 11l4 4 4-4","M3 17v1a3 3 0 003 3h12a3 3 0 003-3v-1"]} />;
const IcStar     = () => <Ic d={["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"]} fill="currentColor" size={14} />;
const IcArrow    = () => <Ic d={["M5 12h14","M12 5l7 7-7 7"]} size={18} />;
const IcCheck    = () => <Ic d={["M5 13l4 4L19 7"]} size={16} stroke={2} />;
const IcMenu     = () => <Ic d={["M4 6h16","M4 12h16","M4 18h16"]} size={20} />;
const IcClose    = () => <Ic d={["M18 6L6 18","M6 6l12 12"]} size={20} />;
const IcShield   = () => <Ic d={["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]} size={18} />;
const IcZap      = () => <Ic d={["M13 2L3 14h9l-1 8 10-12h-9l1-8z"]} size={18} />;
const IcGlobe    = () => <Ic d={["M12 2a10 10 0 100 20A10 10 0 0012 2z","M2 12h20","M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"]} size={18} />;

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: <IcMap />,
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "rgba(34,211,238,0.2)",
    iconColor: "#22d3ee",
    title: "Geographically Clustered",
    desc: "AI groups nearby attractions into tight clusters—no backtracking, maximum time at each destination.",
    tag: "Smart Routing",
  },
  {
    icon: <IcClock />,
    gradient: "from-violet-500/20 to-indigo-500/20",
    border: "rgba(129,140,248,0.2)",
    iconColor: "#818cf8",
    title: "Optimized Timelines",
    desc: "Smart scheduling powered by real-world transit data saves hours of wasted travel time every day.",
    tag: "AI Powered",
  },
  {
    icon: <IcDownload />,
    gradient: "from-emerald-500/20 to-cyan-500/20",
    border: "rgba(16,185,129,0.2)",
    iconColor: "#10b981",
    title: "Zero-Disk PDF Exports",
    desc: "Download a beautifully formatted offline itinerary in one click, streamed live from server memory.",
    tag: "Instant",
  },
  {
    icon: <IcGlobe />,
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "rgba(245,158,11,0.2)",
    iconColor: "#f59e0b",
    title: "Personalized Dining",
    desc: "Curated restaurant picks at every stop, matched to your budget tier and local preferences.",
    tag: "Tailored",
  },
];

const STEPS = [
  {
    n: "01",
    icon: "✈️",
    title: "Describe Your Trip",
    desc: "Enter destination, duration, budget tier, and number of travelers — takes under 30 seconds.",
    color: "#22d3ee",
  },
  {
    n: "02",
    icon: "🤖",
    title: "AI Crafts Your Plan",
    desc: "Gemini AI analyses thousands of data points to build a geographically-optimised day-by-day itinerary.",
    color: "#818cf8",
  },
  {
    n: "03",
    icon: "📄",
    title: "Download & Explore",
    desc: "Review your personalized plan online or export a stunning PDF for offline access, anywhere.",
    color: "#f59e0b",
  },
];

const STATS = [
  { val: "10,000+", label: "Itineraries Generated", icon: "🗺️" },
  { val: "180+",    label: "Cities Covered",         icon: "🌍" },
  { val: "3,200+",  label: "Happy Travelers",         icon: "⭐" },
];

const DESTINATIONS = [
  { name: "Kyoto, Japan",        days: "7 days", emoji: "🏯", color: "#22d3ee" },
  { name: "Santorini, Greece",   days: "5 days", emoji: "🏝️", color: "#818cf8" },
  { name: "Patagonia, Argentina",days: "10 days",emoji: "🏔️", color: "#f59e0b" },
];

const TRUST_ITEMS = ["No credit card required", "Setup in 30 seconds", "Cancel anytime"];

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED BUTTON COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */
const PrimaryLink = ({ to, children, lg }) => (
  <Link to={to} className={`btn-primary${lg ? " btn-lg" : ""}`}>
    <span className="btn-hover-overlay" aria-hidden="true" />
    <span className="btn-label">{children}</span>
  </Link>
);

const GhostAnchor = ({ href, children, lg }) => (
  <a href={href} className={`btn-ghost${lg ? " btn-lg" : ""}`}>{children}</a>
);

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE CARD — 3D tilt on hover
═══════════════════════════════════════════════════════════════════════════ */
const FeatureCard = ({ icon, gradient, border, iconColor, title, desc, tag }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
  };

  const handleMouseLeave = (e) => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    card.style.borderColor = "rgba(255,255,255,0.06)";
  };

  const handleMouseEnter = (e) => {
    const card = ref.current;
    if (!card) return;
    card.style.borderColor = border;
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        willChange: "transform",
      }}
      className="glass-surface rounded-3xl p-7 flex flex-col gap-5 cursor-default group relative overflow-hidden"
    >
      {/* Gradient background glow on hover */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />

      {/* Top shimmer line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-3xl"
        style={{ background: `linear-gradient(to right, transparent, ${iconColor}60, transparent)` }}
        aria-hidden="true"
      />

      {/* Tag badge */}
      <span
        className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
        style={{
          background: `${iconColor}15`,
          color: iconColor,
          border: `1px solid ${iconColor}30`,
        }}
      >
        {tag}
      </span>

      {/* Icon container */}
      <div
        className="relative flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-2xl transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${iconColor}12`,
          border: `1px solid ${iconColor}25`,
          color: iconColor,
          boxShadow: `0 0 20px ${iconColor}15`,
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-2.5">
        <h3 className="text-base font-bold text-slate-100 leading-tight" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </article>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING DESTINATION CARD
═══════════════════════════════════════════════════════════════════════════ */
const DestinationCard = ({ name, days, emoji, color, style }) => (
  <div
    className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4 select-none"
    style={{
      minWidth: 220,
      ...style,
    }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
    >
      {emoji}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-100">{name}</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <div className="flex gap-0.5">
          {[0,1,2,3,4].map(i => (
            <svg key={i} width="10" height="10" viewBox="0 0 14 14" fill="#f59e0b" aria-hidden="true">
              <path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z"/>
            </svg>
          ))}
        </div>
        <span className="text-[11px] text-slate-500 font-medium">{days}</span>
      </div>
    </div>
    <div className="ml-auto">
      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${color}20`, color }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   STEP CARD
═══════════════════════════════════════════════════════════════════════════ */
const StepCard = ({ n, icon, title, desc, color, isLast }) => (
  <div className="relative flex flex-col items-center text-center gap-5 px-4">
    {/* Connector line */}
    {!isLast && (
      <div
        className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[-50%] h-px"
        style={{ background: `linear-gradient(to right, ${color}60, rgba(255,255,255,0.05))` }}
        aria-hidden="true"
      />
    )}

    {/* Step orb */}
    <div className="relative flex-shrink-0">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 cursor-default"
        style={{
          background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
          border: `1px solid ${color}30`,
          boxShadow: `0 0 30px ${color}12`,
        }}
      >
        {icon}
      </div>
      <div
        className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
        style={{
          background: `${color}`,
          color: '#0a0f1e',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 11,
        }}
      >
        {n}
      </div>
    </div>

    <div className="flex flex-col gap-2 max-w-xs">
      <h3
        className="text-lg font-bold text-slate-100"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN LANDING PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050a16", color: "#f8fafc", overflowX: "hidden" }}>

      {/* ═══════════════════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          ...(scrolled ? {
            background:     "rgba(5,10,22,0.88)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            borderBottom:   "1px solid rgba(255,255,255,0.05)",
            boxShadow:      "0 8px 40px rgba(0,0,0,0.5)",
          } : {
            background: "transparent",
          }),
        }}
      >
        <nav
          style={{
            maxWidth: 1280, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 2rem", height: 68,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", userSelect:"none", flexShrink:0 }}
            aria-label="Trippo AI — Home"
          >
            <span style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              width:36, height:36, borderRadius:11,
              background:"linear-gradient(135deg, #22d3ee, #3b82f6)",
              boxShadow:"0 4px 20px rgba(34,211,238,0.4)",
              color:"#050a16", flexShrink:0,
            }}>
              <LogoMark />
            </span>
            <span style={{ fontFamily:"Outfit, sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.03em", color:"#fff", lineHeight:1 }}>
              Trippo <span style={{ color:"#22d3ee" }}>AI</span>
            </span>
            <span style={{
              fontSize:9, fontWeight:700, color:"rgba(34,211,238,0.7)",
              border:"1px solid rgba(34,211,238,0.2)", borderRadius:999,
              padding:"2px 7px", letterSpacing:"0.14em", textTransform:"uppercase",
              lineHeight:1, display:"inline-flex", alignItems:"center",
            }}>BETA</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ alignItems:"center", gap:32 }}>
            {[["Features","#features"],["How It Works","#how-it-works"],["About","#about"]].map(([label, href]) => (
              <a
                key={label} href={href}
                style={{
                  fontSize:14, fontWeight:500,
                  color:"rgba(148,163,184,0.9)",
                  textDecoration:"none",
                  transition:"color 0.2s ease",
                  position:"relative", padding:"4px 0",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(148,163,184,0.9)"}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems:"center", gap:10 }}>
            <Link
              to="/login"
              style={{
                padding:"9px 18px", borderRadius:10,
                fontSize:14, fontWeight:600,
                color:"rgba(148,163,184,0.9)",
                textDecoration:"none",
                transition:"all 0.2s ease",
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
              display:"flex", alignItems:"center", justifyContent:"center",
              width:40, height:40, borderRadius:10,
              border:"1px solid rgba(255,255,255,0.1)",
              background:"rgba(255,255,255,0.04)",
              color:"#94a3b8", cursor:"pointer",
              transition:"all 0.2s ease",
            }}
          >
            {mobileOpen ? <IcClose /> : <IcMenu />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className="md:hidden"
          style={{
            overflow:"hidden",
            maxHeight: mobileOpen ? 340 : 0,
            transition:"max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div style={{
            background:"rgba(5,10,22,0.97)",
            backdropFilter:"blur(28px)",
            borderTop:"1px solid rgba(255,255,255,0.05)",
            padding:"16px 24px 28px",
            display:"flex", flexDirection:"column", gap:4,
          }}>
            {[["Features","#features"],["How It Works","#how-it-works"],["About","#about"]].map(([label, href]) => (
              <a
                key={label} href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display:"block", padding:"13px 0",
                  fontSize:15, fontWeight:500, color:"#94a3b8",
                  textDecoration:"none",
                  borderBottom:"1px solid rgba(255,255,255,0.04)",
                  transition:"color 0.2s",
                }}
              >
                {label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                display:"block", padding:"13px 0",
                fontSize:15, fontWeight:500, color:"#94a3b8",
                textDecoration:"none",
                borderBottom:"1px solid rgba(255,255,255,0.04)",
              }}
            >
              Log In
            </Link>
            <div style={{ paddingTop:16 }}>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  width:"100%", padding:"15px 24px",
                  borderRadius:14, fontSize:15, fontWeight:700,
                  color:"#050a16", lineHeight:1,
                  background:"linear-gradient(135deg, #22d3ee, #38bdf8 50%, #818cf8)",
                  textDecoration:"none",
                  boxShadow:"0 4px 20px rgba(34,211,238,0.3)",
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
          position:"relative",
          minHeight:"100vh",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          overflow:"hidden",
          background:"#050a16",
        }}
      >
        {/* Cinematic bg image + gradient overlay */}
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop"
            alt="Scenic mountain fjord at sunset"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%" }}
            loading="eager"
          />
          {/* Multi-layer gradient for cinematic depth */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(5,10,22,0.55) 0%, rgba(5,10,22,0.35) 40%, #050a16 100%)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(5,10,22,0.4), transparent 50%, rgba(5,10,22,0.4))" }} />
          {/* Vignette */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, transparent 30%, rgba(5,10,22,0.7) 100%)" }} />
        </div>

        {/* Aurora glow blobs */}
        <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }} aria-hidden="true">
          <div className="animate-aurora" style={{
            position:"absolute", top:"20%", left:"5%",
            width:700, height:500, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
            filter:"blur(60px)",
          }} />
          <div className="animate-aurora delay-400" style={{
            position:"absolute", bottom:"20%", right:"10%",
            width:500, height:400, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)",
            filter:"blur(60px)",
          }} />
        </div>

        {/* Noise texture */}
        <div className="noise-overlay" style={{ zIndex:2 }} aria-hidden="true" />

        {/* Hero content */}
        <div
          style={{
            position:"relative", zIndex:10,
            width:"100%", maxWidth:920,
            margin:"0 auto",
            padding:"7rem 1.5rem 3rem",
            display:"flex", flexDirection:"column",
            alignItems:"center", gap:32,
            textAlign:"center",
          }}
        >
          {/* Live badge */}
          <div className="badge-live animate-fade-in-up">
            <span className="dot" aria-hidden="true" />
            Powered by Gemini AI
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up delay-100"
            style={{
              margin:0,
              fontSize:"clamp(2.4rem,5.5vw,5rem)",
              fontWeight:900,
              letterSpacing:"-0.04em",
              color:"#fff",
              lineHeight:1.06,
              textShadow:"0 2px 32px rgba(0,0,0,0.6)",
              fontFamily:"Outfit, Inter, sans-serif",
            }}
          >
            AI-Powered Itineraries.
            <br />
            <span className="text-shimmer">Curated For Your</span>
            <br />
            Next Adventure.
          </h1>

          {/* Subheadline */}
          <p
            className="animate-fade-in-up delay-200"
            style={{
              margin:0,
              fontSize:"clamp(1rem,1.8vw,1.2rem)",
              color:"rgba(203,213,225,0.82)",
              lineHeight:1.7,
              maxWidth:580,
            }}
          >
            Tell Trippo AI your dream trip details, and we'll craft the perfect,{" "}
            <strong style={{ fontWeight:600, color:"#fff" }}>geographically clustered</strong>{" "}
            itinerary in seconds. Personalized and optimized.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-in-up delay-300"
            style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:12 }}
          >
            <PrimaryLink to="/login" lg>
              Start Planning Free <IcArrow />
            </PrimaryLink>
            <GhostAnchor href="#features" lg>See How It Works</GhostAnchor>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-in-up delay-400"
            style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              flexWrap:"wrap", gap:"16px 48px",
              marginTop:4,
            }}
          >
            {STATS.map(({ val, label, icon }) => (
              <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:20 }}>{icon}</span>
                  <span style={{
                    fontSize:"clamp(1.5rem,2.8vw,2.2rem)",
                    fontWeight:900, color:"#fff", lineHeight:1,
                    fontFamily:"Outfit, sans-serif",
                  }}>{val}</span>
                </div>
                <span style={{ fontSize:11, color:"rgba(100,116,139,0.9)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating destination cards */}
        <div
          className="hidden lg:flex animate-fade-in-up delay-500"
          style={{
            position:"absolute", bottom:60, left:"50%",
            transform:"translateX(-50%)",
            gap:16, zIndex:10,
          }}
          aria-label="Sample AI-generated itinerary destinations"
        >
          {DESTINATIONS.map((d, i) => (
            <DestinationCard
              key={d.name}
              {...d}
              style={{
                animation:`float-slow ${14 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:"absolute", bottom:24,
          left:"50%", transform:"translateX(-50%)",
          zIndex:10, display:"flex", flexDirection:"column",
          alignItems:"center", gap:6,
          opacity:0.4,
        }} className="animate-float-slow">
          <span style={{ fontSize:9, color:"#94a3b8", letterSpacing:"0.22em", textTransform:"uppercase" }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" style={{ position:"relative", background:"#080c18", padding:"100px 0" }}>
        <div className="separator-cyan" style={{ position:"absolute", top:0, left:0, right:0 }} aria-hidden="true" />

        {/* Background glow */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }} aria-hidden="true">
          <div style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            width:800, height:600, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
            filter:"blur(60px)",
          }} />
        </div>

        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>

          {/* Section header */}
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <p style={{
              fontSize:11, fontWeight:700, color:"rgba(34,211,238,0.75)",
              letterSpacing:"0.28em", textTransform:"uppercase",
              marginBottom:16, lineHeight:1,
            }}>
              Why Trippo AI
            </p>
            <h2 style={{
              fontSize:"clamp(1.875rem,3.5vw,3rem)",
              fontWeight:900, letterSpacing:"-0.04em",
              color:"#fff", lineHeight:1.08,
              marginBottom:16,
              fontFamily:"Outfit, sans-serif",
            }}>
              Everything Your Trip <span className="text-shimmer">Deserves</span>
            </h2>
            <p style={{
              fontSize:"clamp(0.95rem,1.5vw,1.1rem)",
              color:"#64748b", lineHeight:1.7,
              maxWidth:480, margin:"0 auto",
            }}>
              Built with real engineering discipline. No fluff—just smart, reliable travel planning.
            </p>
          </div>

          {/* 4-column grid */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",
            gap:24,
          }}>
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>

          {/* Bottom CTA */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, marginTop:80 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {[0,1,2,3,4].map(i => (
                <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="#f59e0b" aria-hidden="true">
                  <path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z"/>
                </svg>
              ))}
              <span style={{ fontSize:13, color:"#64748b", marginLeft:4 }}>Loved by 3,200+ travelers</span>
            </div>
            <PrimaryLink to="/register" lg>Start Your Journey ✨</PrimaryLink>
            <p style={{ fontSize:12, color:"#334155" }}>No credit card required · Free to start</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ position:"relative", background:"#050a16", padding:"100px 0" }}>
        <div className="separator-indigo" style={{ position:"absolute", top:0, left:0, right:0 }} aria-hidden="true" />

        {/* Aurora background */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }} aria-hidden="true">
          <div className="animate-float-slow" style={{
            position:"absolute", bottom:0, right:"-10%",
            width:600, height:500, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
            filter:"blur(60px)",
          }} />
        </div>

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 2rem" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <p style={{
              fontSize:11, fontWeight:700, color:"rgba(129,140,248,0.75)",
              letterSpacing:"0.28em", textTransform:"uppercase",
              marginBottom:16, lineHeight:1,
            }}>
              How It Works
            </p>
            <h2 style={{
              fontSize:"clamp(1.875rem,3.5vw,3rem)",
              fontWeight:900, letterSpacing:"-0.04em",
              color:"#fff", lineHeight:1.08,
              fontFamily:"Outfit, sans-serif",
            }}>
              From Idea to Itinerary{" "}
              <span className="text-shimmer">in Seconds</span>
            </h2>
          </div>

          {/* Steps */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",
            gap:32,
          }}>
            {STEPS.map((step, i) => (
              <StepCard key={step.n} {...step} isLast={i === STEPS.length - 1} />
            ))}
          </div>

          {/* Bottom CTA link */}
          <div style={{ textAlign:"center", marginTop:72 }}>
            <Link
              to="/register"
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontSize:15, fontWeight:700,
                color:"#22d3ee",
                textDecoration:"none",
                transition:"all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.gap="12px"; }}
              onMouseLeave={e => { e.currentTarget.style.gap="8px"; }}
            >
              Get started for free <IcArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA / ABOUT BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" style={{ position:"relative", background:"#080c18", padding:"100px 0" }}>
        <div className="separator-cyan" style={{ position:"absolute", top:0, left:0, right:0 }} aria-hidden="true" />

        {/* Mesh gradient background */}
        <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }} aria-hidden="true">
          <div className="animate-aurora" style={{
            position:"absolute", top:"-20%", left:"-10%",
            width:800, height:600, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
            filter:"blur(80px)",
          }} />
          <div className="animate-aurora delay-400" style={{
            position:"absolute", bottom:"-20%", right:"-10%",
            width:700, height:600, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
            filter:"blur(80px)",
          }} />
        </div>

        {/* Noise */}
        <div className="noise-overlay" aria-hidden="true" />

        <div style={{
          maxWidth:780, margin:"0 auto",
          padding:"0 2rem",
          position:"relative", zIndex:1,
          display:"flex", flexDirection:"column",
          alignItems:"center", textAlign:"center", gap:28,
        }}>
          {/* Live badge */}
          <div className="badge-live">
            <span className="dot" aria-hidden="true" />
            Now in Beta — Free Access
          </div>

          <h2 style={{
            fontSize:"clamp(1.75rem,3.5vw,3rem)",
            fontWeight:900, letterSpacing:"-0.04em",
            color:"#fff", lineHeight:1.08, margin:0,
            fontFamily:"Outfit, sans-serif",
          }}>
            Plan Your Next Adventure
            <br />
            <span className="text-shimmer">With AI Precision</span>
          </h2>

          <p style={{
            fontSize:"clamp(0.95rem,1.5vw,1.1rem)",
            color:"#64748b", lineHeight:1.7,
            margin:0, maxWidth:520,
          }}>
            Join thousands of travelers who've already transformed how they plan trips.
            Create your free account today.
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <PrimaryLink to="/register" lg>Create Free Account <IcArrow /></PrimaryLink>
            <GhostAnchor href="#features" lg>Explore Features</GhostAnchor>
          </div>

          {/* Trust checkmarks */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px 28px", justifyContent:"center" }}>
            {TRUST_ITEMS.map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#475569" }}>
                <span style={{ color:"#22d3ee" }}><IcCheck /></span>
                {t}
              </div>
            ))}
          </div>

          {/* Trust logos / social proof */}
          <div style={{
            display:"flex", alignItems:"center", gap:6,
            padding:"12px 24px", borderRadius:999,
            border:"1px solid rgba(255,255,255,0.06)",
            background:"rgba(255,255,255,0.02)",
            marginTop:8,
          }}>
            {/* Avatar stack */}
            <div style={{ display:"flex", marginRight:8 }}>
              {["🧑","👩","👨","🧑‍💻","👩‍💼"].map((emoji, i) => (
                <span key={i} style={{
                  width:28, height:28, borderRadius:"50%",
                  background:`hsl(${i * 60}, 60%, 20%)`,
                  border:"2px solid #080c18",
                  marginLeft: i === 0 ? 0 : -8,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, position:"relative", zIndex: 5-i,
                }}>
                  {emoji}
                </span>
              ))}
            </div>
            <span style={{ fontSize:13, color:"#64748b" }}>
              <span style={{ color:"#94a3b8", fontWeight:600 }}>3,200+ travelers</span> already planning smarter
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background:"#030710",
        borderTop:"1px solid rgba(255,255,255,0.04)",
        padding:"40px 2rem 28px",
      }}>
        <div style={{
          maxWidth:1280, margin:"0 auto",
        }}>
          {/* Top row */}
          <div style={{
            display:"flex", flexWrap:"wrap",
            alignItems:"flex-start", justifyContent:"space-between",
            gap:32, marginBottom:40,
          }}>
            {/* Brand */}
            <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:280 }}>
              <Link to="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                <span style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  width:30, height:30, borderRadius:9,
                  background:"linear-gradient(135deg, #22d3ee, #3b82f6)",
                  color:"#030710",
                }}>
                  <LogoMark />
                </span>
                <span style={{ fontFamily:"Outfit,sans-serif", fontSize:16, fontWeight:800, color:"#64748b", letterSpacing:"-0.02em" }}>
                  Trippo <span style={{ color:"#22d3ee" }}>AI</span>
                </span>
              </Link>
              <p style={{ fontSize:13, color:"#334155", lineHeight:1.6, margin:0 }}>
                Deep-engineered AI travel itineraries built around your real-world constraints.
              </p>
            </div>

            {/* Links */}
            <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#475569", letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>Product</p>
                {["Features","How It Works","Pricing"].map(l => (
                  <a key={l} href="#" style={{ fontSize:13, color:"#334155", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#64748b"}
                    onMouseLeave={e => e.currentTarget.style.color="#334155"}
                  >{l}</a>
                ))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#475569", letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>Legal</p>
                {["Privacy","Terms","Contact"].map(l => (
                  <a key={l} href="#" style={{ fontSize:13, color:"#334155", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#64748b"}
                    onMouseLeave={e => e.currentTarget.style.color="#334155"}
                  >{l}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="separator-subtle" aria-hidden="true" />
          <div style={{
            display:"flex", flexWrap:"wrap",
            alignItems:"center", justifyContent:"space-between",
            gap:12, paddingTop:24,
          }}>
            <p style={{ fontSize:12, color:"#1e293b", margin:0 }}>© 2026 Trippo AI. All rights reserved.</p>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:12, color:"#1e293b" }}>Made with</span>
              <span style={{ fontSize:12 }}>💙</span>
              <span style={{ fontSize:12, color:"#1e293b" }}>and Gemini AI</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
