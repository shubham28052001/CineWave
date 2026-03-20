import React, { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import AuthProtected from './Potected/Authprotected';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./Redux/AuthSlice";
import { auth } from "./Firebase/firebase";
import TrendingMovies from './Pages/TrendingMovies';
import ScrollToTop from './Components/ScrollToTop';
import PopularPeople from './Pages/PopularPeople';
const Landing = lazy(() => import("./Pages/Landing"))
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const MovieDetailed = lazy(() => import("./Pages/MovieDetail"))
const PersonDetail = lazy(() => import("./Pages/PersonDetail"))
const TrendingTvShows = lazy(() => import("./Pages/TrendingTvShows"))
const About = lazy(() => import("./Pages/About"))
const MoodAi = lazy(() => import("./Pages/MoodAi"))


export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const Authorized = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginSuccess({
          user: { uid: user.uid, email: user.email },
          message: null
        })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => Authorized();
  }, [dispatch]);

  return (
    <div className='selection:bg-[#FFC33C] selection:text-black'>
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-800/90">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      }>

        <ScrollToTop />

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<AuthProtected>
            <Dashboard />
          </AuthProtected>} />
          <Route path='/details/:type/:id' element={<AuthProtected>
            <MovieDetailed />
          </AuthProtected>} />

          <Route path='/person/:id' element={<AuthProtected>
            <PersonDetail />
          </AuthProtected>} />

          <Route path='/movies' element={<AuthProtected>
            <TrendingMovies />
          </AuthProtected>} />

          <Route path='/TvShows' element={<AuthProtected>
            <TrendingTvShows />
          </AuthProtected>} />

          <Route path='/about' element={<AuthProtected>
            <About />
          </AuthProtected>} />
          <Route path='/mood' element={<AuthProtected>
            <MoodAi />
          </AuthProtected>} />

          <Route path='/people' element={<AuthProtected>
            <PopularPeople />
          </AuthProtected>} />



        </Routes>
      </Suspense>
    </div>
  )
}
