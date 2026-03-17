import React from 'react'

function StatBox({ label, value }) {
    return (
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-5 md:mt-[-30px]  mt-[-10px] rounded-2xl">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-1 uppercase">{label}</p>
            <p className="text-sm md:text-base font-black text-white">{value || "N/A"}</p>
        </div>
    );
}
export default React.memo(StatBox);



