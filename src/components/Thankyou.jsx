import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
    const { state } = useLocation();
    const orderTotal = state?.orderTotal || 0;
    const navigate = useNavigate();

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
            <p className="text-sm text-gray-600 mb-4">Your order of ${orderTotal.toFixed(2)} has been placed.</p>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm font-medium"
                onClick={() => navigate('/')}
            >
                Return to Home
            </button>
        </div>
    );
};

export default ThankYou;