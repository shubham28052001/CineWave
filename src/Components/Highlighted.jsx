import React from 'react'

export default function Highlighted() {
    const stats = [
        { number: "1M+", label: "Movies & Shows" },
        { number: "500K+", label: "Casts" },
        { number: "190+", label: "Countries" },
        { number: "Daily", label: "Fresh updates" },
    ];

    return (
        <section className="bg-black py-4 px-2 md:px-20 text-white">

            {/* Top line */}
            <div className="w-full h-[1px] bg-white/10 mb-2"></div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 md:gap-2 gap-0 text-center">

                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center py-6 rounded-xl 
      transition-all duration-700 ease-in-out cursor-pointer"
                    >
                        <div
                            className="group flex flex-col items-center py-6 rounded-xl 
  transition-all duration-300 ease-in-out cursor-pointer"
                        >
                            <h2 className="text-2xl md:text-3xl font-mono text-gray-300 transition-colors duration-300 group-hover:text-amber-300 group-active:text-amber-300">
                                {item.number}
                            </h2>

                            <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm transition-colors duration-300 group-hover:text-amber-300 group-active:text-amber-300">
                                {item.label}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            {/* Bottom line */}
            <div className="w-full h-[1px] bg-white/10 mt-2"></div>

        </section>
    )
}