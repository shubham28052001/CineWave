import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByMood } from "../Redux/MovieSlice";
import FilterMovie from "./Components/FilterMovie"
export default function MoodMovies({ mood }) {
    const dispatch = useDispatch();
    const { moodMovies, moodLoading } = useSelector((state) => state.movies);

    useEffect(() => {
        if (mood) {
            dispatch(fetchMoviesByMood(mood));
        }
    },[mood, dispatch])
    return (
        <div className="w-full mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
         <FilterMovie
         movies={moodMovies}
         loading={moodLoading}
         />
        </div>
    )
}
