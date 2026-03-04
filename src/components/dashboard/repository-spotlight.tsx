"use client";

import { useMemo } from "react";
import { GitHubStats } from "@/lib/github";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Flame, Trophy, Gem } from "lucide-react";

interface RepositorySpotlightProps {
    data: GitHubStats;
}

export function RepositorySpotlight({ data }: RepositorySpotlightProps) {
    const repos = data.repositories.nodes;

    const spotlight = useMemo(() => {
        // 1. Most Starred (Trophy)
        const mostStarred = [...repos].sort((a, b) => b.stargazerCount - a.stargazerCount)[0];

        // 2. Most Forked (Gem)
        const mostForked = [...repos].sort((a, b) => b.forkCount - a.forkCount)[0];

        // 3. Recently Hot (Flame) - Most recently updated
        const recentlyHot = [...repos].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];

        return [
            {
                title: "Star Performer",
                repo: mostStarred,
                icon: Trophy,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
                border: "border-yellow-400/20",
            },
            {
                title: "Fork Favorite",
                repo: mostForked,
                icon: Gem,
                color: "text-purple-400",
                bg: "bg-purple-400/10",
                border: "border-purple-400/20",
            },
            {
                title: "Recently Hot",
                repo: recentlyHot,
                icon: Flame,
                color: "text-orange-400",
                bg: "bg-orange-400/10",
                border: "border-orange-400/20",
            },
        ];
    }, [repos]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlight.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 border-l-4 ${item.border} relative group overflow-hidden`}
                >
                    {/* Background Highlight */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                                {item.title}
                            </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2 truncate group-hover:text-emerald-400 transition-colors">
                            {item.repo.name}
                        </h4>

                        <p className="text-sm text-white/50 mb-6 line-clamp-2 h-10 italic">
                            {item.repo.description || "No description provided."}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-yellow-400/70" />
                                    <span className="text-xs font-mono text-white/70">{item.repo.stargazerCount}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <GitFork className="w-3.5 h-3.5 text-purple-400/70" />
                                    <span className="text-xs font-mono text-white/70">{item.repo.forkCount}</span>
                                </div>
                            </div>

                            <a
                                href={item.repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                            >
                                <ExternalLink className="w-4 h-4 text-white/40" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
