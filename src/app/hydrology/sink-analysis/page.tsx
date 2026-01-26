"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowDownCircle, Waves, Component, Hammer, Info, Pickaxe } from "lucide-react"; // Replaced Pickaxe with Hammer/Component if needed, specifically chose icons available in standard sets or lucide
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

const SINK_DATA = [
    {
        id: "S1",
        location: "Kuppam Valley (North)",
        area: 12.5, // ha
        depth: 3.2, // m
        volume: 40, // TCM (Thousand Cubic Meters) approx
        intervention: "Farm Pond",
        suitability: "High",
        color: "#6366f1"
    },
    {
        id: "S2",
        location: "Gudupalle Lowland",
        area: 45.0,
        depth: 5.8,
        volume: 260,
        intervention: "Check Dam",
        suitability: "Critical",
        color: "#8b5cf6"
    },
    {
        id: "S3",
        location: "Ramakuppam Depression",
        area: 28.4,
        depth: 4.1,
        volume: 115,
        intervention: "Percolation Tank",
        suitability: "Moderate",
        color: "#d946ef"
    },
];

const FILL_SPILL_DATA = [
    { name: '0m', volume: 0 },
    { name: '1m', volume: 15 },
    { name: '2m', volume: 45 },
    { name: '3m', volume: 90 },
    { name: '4m', volume: 160 },
    { name: '5m', volume: 240, label: 'Spillover' },
    { name: '6m', volume: 240 },
];

export default function SinkAnalysisPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Depression & Sink Analysis
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Identification of <span className="font-semibold text-indigo-700">Hydrological Sinks</span> (depressions) in the digital elevation model to assess natural storage capacity and plan water harvesting interventions.
                    </p>
                </div>

                {/* Sinks Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {SINK_DATA.map((sink) => (
                        <div key={sink.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                            <div className="h-2 bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${sink.color}, white)` }}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{sink.id}</p>
                                        <h3 className="font-bold text-gray-900 text-lg">{sink.location}</h3>
                                    </div>
                                    <div className={clsx(
                                        "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                        sink.suitability === "Critical" ? "bg-red-50 text-red-700" :
                                            sink.suitability === "High" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                                    )}>
                                        {sink.suitability} Suitability
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <div className="text-indigo-600 mb-1 flex justify-center"><Waves size={16} /></div>
                                        <p className="text-lg font-bold text-gray-800">{sink.volume}</p>
                                        <p className="text-[10px] text-gray-500 uppercase">TCM Vol</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <div className="text-indigo-600 mb-1 flex justify-center"><ArrowDownCircle size={16} /></div>
                                        <p className="text-lg font-bold text-gray-800">{sink.depth}m</p>
                                        <p className="text-[10px] text-gray-500 uppercase">Max Depth</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <div className="text-indigo-600 mb-1 flex justify-center"><Component size={16} /></div>
                                        <p className="text-lg font-bold text-gray-800">{sink.area}</p>
                                        <p className="text-[10px] text-gray-500 uppercase">Area (ha)</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                        {sink.intervention === "Check Dam" ? <Hammer size={16} /> : <Pickaxe size={16} />}
                                        {sink.intervention}
                                    </div>
                                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase">View Plan &rarr;</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analytical Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Fill-Spill Analysis */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Fill-Spill Analysis</h3>
                                <p className="text-sm text-gray-500">Volume accumulation vs. Depth for Sink S2</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={FILL_SPILL_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Volume (TCM)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="volume" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVolume)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Educational / Methodology Card */}
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <Info className="text-indigo-200" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-serif">Why analyze sinks?</h3>
                            <p className="text-indigo-100 leading-relaxed mb-6">
                                Sinks in the Digital Elevation Model (DEM) often represent real-world depressions. While usually filled during hydrological correction, large sinks indicate potential natural recharge zones or optimal sites for water harvesting structures like farm ponds and percolation tanks, minimizing excavation costs.
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">ArcGIS Hydro Tools</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Fill & Spill Algorithm</span>
                            </div>
                        </div>
                        {/* Abstract Waves */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
