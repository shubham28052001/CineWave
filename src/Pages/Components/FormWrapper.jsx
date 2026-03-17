import React from 'react'
import Logo from './Logo'
export default function FromWrapper({ title, message, children }) {
    return (
        <div
            className="relative h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url(https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg)",
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.82)_40%,rgba(0,0,0,0.98)_100%)]"></div>
            <div className="absolute top-5 left-5 z-20">
                <Logo />
            </div>

            <div className="relative z-20 bg-black/80 p-10 rounded-lg w-[350px] text-center shadow-2xl text-white">
                {message && (
                    <p className="bg-yellow-500 text-black py-2 mb-3">{message}</p>
                )}

                <h2 className="text-3xl text-white font-bold mb-6">{title}</h2>

                {children}
            </div>
        </div>
    )
}
