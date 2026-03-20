import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Curosuel from "../Components/Curosuel";
import Highlighted from "../Components/Highlighted";
import FetchTrending from "../Components/FetchTrending";
import FetchNowPlaying from "../Components/FetchNowplaying"
import FeaturedSection from "../Components/FeaturedSection";
import FetchTopRated from "../Components/FetchTopRated";
import FetchTvShows from "../Components/FetchTvShows";
import FetchPopular from "../Components/FetchPopular"
import Footer from "../Components/Footer";

export default function Dashboard() {

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
<div className="pt-8">
        <Curosuel />
</div>
      <Highlighted />
      <FetchTrending />
      <FetchNowPlaying />
      <FeaturedSection />
      <FetchPopular />
      <FetchTopRated />
      <FetchTvShows />
      <Footer />
    </div>
  );
}