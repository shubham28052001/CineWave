import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice"
import MovieReducer from "./MovieSlice"

export const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        movies: MovieReducer,
    }
})