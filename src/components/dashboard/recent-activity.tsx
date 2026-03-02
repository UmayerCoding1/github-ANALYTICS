import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GitHubStats } from "@/lib/github";
import { GitCommit, ExternalLink } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

interface RecentActivityProps {
    data: GitHubStats;
}

export function RecentActivity({ data }: RecentActivityProps) {
    // Since GraphQL query only gives repos, we'll show activity based on repo updates as a proxy 
    // or just show the last 5 updated repositories as "Recent Activity" 
    // In a real app we'd fetch specific 'events' or 'commits'
    const recentRepos = data.repositories.nodes.slice(0, 5);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                    {recentRepos.map((repo, index) => (
                        <div key={repo.name} className="p-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                            <div className="mt-1 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/10">
                                <GitCommit className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    Updated <span className="text-emerald-400">{repo.name}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-white/30">
                                        {formatRelativeTime(new Date(repo.updatedAt))}
                                    </span>
                                    <span className="text-white/10 text-xs">•</span>
                                    <span className="text-xs text-white/30 truncate">
                                        {repo.description || "No description provided"}
                                    </span>
                                </div>
                            </div>
                            <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 p-1 text-white/20 hover:text-white"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
