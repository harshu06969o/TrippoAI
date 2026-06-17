import axios from "axios";


const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_BACKEND_URL : "";
const API_URL = `${BASE_URL}/api/trip`; 

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