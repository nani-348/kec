"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mountain, CloudRain, ArrowDown, Droplets, Info, Layers, TrendingDown } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

const ZONE_DATA = [
    { name: "Recharge Zone", value: 35, altitude: "> 750m", ec: "< 500", color: "#10b981", desc: "Upland areas where chemical evolution initiates. Low salinity, high oxygen.", icon: <CloudRain size={20} /> },
    { name: "Intermediate Zone", value: 45, altitude: "650-750m", ec: "500-1500", color: "#f59e0b", desc: "Mid-slope transition areas. Mixed groundwater chemistry.", icon: <Layers size={20} /> },
    { name: "Discharge Zone", value: 20, altitude: "< 650m", ec: "> 1500", color: "#ef4444", desc: "Valley bottoms where flow path generally ends. High salinity.", icon: <ArrowDown size={20} /> },
];

// Conceptual Scatter Data: Altitude vs EC correlation
const SCATTER_DATA = [
    { x: 800, y: 300, z: 10, name: 'Recharge' },
    { x: 780, y: 350, z: 10, name: 'Recharge' },
    { x: 760, y: 450, z: 10, name: 'Recharge' },
    { x: 720, y: 800, z: 10, name: 'Intermediate' },
    { x: 700, y: 1100, z: 10, name: 'Intermediate' },
    { x: 680, y: 1300, z: 10, name: 'Intermediate' },
    { x: 640, y: 1800, z: 10, name: 'Discharge' },
    { x: 620, y: 2200, z: 10, name: 'Discharge' },
    { x: 600, y: 2500, z: 10, name: 'Discharge' },
];

export default function ZonationPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Recharge–Intermediate–Discharge Zonation
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Functional classification of the aquifer system based on <span className="font-semibold text-emerald-700">Topography</span> and <span className="font-semibold text-amber-700">Hydro-chemical evolution</span> plotting Altitude vs. EC/TDS.
                    </p>
                </div>

                {/* Main Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                    {/* Left: Zone Distribution Pie */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Areal Extent</h3>
                        <p className="text-xs text-gray-500 mb-6">Percentage of study area per zone</p>

                        <div className="h-[300px] w-full flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ZONE_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {ZONE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [`${value ?? 0}%`, 'Area']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right: Zones Detail Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 gap-4">
                        {ZONE_DATA.map((zone) => (
                            <div key={zone.name} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-md transition-all relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: zone.color }}></div>

                                <div className={clsx("p-4 rounded-full bg-opacity-10 shrink-0",
                                    zone.name.includes("Recharge") ? "bg-emerald-100 text-emerald-600" :
                                        zone.name.includes("Intermediate") ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                                )}>
                                    {zone.icon}
                                </div>

                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{zone.name}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{zone.desc}</p>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex items-center gap-1">
                                            <Mountain size={12} /> Alt: {zone.altitude}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex items-center gap-1">
                                            <Droplets size={12} /> EC: {zone.ec} µS/cm
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center min-w-[80px]">
                                    <span className="text-3xl font-bold" style={{ color: zone.color }}>{zone.value}%</span>
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Coverage</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Conceptual Schematic */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Scatter Plot */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Hydro-Chemical Evolution</h3>
                                <p className="text-sm text-gray-500">Conceptual Correlation: Altitude vs EC</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                    <XAxis type="number" dataKey="x" name="Altitude" unit="m" label={{ value: 'Altitude (m)', position: 'insideBottom', offset: -10, style: { fontSize: 12, fill: '#6b7280' } }} />
                                    <YAxis type="number" dataKey="y" name="EC" unit="µS/cm" label={{ value: 'EC (µS/cm)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6b7280' } }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Scatter name="Zones" data={SCATTER_DATA} fill="#8884d8">
                                        {SCATTER_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={
                                                entry.name === 'Recharge' ? '#10b981' :
                                                    entry.name === 'Intermediate' ? '#f59e0b' : '#ef4444'
                                            } />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Conceptual Model Card */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4 font-serif">Conceptual Flow Model</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 mt-1"><CloudRain size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-emerald-300">Recharge (Uplands)</h4>
                                        <p className="text-sm text-slate-400">Rainwater infiltration. Low residence time results in low Total Dissolved Solids (TDS).</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <ArrowDown className="text-slate-600 animate-bounce" />
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-red-500/20 rounded-lg text-red-400 mt-1"><TrendingDown size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-red-300">Discharge (Valleys)</h4>
                                        <p className="text-sm text-slate-400">Groundwater emerges after interacting with aquifer minerals. High residence time leads to higher salinity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative */}
                        <svg className="absolute -right-10 -bottom-10 opacity-5 w-64 h-64 text-white" viewBox="0 0 100 100" fill="currentColor">
                            <circle cx="50" cy="50" r="50" />
                        </svg>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
