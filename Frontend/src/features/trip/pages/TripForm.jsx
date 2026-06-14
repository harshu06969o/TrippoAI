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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[85vh] bg-[#0a0a0a] p-6 w-full">
                <div className="w-full max-w-2xl space-y-6 animate-pulse">
                    <div className="space-y-3 text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-teal-400">
                            AI Agent Is Planning Your Trip...
                        </h2>
                        <p className="text-neutral-400 text-sm">
                            Analyzing geography, clustering locations, and fetching realistic hotel rates.
                        </p>
                    </div>
                    <div className="h-24 bg-neutral-900 rounded-xl border border-neutral-800"></div>
                    <div className="h-40 bg-neutral-900 rounded-xl border border-neutral-800"></div>
                    <div className="h-40 bg-neutral-900 rounded-xl border border-neutral-800"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-[#0a0a0a] w-full px-4 py-10">
            <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
                    Plan Your Next <span className="text-teal-400">Adventure</span>
                </h2>
                <p className="text-neutral-400 text-sm text-center mb-8">
                    Deep-engineered AI itineraries based on real-world constraints.
                </p>

                {error && (
                    <div className="mb-6 p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            required
                            placeholder="e.g. Kyoto, Japan or Goa, India"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Days</label>
                            <input
                                type="number"
                                name="days"
                                min="1"
                                max="15"
                                required
                                value={formData.days}
                                onChange={handleChange}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Travelers</label>
                            <input
                                type="number"
                                name="travelers"
                                min="1"
                                required
                                value={formData.travelers}
                                onChange={handleChange}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Budget Tier</label>
                        <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 appearance-none"
                        >
                            <option value="Cheap">Cheap (Hostels & Public Transit)</option>
                            <option value="Moderate">Moderate (Mid-range Stays)</option>
                            <option value="Luxury">Luxury (Premium Resorts)</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-teal-500 text-neutral-950 font-bold py-3.5 rounded-xl hover:bg-teal-400 transition-colors mt-4">
                        Generate Itinerary
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripForm;