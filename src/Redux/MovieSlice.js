import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    trending: [],
    NowPlaying: [],
    Featured: [],
    TopRated: [],
    Popular: [],
    Cast: [],
    Crew: [],
    searchResults: [],
    searchLoading: false,
    upcoming: [],
    CastByMovie: {},
    CrewByMovie: {},
    TopRatedTv: [],
    PopularMovie: [],
    AiringToday: [],
    OnTheAir: [],
    activeMovie: null,
    singleMovie: null,
    isLoading: true,
    key: "",
    similarByMovie: {},
    similarLoading: false,
    castLoading: false,
    error: null,
    personDetail: null,
    personCredits: [],
    personLoading: false,
    moodMovies: [],
    PopularPeople: [],
    moodLoading: false,
}

const API_KEY = import.meta.env.VITE_MOVIE_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const moodToGenre = {
    Happy: "35,16,12,10751",
    Melancholy: "18,10749",
    Intense: "28,53,80",
    Scared: "27,53",
    Curious: "878,12,14,9648",
};

export const fetchMoviesByMood = createAsyncThunk("movies/fetchByMood", async (mood) => {
    const genreId = moodToGenre[mood];
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results.slice(0, 40);
});


export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&page=1`);
    const data = await response.json();
    return data.results.slice(0, 15);
});

export const fetchTrending = createAsyncThunk("trending/fetchTrending", async () => {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
})

export const fetchNowplaying = createAsyncThunk("nowplaying/fetchNowplaying", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
})


export const fetchFeatured = createAsyncThunk("featured/fetch", async () => {
    const response = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.slice(0, 5);
});

export const fetchTopRated = createAsyncThunk("TopRated/fetchTopRated", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    }
})

export const fetchTvShows = createAsyncThunk("trending/fetchTvShows", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
})

export const fetchTopRatedTvShows = createAsyncThunk("tv/fetchTopRated", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
});

export const fetchAiringToday = createAsyncThunk("tv/fetchAiringToday", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
});

export const fetchOnTheAir = createAsyncThunk("tv/fetchOnTheAir", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
});

export const fetchPopular = createAsyncThunk("trending/Popular", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
})

export const fetchTrailer = createAsyncThunk("trailer/fetchTrailer", async ({ id, type }) => {
    const res = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    const trailer = (data.results || []).find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (!trailer) throw new Error("Trailer not found");
    return trailer.key;
});

export const fetchMovieDetail = createAsyncThunk("movies/fetchMovieDetail", async ({ id, type }) => {
    const endpoint = type === "tv" ? "tv" : "movie";
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    return data;
});

export const fetchCast = createAsyncThunk("movies/fetchCast", async ({ id, type }) => {
    const endpoint = type === "tv" ? "tv" : "movie";
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    return {
        Cast: data.cast?.slice(0, 15) || [],
        Crew: data.crew?.slice(0, 10) || []
    };
});


export const fetchSimilar = createAsyncThunk(
    "movies/fetchSimilar",
    async ({ id, type }) => {
        const endpoint = type === "tv" ? "tv" : "movie";
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await res.json();
        return data.results || [];
    }
);


export const fetchPersonDetail = createAsyncThunk("movies/fetchPersondetail", async (id) => {
    const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
});

export const fetchPersonCredits = createAsyncThunk("movies/fetchPersonCredits", async (id) => {
    const response = await fetch(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 20);
})

export const fetchUpcoming = createAsyncThunk("Fetch/upcoming", async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)
    const data = await response.json();
    return {
        results: data.results,
        page: page
    };
})

export const fetchSearchMovies = createAsyncThunk(
    "movies/search",
    async (query) => {
        console.log("API CALL:", query);
        const response = await fetch(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        console.log("🔥 DATA:", data);
        return data.results;
    }
);

export const fetchPopularPeople = createAsyncThunk(
    "movies/popularPeople",
    async (page = 1) => {
        const res = await fetch(
            `${BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`
        );
        const data = await res.json();
        return { results: data.results, page };
    }
);



const MovieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setActiveMovie: (state, action) => {
            state.activeMovie = action.payload;
        },
        clearTrailer: (state) => {
            state.key = "";
            state.isLoading = false;
            state.error = null;
        },
        clearSingleMovie: (state) => {
            state.singleMovie = null;
            state.Cast = [];
        }
    },
    extraReducers: (builder) => {
        builder

            //Fetch Curousel Movies
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            //Fetch Trending Movies

            .addCase(fetchTrending.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchTrending.fulfilled, (state, action) => {
                state.isLoading = false
                state.trending = action.payload
            })

            .addCase(fetchTrending.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            //Fetch Now Playing Movie

            .addCase(fetchNowplaying.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchNowplaying.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload;
                if (page === 1) {
                    state.NowPlaying = results
                } else {
                    state.NowPlaying = [...state.NowPlaying, ...results];
                }
            })

            .addCase(fetchNowplaying.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            //Fetch Featured Data


            .addCase(fetchFeatured.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchFeatured.fulfilled, (state, action) => {
                state.isLoading = false
                state.Featured = action.payload
                if (!state.activeMovie && action.payload.length > 0) {
                    state.activeMovie = action.payload[0];
                }
            })

            .addCase(fetchFeatured.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            //Fetch Top rated

            .addCase(fetchTopRated.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchTopRated.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload;
                if (page === 1) {
                    state.TopRated = results
                } else {
                    state.TopRated = [...state.TopRated, ...results];
                }
            })

            .addCase(fetchTopRated.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            // Fetch Popuar show

            .addCase(fetchTvShows.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchTvShows.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload
                if (page === 1) {
                    state.Popular = results
                }
                else {
                    state.Popular = [...state.Popular, ...results];
                }
            })

            .addCase(fetchTvShows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            //Fetch On the Air

            .addCase(fetchOnTheAir.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchOnTheAir.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload
                if (page === 1) {
                    state.OnTheAir = results
                }
                else {
                    state.OnTheAir = [...state.Popular, ...results];
                }
            })

            .addCase(fetchOnTheAir.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            // Fetch Top rated show 

            .addCase(fetchTopRatedTvShows.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchTopRatedTvShows.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload
                if (page === 1) {
                    state.TopRatedTv = results
                }
                else {
                    state.TopRatedTv = [...state.Popular, ...results];
                }
            })

            .addCase(fetchTopRatedTvShows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })

            //Fetch Trailer

            .addCase(fetchTrailer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTrailer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.key = action.payload;
            })
            .addCase(fetchTrailer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //MOvie Deatil


            .addCase(fetchMovieDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleMovie = action.payload;
            })
            .addCase(fetchMovieDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // Fetch Cast

            .addCase(fetchCast.pending, (state) => {
                state.castLoading = true;
                state.error = null;
            })
            .addCase(fetchCast.fulfilled, (state, action) => {
                state.castLoading = false;
                state.CastByMovie[action.meta.arg.id] = action.payload.Cast;
                state.CrewByMovie[action.meta.arg.id] = action.payload.Crew;
            })
            .addCase(fetchCast.rejected, (state, action) => {
                state.castLoading = false;
                state.error = action.error.message;
            })

            //Fetch Popular movie

            .addCase(fetchPopular.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPopular.fulfilled, (state, action) => {
                state.isLoading = false;
                const { results, page } = action.payload;
                if (page === 1) {
                    state.PopularMovie = results;
                } else {
                    state.PopularMovie = [...state.PopularMovie, ...results];
                }
            })

            .addCase(fetchPopular.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //Fetch Similar Movie

            .addCase(fetchSimilar.pending, (state) => {
                state.similarLoading = true;
                state.error = null;
            })
            .addCase(fetchSimilar.fulfilled, (state, action) => {
                state.similarLoading = false;
                state.similarByMovie[action.meta.arg.id] = action.payload;
            })
            .addCase(fetchSimilar.rejected, (state, action) => {
                state.similarLoading = false;
                state.error = action.error.message;
            })


            //Fetch PersonDetails

            .addCase(fetchPersonDetail.pending, (state) => {
                state.personLoading = true;
                state.error = null;
                state.personDetail = null;
            })
            .addCase(fetchPersonDetail.fulfilled, (state, action) => {
                state.personLoading = false;
                state.personDetail = action.payload;
            })
            .addCase(fetchPersonDetail.rejected, (state, action) => {
                state.personLoading = false;
                state.error = action.error.message;
                state.personDetail = null;
            })

            //Fetch Person Credits (Movies/Shows)

            .addCase(fetchPersonCredits.pending, (state) => {
                state.personLoading = true;
                state.error = null;
                state.personCredits = [];
            })
            .addCase(fetchPersonCredits.fulfilled, (state, action) => {
                state.personLoading = false;
                state.personCredits = action.payload;
            })
            .addCase(fetchPersonCredits.rejected, (state, action) => {
                state.personLoading = false;
                state.error = action.error.message;
                state.personCredits = [];
            })


            //Fetch Upcoming

            .addCase(fetchUpcoming.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchUpcoming.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload;
                if (page === 1) {
                    state.upcoming = results
                } else {
                    state.upcoming = [...state.upcoming, ...results];
                }
            })

            .addCase(fetchUpcoming.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })


            //Fetch Airing Today

            .addCase(fetchAiringToday.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })

            .addCase(fetchAiringToday.fulfilled, (state, action) => {
                state.isLoading = false
                const { results, page } = action.payload;
                if (page === 1) {
                    state.AiringToday = results
                } else {
                    state.AiringToday = [...state.NowPlaying, ...results];
                }
            })

            .addCase(fetchAiringToday.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message
            })




            // Mood Movies Handling


            .addCase(fetchMoviesByMood.pending, (state) => {
                state.moodLoading = true;
                state.moodMovies = [];
                state.error = null;
            })
            .addCase(fetchMoviesByMood.fulfilled, (state, action) => {
                state.moodLoading = false;
                state.moodMovies = action.payload;
            })
            .addCase(fetchMoviesByMood.rejected, (state, action) => {
                state.moodLoading = false;
                state.error = action.error.message;
            })

            //Search Movies

            .addCase(fetchSearchMovies.pending, (state) => {
                state.searchLoading = true;   
            })
            .addCase(fetchSearchMovies.fulfilled, (state, action) => {
                state.searchLoading = false;  
                state.searchResults = action.payload;
            })
            .addCase(fetchSearchMovies.rejected, (state) => {
                state.searchLoading = false;
            })
            
            //Fetch Popular people


            .addCase(fetchPopularPeople.pending, (state) => {
                state.isLoading = true;
            })
        .addCase(fetchPopularPeople.fulfilled, (state, action) => {
            state.isLoading = false;

            if (action.payload.page === 1) {
                state.PopularPeople = action.payload.results; // first load
            } else {
                state.PopularPeople = [...state.PopularPeople, ...action.payload.results]; // append
            }
        })
        .addCase(fetchPopularPeople.rejected, (state) => {
            state.isLoading = false;
        });



}
});

export const selectSimilarMovies = (movieId) =>
    createSelector(
        (state) => state.movies.similarByMovie,
        (similarByMovie) => similarByMovie[movieId] || []
    );

export const selectCastByMovie = (movieId) =>
    createSelector(
        (state) => state.movies.CastByMovie,
        (CastByMovie) => CastByMovie[movieId] || []
    );

export const selectCrewByMovie = (movieId) =>
    createSelector(
        (state) => state.movies.CrewByMovie,
        (CrewByMovie) => CrewByMovie[movieId] || []
    );

export const selectSimilarLoading = (state) => state.movies.similarLoading;

export const { setActiveMovie, clearTrailer, clearSingleMovie } = MovieSlice.actions;

export default MovieSlice.reducer;