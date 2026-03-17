import React from "react";

 function MovieHeader({ movie, type, onWatchTrailer }) {
    return (
        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">

            {/* Poster */}
            <div className="w-80 py-4 md:w-60 md:mt-10 flex-shrink-0">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-2xl w-full shadow-2xl border border-white/10"
                    alt="poster"
                />
            </div>

            {/* Info */}
            <div className="flex-1 md:mt-16">
                {/* Genres + Type */}
                <div className="flex flex-wrap gap-1">
                    {movie.genres?.map(g => (
                        <span key={g.id} className="text-[8px] font-bold uppercase tracking-widest px-3 py-1 border border-white/20 rounded bg-white/5 hover:bg-yellow-500/30 hover:text-yellow-500 cursor-pointer">
                            {g.name}
                        </span>
                    ))}
                    <span className="text-[10px] font-bold uppercase text-yellow-500 tracking-widest px-3 py-1 bg-yellow-500/30 rounded">
                        {type === 'tv' ? 'TV SERIES' : 'MOVIE'}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                    {movie.title || movie.name}
                </h1>

                {/* Ratings & Info */}
                <div className="flex items-center gap-6 text-gray-300 font-semibold mt-1">
                    <span className="text-yellow-500 border border-yellow-500/30 px-2 py-0.2 rounded bg-yellow-500/10">
                        ★ {movie.vote_average?.toFixed(1)}
                    </span>
                    <span>{(movie.release_date || movie.first_air_date)?.slice(0, 4)}</span>
                    <span>{type === 'tv' ? `${movie.number_of_seasons} Seasons` : `${movie.runtime} min`}</span>
                </div>

                {movie.tagline && (
                    <p className="text-yellow-500/90 italic text-sm md:text-base mt-2">
                        {movie.tagline}
                    </p>
                )}

                {/* Overview */}
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                    {movie.overview}
                </p>

                {/* Trailer Button */}
                {onWatchTrailer && (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <button
                            onClick={onWatchTrailer}
                            className="bg-[#FFC33C] text-black px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#e5af36] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,195,60,0.2)]"
                        >
                            Watch Trailer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(MovieHeader);