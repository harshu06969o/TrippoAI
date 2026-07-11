import React, { useState } from "react";
import { generateTripAPI } from "../services/trip.api";
import { useNavigate } from "react-router";

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════════════════ */
const LogoMark = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M16.5 7.5l-2.89 5.78L8 16.5l2.89-5.78L16.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const IconDestination = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10 3C6.686 3 4 5.686 4 9c0 4.5 6 9.5 6 9.5s6-5 6-9.5C16 5.686 13.314 3 10 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 8h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7 3v2M13 3v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="7" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="11" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
  </svg>
);

const IconPeople = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.5 17C2.5 13.962 4.962 11.5 8 11.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M17.5 17c0-2.485-1.567-4.5-3.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconWallet = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2 9h16" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5 3l12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="14.5" cy="13" r="1.5" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcMinus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IcPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   BUDGET OPTIONS DATA
═══════════════════════════════════════════════════════════════════════════ */
const BUDGET_OPTIONS = [
  {
    value: "Cheap",
    label: "Budget",
    sub: "Hostels & Public Transit",
    emoji: "🎒",
    color: "#10b981",
    desc: "Smart savings",
  },
  {
    value: "Moderate",
    label: "Standard",
    sub: "Mid-Range Stays",
    emoji: "🏨",
    color: "#22d3ee",
    desc: "Best value",
    recommended: true,
  },
  {
    value: "Luxury",
    label: "Luxury",
    sub: "Premium Resorts",
    emoji: "✨",
    color: "#f59e0b",
    desc: "No compromise",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   STEPPER INPUT COMPONENT (+/- buttons)
═══════════════════════════════════════════════════════════════════════════ */
const Stepper = ({ id, name, value, min, max, onChange }) => {
  const numVal = parseInt(value, 10) || min;

  const decrement = () => {
    if (numVal > min) {
      onChange({ target: { name, value: String(numVal - 1) } });
    }
  };
  const increment = () => {
    if (!max || numVal < max) {
      onChange({ target: { name, value: String(numVal + 1) } });
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <button
        type="button"
        onClick={decrement}
        disabled={numVal <= min}
        style={{
          width: 48, height: 54,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "12px 0 0 12px",
          border: "1.5px solid rgba(51,65,85,0.6)",
          borderRight: "none",
          background: "rgba(8,14,28,0.8)",
          color: numVal <= min ? "#334155" : "#94a3b8",
          cursor: numVal <= min ? "not-allowed" : "pointer",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={e => { if (numVal > min) e.currentTarget.style.color = "#22d3ee"; }}
        onMouseLeave={e => e.currentTarget.style.color = numVal <= min ? "#334155" : "#94a3b8"}
      >
        <IcMinus />
      </button>

      <input
        id={id}
        name={name}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{
          width: 72, height: 54,
          textAlign: "center",
          border: "1.5px solid rgba(51,65,85,0.6)",
          borderLeft: "none", borderRight: "none",
          background: "rgba(8,14,28,0.8)",
          color: "#f1f5f9",
          fontSize: 18, fontWeight: 700,
          fontFamily: "Outfit, sans-serif",
          outline: "none",
          MozAppearance: "textfield",
          WebkitAppearance: "none",
        }}
      />

      <button
        type="button"
        onClick={increment}
        disabled={max && numVal >= max}
        style={{
          width: 48, height: 54,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "0 12px 12px 0",
          border: "1.5px solid rgba(51,65,85,0.6)",
          borderLeft: "none",
          background: "rgba(8,14,28,0.8)",
          color: max && numVal >= max ? "#334155" : "#94a3b8",
          cursor: max && numVal >= max ? "not-allowed" : "pointer",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={e => { if (!max || numVal < max) e.currentTarget.style.color = "#22d3ee"; }}
        onMouseLeave={e => e.currentTarget.style.color = max && numVal >= max ? "#334155" : "#94a3b8"}
      >
        <IcPlus />
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   FORM FIELD WRAPPER
═══════════════════════════════════════════════════════════════════════════ */
const FormField = ({ icon, label, htmlFor, children, hint }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <label
      htmlFor={htmlFor}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        fontSize: 12, fontWeight: 700,
        color: "#475569",
        textTransform: "uppercase", letterSpacing: "0.14em",
      }}
    >
      <span style={{ color: "#22d3ee", flexShrink: 0 }}>{icon}</span>
      {label}
    </label>
    {children}
    {hint && (
      <p style={{ fontSize: 12, color: "#334155", margin: 0, lineHeight: 1.5 }}>{hint}</p>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   TRIP FORM — MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const TripForm = () => {
  const navigate = useNavigate();

  /* ── ALL ORIGINAL LOGIC — ZERO MUTATIONS ─────────────────────────── */
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [formData, setFormData] = useState({
    destination: "",
    days:        1,
    budget:      "Moderate",
    travelers:   1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await generateTripAPI(formData);
      if (data?.trip?._id) {
        navigate(`/trip/${data.trip._id}`);
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError(err.response?.data?.message || "Failed to engineer your trip itinerary.");
    } finally {
      setLoading(false);
    }
  };
  /* ──────────────────────────────────────────────────────────────────── */

  /* ── AI generating loading state ──────────────────────────────────── */
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#050a16",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: 24, position: "relative", overflow: "hidden",
      }}>

        {/* Ambient glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
          <div className="animate-aurora" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 900, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
          <div className="animate-float-slow delay-300" style={{
            position: "absolute", top: 0, right: 0,
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
        </div>

        {/* Noise */}
        <div className="noise-overlay" aria-hidden="true" />

        <div
          className="animate-fade-in-up"
          style={{
            position: "relative", zIndex: 10,
            width: "100%", maxWidth: 520,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 36,
            textAlign: "center",
          }}
        >
          {/* Status badge */}
          <div className="badge-live">
            <span className="dot" aria-hidden="true" />
            AI Agent Working
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(1.75rem,4vw,2.5rem)",
              fontWeight: 900, letterSpacing: "-0.04em",
              color: "#f8fafc", margin: 0,
            }}>
              Engineering Your{" "}
              <span className="text-shimmer">Itinerary</span>
            </h2>
            <p style={{ fontSize: 14, color: "#475569", maxWidth: 360, lineHeight: 1.65, margin: "0 auto" }}>
              Analysing geography, clustering locations, and fetching realistic travel data…
            </p>
          </div>

          {/* Multi-ring spinner */}
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.04)" }} />
            <div className="animate-spin" style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#22d3ee",
              borderRightColor: "rgba(34,211,238,0.3)",
            }} />
            <div className="animate-spin" style={{
              position: "absolute", inset: 10, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "rgba(129,140,248,0.6)",
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }} />
            <div className="animate-spin" style={{
              position: "absolute", inset: 22, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "rgba(245,158,11,0.5)",
              animationDuration: "1.5s",
            }} />
            <div className="animate-glow-pulse" style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 12, height: 12, borderRadius: "50%",
              background: "#22d3ee",
              boxShadow: "0 0 20px rgba(34,211,238,1)",
            }} />
          </div>

          {/* AI steps */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "📍", text: "Clustering nearby attractions…", delay: 0 },
              { icon: "🗓️", text: "Scheduling optimal day flow…",  delay: 0.5 },
              { icon: "💰", text: "Matching your budget tier…",    delay: 1 },
              { icon: "✨", text: "Finalizing your perfect plan…", delay: 1.5 },
            ].map((step, i) => (
              <div
                key={i}
                className="glass-surface animate-slide-up"
                style={{
                  borderRadius: 14,
                  padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: 14,
                  animationDelay: `${step.delay}s`,
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
                <div style={{ flex: 1, height: 2, borderRadius: 999, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, #22d3ee, #818cf8)",
                      borderRadius: 999,
                      width: "60%",
                      animation: `float-slow ${3 + i * 0.5}s ease-in-out ${step.delay}s infinite`,
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: "#475569", whiteSpace: "nowrap" }}>{step.text}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, color: "#1e293b", letterSpacing: "0.05em" }}>
            Powered by Gemini AI · Results in ~10–20 seconds
          </p>
        </div>
      </div>
    );
  }

  /* ── Main form ────────────────────────────────────────────────────── */
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a16",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>

      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        <div className="animate-aurora" style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 900, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div className="animate-float-slow delay-300" style={{
          position: "absolute", top: 0, right: "-5%",
          width: 450, height: 450, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div className="animate-float-slow delay-500" style={{
          position: "absolute", bottom: 0, left: "-5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.012, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* Noise */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <nav style={{
        position: "relative", zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        height: 68,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(5,10,22,0.6)",
        backdropFilter: "blur(20px)",
      }}>
        <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", userSelect: "none" }}>
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 30, height: 30, borderRadius: 9,
            background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            boxShadow: "0 4px 14px rgba(34,211,238,0.35)",
            color: "#050a16", flexShrink: 0,
          }}>
            <LogoMark />
          </span>
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
            Trippo <span style={{ color: "#22d3ee" }}>AI</span>
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="hidden md:block" style={{
            fontSize: 13, fontWeight: 600, color: "#475569",
            cursor: "pointer", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
            onMouseLeave={e => e.currentTarget.style.color = "#475569"}
          >
            My Trips
          </span>
          <div
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
              color: "#475569",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)"; e.currentTarget.style.color = "#22d3ee"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#475569"; }}
          >
            <IconUser />
          </div>
        </div>
      </nav>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main style={{
        position: "relative", zIndex: 10,
        flex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "56px 24px 80px",
      }}>

        {/* Page header */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 16,
            textAlign: "center", marginBottom: 56,
            maxWidth: 640,
          }}
        >
          <div className="badge-live">
            <span className="dot" aria-hidden="true" />
            AI Trip Planner
          </div>

          <h1 style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(2.2rem,5vw,3.75rem)",
            fontWeight: 900, letterSpacing: "-0.04em",
            color: "#f8fafc", lineHeight: 1.05, margin: 0,
          }}>
            Plan Your Next{" "}
            <span className="text-shimmer">Adventure</span>
          </h1>

          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
            Deep-engineered AI itineraries based on real-world constraints —
            budget, pace, and preference included.
          </p>
        </div>

        {/* ── Glassmorphic form card ────────────────────────────────── */}
        <div
          className="animate-scale-in w-full"
          style={{ maxWidth: 680, animationDelay: "0.1s" }}
        >
          <div
            className="glass-card"
            style={{ borderRadius: 32, overflow: "hidden" }}
          >
            {/* Top gradient line */}
            <div style={{
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(34,211,238,0.7), rgba(129,140,248,0.4), transparent)",
            }} aria-hidden="true" />

            <div style={{ position: "relative", padding: "44px 40px" }}>

              {/* Error banner */}
              {error && (
                <div style={{
                  marginBottom: 28,
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "16px 18px", borderRadius: 14,
                  border: "1px solid rgba(244,63,94,0.22)",
                  background: "rgba(244,63,94,0.07)",
                }}>
                  <svg style={{ marginTop: 1, width: 16, height: 16, color: "#f43f5e", flexShrink: 0 }} viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                    <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontSize: 13, color: "#fb7185", lineHeight: 1.45, margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 36 }}>

                {/* ── Destination ─────────────────────────────────── */}
                <FormField
                  icon={<IconDestination />}
                  label="Where to?"
                  htmlFor="destination"
                  hint="Try: Kyoto, Japan  ·  Goa, India  ·  Paris, France  ·  New York, USA"
                >
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      required
                      placeholder="Enter your dream destination…"
                      value={formData.destination}
                      onChange={handleChange}
                      className="input-premium"
                      style={{ height: 60, fontSize: 16, paddingLeft: 52 }}
                    />
                    <span style={{
                      position: "absolute", left: 18, top: "50%",
                      transform: "translateY(-50%)",
                      color: "#22d3ee", opacity: 0.7,
                      pointerEvents: "none",
                    }}>
                      <IconDestination />
                    </span>
                  </div>
                </FormField>

                {/* ── Days + Travelers ─────────────────────────────── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="sm:grid-cols-2">

                  <FormField icon={<IconCalendar />} label="Duration" htmlFor="days">
                    <Stepper
                      id="days"
                      name="days"
                      value={formData.days || 1}
                      min={1}
                      max={15}
                      onChange={handleChange}
                    />
                    <p style={{ fontSize: 11, color: "#334155", margin: 0 }}>Max 15 days</p>
                  </FormField>

                  <FormField icon={<IconPeople />} label="Travelers" htmlFor="travelers">
                    <Stepper
                      id="travelers"
                      name="travelers"
                      value={formData.travelers}
                      min={1}
                      onChange={handleChange}
                    />
                    <p style={{ fontSize: 11, color: "#334155", margin: 0 }}>Solo or group</p>
                  </FormField>
                </div>

                {/* ── Budget tier ──────────────────────────────────── */}
                <FormField icon={<IconWallet />} label="Budget Tier" htmlFor="budget">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {BUDGET_OPTIONS.map((opt) => {
                      const selected = formData.budget === opt.value;
                      return (
                        <label
                          key={opt.value}
                          htmlFor={`budget-${opt.value}`}
                          style={{
                            position: "relative",
                            display: "flex", flexDirection: "column",
                            alignItems: "center", gap: 10,
                            padding: "18px 12px 14px",
                            borderRadius: 18,
                            border: `1.5px solid ${selected ? `${opt.color}55` : "rgba(51,65,85,0.5)"}`,
                            background: selected ? `${opt.color}10` : "rgba(8,14,28,0.6)",
                            cursor: "pointer",
                            transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
                            boxShadow: selected ? `0 0 24px ${opt.color}18` : "none",
                          }}
                          onMouseEnter={e => {
                            if (!selected) {
                              e.currentTarget.style.borderColor = `${opt.color}35`;
                              e.currentTarget.style.background = `${opt.color}06`;
                            }
                          }}
                          onMouseLeave={e => {
                            if (!selected) {
                              e.currentTarget.style.borderColor = "rgba(51,65,85,0.5)";
                              e.currentTarget.style.background = "rgba(8,14,28,0.6)";
                            }
                          }}
                        >
                          <input
                            type="radio"
                            id={`budget-${opt.value}`}
                            name="budget"
                            value={opt.value}
                            checked={selected}
                            onChange={handleChange}
                            className="sr-only"
                          />

                          {/* Selected indicator */}
                          {selected && (
                            <span style={{
                              position: "absolute", top: 10, right: 10,
                              width: 18, height: 18, borderRadius: "50%",
                              background: opt.color,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              boxShadow: `0 0 10px ${opt.color}70`,
                            }}>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="#050a16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}

                          {/* Recommended badge */}
                          {opt.recommended && (
                            <span style={{
                              position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
                              fontSize: 9, fontWeight: 800,
                              background: opt.color,
                              color: "#050a16",
                              padding: "2px 8px", borderRadius: 999,
                              letterSpacing: "0.1em", textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}>
                              Popular
                            </span>
                          )}

                          <span style={{ fontSize: 28, lineHeight: 1 }}>{opt.emoji}</span>
                          <div style={{ textAlign: "center" }}>
                            <p style={{
                              fontSize: 13, fontWeight: 800,
                              color: selected ? opt.color : "#94a3b8",
                              margin: 0, lineHeight: 1.2,
                              fontFamily: "Outfit, sans-serif",
                            }}>{opt.label}</p>
                            <p style={{ fontSize: 10, color: "#334155", margin: "3px 0 0", lineHeight: 1.3 }}>{opt.sub}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* Hidden native select for form submission fallback */}
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="sr-only"
                  >
                    <option value="Cheap">Cheap</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </FormField>

                {/* ── Submit CTA ───────────────────────────────────── */}
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
                  <button
                    type="submit"
                    className="btn-submit"
                    style={{ height: 62, fontSize: 17, borderRadius: 18 }}
                  >
                    <span className="btn-hover-overlay" aria-hidden="true" />
                    <span className="btn-label" style={{ gap: 12 }}>
                      <span style={{ fontSize: 22, lineHeight: 1 }}>✨</span>
                      Generate My Itinerary
                    </span>
                  </button>

                  <p style={{ textAlign: "center", fontSize: 12, color: "#1e293b", margin: 0 }}>
                    Powered by Gemini AI &nbsp;·&nbsp;
                    <span style={{ color: "#334155" }}>Results in ~10–20 seconds</span>
                  </p>
                </div>

              </form>
            </div>

            {/* Bottom gradient line */}
            <div style={{
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(129,140,248,0.3), transparent)",
            }} aria-hidden="true" />
          </div>
        </div>

        {/* Trust badges below form */}
        <div
          className="animate-fade-in-up delay-300"
          style={{
            display: "flex", flexWrap: "wrap", gap: "10px 28px",
            justifyContent: "center", marginTop: 32,
          }}
        >
          {["🔒 Secure & Private","⚡ No credit card required","🌍 180+ destinations"].map(t => (
            <span key={t} style={{ fontSize: 12, color: "#334155", display: "flex", alignItems: "center", gap: 6 }}>
              {t}
            </span>
          ))}
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={{
        position: "relative", zIndex: 10,
        padding: "20px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <p style={{ fontSize: 12, color: "#1e293b", margin: 0 }}>© 2026 Trippo AI. All rights reserved.</p>
        <div style={{ display: "flex", gap: 20, fontSize: 12, color: "#1e293b" }}>
          {["Privacy","Terms"].map(l => (
            <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#475569"}
              onMouseLeave={e => e.currentTarget.style.color = "#1e293b"}
            >{l}</a>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default TripForm;