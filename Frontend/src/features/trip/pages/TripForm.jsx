import React, { useState } from "react";
import { generateTripAPI } from "../services/trip.api";
import { useNavigate } from "react-router";

/* ── Shared icon components ───────────────────────────────────────────────── */
const IconDestination = () => (
  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 3C6.686 3 4 5.686 4 9c0 4.5 6 9.5 6 9.5s6-5 6-9.5C16 5.686 13.314 3 10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconCalendar = () => (
  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 3v2M13 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
    <rect x="11" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
  </svg>
)

const IconPeople = () => (
  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 17C2.5 13.962 4.962 11.5 8 11.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17.5 17c0-2.485-1.567-4.5-3.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconWallet = () => (
  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 9h16" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 3l12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14.5" cy="13" r="1.5" fill="currentColor" fillOpacity="0.6" />
  </svg>
)

/* ── Budget options data ───────────────────────────────────────────────────── */
const BUDGET_OPTIONS = [
  { value: "Cheap",    label: "Cheap",    sub: "Hostels & Public Transit",  emoji: "🎒" },
  { value: "Moderate", label: "Moderate", sub: "Mid-Range Stays",           emoji: "🏨" },
  { value: "Luxury",   label: "Luxury",   sub: "Premium Resorts",           emoji: "✨" },
]

/* ── Field wrapper ────────────────────────────────────────────────────────── */
const FormField = ({ icon, label, htmlFor, children }) => (
  <div className="flex flex-col gap-3">
    <label htmlFor={htmlFor} className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em]">
      {icon}
      {label}
    </label>
    {children}
  </div>
)

/* ══════════════════════════════════════════════════════════════════════════ */
/* TRIP FORM PAGE                                                              */
/* ══════════════════════════════════════════════════════════════════════════ */
const TripForm = () => {
    const navigate = useNavigate();

    /* ── ALL ORIGINAL LOGIC — ZERO MUTATIONS ─────────────────────────── */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        destination: "",
        days: "",
        budget: "Moderate",
        travelers: 1,
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

    /* ── Loading / AI-generating state ───────────────────────────────── */
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">

                {/* Ambient glows */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-cyan-600/10 blur-[160px] animate-glow-pulse" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />
                </div>

                <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-10 animate-fade-in-up">

                    {/* AI status badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-400 text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        AI Agent Working
                    </div>

                    {/* Headline */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-50">
                            Engineering Your{" "}
                            <span className="text-shimmer">Itinerary</span>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                            Analysing geography, clustering locations, and fetching realistic hotel rates…
                        </p>
                    </div>

                    {/* Spinner */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-2 border-slate-800" />
                        <div className="absolute w-20 h-20 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/30 animate-spin" />
                        <div className="absolute w-10 h-10 rounded-full border-2 border-transparent border-t-blue-400/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                        <div className="absolute w-3 h-3 rounded-full bg-cyan-400 animate-glow-pulse shadow-[0_0_16px_rgba(6,182,212,0.9)]" />
                    </div>

                    {/* Skeleton cards */}
                    <div className="w-full flex flex-col gap-4">
                        {[80, 130, 130].map((h, i) => (
                            <div
                                key={i}
                                className="glass-surface rounded-2xl animate-pulse"
                                style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>

                    <p className="text-xs text-slate-700 tracking-wide">
                        Powered by real-world data · Results in ~10–20 seconds
                    </p>
                </div>
            </div>
        );
    }

    /* ── Main form ────────────────────────────────────────────────────── */
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">

            {/* ── Ambient glow layer ────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-cyan-600/8 blur-[160px] animate-glow-pulse" />
                <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full bg-blue-600/6 blur-[120px] animate-float-slow" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-[120px] animate-float-slow" style={{ animationDelay: '-5s' }} />
            </div>

            {/* ── Subtle grid overlay ───────────────────────────────── */}
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

            {/* ── Navbar ────────────────────────────────────────────── */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.05]">

                <a href="/" className="flex items-center gap-0.5 select-none group">
                    <span className="text-xl font-black tracking-tighter text-slate-100 transition-colors duration-200 group-hover:text-white">Trippo</span>
                    <span className="text-xl font-black tracking-tighter text-cyan-400 transition-colors duration-200 group-hover:text-cyan-300"> AI</span>
                </a>

                <div className="flex items-center gap-3">
                    <span className="hidden md:block text-sm font-semibold text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                        My Trips
                    </span>
                    <div className="group flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/40 hover:bg-slate-800 transition-all duration-200">
                        <svg className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors duration-200" viewBox="0 0 16 16" fill="none" aria-label="User account">
                            <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
                            <path d="M2.5 13.5C2.5 11.015 5.015 9 8 9s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </nav>

            {/* ── Main content ──────────────────────────────────────── */}
            <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-12 md:py-16">

                {/* Page header */}
                <div className="flex flex-col items-center gap-4 text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-400 text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        AI Trip Planner
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-50 leading-[1.05]">
                        Plan Your Next{" "}
                        <span className="text-shimmer">Adventure</span>
                    </h1>
                    <p className="text-slate-500 text-base max-w-md leading-relaxed">
                        Deep-engineered AI itineraries based on real-world constraints —
                        budget, pace, and preference included.
                    </p>
                </div>

                {/* ── Glassmorphic form card ────────────────────────── */}
                <div className="w-full max-w-2xl mx-auto animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <div className="relative glass-surface rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">

                        {/* Top gradient line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" aria-hidden="true" />
                        {/* Bottom gradient line */}
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" aria-hidden="true" />
                        {/* Card inner glow */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-20 bg-cyan-400/4 blur-3xl rounded-full" aria-hidden="true" />

                        <div className="relative p-8 md:p-12">

                            {/* Error banner */}
                            {error && (
                                <div className="mb-8 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-5 py-4">
                                    <svg className="mt-0.5 w-4 h-4 text-rose-400 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                        <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                                        <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                                    </svg>
                                    <p className="text-sm text-rose-400 leading-snug">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                                {/* ── Destination — full width ─────────── */}
                                <FormField icon={<IconDestination />} label="Destination" htmlFor="destination">
                                    <input
                                        type="text"
                                        id="destination"
                                        name="destination"
                                        required
                                        placeholder="e.g. Kyoto, Japan  ·  Goa, India  ·  Paris, France"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="input-premium h-14 text-base"
                                    />
                                </FormField>

                                {/* ── Days + Travelers — two columns ────── */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                    <FormField icon={<IconCalendar />} label="Duration (Days)" htmlFor="days">
                                        <input
                                            type="number"
                                            id="days"
                                            name="days"
                                            min="1"
                                            max="15"
                                            required
                                            placeholder="e.g. 5"
                                            value={formData.days}
                                            onChange={handleChange}
                                            className="input-premium h-14"
                                        />
                                    </FormField>

                                    <FormField icon={<IconPeople />} label="Travelers" htmlFor="travelers">
                                        <input
                                            type="number"
                                            id="travelers"
                                            name="travelers"
                                            min="1"
                                            required
                                            placeholder="e.g. 2"
                                            value={formData.travelers}
                                            onChange={handleChange}
                                            className="input-premium h-14"
                                        />
                                    </FormField>
                                </div>

                                {/* ── Budget tier — visual card selector ── */}
                                <FormField icon={<IconWallet />} label="Budget Tier" htmlFor="budget">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {BUDGET_OPTIONS.map((opt) => (
                                            <label
                                                key={opt.value}
                                                htmlFor={`budget-${opt.value}`}
                                                className={[
                                                    'relative flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none',
                                                    formData.budget === opt.value
                                                        ? 'border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                                                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/40',
                                                ].join(' ')}
                                            >
                                                <input
                                                    type="radio"
                                                    id={`budget-${opt.value}`}
                                                    name="budget"
                                                    value={opt.value}
                                                    checked={formData.budget === opt.value}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                {/* Selection indicator */}
                                                {formData.budget === opt.value && (
                                                    <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                                                        <svg className="w-2.5 h-2.5 text-slate-950" viewBox="0 0 10 10" fill="none">
                                                            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                )}
                                                <span className="text-2xl leading-none">{opt.emoji}</span>
                                                <span className={`text-sm font-bold ${formData.budget === opt.value ? 'text-cyan-300' : 'text-slate-300'}`}>
                                                    {opt.label}
                                                </span>
                                                <span className="text-[11px] text-slate-600 text-center leading-snug">
                                                    {opt.sub}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {/* Hidden native select for non-JS fallback */}
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

                                {/* ── CTA submit button ──────────────────── */}
                                <button
                                    type="submit"
                                    className="relative w-full h-16 rounded-2xl font-black text-base tracking-wide text-slate-950 transition-all duration-200 active:scale-[0.98] overflow-hidden group shadow-xl shadow-cyan-500/10"
                                    style={{
                                        background: 'linear-gradient(135deg, #22d3ee 0%, #38bdf8 50%, #818cf8 100%)',
                                    }}
                                >
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 50%, #6366f1 100%)' }} />
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <span>Generate My Itinerary</span>
                                        <span className="text-lg leading-none" aria-hidden="true">✨</span>
                                    </span>
                                </button>

                            </form>

                            {/* Below-form note */}
                            <p className="mt-6 text-center text-xs text-slate-700">
                                Powered by real-world data &nbsp;·&nbsp;
                                <span className="text-slate-600">Results in ~10–20 seconds</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Footer ────────────────────────────────────────────── */}
            <footer className="relative z-10 px-6 md:px-12 py-5 border-t border-white/[0.04] flex items-center justify-between">
                <p className="text-xs text-slate-700">© 2026 Trippo AI. All rights reserved.</p>
                <div className="flex gap-5 text-xs text-slate-700">
                    <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
                </div>
            </footer>

        </div>
    );
};

export default TripForm;