import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: true,
    message: null,
    watchlist: [],
    favorites: []
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.message = null
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user
            state.message = action.payload.message
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.message = action.payload
        },
        logout: (state) => {
            state.user = null
            state.loading = false;
            state.message = "Logout Successfull"
        },
        clearMessage: (state) => {
            state.message = null
        },
        addToWatchlist: (state, action) => {
            if (!state.watchlist.includes(action.payload)) {
                state.watchlist.push(action.payload);
            }
        },
        removeFromWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter(item => item !== action.payload);
        },
        addToFavorites: (state, action) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(item => item !== action.payload);
        }
    }
});

export const { 
    loginStart,
    loginSuccess, 
    loginFailure, 
    logout, 
    clearMessage, 
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites } = AuthSlice.actions

export default AuthSlice.reducer;
