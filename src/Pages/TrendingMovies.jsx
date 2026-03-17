import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../Components/Navbar';
import FilterButton from './Components/FilterButton';
import { fetchPopular, fetchTopRated, fetchNowplaying, fetchUpcoming } from "../Redux/MovieSlice"
import { useDispatch, useSelector } from 'react-redux';
import FilterMovie from './Components/FilterMovie';

export default function TrendingMovies() {
    const dispatch = useDispatch();
    const [active, setActive] = useState('Popular');
    const [page, setPage] = useState(1);
    const { NowPlaying, TopRated, upcoming, PopularMovie, isLoading, error } = useSelector((state) => state.movies)

    const moviesToShow = useMemo(() => {
        switch (active) {
            case 'Popular': return PopularMovie;
            case 'Top Rated': return TopRated;
            case 'Now Playing': return NowPlaying;
            case 'Upcoming': return upcoming;
            default: return PopularMovie;
        }
    }, [active, PopularMovie, TopRated, NowPlaying, upcoming]);

    useEffect(() => {
        setPage(1);
    }, [active]);

    useEffect(() => {
        const fetchActions = {
            'Popular': fetchPopular,
            'Top Rated': fetchTopRated,
            'Now Playing': fetchNowplaying,
            'Upcoming': fetchUpcoming
        };
        dispatch(fetchActions[active](page));
    }, [active, page, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (window.innerHeight + scrollTop + 120 >= scrollHeight && !isLoading) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);


    return (
        <div className="min-h-screen bg-black text-white">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            <div className="pt-20 max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-black mb-6">Movies</h1>

                <div className='flex gap-4 flex-wrap pb-2 scrollbar-hide no-scrollbar'>
                    <FilterButton
                        label="Popular"
                        isActive={active === 'Popular'}
                        onClick={() => setActive('Popular')}
                    />
                    <FilterButton
                        label="Top Rated"
                        isActive={active === 'Top Rated'}
                        onClick={() => setActive('Top Rated')}
                    />
                    <FilterButton
                        label="Now Playing"
                        isActive={active === 'Now Playing'}
                        onClick={() => setActive('Now Playing')}
                    />
                    <FilterButton
                        label="Upcoming"
                        isActive={active === 'Upcoming'}
                        onClick={() => setActive('Upcoming')}
                    />

                </div>
                {error ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 px-20 py-6 rounded-lg text-center max-w-md">
                            <h2 className="text-2xl font-bold mb-3">⚠️ API Error</h2>
                            <p className="text-sm">API is not working right now.</p>

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
                ) : (
                    <>
                        <FilterMovie
                            movies={moviesToShow}
                            loading={isLoading && moviesToShow.length === 0}
                        />

                        {isLoading && page > 1 && (
                            <div className="flex justify-center py-10">
                                <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}