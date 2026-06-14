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
            <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-white">
                <div className="animate-pulse text-teal-400 text-2xl font-bold">Loading Your Itinerary...</div>
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-white">
                <div className="text-red-400 text-xl font-bold">{error || "Trip not found"}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                    Your Dream Trip to <span className="text-teal-400 capitalize">{trip.destination}</span>
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-8 bg-neutral-950 p-4 rounded-xl border border-neutral-800/50">
                    <div>📅 <span className="text-white font-semibold">{trip.days} Days</span></div>
                    <div>🧑‍🤝‍🧑 <span className="text-white font-semibold">{trip.travelers} Traveler(s)</span></div>
                    <div>💰 <span className="text-white font-semibold capitalize">{trip.budget} Budget</span></div>
                </div>

                <div className="mt-6 space-y-8">
    <h2 className="text-2xl font-bold border-b border-neutral-800 pb-2 mb-6">Day-by-Day Plan</h2>
    
    {Array.isArray(trip.itinerary) ? (
        trip.itinerary.map((dayItem, dayIdx) => (
            <div key={dayIdx} className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 space-y-5">
                {/* Day Header */}
                <div className="border-b border-neutral-800/70 pb-3">
                    <h3 className="text-xl font-bold text-teal-400 tracking-tight">
                        Day {dayItem.day || dayIdx + 1}: {dayItem.theme || "Scheduled Activities"}
                    </h3>
                </div>
                
                {/* Activities for the Day */}
                {Array.isArray(dayItem.activities) ? (
                    <div className="space-y-4 pl-3 border-l-2 border-teal-500/20">
                        {dayItem.activities.map((act, actIdx) => (
                            <div key={actIdx} className="space-y-2 bg-neutral-900/50 p-4 rounded-lg border border-neutral-800/50">
                                {/* Time Badge */}
                                <span className="inline-block bg-teal-500/10 text-teal-400 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                    {act.time || "Scheduled"}
                                </span>
                                
                                <h4 className="text-base font-semibold text-white tracking-tight">{act.placeName}</h4>
                                <p className="text-neutral-400 text-sm leading-relaxed">{act.details}</p>
                                
                                {act.ticketPrice && (
                                    <div className="pt-2 border-t border-neutral-800/40 text-xs font-medium text-neutral-300 flex items-center gap-2">
                                        <span>🎟️ Ticket/Cost:</span>
                                        <span className="text-teal-300 font-semibold">{act.ticketPrice}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-300 text-sm whitespace-pre-wrap leading-relaxed">
                        {typeof dayItem.activities === "object" 
                            ? JSON.stringify(dayItem.activities, null, 2) 
                            : dayItem.activities || "No activities listed."}
                    </p>
                )}
            </div>
        ))
    ) : (
        <div className="text-neutral-400 text-sm">No structured itinerary available.</div>
    )}
</div>
            </div>
        </div>
    );
};

export default TripDetails;