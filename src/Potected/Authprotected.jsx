import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function AuthProtected({ children }) {

    const { user, loading } = useSelector((state) => state.Auth);

    if (loading) {
        return (
            <div className="flex items-center bg-gray-800/90 justify-center h-screen">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}