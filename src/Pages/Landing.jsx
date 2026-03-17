import React from 'react'
import Logo from "./Components/Logo"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
export default function Landing() {
    const { user } = useSelector((state) => state.Auth);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/login")
        }
    }
    return (
        <div className='relative h-screen bg-cover bg-center flex items-center justify-center'
            style={{
                backgroundImage:
                    "url(https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg)",
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.82)_40%,rgba(0,0,0,0.98)_100%)]"></div>
            <div className="absolute top-5 left-5 z-20">
                <Logo />
            </div>

            <div className="relative z-20 text-center flex flex-col items-center px-5 max-w-4xl">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight">
                    Explore unlimited movies and TV shows at your fingertips.
                </h1>

                <button
                    onClick={handleGetStarted}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold text-xl px-6 py-3 rounded transition"
                >
                    Get Started &gt;
                </button>
            </div>
        </div>

    )
}
