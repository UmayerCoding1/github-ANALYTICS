"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { GitHubStats } from "@/lib/github";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ChartsGridProps {
    data: GitHubStats;
}

export function ChartsGrid({ data }: ChartsGridProps) {
    // Process Contribution Data
    const contributionWeeks = data.contributionsCollection.contributionCalendar.weeks;
    const chartData = contributionWeeks.slice(-12).map((week) => {
        const total = week.contributionDays.reduce((acc, day) => acc + day.contributionCount, 0);
        const date = new Date(week.contributionDays[0].date);
        return {
            name: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            commits: total,
        };
    });

    // Process Language Data
    const languages: Record<string, { count: number; color: string }> = {};
    data.repositories.nodes.forEach((repo) => {
        if (repo.primaryLanguage) {
            if (languages[repo.primaryLanguage.name]) {
                languages[repo.primaryLanguage.name].count++;
            } else {
                languages[repo.primaryLanguage.name] = {
                    count: 1,
                    color: repo.primaryLanguage.color || "#10b981",
                };
            }
        }
    });

    const languageData = Object.entries(languages)
        .map(([name, info]) => ({
            name,
            value: info.count,
            color: info.color,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Contribution Activity</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="commits"
                                stroke="#10b981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorCommits)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top Languages</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={languageData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {languageData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                        {languageData.map((lang) => (
                            <div key={lang.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: lang.color }}
                                />
                                <span className="text-xs text-white/70 truncate">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
