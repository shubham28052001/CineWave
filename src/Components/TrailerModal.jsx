import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TrailerModal({ trailerKey, show, onClose }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trailerKey) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [trailerKey]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md">
      <div className="relative w-[90%] md:w-[80%] lg:w-[70%] h-[80%] bg-black/90 rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-700 ring-1 ring-gray-500/20 flex items-center justify-center">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white text-3xl font-extrabold hover:text-red-500 transition-colors duration-300"
        >
          &times;
        </button>

        {/* Now Playing */}
        <div className="absolute top-2 left-5 z-40 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_red] animate-pulse"></span>
          <span className="text-white font-bold uppercase tracking-widest text-sm md:text-base drop-shadow-lg">
            Now Playing
          </span>
        </div>

        {/* Skeleton or Iframe */}
        <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.3)] flex items-center justify-center">
          {loading ? (
            <Skeleton
              className="rounded-xl"
              width="100%"
              height="100%"
              baseColor="#1a1a1a"
              highlightColor="#333"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 text-white font-semibold text-sm md:text-base drop-shadow-lg text-center">
          Enjoy the Trailer
        </div>
      </div>
    </div>
  );
}

export default React.memo(TrailerModal);