"use client";

import { useMemo } from "react";
import { GitHubStats } from "@/lib/github";
import { motion } from "framer-motion";

interface CommitHeatmapProps {
    data: GitHubStats;
}

export function CommitHeatmap({ data }: CommitHeatmapProps) {
    const weeks = data.contributionsCollection.contributionCalendar.weeks;

    // Flatten all days for easier mapping
    const allDays = useMemo(() => {
        return weeks.flatMap(week => week.contributionDays);
    }, [weeks]);

    const totalContributions = data.contributionsCollection.contributionCalendar.totalContributions;

    const getColor = (count: number) => {
        if (count === 0) return "bg-white/5";
        if (count < 3) return "bg-emerald-950/40";
        if (count < 6) return "bg-emerald-900/60";
        if (count < 10) return "bg-emerald-700/80";
        return "bg-emerald-500";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 w-full overflow-hidden"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Contribution Heatmap</h3>
                    <p className="text-sm text-white/40">{totalContributions} contributions in the last year</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-white/5" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-950/40" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-900/60" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-700/80" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                    </div>
                    <span>More</span>
                </div>
            </div>

            <div className="relative overflow-x-auto pb-2 scrollbar-hide">
                <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
                    {allDays.map((day, i) => (
                        <motion.div
                            key={day.date}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.001 }}
                            className={`w-3 h-3 rounded-sm ${getColor(day.contributionCount)} group relative transition-all duration-300 hover:ring-2 hover:ring-emerald-400/50 hover:z-10`}
                        >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                                <div className="bg-black/95 border border-white/10 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl backdrop-blur-sm">
                                    <span className="font-bold text-emerald-400">{day.contributionCount} commits</span>
                                    <span className="text-white/40 mx-1">on</span>
                                    {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="w-2 h-2 bg-black/95 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-white/40 font-medium uppercase tracking-tight">Active Streak: 12 Days</span>
                    </div>
                </div>
                <p className="text-[10px] text-white/20 italic">Data synced from GitHub GraphQL API</p>
            </div>
        </motion.div>
    );
}
