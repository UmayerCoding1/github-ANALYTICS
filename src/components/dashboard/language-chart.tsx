"use client";

import { useMemo } from "react";
import { GitHubStats } from "@/lib/github";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { motion } from "framer-motion";

interface LanguageChartProps {
    data: GitHubStats;
}

export function LanguageChart({ data }: LanguageChartProps) {
    const chartData = useMemo(() => {
        const languages: Record<string, { count: number; color: string }> = {};

        data.repositories.nodes.forEach((repo) => {
            if (repo.primaryLanguage) {
                const { name, color } = repo.primaryLanguage;
                if (languages[name]) {
                    languages[name].count += 1;
                } else {
                    languages[name] = { count: 1, color: color || "#3b82f6" };
                }
            }
        });

        return Object.entries(languages)
            .map(([name, { count, color }]) => ({
                name,
                value: count,
                color,
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6); // Top 6 languages
    }, [data]);

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl">
                    <p className="text-white font-medium">{payload[0].name}</p>
                    <p className="text-emerald-400 text-sm">
                        {payload[0].value} Repositories
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white">Language Breakdown</h3>
                <p className="text-sm text-white/40">Primary languages across repos</p>
            </div>

            <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="45%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                            animationBegin={200}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            content={({ payload }: { payload?: readonly any[] }) => (
                                <div className="flex flex-wrap justify-center gap-4 mt-8">
                                    {payload?.map((entry: any, index: number) => (
                                        <div key={`item-${index}`} className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: entry.payload.color }}
                                            />
                                            <span className="text-xs text-white/60 font-medium">
                                                {entry.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
