import React from 'react'
import { Link, useNavigate } from 'react-router'
import Logo from '../Pages/Components/Logo'
import { useDispatch } from 'react-redux';
import { logout } from "../Redux/AuthSlice";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export default function Footer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.log("Logout error:", err);
        }
    };
    return (
        <footer className="bg-black text-gray-300 border-t border-gray-800 mt-2 text-sm">

            <div className="max-w-7xl mx-auto md:py-5 p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                {/* Section 1 - Logo */}
                <div className='flex flex-col gap-5'>
                    <Logo />
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Discover trending movies, popular TV shows and explore
                        your favourite actors. Stay updated with the latest
                        entertainment from around the world.
                    </p>
                </div>

                {/* Section 2 - Navigation */}
                <div>
                    <h3 className="text-sm font-semibold text-yellow-300/60 mb-2">Navigation</h3>
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-500  transition">Home</Link>
                        <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-500 transition">About</Link>
                        <Link to="/people" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-500 transition">People</Link>
                    </div>
                </div>

                {/* Section 3 - Browse */}
                <div>
                    <h3 className="text-sm font-semibold text-yellow-300/60 mb-2">Browse</h3>
                    <div className="flex flex-col gap-2">
                        <Link to="/movies" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-500 transition">Movies</Link>
                        <Link to="/TvShows" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-500 transition">TV Shows</Link>
                        <div className="md:flex flex-none">
                            <button
                                onClick={handleLogout}
                                className="hover:text-yellow-500 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 4 - Social Links */}
                <div>
                    <h3 className="text-sm font-semibold text-yellow-300/60 mb-2">Connect</h3>
                    <div className="flex flex-col gap-2">
                        <a
                            href="https://github.com/shubham28052001"
                            target="_blank"
                            className="hover:text-yellow-500 transition"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/shubham-sanodiya-5107a52a0/"
                            target="_blank"
                            className="hover:text-yellow-500 transition"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>

                        <a
                            href="https://www.instagram.com/_shubham_sanodiya"
                            target="_blank"
                            className="hover:text-yellow-500 transition"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-yellow-300/60 mb-4">Powered By</h3>
                    <p> Movie data from
                        <a
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-500 p-0.5 hover:underline"
                        >
                            TMDB
                        </a>
                        Built with React + Vite
                        Redux Toolkit + Tailwind</p>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 px-10 py-2 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-500 text-sm">
                <h1>© {new Date().getFullYear()} CineWave. All rights reserved.</h1>
                <p>This product uses the TMDB API but is not endorsed by TMDB.</p>
            </div>

        </footer>
    )
}