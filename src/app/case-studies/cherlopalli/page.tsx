"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Droplets,
    Waves,
    MapPin,
    Ruler,
    ArrowUp,
    ArrowDown,
    Calendar,
    Sprout,
    Users,
    Info,
    TrendingUp
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell, ComposedChart, Bar, Line
} from "recharts";
import clsx from "clsx";

// --- Mock Data Models ---

// Project Statistics
const PROJECT_STATS = {
    name: "Cherlopalli Medium Reservoir",
    river: "Papagni River Basin",
    location: "Kadapa District, Andhra Pradesh",
    grossCapacity: 2.85, // TMC
    liveCapacity: 2.60, // TMC
    frl: "235.50 m", // Full Reservoir Level
    deadStorage: 0.25, // TMC
    damLength: "1,450 m",
    spillwayCapacity: "45,000 cusecs"
};

// Current Storage Status
const STORAGE_STATUS = {
    currentStorage: 2.22, // TMC
    percentage: 78,
    inflow: 750, // Cusecs
    outflow: 1200, // Cusecs
    date: "22 Jan 2026"
};

// Hydrological Data (Trend)
const HYDRO_TREND_DATA = [
    { month: "Jun", inflow: 120, release: 0, level: 210 },
    { month: "Jul", inflow: 450, release: 100, level: 215 },
    { month: "Aug", inflow: 1200, release: 300, level: 222 },
    { month: "Sep", inflow: 1800, release: 800, level: 230 },
    { month: "Oct", inflow: 950, release: 1200, level: 234 },
    { month: "Nov", inflow: 400, release: 900, level: 232 },
    { month: "Dec", inflow: 150, release: 450, level: 228 },
    { month: "Jan", inflow: 80, release: 250, level: 225 },
];

const GAUGE_DATA = [
    { name: "Filled", value: STORAGE_STATUS.percentage, color: "#3b82f6" },
    { name: "Empty", value: 100 - STORAGE_STATUS.percentage, color: "#e2e8f0" }
];

