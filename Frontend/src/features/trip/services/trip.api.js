import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/trip`; 

export const generateTripAPI = async (tripData) => {
    const response = await axios.post(`${API_URL}/`, tripData, {
        withCredentials: true
    });
    return response.data;
};

export const getTripByIdAPI = async (tripId) => {
    const response = await axios.get(`${API_URL}/${tripId}`, {
        withCredentials: true
    });
    return response.data;
};