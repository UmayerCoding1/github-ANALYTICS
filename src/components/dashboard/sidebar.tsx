"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 h-screen p-6">
            <div className="flex items-center gap-3 mb-12">
                <div className="bg-emerald-500 p-2 rounded-xl">
                    <Github className="w-6 h-6 text-black" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white uppercase italic">Umayer Analytics</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 p-4 rounded-xl transition-all group",
                                isActive
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <button className="flex items-center gap-3 p-4 w-full rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
