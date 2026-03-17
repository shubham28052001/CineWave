import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, Star, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovies } from "../Redux/MovieSlice";
import { useNavigate } from "react-router";

export default function Searchbar() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchResults, searchLoading } = useSelector((state) => state.movies);

    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    const handleSearch = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            if (value.trim().length > 2) {
                dispatch(fetchSearchMovies(value));
            }
        }, 800);
    }, [dispatch]);

    const handleItemClick = React.useCallback((movie) => {
        setQuery("");

        if (movie.media_type === "person") {
            navigate(`/person/${movie.id}`);
        } else {
            navigate(`/details/${movie.media_type}/${movie.id}`);
        }
    }, [navigate]);


    const sortedResults = useMemo(() => {
        return [...searchResults]
            .filter(item => item.media_type)
            .sort((a, b) => {
                const order = { movie: 1, tv: 2, person: 3 };
                return order[a.media_type] - order[b.media_type];
            });
    }, [searchResults]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="flex items-center relative mx-4 max-w-lg w-full">
            {searchLoading ? (
                <div className="absolute left-3 w-4 h-4 border-t-2 border-yellow-400 rounded-full animate-spin" />
            ) : (
                <Search className="absolute left-3 text-gray-400 w-4 h-4" />
            )}

            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search movies, shows..."
                className="bg-white/5 text-white text-sm rounded-xl py-2 pl-10 pr-4 w-full outline-none border border-white/10 focus:border-yellow-500/50 transition-all"
            />

            {query.length > 2 && searchResults.length > 0 && (
                <div className="absolute top-11 left-0 w-full bg-[#080812] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]">
                    <div className="max-h-[450px] overflow-y-auto scrollbar-hide">
                        {sortedResults.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => handleItemClick(movie)}
                                className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all border-b border-white/5 last:border-none"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            movie.poster_path || movie.profile_path
                                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path || movie.profile_path}`
                                                : "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0"
                                        }
                                        alt=""
                                        className="w-8 h-12 object-cover rounded shadow-md"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[15px] text-white font-semibold leading-tight">
                                            {movie.title || movie.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-yellow-500/30">
                                                {movie.media_type === "movie" && "Movie"}
                                                {movie.media_type === "tv" && "Series"}
                                                {movie.media_type === "person" && "Actor"}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {(movie.release_date || movie.first_air_date || "").slice(0, 4)}
                                            </span>
                                            {movie.media_type !== "person" && movie.vote_average && (
                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    {movie.vote_average.toFixed(1)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}