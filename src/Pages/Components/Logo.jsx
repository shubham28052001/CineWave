import React from 'react'

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <img
                src="/image.png"
                alt="CineWave Logo"
                className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-[0.85] 
                        text-transparent [-webkit-text-stroke:1px_#FFC33C] opacity-90 italic">
                CineWave
            </h1>
        </div>
    )
}
