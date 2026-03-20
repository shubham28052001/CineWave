import React from 'react';
import Logo from "./Components/Logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function Landing() {
    const { user } = useSelector((state) => state.Auth);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        user ? navigate("/dashboard") : navigate("/login");
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
            
            {/* 1. Background Image with Zoom-in Animation */}
            <motion.div 
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    // Background image attached
                    backgroundImage: "url(https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg)",
                }}
            />
            

            {/* 2. Overlays to make it 'Blackish' */}
            {/* LAYER 1: Base Dark Overlay (Isko adjust karein brightness control karne ke liye) */}
            <div className="absolute inset-0 bg-black/70 z-10" /> 
            
            {/* LAYER 2: Sophisticated Gradient (Deeper at top/bottom) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-15" />
            
            {/* LAYER 3: Radial glow for center focus (More subtle now) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.5)_100%)] z-15" />

            {/* 3. Header / Logo */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-center">
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Logo className="h-8 md:h-12" />
                </motion.div>
            </div>

            {/* 4. Main Content Area */}
            <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
                
                {/* Small Badge */}
                <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="px-4 py-1 mb-4 border border-white/20 bg-white/10 backdrop-blur-md rounded-full text-xs md:text-sm tracking-[3px] uppercase text-gray-300 font-medium"
                >
                    Now Streaming Everywhere
                </motion.span>

                {/* Main Heading */}
                <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 3, duration: 2 }}
                    className="text-white text-5xl md:text-8xl font-black leading-[1.1] max-w-5xl tracking-tighter drop-shadow-2xl"
                >
                    Unlimited Movies & <br /> 
                    <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">TV Shows.</span>
                </motion.h1>

                {/* Sub-text / Outline Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 4, duration: 3 }}
                    className="mt-6"
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none
                        text-transparent [-webkit-text-stroke:1px_rgba(255,195,60,0.6)] drop-shadow-lg">
                        Your Cinema Journey Starts
                    </h2>
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 5, type: "spring", stiffness: 100 }}
                    className="mt-10 w-full flex flex-col items-center"
                >
                    <button
                        onClick={handleGetStarted}
                        className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xl md:text-2xl px-12 py-5 rounded-md transition-all shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] active:scale-95"
                    >
                        Get Started
                        <span className="group-hover:translate-x-2 transition-transform duration-300">&gt;</span>
                    </button>
                    <p className="text-gray-400 mt-6 text-sm md:text-lg font-light tracking-wide">
                        Ready to watch? No credit card required.
                    </p>
                </motion.div>
            </div>

            {/* 5. Bottom Gradient Vignette */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
        </div>
    );
}