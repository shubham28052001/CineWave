import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCast, selectCastByMovie, selectCrewByMovie } from '../Redux/MovieSlice'
import { useParams, useSearchParams } from 'react-router'
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useNavigate } from 'react-router'

function CastCrew() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const type = searchParams.get("type") || "movie"
  const dispatch = useDispatch()

  // Redux state using memoized selectors
  const Cast = useSelector(selectCastByMovie(id))
  const Crew = useSelector(selectCrewByMovie(id))
  const castLoading = useSelector(state => state.movies.castLoading)
  const error = useSelector(state => state.movies.error)

  useEffect(() => {
    if ((!Cast || Cast.length === 0) && (!Crew || Crew.length === 0)) {
      dispatch(fetchCast({ id, type }))
    }
  }, [dispatch, id, type, Cast, Crew])

if (castLoading || Cast.length === 0 || Crew.length === 0) {
  return (
    <div className="mt-8 bg-black/20 p-4 rounded-lg">
      <p className='text-yellow-400 font-black'>Featured</p>
      <h2 className="text-2xl font-black text-white mb-6">Cast & Crew</h2>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="min-w-[120px] flex flex-col items-center">
            <Skeleton
              circle
              height={96}
              width={96}
              baseColor="#1f2937"      
              highlightColor="#374151"
            />
            <Skeleton
              width={70}
              height={12}
              className="mt-2"
              baseColor="#1f2937"
              highlightColor="#374151"
            />
            <Skeleton
              width={50}
              height={10}
              baseColor="#1f2937"
              highlightColor="#374151"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="mt-8 bg-white/10 w-[99%] p-4 rounded-lg">
      <p className='text-yellow-400 font-black'>Featured</p>
      <h2 className="text-2xl font-black text-white mb-6">Cast & Crew</h2>

      <div className="flex overflow-x-auto scrollbar-hide md:space-x-2">
        {/* Cast */}
        {Cast.map((actor, index) => (
          <div
            key={`cast-${actor.id}-${index}`}
            className="min-w-[120px] flex flex-col items-center hover:scale-105 transition-transform duration-300"
             onClick={() => navigate(`/person/${actor.id}`)}
          >
            <img
              src={actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0"}
              alt={actor.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
            />
            <p className="text-white text-sm font-semibold mt-2 text-center">{actor.name}</p>
            <p className="text-gray-400 text-xs mt-1 text-center">{actor.character}</p>
          </div>
        ))}

        {/* Crew */}
        {Crew.map((member, index) => (
          <div
            key={`crew-${member.id}-${index}`}
            className="min-w-[120px] flex flex-col items-center hover:scale-105 transition-transform duration-300"
            onClick={() => navigate(`/person/${member.id}`)}
          >
            <img
              src={member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0"}
              alt={member.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
            />
            <p className="text-white text-sm font-semibold mt-2 text-center">{member.name}</p>
            <p className="text-gray-400 text-xs mt-1 text-center">{member.job}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(CastCrew);