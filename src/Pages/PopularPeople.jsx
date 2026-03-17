import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "../Redux/MovieSlice";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Navbar from '../Components/Navbar';

export default function PopularPeople() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const { PopularPeople, isLoading } = useSelector((state) => state.movies);

    // 🔥 First load
    useEffect(() => {
        dispatch(fetchPopularPeople(1));
    }, [dispatch]);

    // 🔥 Pagination
    useEffect(() => {
        if (page === 1) return;
        dispatch(fetchPopularPeople(page));
    }, [page, dispatch]);

    // 🔥 Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
                !isLoading
            ) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]);

    // 🔥 Skeleton
    const renderSkeletons = () => (
        Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="w-full">
                <Skeleton className="w-full aspect-[2/3] rounded-lg mb-2" />
                <Skeleton width="90%" height={16} className="mb-1" />
                <Skeleton width={40} height={12} />
            </div>
        ))
    );

    return (
        <section className="bg-black text-white px-2 md:px-8 py-2">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>


            <div className='pt-20 max-w-7xl mx-auto px-6'>
                <p className='text-[12px] font-black text-yellow-300 uppercase tracking-wider'>Discover People</p>
                <h1 className="text-2xl font-bold mb-6">
                    Popular Actors
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

                    <SkeletonTheme baseColor="#1A1A1C" highlightColor="#2A2A2C">
                        {isLoading && PopularPeople.length === 0
                            ? renderSkeletons()
                            : PopularPeople.map((person, index) => (
                                <div
                                    key={`${person.id}-${index}`}
                                    className="relative w-full cursor-pointer group rounded-2xl"
                                >

                                    {/* 🔥 top glow line */}
                                    <div className="absolute top-[0.5px] left-0 w-full h-1 opacity-0 group-hover:opacity-100
                                bg-gradient-to-r from-yellow-300 via-yellow-200 to-white
                                transition-all duration-300 rounded-t-4xl pointer-events-none z-10" />

                                    <div className="relative rounded-lg overflow-hidden bg-[#1A1A1C]">

                                        <img
                                            src={
                                                person.profile_path
                                                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                                    : "https://via.placeholder.com/300x450"
                                            }
                                            alt={person.name}
                                            loading="lazy"
                                            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* gradient */}
                                        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                                        {/* 🔥 badge */}
                                        <div className="absolute top-2 right-2 bg-black/70 text-yellow-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase backdrop-blur-sm">
                                            Actor
                                        </div>

                                        {/* 🔥 popularity */}
                                        <div className="absolute bottom-2 left-2 flex items-center bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md">
                                            <span className="text-yellow-400 text-[10px] mr-1">⭐</span>
                                            <span className="font-bold text-[10px] text-white">
                                                {person.popularity?.toFixed(0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 🔥 text */}
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-300 truncate group-hover:text-white">
                                            {person.name}
                                        </p>

                                        <p className="text-[11px] text-gray-500 line-clamp-2">
                                            {person.known_for
                                                ?.map(item => item.title || item.name)
                                                .join(", ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </SkeletonTheme>
                </div>
            </div>

          
            {isLoading && page > 1 && (
                <div className="flex justify-center py-10">
                    <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </section>
    );
}