import { Guitar } from "lucide-react";
import React, { useEffect, useState } from "react";

const usernames = ["divyesh2123", "shubham28052001", "harshilrajguru", "Harshdmali"];

function Github() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const promises = usernames.map((u) =>
                fetch(`https://api.github.com/users/${u}`).then((res) => res.json())
            );
            const results = await Promise.all(promises);
            setUsers(results);
        }
        fetchUsers();
    }, []);

    if (users.length === 0) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
        </div>
    );

    return (
        <section className="bg-black text-white p-2 flex flex-col items-center">

            <div className="mb-8 flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                    Powered by GitHub API
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-center uppercase tracking-tight mb-12">
                The People Behind <br />
                <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)]">CineWave</span>
            </h1>

            <div className="flex gap-8 flex-wrap justify-center w-full max-w-6xl">
                {users.map((user, index) => (
                    <div
                        key={user.login}
                        className="group relative w-[260px] bg-[#0D0D0F] border  border-white/5 rounded-2xl p-6 overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-yellow-500/30"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src={user.avatar_url}
                                alt={user.name}
                                className="w-16 h-16 rounded-full border-2 border-white/10 p-1 object-cover transition-colors duration-500 group-hover:border-yellow-500/50"
                            />
                            <div>
                                <h2 className="text-sm font-bold text-white capitalize">{user.name || user.login}</h2>
                                <p className="text-yellow-500/60 text-sm font-medium">@{user.login}</p>
                            </div>
                        </div>


                        <div className="mb-4 py-2 px-4 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-wider text-white">
                            {
                                index === 0
                                    ? "Software Specialist"
                                    : index === 1
                                        ? "Founder & FullStack Developer"
                                        : index === 2
                                            ? "UI/UX Designer"
                                            : "AI Engineer"
                            }
                        </div>


                        <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden">
                            {
                                index === 3
                                    ? "AI Engineer designing intelligent and innovative solutions with machine learning and neural networks."
                                    : (user.bio || "Passionate UI/UX designer crafting intuitive and engaging digital experiences. Skilled in wireframing, prototyping, and user-centered design.")
                            }
                        </p>


                        <div className="flex gap-6 mb-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-black text-white group-hover:text-yellow-500 transition-colors">
                                    {user.public_repos}
                                </span>
                                <span className="text-[9px] uppercase text-gray-500 font-black tracking-widest mt-1">
                                    Repos
                                </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-black text-white group-hover:text-yellow-500 transition-colors">
                                    {user.followers}
                                </span>
                                <span className="text-[9px] uppercase text-gray-500 font-black tracking-widest mt-1">
                                    Followers
                                </span>
                            </div>
                        </div>

                        <a
                            href={user.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-yellow-500 transition-all"
                        >
                            <span>View Profile</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>

            <p className="mt-8 flex items-center gap-1 text-gray-500 font-black text-[10px] uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                All profiles fetched live via GitHub API
            </p>
        </section>
    );
}

export default React.memo(Github);