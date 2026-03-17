import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: true,
    message: null
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
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout,clearMessage } = AuthSlice.actions

export default AuthSlice.reducer;
