"use client";

import { useState } from "react";
import { GitHubStats } from "@/lib/github";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Star, GitFork, ExternalLink } from "lucide-react";
import { formatRelativeTime, cn } from "@/lib/utils";

interface RepoTableProps {
    data: GitHubStats;
}

export function RepoTable({ data }: RepoTableProps) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const repos = data.repositories.nodes;
    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
    );

    // Reset pagination when search changes
    const handleSearchChange = (val: string) => {
        setSearch(val);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
    const paginatedRepos = filteredRepos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
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
                        onChange={(e) => handleSearchChange(e.target.value)}
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
                        {paginatedRepos.map((repo) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-white/40">
                        Showing <span className="text-white font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-white font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredRepos.length)}</span> of <span className="text-white font-medium">{filteredRepos.length}</span> repositories
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <div className="flex items-center px-3 gap-1">
                            <span className="text-xs font-medium text-emerald-400">{currentPage}</span>
                            <span className="text-xs text-white/30">/</span>
                            <span className="text-xs text-white/30">{totalPages}</span>
                        </div>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </Card>
    );
}
