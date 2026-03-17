import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPersonDetail, fetchPersonCredits } from '../Redux/MovieSlice';
import Navbar from "../Components/Navbar"
import MovieCarousel from '../Components/MovieCarousel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from '../Components/Footer';

export default function PersonDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { personDetail, personCredits, personLoading } = useSelector(state => state.movies);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        dispatch(fetchPersonDetail(id));
        dispatch(fetchPersonCredits(id));
    }, [id, dispatch]);

    const creditsList = useMemo(() => personCredits, [personCredits]);

if (personLoading) {
    return (
        <div className="min-h-screen bg-black p-6 lg:py-20 lg:px-10">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className="flex flex-col gap-10 mt-24"> 
                <div className="flex gap-7 flex-col md:flex-row">

                    {/* Left Column Skeleton */}
                    <div className="flex flex-col md:items-center gap-4">
                        <Skeleton
                            height={270}
                            width={180}
                            className="rounded-xl shadow-2xl border border-gray-800"
                            baseColor="#1a1a1a"
                            highlightColor="#333"
                        />
                        <div className="mt-2 space-y-2 w-full">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    height={24}
                                    width="80%"
                                    className="rounded-xl"
                                    baseColor="#1a1a1a"
                                    highlightColor="#333"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="md:w-2/3 flex flex-col gap-2">
                        <Skeleton height={20} width={120} baseColor="#1a1a1a" highlightColor="#333" />
                        <Skeleton height={56} width="70%" baseColor="#1a1a1a" highlightColor="#333" />
                        <Skeleton height={2} width="70%" className="my-2" baseColor="#1a1a1a" highlightColor="#333" />
                        <Skeleton count={5} height={16} width="100%" baseColor="#1a1a1a" highlightColor="#333" />
                        <Skeleton height={24} width="50%" className="mt-4" baseColor="#1a1a1a" highlightColor="#333" />
                    </div>
                </div>


                <div className="mt-6 border-t border-gray-800 pt-2">
                    <div className="mb-6">
                        <Skeleton height={24} width={200} className="mb-2" baseColor="#1a1a1a" highlightColor="#333" />
                        <Skeleton height={16} width={120} baseColor="#1a1a1a" highlightColor="#333" />
                    </div>

                    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-0">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="min-w-[160px] flex flex-col gap-2">
                                <Skeleton height={240} width={160} className="rounded-xl" baseColor="#1a1a1a" highlightColor="#333" />
                                <Skeleton height={20} width={140} className="rounded" baseColor="#1a1a1a" highlightColor="#333" />
                                <Skeleton height={16} width={100} className="rounded" baseColor="#1a1a1a" highlightColor="#333" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

    const calculateAge = (birthday) => {
        if (!birthday) return "N/A";
        const birthDate = new Date(birthday);
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
    };

    return (
        <div className="min-h-screen bg-black text-[#e3e3e3] p-6 lg:py-20 lg:px-10">

            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {personDetail && (
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-7 flex-col md:flex-row">


                        <div className="flex flex-col items-center md:items-center">
                            <img
                                className="w-[180px] h-[270px] md:mt-0 mt-10 object-cover rounded-xl shadow-2xl border border-gray-800"
                                src={personDetail.profile_path
                                    ? `https://image.tmdb.org/t/p/w200${personDetail.profile_path}`
                                    : "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0"}
                                alt={personDetail.name}
                            />

                            <div className="mt-2 space-y-2">
                                <div className="flex gap-16 items-center rounded-xl  p-2 bg-white/5 border border-gray-400">
                                    <p className="text-gray-600 text-[10px] uppercase tracking-widest">Known For</p>
                                    <p className="font-semibold truncate text-[12px] max-w-[80px]">{personDetail.known_for_department || "Acting"}</p>
                                </div>

                                <div className="flex gap-20 items-center rounded-xl p-2 bg-white/5 border border-gray-400">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Born</p>
                                    <p className="font-semibold text-[12px]">{personDetail.birthday || "N/A"}</p>
                                </div>

                                <div className="flex gap-28 items-center rounded-xl p-2 bg-white/5 border border-gray-400">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Age</p>
                                    <p className="font-semibold text-[12px]">{calculateAge(personDetail.birthday)} yrs</p>
                                </div>

                                <div className="flex gap-1 items-center rounded-xl p-2 bg-white/5 border border-gray-400">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">From</p>
                                    <p className="font-semibold truncate text-[12px] max-w-[140px]">{personDetail.place_of_birth || "N/A"}</p>
                                </div>

                                <div className="flex gap-20 items-center rounded-xl p-2 bg-white/5 border border-gray-400">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Popularity</p>
                                    <p className="font-semibold text-[12px] text-yellow-500">{personDetail.popularity?.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>


                        <div className="md:w-2/3">
                            <h4 className="text-yellow-500 font-black uppercase text-sm">{personDetail.known_for_department || "Acting"}</h4>
                            <h1 className="text-5xl md:text-6xl font-black uppercase mb-2 leading-tight">
                                {personDetail.name}
                            </h1>

                            <div className="w-[70%] h-0.5 opacity-100
                                                bg-gradient-to-r from-yellow-500 via-yellow-200 to-[#080808]
                                                transition-all duration-300 mb-4"></div>

                            <div>
                                <p className={`text-[16px] text-gray-400 leading-relaxed max-w-2xl italic mb-6 ${!isExpanded && "line-clamp-5"}`}>
                                    {personDetail.biography || "No biography available for this artist."}
                                </p>

                                {personDetail.biography && personDetail.biography.length > 120 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-yellow-500 font-bold uppercase text-xs flex items-center gap-2 hover:underline"
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                        <span className={`text-sm transition-transform ${isExpanded ? "rotate-180" : ""}`}>↓</span>
                                    </button>
                                )}

                                {personDetail.popularity && (
                                    <div className="mt-4 max-w-xs flex flex-col justify-center items-center gap-2.5 w-full">
                                        <div className='flex justify-between w-full'>
                                            <p className="text-gray-400 text-xs uppercase">Popularity</p>
                                            <p className="font-semibold text-[12px] text-yellow-500">
                                                {personDetail.popularity.toFixed(1)}
                                            </p>
                                        </div>
                                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-2 bg-gradient-to-r from-yellow-500 via-yellow-200 to-gray-700 transition-all duration-500"
                                                style={{ width: `${Math.min(personDetail.popularity, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>

                    {/* Filmography Section */}
                    <div className=" mt-6 border-t border-gray-800 pt-2">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-yellow-500 font-bold uppercase tracking-tighter">Filmography</h2>
                            <p className="text-gray-600 text-sm">{personCredits.length} titles</p>
                        </div>

                        <MovieCarousel title="Screen Portfolio"
                            subtitle="Top Casts"
                            movies={creditsList}
                            loading={personLoading || creditsList.length === 0} />

                       <div className='mb-[-76px]'>
                         <Footer/>
                       </div>
                    </div>
                </div>
            )}
        </div>
    );
}