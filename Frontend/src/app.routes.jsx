import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

import TripForm from "./features/trip/pages/TripForm";
import TripDetails from "./features/trip/pages/TripDetails";

export const router = createBrowserRouter([
    // Public Auth Routes
    { 
        path: "/login", 
        element: <Login /> 
    },
    { 
        path: "/register", 
        element: <Register /> 
    },
    
    // Protected Trip Routes
    { 
        path: "/", 
        element: (
            <Protected>
                <TripForm />
            </Protected>
        )
    },
    { 
        path: "/trip/:id", 
        element: (
            <Protected>
                <TripDetails />
            </Protected>
        )
    },
    
    // Fallback/Catch-all Route
    { 
        path: "*", 
        element: <Navigate to="/" replace /> 
    }
]);