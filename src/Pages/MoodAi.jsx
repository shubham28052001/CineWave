import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Navbar from "../Components/Navbar";
import MoodMovies from "./MoodMovies";

const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

export default function MoodAi() {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const resultsRef = useRef(null);

    const [mood, setMood] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const moodMapping = {
        happy: "Happy", sad: "Melancholy", angry: "Intense", fearful: "Scared",
        surprised: "Curious", neutral: "Neutral", disgusted: "Intense"
    };

    const moods = [
        { name: "Happy", key: "happy", desc: "Feel-good & uplifting", color: "#FFC33C" },
        { name: "Melancholy", key: "sad", desc: "Deep & emotional", color: "#3F8CFF" },
        { name: "Intense", key: "angry", desc: "Action & high stakes", color: "#F43F5E" },
        { name: "Scared", key: "fearful", desc: "Horror & suspense", color: "#A855F7" },
        { name: "Curious", key: "surprised", desc: "Sci-Fi & mind-bending", color: "#10B981" },
    ];

    useEffect(() => {
        async function loadModels() {
            try {
                const MODEL_URL = "/models";
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                setModelsLoaded(true);
            } catch (err) {
                console.error("Error loading models:", err);
            }
        }
        loadModels();
    }, []);

    useEffect(() => {
        if (cameraOn && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
        }
    }, [cameraOn]);

    useEffect(() => {
        if (mood && resultsRef.current) {
            resultsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [mood]);

    const startCamera = async () => {
        try {
            setMood(null);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            setCameraOn(true);
        } catch (err) {
            alert("Camera access denied!");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraOn(false);
        setIsScanning(false);
        setProgress(0);
    };

    const handleScanClick = () => {
        if (isScanning || !cameraOn) return;
        setIsScanning(true);
        setMood(null);
        setProgress(0);

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5; // Thoda fast progress
            if (currentProgress >= 100) {
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => executeScan(), 500);
            } else {
                setProgress(currentProgress);
            }
        }, 300);
    };

    const executeScan = async () => {
        if (!videoRef.current) return;

        setError(null);
        setIsScanning(true);

        try {
            const detections = await faceapi
                .detectAllFaces(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 })
                )
                .withFaceExpressions();

            if (detections && detections.length > 0) {
                const expressions = detections[0].expressions;
                const sorted = Object.entries(expressions)
                    .filter(([emotion]) => emotion !== "neutral")
                    .sort((a, b) => b[1] - a[1]);

                const topEmotion = sorted.length > 0 ? sorted[0][0] : "neutral";
                const finalMoodDisplayName = moodMapping[topEmotion] || "Neutral";

                setMood(finalMoodDisplayName);
                setError(null);
            } else {
                setError("Face not detected. Please try scanning again.");
                setTimeout(() => setError(null), 3000);
            }
        } catch (err) {
            console.error("AI Scan Error:", err);
            setError("System busy. Please check camera and try again.");
        } finally {
            setIsScanning(false);
            setProgress(0);
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
            <Navbar />

            <section className="relative z-10 flex flex-col items-center pt-18 pb-24 px-6">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_50%_40%,#FFC33C10,transparent_70%)]"></div>

                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_20%,transparent_100%)]"></div>
                </div>
                <div className="z-10 animate-fade-in-down">
                    <div className="flex items-center gap-2 px-4 py-1.5 border border-yellow-500/20 rounded-full bg-black/40 backdrop-blur-md">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-yellow-500 uppercase tracking-[0.3em] text-[10px] font-bold">
                            AI Movie Detection
                        </span>
                    </div>
                </div>
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
                        What's your <span className="text-green-500">mood?</span>
                    </h1>
                </div>

                <div className="max-w-5xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-2 items-center justify-center mb-10">

                        <div className="relative rounded-3xl border border-white/30 bg-white/20 backdrop-blur-3xl shadow-2xl max-w-sm mx-auto md:w-[55%] w-full">
                            <div className="relative h-[350px] w-full rounded-2xl bg-black overflow-hidden border border-white/5">
                                {error && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] bg-red-500 border border-red-500 backdrop-blur-md px-4 py-2 rounded-lg z-50 animate-bounce">
                                        <p className="text-white text-[10px] font-bold uppercase text-center tracking-wider">
                                            ⚠️ {error}
                                        </p>
                                    </div>
                                )}
                                {cameraOn ? (
                                    <>
                                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover grayscale-[20%]" />

                                        {/* PROGRESS COUNTDOWN OVERLAY */}
                                        {isScanning && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30">
                                                <div className="text-center">
                                                    <p className="text-5xl font-black text-yellow-500 mb-2">{progress}%</p>
                                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Analyzing Vibe...</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* MOOD OVERLAY BADGE */}
                                        {mood && !isScanning && (
                                            <div className="absolute top-4 left-4 z-20 animate-in zoom-in duration-300">
                                                <div className="bg-yellow-500 text-black px-4 py-2 rounded-xl shadow-lg border-2 border-yellow-400">
                                                    <p className="text-[10px] font-black uppercase tracking-tighter leading-none opacity-80">Detected</p>
                                                    <p className="text-lg font-bold uppercase tracking-widest">{mood}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className={`w-48 h-64 border-2 rounded-3xl transition-all duration-500 ${isScanning ? 'border-yellow-400 scale-105 shadow-[0_0_40px_rgba(255,195,60,0.2)]' : 'border-white/10'}`}>
                                                {isScanning && <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_15px_#eab308] animate-scan-move"></div>}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-700">
                                        <CameraIcon />
                                        <p className="mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">Sensor Offline</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 space-y-3 flex flex-col items-center justify-center">
                                {!cameraOn ? (
                                    <button onClick={startCamera} className=" py-2 px-6 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all text-[10px] mb-2">
                                        Enable Camera
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <button onClick={handleScanClick} disabled={isScanning} className="py-2 px-6 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all text-[10px]">
                                            <span className="relative z-10">{isScanning ? `Scanning... ${progress}%` : "Initiate Scan"}</span>
                                            
                                            <div className="absolute top-0 left-0 h-full bg-yellow-500/20 transition-all duration-150" style={{ width: `${progress}%` }}></div>
                                        </button>
                                        <button onClick={stopCamera} className="w-full py-1 px-1 mb-2  bg-red-500 border-2 border-red-500 text-white text-[10px] font-bold uppercase rounded-xl">Turn Off</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* MANUAL PICK SECTION */}
                        <div className="p-4 w-full md:w-[80%] h-[420px] rounded-3xl border border-white/5 bg-[radial-gradient(circle_farthest-side_at_20%_10%,#000,transparent_20%)] backdrop-blur-3xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Manual Pick</p>
                            <div className="grid grid-cols-1">
                                {moods.map((m) => {
                                    const isActive = mood === m.name;

                                    return (
                                        <button
                                            key={m.key}
                                            onClick={() => setMood(m.name)}
                                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${isActive
                                                ? 'bg-white/10 border-white/10 border'
                                                : 'hover:bg-white/[0.03] border border-transparent'
                                                }`}
                                        >
                                            
                                            <div className="w-2 h-2  rounded-full animate-pulse" style={{ backgroundColor: m.color }}></div>

                                            <div className="text-left">
                                                <h4 className={`font-black text-lg transition-colors ${isActive ? 'text-yellow-500' : 'text-white'
                                                    }`}>
                                                    {m.name}
                                                </h4>
                                                <p className="text-[10px] text-gray-500 uppercase">{m.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RESULTS SECTION */}
                    <div className="mt-10 border-t border-white/10 pt-16">
                        {mood ? (
                            <div ref={resultsRef} className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                                <div className="flex items-center justify-between mb-10 px-4">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter">
                                        Vibe: <span className="text-yellow-500">{mood}</span>
                                    </h2>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Scroll for more ↓</span>
                                </div>
                                <MoodMovies mood={mood} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center opacity-60">
                                <div className="w-16 h-16 mb-2 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl animate-pulse">😀</span>
                                </div>
                                <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-400">Search your mood</h3>
                                <p className="text-gray-500 max-w-xs mx-auto">Scan your face or pick a vibe manually to get movie recommendations.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes scan-move {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                .animate-scan-move {
                    animation: scan-move 2s linear infinite;
                }
            `}</style>
        </div>
    );
}