// Impact Metrics
const IMPACT_METRICS = [
    { label: "New Gap Ayacut", value: "4,500", unit: "Acres", icon: <Sprout size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Stabilized Ayacut", value: "2,200", unit: "Acres", icon: <CheckCircle size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Villages Benefited", value: "18", unit: "Nos", icon: <MapPin size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Drinking Water", value: "0.25", unit: "TMC", icon: <Users size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
];

import { CheckCircle } from "lucide-react";

export default function CherlopalliPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow">

                {/* Hero Section with Parallax-like Background */}
                <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543158655-f86a9860b73c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/95"></div>

                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="lg:w-2/3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700/50 text-blue-200 text-xs font-semibold mb-6">
                                    <Waves size={14} /> Case Study
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-6 leading-tight">
                                    {PROJECT_STATS.name}
                                </h1>
                                <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                                    A strategic infrastructure project in the {PROJECT_STATS.river} aimed at drought mitigation and stabilizing agricultural water requirement for the region.
                                </p>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                        <MapPin size={18} className="text-blue-300" />
                                        <span className="text-sm font-medium">{PROJECT_STATS.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                        <Ruler size={18} className="text-blue-300" />
                                        <span className="text-sm font-medium">FRL: {PROJECT_STATS.frl}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Live Status Card */}
                            <div className="lg:w-1/3 w-full">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-white/90">Current Status</h3>
                                        <span className="text-xs text-blue-200 flex items-center gap-1">
                                            <Calendar size={12} /> {STORAGE_STATUS.date}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            {/* Simple CSS Doughnut fallback or pure SVG if needed, but using text here for clarity */}
                                            <div className="w-full h-full rounded-full border-8 border-white/20 flex items-center justify-center relative">
                                                <div className="absolute inset-0 rounded-full border-8 border-blue-400 border-t-transparent border-l-transparent transform -rotate-45" style={{ clipPath: `inset(0 0 0 0)` }}></div>
                                                <span className="text-2xl font-bold text-white">{STORAGE_STATUS.percentage}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-blue-200">Storage Level</div>
                                            <div className="text-3xl font-bold text-white">{STORAGE_STATUS.currentStorage} <span className="text-lg font-normal text-blue-300">TMC</span></div>
                                            <div className="text-xs text-blue-300 mt-1">Gross Capacity: {PROJECT_STATS.grossCapacity} TMC</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        <div>
                                            <div className="text-xs text-blue-200 mb-1 flex items-center gap-1"><ArrowDown size={12} /> Inflow</div>
                                            <div className="text-lg font-bold text-white">{STORAGE_STATUS.inflow} <span className="text-xs font-normal opacity-70">cusecs</span></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-blue-200 mb-1 flex items-center gap-1"><ArrowUp size={12} /> Outflow</div>
                                            <div className="text-lg font-bold text-white">{STORAGE_STATUS.outflow} <span className="text-xs font-normal opacity-70">cusecs</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left Column: Specs & Salient Features */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 font-serif mb-6 flex items-center gap-2">
                                    <Info className="text-blue-600" size={20} /> Salient Features
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-600 text-sm">River Basin</span>
                                        <span className="text-gray-900 font-semibold text-sm">{PROJECT_STATS.river}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-600 text-sm">Gross Capacity</span>
                                        <span className="text-gray-900 font-semibold text-sm text-right">{PROJECT_STATS.grossCapacity} TMC</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-600 text-sm">Dead Storage</span>
                                        <span className="text-gray-900 font-semibold text-sm text-right">{PROJECT_STATS.deadStorage} TMC</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-600 text-sm">Full Reservoir Level</span>
                                        <span className="text-gray-900 font-semibold text-sm text-right">{PROJECT_STATS.frl}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-600 text-sm">Dam Length</span>
                                        <span className="text-gray-900 font-semibold text-sm text-right">{PROJECT_STATS.damLength}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-600 text-sm">Spillway Capacity</span>
                                        <span className="text-gray-900 font-semibold text-sm text-right">{PROJECT_STATS.spillwayCapacity}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white">
                                <h3 className="text-lg font-bold mb-4 font-serif">Strategic Importance</h3>
                                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                                    Cherlopalli reservoir serves as a critical balancing reservoir for the Galeru Nagari Sujala Sravanthi (GNSS) project, enabling year-round irrigation support even during lean inflow periods.
                                </p>
                                <div className="flex items-center gap-3 text-emerald-400 text-sm font-semibold">
                                    <TrendingUp size={16} /> Drought Proofing for 18 Villages
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Hydrology & Impact */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Hydrological Charts */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Hydrological Performance</h3>
                                        <p className="text-sm text-gray-500">Inflow vs. Release trends (Water Year 2025-26)</p>
                                    </div>
                                </div>
                                <div className="h-[350px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={HYDRO_TREND_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Flow (cusecs)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }} />
                                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Level (m)', angle: 90, position: 'insideRight', style: { fill: '#6b7280', fontSize: 12 } }} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend verticalAlign="top" height={36} />
                                            <Bar yAxisId="left" dataKey="inflow" name="Inflow" fill="#3b82f6" barSize={20} radius={[4, 4, 0, 0]} />
                                            <Bar yAxisId="left" dataKey="release" name="Release" fill="#f59e0b" barSize={20} radius={[4, 4, 0, 0]} />
                                            <Line yAxisId="right" type="monotone" dataKey="level" name="Reservoir Level" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Impact Metrics Grid */}
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-6 font-serif">Project Impact Assessment</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {IMPACT_METRICS.map((metric, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                            <div className={clsx("p-3 rounded-full mb-3", metric.bg, metric.color)}>
                                                {metric.icon}
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900">{metric.value}</h4>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 opacity-80">{metric.unit}</span>
                                            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
