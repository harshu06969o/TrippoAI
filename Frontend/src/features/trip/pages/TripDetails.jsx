import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTripByIdAPI } from "../services/trip.api";

const TripDetails = () => {
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase animate-pulse">
                        Packing your bags...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-950">
                <div className="flex flex-col items-center gap-3 text-center px-6">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-rose-400" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                            <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="text-rose-400 text-base font-semibold">{error || "Trip not found"}</p>
                    <p className="text-slate-400 text-sm">Try refreshing or planning a new trip.</p>
                </div>
            </div>
        );
    }

    return (
        /* Replaced dark zinc with deep slate for a midnight ocean vibe */
        <div className="min-h-screen w-full bg-slate-950 text-slate-50 relative font-sans print:bg-white print:text-black">
            
            <style>
                {`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { padding: 1.5cm; }
                }
                `}
            </style>

            {/* ── Tropical Ambient Glows ── */}
            <div className="pointer-events-none fixed inset-0 z-0 print:hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[700px] rounded-full bg-cyan-600/10 blur-[150px]" />
                <div className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[900px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />
            </div>

            {/* ── Navbar ── */}
            <nav className="relative z-20 w-full flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl print:hidden">
                <a href="/" className="flex items-center gap-1.5 select-none cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="text-2xl font-black tracking-tighter text-slate-100">Trippo</span>
                    <span className="text-2xl font-black tracking-tighter text-cyan-400"> AI</span>
                </a>
                
                <div className="flex items-center gap-5">
                    <span className="hidden sm:block text-sm font-semibold tracking-wide text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
                        My Trips
                    </span>
                    <div className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-slate-700 cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-200">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M2.5 13.5C2.5 11.015 5.015 9 8 9s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </nav>

            {/* ── MAIN CONTENT ── */}
            <main className="relative z-10 w-full px-4 sm:px-8 py-12 md:py-20">

                {/* ── Hero Section ── */}
                <div className="relative w-full max-w-[1600px] mx-auto flex flex-col items-center text-center mb-24">
                    
                    {/* Top Right Download PDF Button */}
                    <div className="hidden md:block absolute top-0 right-0 print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-slate-100 font-bold text-sm tracking-wide hover:bg-white hover:text-slate-900 hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-md"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download PDF
                        </button>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-extrabold tracking-widest uppercase mb-8 print:hidden shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        AI-Generated Itinerary
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-50 leading-tight mb-6 print:text-black">
                        Your Dream Trip to <span className="text-cyan-400 capitalize print:text-black">{trip.destination}</span>
                    </h1>
                    
                    <p className="text-slate-300 text-lg md:text-2xl max-w-3xl print:text-slate-600">
                        Curated day-by-day, tailored perfectly to your budget and pace.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-12 print:mt-6">
                        <span className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 backdrop-blur-md rounded-xl px-6 py-3 text-lg text-slate-200 font-bold print:bg-slate-100 print:border-slate-200 print:text-black">
                            <span className="text-xl">📅</span> {trip.days} Days
                        </span>
                        <span className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 backdrop-blur-md rounded-xl px-6 py-3 text-lg text-slate-200 font-bold print:bg-slate-100 print:border-slate-200 print:text-black">
                            <span className="text-xl">🧑‍🤝‍🧑</span> {trip.travelers} Traveler{trip.travelers !== 1 ? "s" : ""}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 backdrop-blur-md rounded-xl px-6 py-3 text-lg text-slate-200 font-bold capitalize print:bg-slate-100 print:border-slate-200 print:text-black">
                            <span className="text-xl">💰</span> {trip.budget} Budget
                        </span>
                    </div>

                    <button
                        onClick={() => window.print()}
                        className="md:hidden mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 bg-slate-100 text-slate-900 font-bold text-base tracking-wide transition-colors print:hidden"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download PDF
                    </button>
                </div>

                {/* ── Divider ── */}
                <div className="w-full max-w-[1600px] mx-auto h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-20 print:bg-slate-300" />

                {/* ── Itinerary Section ── */}
                <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-28">
                    
                    {Array.isArray(trip.itinerary) ? (
                        trip.itinerary.map((dayItem, dayIdx) => (
                            <div key={dayIdx} className="w-full flex flex-col items-center">

                                {/* Day Title */}
                                <div className="flex flex-col items-center text-center mb-14 w-full">
                                    <span className="inline-block bg-cyan-900/30 text-cyan-300 font-black tracking-widest uppercase text-lg md:text-xl px-8 py-3 rounded-full border border-cyan-500/40 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] print:bg-slate-200 print:text-slate-800 print:border-none print:shadow-none">
                                        Day {dayItem.day || dayIdx + 1}
                                    </span>
                                    <h3 className="text-4xl md:text-6xl font-black text-slate-50 tracking-tight leading-snug max-w-5xl print:text-black">
                                        {dayItem.theme || "Scheduled Activities"}
                                    </h3>
                                </div>

                                {/* Activity Cards Container */}
                                {Array.isArray(dayItem.activities) ? (
                                    <div className="w-full grid grid-cols-1 gap-10">
                                        {dayItem.activities.map((act, actIdx) => (
                                            <div
                                                key={actIdx}
                                                /* Beautiful frosted glass effect with lighter borders */
                                                className="w-full bg-white/[0.03] backdrop-blur-2xl border-2 border-white/[0.05] rounded-[2.5rem] px-8 sm:px-12 md:px-16 py-10 md:py-12 hover:border-cyan-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-300 flex flex-col text-left print:bg-slate-50 print:border-slate-200 print:break-inside-avoid print:shadow-none"
                                            >
                                                {/* Time Badge */}
                                                <div className="flex items-start justify-between mb-6">
                                                    <span className="inline-block bg-slate-900 text-cyan-400 px-5 py-2.5 rounded-xl font-mono text-base font-bold uppercase tracking-widest border border-slate-700/50 shadow-sm print:bg-white print:text-slate-800 print:border-slate-300">
                                                        {act.time || "Scheduled"}
                                                    </span>
                                                </div>

                                                {/* Place Title */}
                                                <h4 className="text-3xl md:text-4xl font-bold text-slate-50 mb-5 leading-tight print:text-black">
                                                    {act.placeName}
                                                </h4>

                                                {/* Description */}
                                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed w-full print:text-slate-700">
                                                    {act.details}
                                                </p>

                                                {/* Cost Badge */}
                                                {act.ticketPrice && (
                                                    <div className="mt-10 pt-6 border-t border-white/10 print:border-slate-300">
                                                        <span className="text-lg font-semibold text-slate-400 print:text-slate-600 flex items-center gap-3">
                                                            <span className="text-2xl">💰</span> 
                                                            Cost: 
                                                            <span className="text-slate-100 font-extrabold tracking-wide text-xl print:text-black">
                                                                {act.ticketPrice}
                                                            </span>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full bg-white/[0.02] border-2 border-white/5 rounded-3xl p-10 text-center">
                                        <p className="text-slate-400 italic text-xl">No activities planned for this day.</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="w-full bg-white/[0.02] border-2 border-white/5 rounded-[2.5rem] p-16 text-center print:bg-slate-50 print:border-slate-200">
                            <p className="text-slate-400 text-2xl font-medium">No structured itinerary available.</p>
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                <footer className="w-full max-w-[1600px] mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 print:border-slate-300 print:hidden">
                    <p className="text-slate-500 text-base font-semibold">© 2026 Trippo AI. Crafted for your next adventure.</p>
                    <div className="flex items-center gap-8 text-base text-slate-500 font-medium">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default TripDetails;