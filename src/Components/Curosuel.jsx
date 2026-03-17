import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchTrailer, clearTrailer } from "../Redux/MovieSlice";
import TrailerModal from "./TrailerModal";
import { } from '../Redux/MovieSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from "react-router"

export default function Carousel() {
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { items, isLoading, error, key: trailerKey } = useSelector((state) => state.movies);

    const movieData = useMemo(() => {
        if (!items.length) return null;
        const movie = items[currentIndex];
        return {
            movie,
            title: movie.title || movie.name,
            year: (movie.release_date || movie.first_air_date)?.slice(0, 4),
            backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };
    }, [items, currentIndex]);

    const { movie, title: movieTitle, year: movieYear, backdrop, poster } = movieData || {};

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        if (!items.length || showModal) return;
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % items.length);
                setFade(true);
            }, 400);
        }, 5000);
        return () => clearInterval(interval);
    }, [items.length, showModal]);

    const handleWatchTrailer = (movieId, type) => {
        dispatch(fetchTrailer({ id: movieId, type }));
        setShowModal(true);
    };

    if (isLoading || !items.length) {
        return (
            <section className="relative w-full min-h-screen bg-[#08080A] flex items-center justify-center px-8 md:px-24">
                <div className="flex flex-col md:flex-row gap-8 w-full">

                    <div className="flex-1 flex flex-col gap-4">
                        <Skeleton
                            height={40}
                            width={260}
                            baseColor="#1a1a1a"
                            highlightColor="#333"
                            className="rounded"
                        />

                        <Skeleton
                            height={80}
                            width={300}
                            baseColor="#1a1a1a"
                            highlightColor="#333"
                            className="rounded"
                        />

                        <Skeleton
                            height={20}
                            width={100}
                            baseColor="#1a1a1a"
                            highlightColor="#333"
                            className="rounded"
                        />

                        <Skeleton
                            height={100}
                            width="100%"
                            baseColor="#1a1a1a"
                            highlightColor="#333"
                            className="rounded"
                        />

                        <div className="flex gap-4 mt-4">
                            <Skeleton
                                height={40}
                                width={120}
                                baseColor="#1a1a1a"
                                highlightColor="#333"
                                className="rounded"
                            />
                            <Skeleton
                                height={40}
                                width={120}
                                baseColor="#1a1a1a"
                                highlightColor="#333"
                                className="rounded"
                            />
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-end">
                        <Skeleton
                            height={350}
                            width={250}
                            baseColor="#1a1a1a"
                            highlightColor="#333"
                            className="rounded-3xl"
                        />
                    </div>

                </div>
            </section>
        );
    }

    if (error) return <div className="h-screen bg-[#08080A] flex justify-center items-center text-red-500">{error}</div>;



    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#08080A] text-white selection:bg-[#FFC33C] selection:text-black">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${backdrop})` }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(8,8,10,0.9)_0%,rgba(8,8,10,0.7)_40%,rgba(8,8,10,0.4)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20 gap-10">
                {/* Left Text */}
                <div className={`flex-1 flex flex-col mt-12 md:mt-0 items-start gap-4 md:gap-4 transition-all duration-500 ${fade ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#FFC33C]"></span>
                            <span className="text-[#FFC33C] text-xs font-black tracking-[0.2em] uppercase">
                                Trending {movie.media_type === "movie" ? "Film" : "Series"}
                            </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[#FFC33C] text-[10px] font-bold">
                            ⭐ {movie.vote_average?.toFixed(1)}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tighter uppercase drop-shadow-2xl line-clamp-2">
                        {movieTitle}
                    </h1>

                    <div className="flex items-center gap-4 text-gray-400 font-medium text-sm">
                        <span className="text-white bg-[#FFC33C]/20 px-2 py-0.5 rounded text-xs">{movieYear}</span>
                        <span className="text-xl opacity-30">•</span>
                        <span className="tracking-widest">{movie.original_language?.toUpperCase()}</span>
                        <span className="text-xl opacity-30">•</span>
                        <span className="tracking-widest uppercase">HD / 4K</span>
                    </div>

                    <p className="max-w-xl text-gray-300 text-base md:text-md leading-relaxed font-light line-clamp-3">
                        {movie.overview.length > 200 ? movie.overview.slice(0, 200) + "..." : movie.overview}
                    </p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
                        <button
                            onClick={() => handleWatchTrailer(movie.id, movie.media_type || 'movie')}
                            className="bg-[#FFC33C] text-black px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#e5af36] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,195,60,0.2)]"
                        >
                            Watch Trailer
                        </button>

                        <Link
                            to={`/details/${movie.media_type || 'movie'}/${movie.id}?type=${movie.media_type || 'movie'}`}
                            className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-yellow-300/20 transition-all"
                        >
                            View Details
                        </Link>
                    </div>
                </div>

                {/* Right Poster */}
                <div className={`hidden lg:flex flex-1 justify-end transition-all duration-500 ${fade ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FFC33C]/30 to-red-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative w-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <img src={poster} alt={movieTitle} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-[10px] font-bold text-[#FFC33C] tracking-widest uppercase">Now Streaming</p>
                                <h4 className="text-lg font-bold truncate tracking-tight">{movieTitle}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-12 left-2 md:left-24 flex items-center gap-2 z-20">
                <div className="flex gap-1">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 transition-all duration-500 rounded-full ${idx === currentIndex ? "w-12 bg-[#FFC33C]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                        />
                    ))}
                </div>
                <div className="text-[10px] font-black tracking-widest text-gray-500">
                    <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
                </div>
            </div>

            {/* Scroll */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <div className="w-3 h-5 border border-white rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-yellow-500 rounded-full animate-bounce" />
                </div>
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Scroll</span>
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
        </section>
    );
}