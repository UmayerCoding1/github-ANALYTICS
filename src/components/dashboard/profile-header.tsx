"use client";

import { GitHubStats } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, MapPin, Link as LinkIcon, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    data: GitHubStats;
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
    return (
        <Card className="mb-8" delay={0.05}>
            <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
                        <img
                            src={data.avatarUrl}
                            alt={data.name}
                            className="relative w-32 h-32 rounded-3xl border-2 border-white/10 glass-card-hover"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl text-black shadow-xl shadow-emerald-500/20">
                            <Github className="w-5 h-5" />
                        </div>
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">{data.name || data.login}</h1>
                        <p className="text-emerald-400 font-medium mb-4">@{data.login}</p>
                        <p className="text-white/60 max-w-2xl mb-6 leading-relaxed">
                            {data.bio || "Crafting digital experiences with code and passion."}
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/40">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-emerald-500/50" />
                                <span className="text-white/80 font-semibold">{data.followers.totalCount.toLocaleString()}</span> Followers
                            </div>
                            <div className="flex items-center gap-2">
                                <UserPlus className="w-4 h-4 text-emerald-500/50" />
                                <span className="text-white/80 font-semibold">{data.following.totalCount.toLocaleString()}</span> Following
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-500/50" />
                                <span>Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-emerald-500/50" />
                                <a href={`https://github.com/${data.login}`} target="_blank" className="hover:text-emerald-400 transition-colors">
                                    github.com/{data.login}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
