"use client";

import { useState } from "react";
import { GitHubStats } from "@/lib/github";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Star, GitFork, ExternalLink } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

interface RepoTableProps {
    data: GitHubStats;
}

export function RepoTable({ data }: RepoTableProps) {
    const [search, setSearch] = useState("");
    const repos = data.repositories.nodes;

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle>Repositories</CardTitle>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Visibility</th>
                            <th className="px-6 py-4 font-medium">Language</th>
                            <th className="px-6 py-4 font-medium">Stats</th>
                            <th className="px-6 py-4 font-medium">Last Updated</th>
                            <th className="px-6 py-4 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredRepos.map((repo) => (
                            <tr key={repo.name} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                                        {repo.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "text-[10px] px-2 py-1 rounded-full border capitalise",
                                        repo.isPrivate
                                            ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                                            : "bg-blue-400/10 border-blue-400/20 text-blue-400"
                                    )}>
                                        {repo.isPrivate ? "Private" : "Public"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: repo.primaryLanguage?.color || "#fff" }}
                                        />
                                        <span className="text-sm text-white/70">{repo.primaryLanguage?.name || "N/A"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4 text-white/50">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5" />
                                            <span className="text-xs">{repo.stargazerCount}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork className="w-3.5 h-3.5" />
                                            <span className="text-xs">{repo.forkCount}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-white/40">{formatRelativeTime(new Date(repo.updatedAt))}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 inline-flex items-center justify-center rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}

import { cn } from "@/lib/utils";
