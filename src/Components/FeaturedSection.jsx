import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { fetchFeatured, setActiveMovie, fetchTrailer, clearTrailer } from '../Redux/MovieSlice';
import TrailerModal from './TrailerModal';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FeaturedSection() {
    const dispatch = useDispatch();

    const { Featured, activeMovie, isLoading, error, key: trailerKey } = useSelector(state => state.movies);

    const [fade, setFade] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchFeatured());
    }, [dispatch]);

    // Slider Logic
    useEffect(() => {
        if (!Featured || Featured.length === 0 || isLoading) return;
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                const currentIndex = Featured.findIndex(m => m.id === activeMovie?.id);
                const nextIndex = (currentIndex + 1) % Featured.length;
                dispatch(setActiveMovie(Featured[nextIndex]));
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [Featured, activeMovie, dispatch, isLoading]);

    const handleWatchTrailer = (movieId, type) => {
        dispatch(fetchTrailer({ id: movieId, type }));
        setShowModal(true);
    };


    if (isLoading || !Featured.length) {
        return (
            <SkeletonTheme baseColor="#1a1a1c" highlightColor="#323235">
                <div className="bg-black min-h-screen text-white p-4 md:p-10">
                    <div className="flex justify-between items-center mb-6">
                    </div>
                    <div className="grid lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3">
                            <Skeleton height={500} borderRadius={16} />
                        </div>
                        <div className="hidden md:flex flex-col space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <Skeleton height={80} width={60} borderRadius={8} />
                                    <div className="flex-1"><Skeleton count={2} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        );
    }

    if (error) return <div className="p-10 text-red-500">Error: {error}</div>;
    if (!activeMovie && !isLoading) return null;

    return (
        <div className="bg-black min-h-screen text-white p-4 md:p-10 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-[2px] bg-yellow-500"></div>
                    <span className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">Featured Picks</span>
                </div>
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">Curated Selection</span>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Hero Section */}
                <div className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-yellow-500/30 group min-h-[500px]">
                    <div className={`absolute inset-0 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path || activeMovie.poster_path}`}
                            alt={activeMovie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[500px]">
                        <div className="flex items-center space-x-3 text-xs font-bold mb-4">
                            <span className="text-yellow-500 border border-yellow-500/50 px-2 py-0.5 rounded">
                                ★ {activeMovie.vote_average?.toFixed(1)}
                            </span>
                            <span className="text-gray-400">
                                {(activeMovie.release_date || activeMovie.first_air_date || '').slice(0, 4)}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tighter italic">
                            {activeMovie.title || activeMovie.name}
                        </h1>
                        <p className="text-gray-400 max-w-xl text-sm md:text-base mb-8 line-clamp-2">{activeMovie.overview}</p>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleWatchTrailer(activeMovie.id, activeMovie.media_type || 'movie')}
                                className="bg-[#FFC33C] text-black px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#e5af36] transition-all"
                            >
                                Watch Trailer
                            </button>

                            <Link
                                to={`/details/${activeMovie.media_type || 'movie'}/${activeMovie.id}?type=${activeMovie.media_type || 'movie'}`}
                                className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-yellow-300/20 transition-all"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="md:flex hidden flex-col space-y-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {Featured.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => dispatch(setActiveMovie(movie))}
                            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all border ${activeMovie.id === movie.id ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-[#111113] border-transparent'
                                }`}
                        >
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="w-12 h-16 object-cover rounded-md mr-4" alt="poster" />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold truncate w-40">{movie.title || movie.name}</h4>
                                <p className="text-[10px] text-gray-500">★ <span className="text-yellow-500">{movie.vote_average?.toFixed(1)}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TrailerModal
                trailerKey={trailerKey}
                show={showModal}
                onClose={() => {
                    setShowModal(false)
                    dispatch(clearTrailer());
                }
                }
            />
        </div>
    );
}