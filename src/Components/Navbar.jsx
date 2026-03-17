import React, { useState } from "react";
import { NavLink } from "react-router";
import Logo from "../Pages/Components/Logo";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router";
import Searchbar from "./Searchbar";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const activeClass =
        "text-[#FFC33C] bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase rounded-lg transition-all";
    const normalClass =
        "text-gray-400 px-3 py-1 text-[11px] font-semibold uppercase rounded-lg transition-all hover:bg-white/10";

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
        <nav className="sticky top-0 left-0 w-full z-10 px-4 md:px-8 py-2 flex items-center justify-between
           bg-gray-900/80 shadow-sm transition-colors">

            <div className="flex items-center gap-4 md:gap-10">
                <Logo />

                {/* Desktop Links */}
                <div className="hidden pl-4 md:flex items-center gap-1 whitespace-nowrap">
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeClass : normalClass)}>Home</NavLink>
                    <NavLink to="/movies" className={({ isActive }) => (isActive ? activeClass : normalClass)}>Movies</NavLink>
                    <NavLink to="/TvShows" className={({ isActive }) => (isActive ? activeClass : normalClass)}>TV Shows</NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass)}>About</NavLink>

                    <NavLink
                        to="/mood"
                        className={({ isActive }) => `relative flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 group
                        ${isActive ? 'bg-yellow-500/10' : 'hover:bg-white/5'}`}
                    >
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>

                        <span className="text-sm font-bold tracking-wide bg-gradient-to-r from-[#FFC33C] to-[#ff9f1c] bg-clip-text text-transparent group-hover:brightness-110">
                            Mood AI
                        </span>

                        <span className="text-[7px] font-black px-1.5 py-0.5 bg-[#FFC33C] text-black rounded-md leading-none shadow-sm shadow-yellow-500/20">
                            NEW
                        </span>
                    </NavLink>
                </div>
            </div>

            <div className="hidden md:flex md:w-full">
                <Searchbar />
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-4">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex flex-col justify-center items-center w-8 h-8 gap-1"
                >
                    <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-900/95 flex flex-col items-center gap-4 py-4 md:hidden">


                    <div className="w-[80%]">
                        <Searchbar />
                    </div>

                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeClass : normalClass)} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/movies" className={({ isActive }) => (isActive ? activeClass : normalClass)} onClick={() => setMenuOpen(false)}>Movies</NavLink>
                    <NavLink to="/TvShows" className={({ isActive }) => (isActive ? activeClass : normalClass)} onClick={() => setMenuOpen(false)}>TV Shows</NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass)} onClick={() => setMenuOpen(false)}>About</NavLink>

                    <button
                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                        className="px-4 py-2 text-sm bg-red-600/80 text-white rounded-md font-medium hover:bg-red-700/90 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}

            {/* Desktop Logout */}
            <div className="hidden md:flex flex-none">
                <button
                    onClick={handleLogout}
                    className="px-4 py-1 text-sm bg-red-600/80 text-white rounded-md font-medium hover:bg-red-700/90 transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}