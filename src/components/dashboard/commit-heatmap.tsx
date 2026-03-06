"use client";

import { useMemo } from "react";
import { GitHubStats } from "@/lib/github";
import { motion } from "framer-motion";

interface CommitHeatmapProps {
    data: GitHubStats;
}

export function CommitHeatmap({ data }: CommitHeatmapProps) {
    const calendar = data.contributionsCollection.contributionCalendar;
    const contributionMap = useMemo(() => {
        const map = new Map<string, number>();
        calendar.weeks.forEach(week => {
            week.contributionDays.forEach(day => {
                map.set(day.date, day.contributionCount);
            });
        });
        return map;
    }, [calendar]);

    const currentYear = new Date().getFullYear();

    // Generate all days for the current year
    const currentYearDays = useMemo(() => {
        const days = [];
        const start = new Date(currentYear, 0, 1);
        const end = new Date(currentYear, 11, 31);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            days.push({
                date: dateStr,
                contributionCount: contributionMap.get(dateStr) || 0
            });
        }
        return days;
    }, [currentYear, contributionMap]);

    const last365Days = useMemo(() => {
        return calendar.weeks.flatMap(week => week.contributionDays);
    }, [calendar]);

    const totalContributions = calendar.totalContributions;
    const currentYearContributions = currentYearDays.reduce((acc, day) => acc + day.contributionCount, 0);

    const getColor = (count: number) => {
        if (count === 0) return "bg-white/5";
        if (count < 3) return "bg-emerald-950/40";
        if (count < 6) return "bg-emerald-900/60";
        if (count < 10) return "bg-emerald-700/80";
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
    };

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const HeatmapGrid = ({ days, title, count, showMonths = false }: { days: any[], title: string, count: number, showMonths?: boolean }) => {
        // Calculate month positions for labels
        const monthPositions = useMemo(() => {
            if (!showMonths) return [];
            const positions: { label: string, index: number }[] = [];
            let lastMonth = -1;

            // Group by weeks (cols)
            for (let i = 0; i < days.length; i += 7) {
                const date = new Date(days[i].date);
                const month = date.getMonth();
                if (month !== lastMonth) {
                    positions.push({ label: monthLabels[month], index: i / 7 });
                    lastMonth = month;
                }
            }
            return positions;
        }, [days, showMonths]);

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-white/80">{title}</h4>
                        <p className="text-[10px] text-white/30 tracking-tight">{count} total contributions</p>
                    </div>
                </div>

                <div className="relative overflow-x-auto pb-4 scrollbar-hide">
                    {showMonths && (
                        <div className="flex mb-2 h-4 text-[9px] text-white/20 font-medium font-mono uppercase tracking-widest relative">
                            {monthPositions.map((pos) => (
                                <span
                                    key={pos.label}
                                    className="absolute"
                                    style={{ left: `${pos.index * 16}px` }}
                                >
                                    {pos.label}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-max">
                        {days.map((day, i) => (
                            <motion.div
                                key={day.date}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.0003 }}
                                className={`w-3 h-3 rounded-[2px] ${getColor(day.contributionCount)} group relative transition-all duration-500 hover:ring-2 hover:ring-emerald-400/50 hover:z-10`}
                            >
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                                    <div className="bg-black/95 border border-white/10 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl backdrop-blur-md">
                                        <span className="font-bold text-emerald-400">{day.contributionCount} commits</span>
                                        <span className="text-white/40 mx-2">on</span>
                                        <span className="font-mono">{new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="w-2.5 h-2.5 bg-black/95 rotate-45 absolute -bottom-1.25 left-1/2 -translate-x-1/2 border-r border-b border-white/10" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 w-full space-y-12 relative overflow-hidden group/card"
        >
            {/* Subtle Gradient Background Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover/card:bg-emerald-500/10 transition-colors duration-1000" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        Contribution Graph
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">2026</span>
                    </h3>
                    <p className="text-sm text-white/30 italic mt-1">Consistency is key to mastery</p>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                    <span className="text-[9px] text-white/30 font-bold uppercase tracking-[0.2em]">Scale</span>
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-white/5" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-950/40" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-900/60" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-700/80" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.2)]" />
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                <HeatmapGrid
                    days={last365Days}
                    title="Last 365 Days Rolling Activity"
                    count={totalContributions}
                />
                {/* 
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/5"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-[#0a0a0a] px-3 text-[9px] text-white/20 font-bold uppercase tracking-widest">Calendar Summary</span>
                    </div>
                </div> */}

                {/* <HeatmapGrid
                    days={currentYearDays}
                    title={`Full Calendar Year ${currentYear}`}
                    count={currentYearContributions}
                    showMonths={true}
                /> */}
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-between items-center border-t border-white/5 gap-4">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Analytics Online</span>
                    </div>
                    <div className="hidden md:block w-px h-3 bg-white/10" />
                    <p className="text-[10px] text-white/30 font-mono">Sync latency: &lt; 50ms</p>
                </div>
                <div className="text-[10px] text-white/20 uppercase tracking-tighter">
                    Visualizing <span className="text-white/40">{totalContributions + currentYearContributions}</span> unique data points
                </div>
            </div>
        </motion.div>
    );
}
