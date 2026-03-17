import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchTrending } from '../Redux/TrendingSlice';
import { fetchTrending } from "../Redux/MovieSlice"
import MovieCarousel from './MovieCarousel';

export default function FetchTrending() {
    const dispatch = useDispatch();
    const { trending, isLoading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchTrending());
    }, [dispatch]);

    if (error) {
        return (
            <div className="flex items-center justify-center bg-black mt-2">
                <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 px-20 py-1 rounded-lg text-center max-w-md">
                    <h2 className="text-xl font-semibold mb-2">⚠️ API Error</h2>
                    <p className="text-sm">
                        API is not working right now.
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                        Error: {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (

        <MovieCarousel
            title="This Week"
            subtitle="Trending Now"
            movies={trending}
            loading={isLoading || trending.length === 0}
        />
    );
}