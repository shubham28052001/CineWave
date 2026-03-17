import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess, clearMessage } from "../Redux/AuthSlice";
import FromWrapper from "./Components/FormWrapper";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Redux state
    const { loading, message } = useSelector((state) => state.Auth)
    //Local State for Controlled Input
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        dispatch(clearMessage());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            return dispatch(loginFailure("please fill all fields"))
        }

        dispatch(loginStart());

        try {
            const response = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = response.user;
            dispatch(loginSuccess({
                user: {
                    uid: user.uid,
                    email: user.email,
                },
                message: "Login Successfull"
            }));
            console.log("loginSuccess", {
                email: user.email,
            });
            setTimeout(() => {
                navigate("/dashboard")
            }, 2000);

        } catch (error) {
            dispatch(loginFailure("Invalid email or password"));
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (

        <FromWrapper title="Login" message={message}>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 mb-4 rounded bg-white text-black outline-none"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-3 mb-4 rounded bg-white text-black outline-none"
                    onChange={handleChange}
                />

                <button
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-gray-400 mt-4 text-sm">
                    New to CineWave?{" "}
                    <Link to="/signup" className="text-white font-semibold">
                        Sign Up Now
                    </Link>
                </p>
            </form>
        </FromWrapper>

    );
}