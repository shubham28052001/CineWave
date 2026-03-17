import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilar, selectSimilarMovies, selectSimilarLoading } from "../Redux/MovieSlice";
import { useParams, useSearchParams } from "react-router";
import MovieCarousel from "./MovieCarousel";

function SimilarMovies() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "movie";

    const dispatch = useDispatch();
    const similar = useSelector(selectSimilarMovies(id));
    const loading = useSelector(selectSimilarLoading);
    useEffect(() => {
        dispatch(fetchSimilar({ id, type }));
    }, [dispatch, id, type]);

    return (
        <MovieCarousel
            title="Similar Movies"
            subtitle="You may also like"
            movies={similar}
            loading={loading || similar.length === 0}
        />
    );
}

export default React.memo(SimilarMovies);