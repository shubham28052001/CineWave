import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetail, fetchTrailer, clearTrailer } from "../Redux/MovieSlice";
import TrailerModal from "../Components/TrailerModal";
import StatBox from "./Components/StatBox";
import MovieHeader from "./Components/MovieHeader";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Cast from "../Components/Cast";
import Navbar from "../Components/Navbar";
import SimilarMovies from "../Components/SimilarMovies";
import Footer from "../Components/Footer";

export default function MovieDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { singleMovie, key: trailerKey, isLoading, error } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetail({ id, type }));
  }, [dispatch, id, type]);

  const handleWatchTrailer = useCallback(() => {
    dispatch(fetchTrailer({ id, type }));
    setShowModal(true);
  },[dispatch, id, type]);

  const formatCurrency = (num) => (num && num > 0) ? "$" + (num / 1000000).toFixed(0) + "M" : "N/A";

  if (isLoading || !singleMovie) {
    return (
      <section className="relative w-full min-h-screen bg-[#08080A] flex items-center justify-center px-6 md:px-16 py-10">
        <div className="flex flex-col lg:flex-row w-full gap-12">

          {/* Poster Skeleton */}
          <div className="flex-shrink-0 lg:flex-1 flex justify-center lg:justify-start">
            <Skeleton
              height={400}
              width={280}
              baseColor="#1a1a1a"
              highlightColor="#333"
              className="rounded-3xl"
            />
          </div>

          {/* Info Skeleton */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Genres Skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton height={25} width={60} baseColor="#1a1a1a" highlightColor="#333" className="rounded" />
              <Skeleton height={25} width={60} baseColor="#1a1a1a" highlightColor="#333" className="rounded" />
              <Skeleton height={25} width={80} baseColor="#1a1a1a" highlightColor="#333" className="rounded" />
            </div>

            {/* Title Skeleton */}
            <Skeleton
              height={50}
              width="70%"
              baseColor="#1a1a1a"
              highlightColor="#333"
              className="rounded"
            />

            {/* Ratings & Info Skeleton */}
            <div className="flex items-center gap-4 mt-2">
              <Skeleton height={25} width={50} baseColor="#1a1a1a" highlightColor="#333" className="rounded" />
              <Skeleton height={25} width={50} baseColor="#1a1a1a" highlightColor="#333" className="rounded" />
              <Skeleton height={25} width={70} baseColor="#1a1a1a" highlightColor="#333" className="rounded" />
            </div>

            {/* Overview Skeleton */}
            <Skeleton
              count={4}
              height={20}
              width="100%"
              baseColor="#1a1a1a"
              highlightColor="#333"
              className="rounded mt-4"
            />

            {/* Trailer Button Skeleton */}
            <div className="flex gap-4 mt-6">
              <Skeleton
                height={45}
                width={140}
                baseColor="#1a1a1a"
                highlightColor="#333"
                className="rounded"
              />
              <Skeleton
                height={45}
                width={140}
                baseColor="#1a1a1a"
                highlightColor="#333"
                className="rounded"
              />
            </div>
          </div>
        </div>

        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16 max-w-5xl mx-auto">
          {Array(5).fill(0).map((_, idx) => (
            <Skeleton
              key={idx}
              height={50}
              width="100%"
              baseColor="#1a1a1a"
              highlightColor="#333"
              className="rounded"
            />
          ))}
        </div>
      </section>
    );
  }
  if (error) return <div className="h-screen flex items-center justify-center text-red-500 bg-[#08080A]">{error}</div>;
  if (!singleMovie) return null;

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
       <div className="fixed top-0 left-0 w-full z-50">
              <Navbar />
            </div>


      <div className="absolute inset-0 z-0 h-[600px] md:h-[100vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${singleMovie.backdrop_path}`}
          className="w-full h-full object-cover opacity-40"
          alt="backdrop"
        />

        {/* Bottom gradient - smoother fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080A]/0 via-[#08080A]/20 to-black" />
        {/* Left gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center py-10">
        {/* Movie Header */}
        <MovieHeader
          movie={singleMovie}
          type={type}
          onWatchTrailer={handleWatchTrailer}
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16 max-w-5xl">
          {type === 'movie' ? (
            <>
              <StatBox label="RELEASE" value={singleMovie.release_date} />
              <StatBox label="RUNTIME" value={`${singleMovie.runtime}m`} />
              <StatBox label="LANGUAGE" value={singleMovie.original_language?.toUpperCase()} />
              <StatBox label="BUDGET" value={formatCurrency(singleMovie.budget)} />
              <StatBox label="REVENUE" value={formatCurrency(singleMovie.revenue)} />
            </>
          ) : (
            <>
              <StatBox label="FIRST AIR" value={singleMovie.first_air_date} />
              <StatBox label="SEASONS" value={singleMovie.number_of_seasons} />
              <StatBox label="EPISODES" value={singleMovie.number_of_episodes} />
              <StatBox label="STATUS" value={singleMovie.status} />
              <StatBox label="LANGUAGE" value={singleMovie.original_language?.toUpperCase()} />
            </>
          )}
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

        <Cast />
        <SimilarMovies/>
       <div className="mb-[-36px]">
         <Footer/>
       </div>


      </div>



    </div>
  );
}