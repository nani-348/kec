"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Droplets, Waves, Leaf, AlertCircle, TrendingUp, ArrowDown } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

// Mock Data for MI Tanks
const TANK_DATA = [
    { name: "Pedda Cheruvu", mandal: "Kuppam", capacity: 15.500, current: 8.200, ayacut: 120, status: "Partially Filled (53%)", percent: 53, color: "#3b82f6" },
    { name: "Gudupalle Tank", mandal: "Gudupalle", capacity: 5.200, current: 0.500, ayacut: 45, status: "Dry (9%)", percent: 9, color: "#ef4444" },
    { name: "Ramakuppam LI", mandal: "Ramakuppam", capacity: 12.000, current: 11.500, ayacut: 95, status: "Full (96%)", percent: 96, color: "#10b981" },
    { name: "Shanthipuram Kere", mandal: "Shanthipuram", capacity: 8.400, current: 3.100, ayacut: 60, status: "Low (37%)", percent: 37, color: "#f59e0b" },
    { name: "Bison Valley Pond", mandal: "Kuppam", capacity: 3.200, current: 1.800, ayacut: 25, status: "Partially Filled (56%)", percent: 56, color: "#3b82f6" },
    { name: "Nagalapuram Tank", mandal: "Gudupalle", capacity: 6.800, current: 0.200, ayacut: 52, status: "Dry (3%)", percent: 3, color: "#ef4444" },
];

const STATUS_SUMMARY = [
    { name: "Full (>90%)", value: 1, color: "#10b981" },
    { name: "Partially Filled (50-90%)", value: 2, color: "#3b82f6" },
    { name: "Low (25-50%)", value: 1, color: "#f59e0b" },
    { name: "Dry (<25%)", value: 2, color: "#ef4444" },
];

// Calculated Metrics
const TOTAL_CAPACITY = TANK_DATA.reduce((acc, tank) => acc + tank.capacity, 0).toFixed(2);
const CURRENT_STORAGE = TANK_DATA.reduce((acc, tank) => acc + tank.current, 0).toFixed(2);
const PERCENT_FILLED = ((Number(CURRENT_STORAGE) / Number(TOTAL_CAPACITY)) * 100).toFixed(1);

export default function MIStoragePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        MI Tank Storage Change
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Monitoring the <span className="font-semibold text-cyan-700">Surface Water Dynamics</span> of Minor Irrigation (MI) tanks. Assessment of storage fluctuation, ayacut sustainability, and filling status.
                    </p>
                </div>

                {/* Status Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                    {/* Left: Key Metrics Cards */}
                    <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute right-0 top-0 opacity-10 p-4">
                                <Waves size={80} />
                            </div>
                            <h3 className="text-cyan-100 font-medium text-sm uppercase tracking-wider mb-2">Total Live Storage</h3>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl font-bold">{CURRENT_STORAGE}</span>
                                <span className="text-lg font-medium text-cyan-200">MCM</span>
                            </div>
                            <div className="w-full bg-cyan-900/30 rounded-full h-2 mb-2">
                                <div className="bg-white h-2 rounded-full" style={{ width: `${PERCENT_FILLED}%` }}></div>
                            </div>
                            <p className="text-xs text-cyan-200">
                                {PERCENT_FILLED}% of Total Capacity ({TOTAL_CAPACITY} MCM)
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Leaf size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-none">Ayacut Coverage</h3>
                                    <p className="text-xs text-gray-500">Total Irrigation Potential</p>
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-800 mb-1">397 <span className="text-base text-gray-400 font-medium">Acres</span></p>
                        </div>
                    </div>

                    {/* Right: Filling Status Chart */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-grow">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Filling Status Overview</h3>
                            <p className="text-sm text-gray-500 mb-6">Distribution of 6 Major MI Tanks based on current water levels.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {STATUS_SUMMARY.map((status) => (
                                    <div key={status.name} className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">{status.value}</p>
                                            <p className="text-[10px] text-gray-500 uppercase">{status.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-[220px] w-[220px] shrink-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={STATUS_SUMMARY}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {STATUS_SUMMARY.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-sm font-bold text-gray-400">STATUS</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Detailed Tank Grid */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Major Tank Storage Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {TANK_DATA.map((tank) => (
                        <div key={tank.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                            {/* Water Level Visual */}
                            <div className="h-32 bg-gray-100 relative group-hover:bg-gray-50 transition-colors">
                                <div
                                    className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out opacity-80"
                                    style={{
                                        height: `${tank.percent}%`,
                                        backgroundColor: tank.color,
                                    }}
                                >
                                    {/* Wave Effect */}
                                    <svg className="absolute -top-3 left-0 w-full h-4 text-current opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path fill="currentColor" d="M0 10 Q 25 0 50 10 T 100 10 V 10 H 0 Z" />
                                    </svg>
                                </div>

                                <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    {tank.percent}%
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tank.mandal}</p>
                                        <h3 className="font-bold text-gray-900 text-lg">{tank.name}</h3>
                                    </div>
                                    {tank.percent < 25 && <AlertCircle size={18} className="text-red-500" />}
                                </div>

                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between py-2 border-b border-gray-50">
                                        <span className="text-xs text-gray-500">Storage (MCM)</span>
                                        <span className="text-sm font-bold text-gray-800">{tank.current} <span className="text-gray-400 text-[10px]">/ {tank.capacity}</span></span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-50">
                                        <span className="text-xs text-gray-500">Ayacut</span>
                                        <span className="text-sm font-bold text-gray-800">{tank.ayacut} <span className="text-gray-400 text-[10px]">Acres</span></span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-xs text-gray-500">Status</span>
                                        <span className={clsx("text-xs font-bold px-2 py-0.5 rounded",
                                            tank.percent > 90 ? "bg-emerald-50 text-emerald-700" :
                                                tank.percent > 50 ? "bg-blue-50 text-blue-700" :
                                                    tank.percent > 25 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                                        )}>
                                            {tank.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Methodology Note */}
                <div className="mt-12 bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        * Data represented is based on weekly reports from the Water Resources Department. Real-time sensor integration pending for phase 2.
                    </p>
                </div>

            </main>
            <Footer />
        </div>
    );
}
