import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router';

function MovieCarousel({ title, subtitle, movies, loading }) {
    const navigate = useNavigate();
    const renderSkeletons = () => (
        Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="flex-none w-36 sm:w-40 md:w-42 lg:w-42">
                <Skeleton className="w-full h-52 sm:h-56 md:h-56 lg:h-56 rounded-lg mb-2" />
                <Skeleton width="90%" height={16} className="mb-1" />
                <Skeleton width={40} height={12} className="mb-1" />
            </div>
        ))
    );

    const getMediaType = (movie) => {
        if (movie.media_type) return movie.media_type === 'movie' ? 'Movie' : 'Series';
        return movie.title ? 'Movie' : 'Series';
    };

    const handleMovieClick = (movie) => {
        navigate(`/details/${movie.media_type || 'movie'}/${movie.id}?type=${movie.media_type || 'movie'}`);
    };

    return (
        <section className="bg-black text-white px-2 md:px-8 py-2">
            {title && <h2 className="text-[12px] font-black text-yellow-300 uppercase tracking-wider">{title}</h2>}
            {subtitle && <h3 className="text-3xl md:text-4xl font-black mb-4">{subtitle}</h3>}

            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                <SkeletonTheme baseColor="#1A1A1C" highlightColor="#2A2A2C">
                    {loading || !movies || movies.length === 0
                        ? renderSkeletons()
                        : movies.map((movie,index) => (
                            <div
                                key={`${movie.id}-${index}`}
                                className="relative flex-none w-36 sm:w-40 md:w-42 lg:w-42 cursor-pointer group rounded-2xl"
                                onClick={() => handleMovieClick(movie)}
                            >
                                {/* Top Border Gradient on Hover */}
                                <div className="absolute top-[0.5px] left-0 w-full h-1 opacity-0 group-hover:opacity-100
                                                bg-gradient-to-r from-yellow-300 via-yellow-200 to-white
                                                transition-all duration-300 rounded-t-4xl pointer-events-none z-10" />

                                {/* Poster Container */}
                                <div className="relative rounded-lg overflow-hidden bg-[#1A1A1C]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        loading="lazy"
                                        className="w-full h-52 sm:h-56 md:h-56 lg:h-56 object-cover group-hover:scale-105 transition-transform ease-in-out duration-300"
                                    />
                                    {/* Bottom Gradient Overlay */}
                                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                                    {/* Top-right: Media Type */}
                                    <div className="absolute top-2 right-2 bg-black/70 text-yellow-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase backdrop-blur-sm">
                                        {getMediaType(movie)}
                                    </div>

                                    {/* Bottom-left: Rating */}
                                    <div className="absolute bottom-2 left-2 flex items-center bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md">
                                        <span className="text-yellow-400 text-[10px] mr-1">⭐</span>
                                        <span className="font-bold text-[10px] text-white">
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Info below poster */}
                                <div className="mt-2">
                                    <p className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors duration-300">
                                        {movie.title || movie.name}
                                    </p>
                                    <p className="text-[11px] text-gray-500">
                                        {(movie.release_date || movie.first_air_date || '').slice(0, 4)}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </SkeletonTheme>
            </div>
            <div className="w-full h-[1px] bg-white/20 mt-2"></div>
        </section>
    );
}

export default React.memo(MovieCarousel);