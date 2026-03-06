"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { User, Bell, Shield, Github, Palette, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const settingsSections = [
    {
        title: "Profile info",
        icon: User,
        description: "Manage your personal information and how others see you.",
        fields: [
            { label: "Display Name", value: "UmayerCoding1" },
            { label: "Email Address", value: "umayer@example.com" },
            { label: "Bio", value: "Full Stack Developer & Open Source Enthusiast" },
        ],
    },
    {
        title: "GitHub Integration",
        icon: Github,
        description: "Manage your connected GitHub accounts and permissions.",
        fields: [
            { label: "Connected Account", value: "UmayerCoding1" },
            { label: "Access Token", value: "••••••••••••••••" },
        ],
    },
    {
        title: "Appearance",
        icon: Palette,
        description: "Customize the look and feel of your dashboard.",
        fields: [
            { label: "Theme", value: "Dark (Premium)" },
            { label: "Accent Color", value: "Emerald" },
        ],
    },
];

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 px-4 md:px-8 py-8 md:py-12 max-w-5xl mx-auto w-full">
                <header className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
                    <p className="text-white/40">Manage your account settings and preferences</p>
                </header>

                <div className="space-y-8">
                    {settingsSections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden group hover:border-emerald-500/30 transition-all">
                                <CardContent className="p-0">
                                    <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                                                <section.icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{section.title}</h3>
                                        </div>
                                        <p className="text-sm text-white/40">{section.description}</p>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {section.fields.map((field) => (
                                            <div key={field.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <label className="text-sm font-medium text-white/60">{field.label}</label>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm text-white/90">{field.value}</span>
                                                    <button className="text-xs font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex justify-end gap-4 pt-8"
                    >
                        <button className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                            Discard Changes
                        </button>
                        <button className="px-8 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                            Save Changes
                        </button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
