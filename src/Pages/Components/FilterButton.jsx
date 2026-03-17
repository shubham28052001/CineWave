import React from 'react'

export default function FilterButton({ label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-0.5 font-semibold text-[15px] rounded-3xl transition-all duration-300 border ${isActive
                    ? 'bg-yellow-500 text-black border-yellow-500 shadow-md shadow-yellow-500/20'
                    : 'text-gray-300 border-gray-400 hover:border-yellow-500/30 hover:text-yellow-500'
                }`}
        >
            {label}
        </button>
    )
}
