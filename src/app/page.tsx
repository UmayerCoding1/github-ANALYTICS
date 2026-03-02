"use client";

import { useEffect, useState } from "react";
import { GitHubStats } from "@/lib/github";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ChartsGrid } from "@/components/dashboard/charts";
import { RepoTable } from "@/components/dashboard/repo-table";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { RefreshCw, Github, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/github-stats");
      const result = await res.json();

      if (result.error) throw new Error(result.error);

      setData(result);
      setError(null);
      setLastRefreshed(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto refresh every 10 minutes
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="glass-card p-8 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error Fetching Data</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-xl transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <Github className="w-6 h-6 text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">UMAYER ANALYTICS</span>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 text-emerald-400 group transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </a>
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-3 p-4 w-full rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Overview</h2>
            <p className="text-sm text-white/30 italic">Real-time GitHub deep analytics</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-white/30 uppercase tracking-widest">Last Updated</p>
              <p className="text-xs font-mono text-emerald-400/70">{lastRefreshed.toLocaleTimeString()}</p>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-white/80 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading && !data ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="h-64 glass-card animate-pulse opacity-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 glass-card animate-pulse opacity-50" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[380px] glass-card animate-pulse opacity-50" />
                <div className="h-[380px] glass-card animate-pulse opacity-50" />
              </div>
            </motion.div>
          ) : data ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <ProfileHeader data={data} />
              <StatsGrid data={data} />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2 space-y-8">
                  <ChartsGrid data={data} />
                  <RepoTable data={data} />
                </div>
                <div className="space-y-8 sticky top-8">
                  <RecentActivity data={data} />

                  {/* Upgrade Card - Extra Touch */}
                  <Card className="bg-emerald-gradient border-none" delay={0.6}>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-black mb-2">Pro Analytics</h4>
                      <p className="text-black/70 text-sm mb-6">
                        Get deeper insights with commit frequency analysis and organization health tracking.
                      </p>
                      <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-black/80 transition-all">
                        Upgrade Now
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <footer className="mt-20 py-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Umayer GitHub Analytics. Build with Next.js 14.
          </p>
        </footer>
      </main>
    </div>
  );
}
