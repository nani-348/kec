"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Map, Droplets, Mountain, Waves, Info, GitMerge, TrendingUp } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

const BASIN_METRICS = [
    { label: "Total Catchment Area", value: "450", unit: "km²", icon: <Map className="text-emerald-500" size={24} /> },
    { label: "Basin Perimeter", value: "85", unit: "km", icon: <Waves className="text-blue-500" size={24} /> },
    { label: "Basin Length", value: "32", unit: "km", icon: <TrendingUp className="text-indigo-500" size={24} /> },
    { label: "Relief Ratio", value: "0.024", unit: "", icon: <Mountain className="text-amber-500" size={24} /> },
];

const STREAM_ORDER_DATA = [
    { order: "1st Order", count: 124, length: 158.5, color: "#93c5fd" },
    { order: "2nd Order", count: 38, length: 65.2, color: "#60a5fa" },
    { order: "3rd Order", count: 12, length: 32.4, color: "#3b82f6" },
    { order: "4th Order", count: 4, length: 18.0, color: "#2563eb" },
    { order: "5th Order", count: 1, length: 12.5, color: "#1d4ed8" },
];

const RUNOFF_POTENTIAL = [
    { terrain: "Rocky Outcrops", potential: "High", coef: "0.80 - 0.90", desc: "Rapid runoff, very low recharge.", color: "bg-red-50 border-red-100 text-red-800" },
    { terrain: "Scrub Forests", potential: "Moderate", coef: "0.40 - 0.60", desc: "Balanced runoff and recharge.", color: "bg-amber-50 border-amber-100 text-amber-800" },
    { terrain: "Agricultural Land", potential: "Low-Mod", coef: "0.30 - 0.50", desc: "High retention, good agricultural use.", color: "bg-emerald-50 border-emerald-100 text-emerald-800" },
    { terrain: "Tank Beds / Water Bodies", potential: "Nil", coef: "0.00", desc: "Storage zones, acting as sinks.", color: "bg-blue-50 border-blue-100 text-blue-800" },
];

export default function SurfaceHydrologyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Surface Hydrology & Drainage
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Characterizing the <span className="font-semibold text-blue-700">Koundinya River Sub-Basin</span>. Analysis of drainage patterns, stream networks, and surface runoff potential.
                    </p>
                </div>

                {/* Basin Overview Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-16">
                    {BASIN_METRICS.map((metric) => (
                        <div key={metric.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                            <div className="bg-gray-50 p-3 rounded-full mb-3">
                                {metric.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{metric.unit}</p>
                            <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                    {/* Left: Drainage Network Analysis */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Stream Order Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        <GitMerge size={20} className="text-blue-600" />
                                        Stream Order Analysis
                                    </h3>
                                    <p className="text-sm text-gray-500">Horton&apos;s Laws of Stream Numbers</p>
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={STREAM_ORDER_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey="order"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            orientation="left"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            label={{ value: 'Stream Count', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            label={{ value: 'Length (km)', angle: 90, position: 'insideRight', style: { fill: '#9ca3af', fontSize: 12 } }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f9fafb' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar yAxisId="left" dataKey="count" name="Stream Count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                        <Bar yAxisId="right" dataKey="length" name="Total Length (km)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                                <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h4 className="font-bold text-blue-900 text-sm mb-1">Dendritic Pattern</h4>
                                    <p className="text-xs text-blue-800/80 leading-relaxed">
                                        The basin exhibits a classic dendritic drainage pattern, typical of the homogeneous granitic terrain. The Bifurcation Ratio (Rb) averages around 3.5, indicating minimal structural control.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right: Runoff Analysis */}
                    <div className="lg:col-span-5 space-y-6">

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-indigo-50 rounded-lg">
                                    <Droplets size={24} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Runoff Potential</h3>
                                    <p className="text-sm text-gray-500">Based on Land Use & Slope</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {RUNOFF_POTENTIAL.map((item) => (
                                    <div key={item.terrain} className={`p-4 rounded-xl border ${item.color}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm">{item.terrain}</h4>
                                            <span className="text-[10px] font-bold uppercase border border-current px-2 py-0.5 rounded-full">{item.potential}</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-xs opacity-80 max-w-[70%]">{item.desc}</p>
                                            <span className="text-xs font-mono font-bold">C: {item.coef}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hydro-morphology Card */}
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Hydro-geomorphology</h3>
                                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                                    The Koundinya sub-basin is characterized by pediments and pedi-plains. The gentle slope (Gradient ~10m/km) in the valley facilitates moderate infiltration, but high-intensity rainfall events lead to flashy runoff due to the hard rock terrain.
                                </p>
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                    <span className="flex items-center gap-1"><TrendingUp size={14} /> Slope: 1-3%</span>
                                    <span className="flex items-center gap-1"><Waves size={14} /> texture: Medium</span>
                                </div>
                            </div>
                            {/* Decorative Background Pattern */}
                            <svg className="absolute right-0 bottom-0 opacity-10 text-white w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M0 100 C 20 0 50 0 100 100 Z" />
                            </svg>
                        </div>

                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
