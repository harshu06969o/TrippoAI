import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTripByIdAPI } from "../services/trip.api";

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

const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   STAT PILL
═══════════════════════════════════════════════════════════════════════════ */
const StatPill = ({ emoji, label, color = "#22d3ee" }) => (
  <span
    className="glass-surface print:bg-slate-100 print:border-slate-200 print:text-black"
    style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "12px 22px", borderRadius: 999,
      border: `1px solid ${color}25`,
      boxShadow: `0 0 20px ${color}10`,
    }}
  >
    <span style={{ fontSize: 20 }}>{emoji}</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", fontFamily: "Outfit, sans-serif" }}>
      {label}
    </span>
  </span>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ACTIVITY CARD
═══════════════════════════════════════════════════════════════════════════ */
const ActivityCard = ({ act, actIdx }) => (
  <div
    className="glass-surface print:bg-slate-50 print:border-slate-200 print:shadow-none group"
    style={{
      borderRadius: 24,
      padding: "28px 32px",
      display: "flex", flexDirection: "column", gap: 16,
      transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      cursor: "default",
      animationDelay: `${actIdx * 0.08}s`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(34,211,238,0.28)";
      e.currentTarget.style.boxShadow = "0 0 50px rgba(34,211,238,0.07)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "";
      e.currentTarget.style.boxShadow = "";
      e.currentTarget.style.transform = "";
    }}
  >
    {/* Time badge */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px", borderRadius: 10,
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(34,211,238,0.2)",
        color: "#22d3ee",
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
      }} className="print:bg-white print:text-slate-800 print:border-slate-300">
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#22d3ee",
          boxShadow: "0 0 8px rgba(34,211,238,0.8)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }} className="print:hidden" />
        {act.time || "Scheduled"}
      </span>

      {/* Activity number */}
      <span style={{
        fontSize: 11, fontWeight: 700, color: "#334155",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        Stop {actIdx + 1}
      </span>
    </div>

    {/* Place name */}
    <h3
      style={{
        fontFamily: "Outfit, sans-serif",
        fontSize: "clamp(1.2rem,2.5vw,1.6rem)",
        fontWeight: 800, color: "#f1f5f9",
        lineHeight: 1.25, margin: 0,
        letterSpacing: "-0.02em",
        transition: "color 0.3s",
      }}
      className="print:text-black group-hover:text-white"
    >
      {act.placeName}
    </h3>

    {/* Description */}
    <p
      style={{
        fontSize: 15, color: "#64748b",
        lineHeight: 1.7, margin: 0,
        transition: "color 0.3s",
      }}
      className="print:text-slate-700 group-hover:text-slate-400"
    >
      {act.details}
    </p>

    {/* Cost badge */}
    {act.ticketPrice && (
      <div
        style={{
          marginTop: 8, paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", gap: 12,
        }}
        className="print:border-slate-200"
      >
        <span style={{ fontSize: 20 }}>💰</span>
        <div>
          <span style={{ fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
            Estimated Cost
          </span>
          <p style={{
            fontSize: 16, fontWeight: 800, color: "#e2e8f0",
            margin: "2px 0 0", letterSpacing: "-0.01em",
            fontFamily: "Outfit, sans-serif",
          }} className="print:text-black">
            {act.ticketPrice}
          </p>
        </div>
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   DAY SECTION (timeline segment)
═══════════════════════════════════════════════════════════════════════════ */
const DaySection = ({ dayItem, dayIdx, totalDays }) => {
  const isLast = dayIdx === totalDays - 1;

  return (
    <div
      className="animate-fade-in-up print:break-inside-avoid"
      style={{
        display: "flex", flexDirection: "column", gap: 0,
        animationDelay: `${dayIdx * 0.1}s`,
      }}
    >
      {/* Day header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 20,
        marginBottom: 32,
        position: "relative",
      }}>
        {/* Day orb */}
        <div style={{
          width: 72, height: 72, borderRadius: 20, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(129,140,248,0.1))",
          border: "1.5px solid rgba(34,211,238,0.3)",
          boxShadow: "0 0 30px rgba(34,211,238,0.12)",
        }} className="print:bg-slate-100 print:border-slate-300 print:shadow-none">
          <span style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 10, fontWeight: 700, color: "rgba(34,211,238,0.7)",
            letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1,
          }}>Day</span>
          <span style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 28, fontWeight: 900, color: "#22d3ee",
            lineHeight: 1.1,
          }} className="print:text-slate-800">
            {dayItem.day || dayIdx + 1}
          </span>
        </div>

        {/* Connector line to next day */}
        {!isLast && (
          <div style={{
            position: "absolute",
            left: 35, top: 72, bottom: -32,
            width: 2,
            background: "linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(129,140,248,0.1), transparent)",
            zIndex: 0,
          }} className="print:hidden" aria-hidden="true" />
        )}

        {/* Day theme text */}
        <div>
          <h2 style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(1.4rem,3vw,2rem)",
            fontWeight: 900, color: "#f1f5f9",
            lineHeight: 1.2, margin: 0,
            letterSpacing: "-0.03em",
          }} className="print:text-black">
            {dayItem.theme || "Today's Itinerary"}
          </h2>
          {dayItem.activities?.length > 0 && (
            <p style={{ fontSize: 13, color: "#475569", margin: "4px 0 0" }}>
              {dayItem.activities.length} {dayItem.activities.length === 1 ? "activity" : "activities"} planned
            </p>
          )}
        </div>
      </div>

      {/* Activity cards — with left-indent for timeline feel (removed in print) */}
      {Array.isArray(dayItem.activities) ? (
        <div className="print-activity-list" style={{
          display: "flex", flexDirection: "column", gap: 16,
          paddingLeft: 92, // aligns with right edge of orb on screen
        }}>
          {dayItem.activities.map((act, actIdx) => (
            <ActivityCard key={actIdx} act={act} actIdx={actIdx} />
          ))}
        </div>
      ) : (
        <div
          className="glass-surface print-activity-list"
          style={{
            marginLeft: 92, padding: "28px 32px",
            borderRadius: 20, textAlign: "center",
          }}
        >
          <p style={{ fontSize: 15, color: "#475569", fontStyle: "italic" }}>
            No activities planned for this day.
          </p>
        </div>
      )}

      {/* Gap spacer between days */}
      {!isLast && <div style={{ height: 56 }} />}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   TRIP DETAILS — MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const TripDetails = () => {
  /* ── ALL ORIGINAL LOGIC — ZERO MUTATIONS ───────────────────────────────── */
  const { id } = useParams();
  const [trip, setTrip]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const data = await getTripByIdAPI(id);
        setTrip(data.trip || data);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Could not load itinerary details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTripDetails();
    }
  }, [id]);
  /* ──────────────────────────────────────────────────────────────────────── */

  /* ── Loading state ──────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{
        position: "relative", minHeight: "100vh",
        background: "#050a16",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
          <div className="animate-aurora" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 900, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
          <div className="animate-float-slow delay-300" style={{
            position: "absolute", top: 0, right: 0,
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
        </div>
        <div
          className="animate-fade-in-up"
          style={{
            position: "relative", zIndex: 10,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 28, textAlign: "center",
          }}
        >
          {/* Multi-ring spinner */}
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.04)" }} />
            <div className="animate-spin" style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#22d3ee", borderRightColor: "rgba(34,211,238,0.3)",
            }} />
            <div className="animate-spin" style={{
              position: "absolute", inset: 10, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "rgba(129,140,248,0.6)",
              animationDirection: "reverse", animationDuration: "0.8s",
            }} />
            <div className="animate-glow-pulse" style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 10, height: 10, borderRadius: "50%",
              background: "#22d3ee", boxShadow: "0 0 16px rgba(34,211,238,0.9)",
            }} />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>
              Packing your bags…
            </p>
            <p style={{ fontSize: 11, color: "#334155", letterSpacing: "0.2em", textTransform: "uppercase", margin: "6px 0 0" }}>
              Loading Itinerary
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Error state ────────────────────────────────────────────────────────── */
  if (error || !trip) {
    return (
      <div style={{
        position: "relative", minHeight: "100vh",
        background: "#050a16",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 700, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
        </div>
        <div
          className="animate-fade-in-up"
          style={{
            position: "relative", zIndex: 10,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 20, textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(244,63,94,0.1)",
            border: "1px solid rgba(244,63,94,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32,
          }}>
            ⚠️
          </div>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#fb7185", margin: 0, fontFamily: "Outfit, sans-serif" }}>
              {error || "Trip not found"}
            </p>
            <p style={{ fontSize: 14, color: "#475569", margin: "8px 0 0" }}>
              Try refreshing or planning a new trip.
            </p>
          </div>
          <a
            href="/"
            style={{
              marginTop: 8,
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              fontSize: 14, fontWeight: 600, color: "#94a3b8",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)"; e.currentTarget.style.color = "#22d3ee"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94a3b8"; }}
          >
            ← Plan a new trip
          </a>
        </div>
      </div>
    );
  }

  /* ── Main itinerary view ────────────────────────────────────────────────── */
  return (
    <div
      className="print:bg-white print:text-black"
      style={{ minHeight: "100vh", width: "100%", background: "#050a16", color: "#f8fafc", position: "relative" }}
    >

      <style>{`
        @media print {
          @page { margin: 1.5cm; size: auto; }
        }
      `}</style>

      {/* ── Tropical Ambient Glows ─────────────────────────────────────── */}
      <div
        className="print:hidden"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div className="animate-aurora" style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: 1000, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div className="animate-aurora delay-300" style={{
          position: "absolute", top: "40%", right: "-5%",
          width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div className="animate-float-slow delay-500" style={{
          position: "absolute", bottom: "-10%", left: "20%",
          width: 900, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      {/* ── Grid overlay ──────────────────────────────────────────────── */}
      <div
        className="print:hidden"
        style={{
          position: "fixed", inset: 0, zIndex: 0, opacity: 0.01, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* ── Noise texture ──────────────────────────────────────────────── */}
      <div className="noise-overlay print:hidden" style={{ position: "fixed", zIndex: 0 }} aria-hidden="true" />

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <nav
        className="print:hidden"
        style={{
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: 68,
          background: "rgba(5,10,22,0.85)",
          backdropFilter: "blur(24px) saturate(160%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", userSelect: "none" }}>
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
          <span
            className="hidden sm:block"
            style={{ fontSize: 13, fontWeight: 600, color: "#475569", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
            onMouseLeave={e => e.currentTarget.style.color = "#475569"}
          >
            My Trips
          </span>

          {/* Download PDF button in nav */}
          <button
            onClick={() => window.print()}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 16px", borderRadius: 10,
              border: "1px solid rgba(34,211,238,0.25)",
              background: "rgba(34,211,238,0.06)",
              color: "#22d3ee",
              fontSize: 13, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,211,238,0.12)"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,211,238,0.06)"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)"; }}
          >
            <IconDownload />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          <div
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s", color: "#475569",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)"; e.currentTarget.style.color = "#22d3ee"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#475569"; }}
          >
            <IconUser />
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main style={{ position: "relative", zIndex: 10, width: "100%", padding: "64px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* ── Hero Section ──────────────────────────────────────────── */}
          <div
            className="animate-fade-in-up print:mb-8"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 64 }}
          >
            {/* AI badge */}
            <div
              className="badge-live print:hidden"
              style={{ marginBottom: 24 }}
            >
              <span className="dot" aria-hidden="true" />
              AI-Generated Itinerary
            </div>

            {/* Destination headline */}
            <h1
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "clamp(2.5rem,6vw,4.5rem)",
                fontWeight: 900, letterSpacing: "-0.04em",
                color: "#fff", lineHeight: 1.08,
                marginBottom: 16,
              }}
              className="print:text-black"
            >
              Your Dream Trip to{" "}
              <span
                className="text-shimmer"
                style={{ textTransform: "capitalize" }}
              >
                {trip.destination}
              </span>
            </h1>

            <p
              style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "#64748b", lineHeight: 1.7, maxWidth: 540, margin: "0 0 36px" }}
              className="print:text-slate-600"
            >
              Curated day-by-day, tailored perfectly to your budget and pace.
            </p>

            {/* Stat pills */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
              <StatPill emoji="📅" label={`${trip.days} Days`} color="#22d3ee" />
              <StatPill emoji="🧑‍🤝‍🧑" label={`${trip.travelers} Traveler${trip.travelers !== 1 ? "s" : ""}`} color="#818cf8" />
              <StatPill emoji="💰" label={`${trip.budget} Budget`} color="#f59e0b" />
            </div>

            {/* Mobile Download PDF */}
            <button
              onClick={() => window.print()}
              className="sm:hidden print:hidden"
              style={{
                marginTop: 28,
                display: "flex", alignItems: "center", gap: 10,
                padding: "14px 28px", borderRadius: 14,
                background: "linear-gradient(135deg, #22d3ee, #38bdf8 50%, #818cf8)",
                border: "none",
                color: "#050a16", fontSize: 15, fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(34,211,238,0.25)",
              }}
            >
              <IconDownload />
              Download PDF
            </button>
          </div>

          {/* Section divider */}
          <div
            className="separator-subtle print:bg-slate-200"
            style={{ marginBottom: 56 }}
            aria-hidden="true"
          />

          {/* ── Itinerary Timeline ────────────────────────────────────── */}
          {Array.isArray(trip.itinerary) ? (
            <div>
              {trip.itinerary.map((dayItem, dayIdx) => (
                <DaySection
                  key={dayIdx}
                  dayItem={dayItem}
                  dayIdx={dayIdx}
                  totalDays={trip.itinerary.length}
                />
              ))}
            </div>
          ) : (
            <div
              className="glass-surface"
              style={{
                borderRadius: 24, padding: "56px 32px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 18, color: "#64748b", fontStyle: "italic" }}>
                No structured itinerary available.
              </p>
            </div>
          )}

          {/* ── Bottom Download CTA ───────────────────────────────────── */}
          <div
            className="print:hidden animate-fade-in-up"
            style={{
              marginTop: 64, paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
            }}
          >
            <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
              Save your itinerary for offline access
            </p>
            <button
              onClick={() => window.print()}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "16px 36px", borderRadius: 16,
                background: "linear-gradient(135deg, #22d3ee, #38bdf8 50%, #818cf8)",
                border: "none",
                color: "#050a16", fontSize: 16, fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(34,211,238,0.28)",
                transition: "all 0.2s",
                fontFamily: "Outfit, sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(34,211,238,0.38)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(34,211,238,0.28)"; }}
            >
              <IconDownload />
              Download Full PDF
            </button>
          </div>

          {/* ── Footer ────────────────────────────────────────────────── */}
          <footer
            className="print:hidden"
            style={{
              marginTop: 48, paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex", flexWrap: "wrap",
              alignItems: "center", justifyContent: "space-between", gap: 12,
            }}
          >
            <p style={{ fontSize: 13, color: "#334155", fontWeight: 500, margin: 0 }}>
              © 2026 Trippo AI. Crafted for your next adventure.
            </p>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#334155" }}>
              {["Privacy","Terms"].map(l => (
                <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#64748b"}
                  onMouseLeave={e => e.currentTarget.style.color = "#334155"}
                >{l}</a>
              ))}
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default TripDetails;