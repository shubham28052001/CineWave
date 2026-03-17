import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router'
import Github from '../Components/Github'
import Footer from '../Components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-30 pb-20 md:pb-30 overflow-y-auto overflow-x-hidden">

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]"></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_50%_40%,#FFC33C10,transparent_70%)]"></div>

          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_20%,transparent_100%)]"></div>
        </div>

        <div className="z-10 mb-6 animate-fade-in-down">
          <div className="flex items-center gap-2 px-4 py-1.5 border border-yellow-500/20 rounded-full bg-black/40 backdrop-blur-md">
           <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-500 uppercase tracking-[0.3em] text-[10px] font-bold">
              Our Story
            </span>
          </div>
        </div>

        <div className="z-10 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-[80px] font-black text-white uppercase tracking-tight leading-[0.85] drop-shadow-2xl">
            CineWave
          </h1>
          <h2 className="text-6xl w-full md:w-[70%] mt-6 md:text-[80px] font-black uppercase tracking-tight leading-[0.85] 
                        text-transparent [-webkit-text-stroke:4px_#FFC33C] opacity-90 italic">
            Your World of Movies Starts Here
          </h2>
        </div>

        <div className="z-10 mt-6 max-w-xl text-center">
          <p className="text-gray-400 text-sm md:text-sm leading-relaxed font-bold tracking-wide opacity-80">
            Cinewave is not just a movie discovery platform — it’s an experience.
            We believe every story deserves to be discovered, and every viewer deserves a cinematic journey worth remembering.
          </p>
        </div>

        <div className="z-10 mt-12 flex flex-col sm:flex-row gap-6">
          <Link to="/movies" className="bg-[#FFC33C] text-black px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#e5af36] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,195,60,0.2)]">
            Explore Movies
          </Link>
          <Link to="/mood" className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-yellow-300/20 transition-all">
            Try Mood AI
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-3 h-5 border border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-yellow-500 rounded-full animate-bounce" />
          </div>
          <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl p-4">

        <div className="relative group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent z-20"></div>
          <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:border-white/10">
            <span className="text-[#FFC33C] text-4xl font-black tracking-tighter mb-3">1,000,000+</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Titles Available</span>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent z-20"></div>
          <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:border-white/10">
            <span className="text-[#FFC33C] text-4xl font-black tracking-tighter mb-3">195</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Countries Covered</span>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent z-20"></div>
          <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:border-white/10">
            <span className="text-[#FFC33C] text-4xl font-black tracking-tighter mb-3">50,000+</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Active Users</span>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent z-20"></div>
          <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:border-white/10">
            <span className="text-[#FFC33C] text-4xl font-black tracking-tighter mb-3">99%</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Uptime Guaranteed</span>
          </div>
        </div>

      </div>

      <div className="relative bg-[#0C0C14] p-10 w-full text-white flex flex-col items-center overflow-hidden">

        <div className="absolute top-[50%] left-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <h3 className="text-[15rem] md:text-[15rem] font-black bg-gradient-to-t from-white/[0.01] via-white/[0.01] to-transparent bg-clip-text text-transparent leading-none uppercase tracking-tighter italic">
            CineWave
          </h3>
        </div>

        <div className="z-10 w-full flex flex-col items-center">
          <div className="md:w-[55%]">
            <p className="text-[#FFC33C] mt-3 text-[12px] font-bold uppercase pl-4">
              Our Manifesto
            </p>
          </div>

          <div className="max-w-5xl">
            <div className="space-y-2 uppercase">
              <p className="text-lg md:text-xl mt-4 text-gray-400 font-medium opacity-36">
                <span className="text-[#FFC33C]">—</span> We believe great cinema should be effortlessly discoverable.
              </p>

              <p className="text-lg md:text-xl text-gray-400 font-medium opacity-52">
                <span className="text-[#FFC33C]">—</span> We believe your mood should guide your next great film.
              </p>

              <p className="text-lg md:text-xl text-gray-400 font-medium opacity-70">
                <span className="text-[#FFC33C]">—</span> We believe design is not decoration — it is the experience.
              </p>

              <p className="text-lg md:text-xl text-gray-400 font-medium">
                <span className="text-[#FFC33C]">—</span> We believe premium should not mean expensive.
              </p>
            </div>

            <h2 className="pt-2 text-4xl md:text-2xl font-black text-white leading-tight">
              We are <span className="text-[#FFC33C]">CineWave</span> Your World of Movies Starts Here.
            </h2>
          </div>
        </div>
      </div>

      <Github/>

      <Footer/>

    </div>
  )
}