import React, { useState } from "react";
import { generateTripAPI } from "../services/trip.api";
import { useNavigate } from "react-router";

const TripForm = () => {
    const navigate = useNavigate();
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

    // ── Loading State ──────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">

                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-teal-900/20 blur-[130px]" />
                </div>

                <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-medium tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                            AI Agent Working
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
                            Engineering Your{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                Itinerary
                            </span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                            Analysing geography, clustering locations, and fetching realistic hotel rates.
                        </p>
                    </div>

                    {/* Skeleton cards */}
                    <div className="w-full flex flex-col gap-4 animate-pulse">
                        <div className="h-20 bg-zinc-900/80 rounded-xl border border-zinc-800" />
                        <div className="h-36 bg-zinc-900/80 rounded-xl border border-zinc-800" />
                        <div className="h-36 bg-zinc-900/80 rounded-xl border border-zinc-800" />
                    </div>
                </div>
            </div>
        );
    }

    // ── Main Form ──────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden">

            {/* ── Ambient background glow ───────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {/* Primary teal haze — centred behind the card */}
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-teal-900/20 blur-[130px]" />
                {/* Emerald accent — top-right corner */}
                <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-emerald-900/10 blur-[100px]" />
                {/* Very faint indigo — bottom-left */}
                <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[100px]" />
            </div>

            {/* ── Navbar ────────────────────────────────────────────────── */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-4 border-b border-zinc-800/60">
                {/* Logo */}
                <a href="/" className="flex items-center gap-0.5 select-none">
                    <span className="text-xl font-bold tracking-tighter text-zinc-100">Trippo</span>
                    <span className="text-xl font-bold tracking-tighter text-teal-400"> AI</span>
                </a>

                {/* User placeholder */}
                <div className="flex items-center gap-3">
                    <span className="hidden md:block text-xs text-zinc-600">My Trips</span>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-zinc-400"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-label="User account"
                        >
                            <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
                            <path
                                d="M2.5 13.5C2.5 11.015 5.015 9 8 9s5.5 2.015 5.5 4.5"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </nav>

            {/* ── Main content ──────────────────────────────────────────── */}
            <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-10 md:py-14">

                {/* Page header */}
                <div className="flex flex-col items-center gap-3 text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-medium tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        AI Trip Planner
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-100 leading-[1.1]">
                        Plan Your Next{" "}
                        <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                            Adventure
                        </span>
                    </h1>
                    <p className="text-zinc-500 text-base max-w-md leading-relaxed">
                        Deep-engineered AI itineraries based on real-world constraints —
                        budget, pace, and preference included.
                    </p>
                </div>

                {/* ── Glassmorphic form card ─────────────────────────────── */}
                <div className="w-full max-w-3xl mx-auto bg-zinc-900/40 backdrop-blur-xl border-2 border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50">

                    {/* Error banner */}
                    {error && (
                        <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4">
                            <svg
                                className="mt-0.5 w-4 h-4 text-red-400 flex-shrink-0"
                                viewBox="0 0 14 14"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                                <path d="M7 6v3M7 10.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                            </svg>
                            <p className="text-sm text-red-400 leading-snug">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                        {/* ── Row 1: Destination — full width ─────────────── */}
                        <div className="flex flex-col">
                            <label className="font-bold text-sm tracking-wider text-zinc-300 uppercase mb-3">
                                Destination
                            </label>
                            <input
                                type="text"
                                name="destination"
                                required
                                placeholder="e.g. Kyoto, Japan  ·  Goa, India  ·  Paris, France"
                                value={formData.destination}
                                onChange={handleChange}
                                className="w-full h-14 bg-zinc-950/50 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/30 hover:border-zinc-700"
                            />
                        </div>

                        {/* ── Row 2: Days + Travelers — two equal columns ──── */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="font-bold text-sm tracking-wider text-zinc-300 uppercase mb-3">
                                    Days
                                </label>
                                <input
                                    type="number"
                                    name="days"
                                    min="1"
                                    max="15"
                                    required
                                    placeholder="e.g. 5"
                                    value={formData.days}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-zinc-950/50 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/30 hover:border-zinc-700"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold text-sm tracking-wider text-zinc-300 uppercase mb-3">
                                    Travelers
                                </label>
                                <input
                                    type="number"
                                    name="travelers"
                                    min="1"
                                    required
                                    placeholder="e.g. 2"
                                    value={formData.travelers}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-zinc-950/50 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/30 hover:border-zinc-700"
                                />
                            </div>
                        </div>

                        {/* ── Row 3: Budget Tier — full width ─────────────── */}
                        <div className="flex flex-col">
                            <label className="font-bold text-sm tracking-wider text-zinc-300 uppercase mb-3">
                                Budget Tier
                            </label>
                            <div className="relative">
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-zinc-950/50 border border-zinc-800 rounded-2xl px-5 py-4 pr-10 text-sm text-zinc-100 appearance-none outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/30 hover:border-zinc-700 cursor-pointer"
                                >
                                    <option value="Cheap">Cheap — Hostels & Public Transit</option>
                                    <option value="Moderate">Moderate — Mid-range Stays</option>
                                    <option value="Luxury">Luxury — Premium Resorts</option>
                                </select>
                                {/* Custom chevron — replaces browser default */}
                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                    <svg
                                        className="w-4 h-4 text-zinc-500"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M4 6l4 4 4-4"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* ── CTA submit button ────────────────────────────── */}
                        <button
                            type="submit"
                            className="mt-1 w-full h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:from-teal-400 hover:to-emerald-500 hover:shadow-xl hover:shadow-teal-500/25 active:scale-[0.98] flex items-center justify-center gap-2.5"
                        >
                            <span>Generate Itinerary</span>
                            <span className="text-base leading-none" aria-hidden="true">✨</span>
                        </button>

                    </form>

                    {/* Below-form note */}
                    <p className="mt-7 text-center text-xs text-zinc-600">
                        Powered by real-world data &nbsp;·&nbsp;
                        <span className="text-zinc-500">Results in ~10–20 seconds</span>
                    </p>

                </div>
            </main>

            {/* ── Footer ────────────────────────────────────────────────── */}
            <footer className="relative z-10 px-6 md:px-12 py-4 border-t border-zinc-900 flex items-center justify-between">
                <p className="text-xs text-zinc-700">© 2025 Trippo AI. All rights reserved.</p>
                <div className="flex gap-5 text-xs text-zinc-700">
                    <a href="#" className="hover:text-zinc-500 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-zinc-500 transition-colors">Terms</a>
                </div>
            </footer>

        </div>
    );
};

export default TripForm;