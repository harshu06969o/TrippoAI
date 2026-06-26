import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTripByIdAPI } from "../services/trip.api";

/* ── Download / Print icon ─────────────────────────────────────────────────── */
const IconDownload = ({ size = 20 }) => (
    <svg
        className={`w-${size === 20 ? 5 : 4} h-${size === 20 ? 5 : 4}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

/* ── Stat pill ─────────────────────────────────────────────────────────────── */
const StatPill = ({ emoji, label }) => (
    <span className="inline-flex items-center gap-2.5 glass-surface rounded-2xl px-6 py-3.5 text-base text-slate-200 font-bold print:bg-slate-100 print:border-slate-200 print:text-black">
        <span className="text-xl">{emoji}</span>
        {label}
    </span>
)

/* ══════════════════════════════════════════════════════════════════════════════ */
/* TRIP DETAILS PAGE                                                              */
/* ══════════════════════════════════════════════════════════════════════════════ */
const TripDetails = () => {
    /* ── ALL ORIGINAL LOGIC — ZERO MUTATIONS ───────────────────────────────── */
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
            <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-cyan-600/10 blur-[160px] animate-glow-pulse" />
                    <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
                    <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-7 animate-fade-in-up">
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-2 border-slate-800" />
                        <div className="absolute w-20 h-20 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/30 animate-spin" />
                        <div className="absolute w-10 h-10 rounded-full border-2 border-transparent border-t-blue-400/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                        <div className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.9)]" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-200 text-sm font-semibold tracking-wide">
                            Packing your bags…
                        </p>
                        <p className="text-cyan-400/60 text-xs tracking-widest uppercase font-bold animate-pulse">
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
            <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-rose-600/8 blur-[160px]" />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6 animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center">
                        <svg className="w-7 h-7 text-rose-400" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                            <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-rose-400 text-lg font-bold">{error || "Trip not found"}</p>
                        <p className="text-slate-500 text-sm">Try refreshing or planning a new trip.</p>
                    </div>
                    <a
                        href="/"
                        className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-500/5 transition-all duration-200"
                    >
                        ← Plan a new trip
                    </a>
                </div>
            </div>
        );
    }

    /* ── Main itinerary view ────────────────────────────────────────────────── */
    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-50 relative font-sans print:bg-white print:text-black">

            <style>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { padding: 1.5cm; }
                }
            `}</style>

            {/* ── Tropical Ambient Glows ─────────────────────────────────────── */}
            <div className="pointer-events-none fixed inset-0 z-0 print:hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[700px] rounded-full bg-cyan-600/8 blur-[160px] animate-float-slow" />
                <div className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/8 blur-[160px] animate-float-slow" style={{ animationDelay: '-4s' }} />
                <div className="absolute bottom-[-10%] left-[20%] w-[900px] h-[600px] rounded-full bg-indigo-600/8 blur-[160px] animate-float-slow" style={{ animationDelay: '-8s' }} />
            </div>

            {/* ── Grid overlay ──────────────────────────────────────────────── */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.01] print:hidden"
                aria-hidden="true"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* ── Navbar ────────────────────────────────────────────────────── */}
            <nav className="relative z-20 w-full flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.05] bg-slate-950/70 backdrop-blur-xl print:hidden">
                <a href="/" className="flex items-center gap-0.5 select-none group hover:opacity-90 transition-opacity">
                    <span className="text-2xl font-black tracking-tighter text-slate-100 group-hover:text-white transition-colors">Trippo</span>
                    <span className="text-2xl font-black tracking-tighter text-cyan-400 group-hover:text-cyan-300 transition-colors"> AI</span>
                </a>

                <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-slate-300 cursor-pointer transition-colors tracking-wide">
                        My Trips
                    </span>
                    <div className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/40 hover:bg-slate-800 transition-all duration-200">
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-200" viewBox="0 0 16 16" fill="none" aria-label="User account">
                            <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M2.5 13.5C2.5 11.015 5.015 9 8 9s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
            <main className="relative z-10 w-full px-4 sm:px-8 py-14 md:py-20">

                {/* ── Hero Section ──────────────────────────────────────────── */}
                <div className="relative w-full max-w-[1600px] mx-auto flex flex-col items-center text-center mb-24 animate-fade-in-up">

                    {/* Desktop PDF button — top right */}
                    <div className="hidden md:block absolute top-0 right-0 print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl glass-surface text-slate-100 font-bold text-sm tracking-wide hover:bg-white hover:text-slate-900 hover:scale-[1.03] transition-all duration-300 shadow-2xl"
                        >
                            <IconDownload size={20} />
                            Download PDF
                        </button>
                    </div>

                    {/* AI badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300 text-xs font-black tracking-widest uppercase mb-8 print:hidden shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        AI-Generated Itinerary
                    </div>

                    {/* Main headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-50 leading-tight mb-6 print:text-black">
                        Your Dream Trip to{' '}
                        <span className="text-shimmer capitalize print:text-black">
                            {trip.destination}
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-2xl max-w-3xl print:text-slate-600">
                        Curated day-by-day, tailored perfectly to your budget and pace.
                    </p>

                    {/* Stat pills */}
                    <div className="flex flex-wrap justify-center gap-3 mt-12 print:mt-6">
                        <StatPill emoji="📅" label={`${trip.days} Days`} />
                        <StatPill emoji="🧑‍🤝‍🧑" label={`${trip.travelers} Traveler${trip.travelers !== 1 ? "s" : ""}`} />
                        <StatPill emoji="💰" label={`${trip.budget} Budget`} />
                    </div>

                    {/* Mobile PDF button */}
                    <button
                        onClick={() => window.print()}
                        className="md:hidden mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 bg-slate-100 text-slate-900 font-bold text-base tracking-wide transition-colors print:hidden"
                    >
                        <IconDownload size={16} />
                        Download PDF
                    </button>
                </div>

                {/* ── Section divider ────────────────────────────────────────── */}
                <div className="w-full max-w-[1600px] mx-auto h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-20 print:bg-slate-300" />

                {/* ── Itinerary Section ──────────────────────────────────────── */}
                <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-24">

                    {Array.isArray(trip.itinerary) ? (
                        trip.itinerary.map((dayItem, dayIdx) => (
                            <div key={dayIdx} className="w-full flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${dayIdx * 0.08}s` }}>

                                {/* Day title */}
                                <div className="flex flex-col items-center text-center mb-14 w-full">
                                    <span className="inline-block bg-cyan-900/25 text-cyan-300 font-black tracking-widest uppercase text-base md:text-lg px-8 py-3 rounded-full border border-cyan-500/35 mb-6 shadow-[0_0_24px_rgba(6,182,212,0.12)] print:bg-slate-200 print:text-slate-800 print:border-none print:shadow-none">
                                        Day {dayItem.day || dayIdx + 1}
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-black text-slate-50 tracking-tight leading-snug max-w-5xl print:text-black">
                                        {dayItem.theme || "Scheduled Activities"}
                                    </h2>
                                </div>

                                {/* Activity cards */}
                                {Array.isArray(dayItem.activities) ? (
                                    <div className="w-full grid grid-cols-1 gap-8">
                                        {dayItem.activities.map((act, actIdx) => (
                                            <div
                                                key={actIdx}
                                                className="w-full glass-surface rounded-[2rem] px-8 sm:px-12 md:px-16 py-10 md:py-12 hover:border-cyan-500/30 hover:bg-white/[0.05] hover:shadow-[0_0_50px_rgba(6,182,212,0.08)] transition-all duration-300 flex flex-col text-left print:bg-slate-50 print:border-slate-200 print:break-inside-avoid print:shadow-none group"
                                            >
                                                {/* Time badge */}
                                                <div className="flex items-start justify-between mb-6">
                                                    <span className="inline-flex items-center gap-2 bg-slate-900/80 text-cyan-400 px-5 py-2.5 rounded-xl font-mono text-sm font-bold uppercase tracking-widest border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors duration-300 print:bg-white print:text-slate-800 print:border-slate-300">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                        {act.time || "Scheduled"}
                                                    </span>
                                                </div>

                                                {/* Place title */}
                                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-50 mb-5 leading-tight print:text-black">
                                                    {act.placeName}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed print:text-slate-700 group-hover:text-slate-300 transition-colors duration-300">
                                                    {act.details}
                                                </p>

                                                {/* Cost badge */}
                                                {act.ticketPrice && (
                                                    <div className="mt-10 pt-6 border-t border-white/[0.06] print:border-slate-300">
                                                        <span className="inline-flex items-center gap-3 text-base font-semibold text-slate-500 print:text-slate-600">
                                                            <span className="text-2xl">💰</span>
                                                            Cost:{' '}
                                                            <span className="text-slate-100 font-extrabold tracking-wide text-lg print:text-black">
                                                                {act.ticketPrice}
                                                            </span>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full glass-surface rounded-3xl p-10 text-center">
                                        <p className="text-slate-500 italic text-xl">No activities planned for this day.</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="w-full glass-surface rounded-[2.5rem] p-16 text-center print:bg-slate-50 print:border-slate-200">
                            <p className="text-slate-400 text-2xl font-medium">No structured itinerary available.</p>
                        </div>
                    )}
                </div>

                {/* ── Footer ────────────────────────────────────────────────── */}
                <footer className="w-full max-w-[1600px] mx-auto mt-32 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 print:border-slate-300 print:hidden">
                    <p className="text-slate-600 text-sm font-semibold">
                        © 2026 Trippo AI. Crafted for your next adventure.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-600 font-medium">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default TripDetails;