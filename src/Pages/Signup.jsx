import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./Components/Logo";
import { auth, db } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, clearMessage } from "../Redux/AuthSlice";
import FromWrapper from "./Components/FormWrapper";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.Auth);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        dispatch(clearMessage());
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            return dispatch(loginFailure("Please fill all fields"));
        }
        dispatch(loginStart());
        try {

            const userCreated = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            await setDoc(doc(db, "users", userCreated.user.uid), {
                name: form.name,
                email: form.email,
                createdAt: new Date()
            });

            dispatch(loginSuccess({
                user: {
                    uid: userCreated.user.uid,
                    email: userCreated.user.email
                },
                message: "Account Registered please Login"
            }));

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.log(err.message);

            if (err.code === "auth/email-already-in-use") {
                dispatch(loginFailure("Email already registered"));
            }
            else if (err.code === "auth/weak-password") {
                dispatch(loginFailure("Password must be 6+ characters"));
            }
            else {
                dispatch(loginFailure("Signup failed"));
            }
        }
    };

    return (

        <FromWrapper title="Signup" message={message}>
            <form onSubmit={handleSubmit} className="flex flex-col">

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="p-3 mb-4 rounded bg-white text-black outline-none"
                    onChange={handleChange}
                />

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
                    {loading ? "Signing up..." : "Signup"}
                </button>
                <p className="text-gray-400 mt-4 text-sm">
                    Already in Cinverse?{" "}
                    <Link to="/login" className="text-white font-semibold">
                        Log In Now
                    </Link>
                </p>
            </form>
        </FromWrapper>

    );
}