import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
    BookText,
    Lock,
    GitCommit,
    Star,
    GitFork,
    Calendar,
    History
} from "lucide-react";
import { GitHubStats } from "@/lib/github";
import { formatRelativeTime } from "@/lib/utils";

interface StatsGridProps {
    data: GitHubStats;
}

export function StatsGrid({ data }: StatsGridProps) {
    const repos = data.repositories.nodes;
    const totalPublic = repos.filter(r => !r.isPrivate).length;
    const totalPrivate = repos.filter(r => r.isPrivate).length;
    const totalStars = repos.reduce((acc, r) => acc + r.stargazerCount, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forkCount, 0);
    const totalCommits = data.contributionsCollection.totalCommitContributions;
    const lastMonthCommits = data.contributionsCollection.contributionCalendar.totalContributions; // Approximation from calendar

    const lastCommitDate = repos.length > 0 ? new Date(repos[0].updatedAt) : new Date();

    const stats = [
        {
            label: "Public Repos",
            value: totalPublic,
            icon: BookText,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
        },
        {
            label: "Private Repos",
            value: totalPrivate,
            icon: Lock,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
        },
        {
            label: "Total Commits",
            value: totalCommits,
            icon: GitCommit,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
        },
        {
            label: "Last Month",
            value: lastMonthCommits,
            icon: Calendar,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
        },
        {
            label: "Total Stars",
            value: totalStars,
            icon: Star,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
        },
        {
            label: "Total Forks",
            value: totalForks,
            icon: GitFork,
            color: "text-orange-400",
            bg: "bg-orange-400/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
                <Card key={stat.label} delay={index * 0.05}>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className={cn("p-2 rounded-lg", stat.bg)}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-white/50 mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-bold text-white">
                                <AnimatedNumber value={stat.value} />
                            </h4>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Last Commit Card - Special Layout */}
            <Card className="xl:col-span-2" delay={0.3}>
                <CardContent className="p-5 flex items-center gap-4 h-full">
                    <div className="p-3 rounded-full bg-emerald-500/10">
                        <History className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 mb-0.5">Last Activity</p>
                        <h4 className="text-lg font-semibold text-white">
                            {formatRelativeTime(lastCommitDate)}
                        </h4>
                        <p className="text-xs text-white/30 truncate max-w-[200px]">
                            {repos[0]?.name || "No recent activity"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

import { cn } from "@/lib/utils";
