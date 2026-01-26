"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sprout, Droplets, Sun, Calendar, TrendingUp, Info } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

const CROP_SEASON_DATA = [
    { name: "Paddy", area: 1200, season: "Kharif", water: "High", color: "#10b981" }, // Green
    { name: "Groundnut", area: 4500, season: "Rabi", water: "Medium", color: "#f59e0b" }, // Amber
    { name: "Tomato", area: 2800, season: "Year-round", water: "Medium", color: "#ef4444" }, // Red
    { name: "Mulberry", area: 1500, season: "Year-round", water: "Low", color: "#8b5cf6" }, // Purple
    { name: "Pulses", area: 800, season: "Rabi", water: "Low", color: "#3b82f6" }, // Blue
];

const IRRIGATION_METHOD_DATA = [
    { name: "Flood", value: 35, color: "#9ca3af" }, // Grey
    { name: "Drip", value: 45, color: "#3b82f6" }, // Blue
    { name: "Sprinkler", value: 20, color: "#0ea5e9" }, // Sky
];

const WATER_SAVINGS = [
    { method: "Drip", savings: "40-60%", efficiency: "90%" },
    { method: "Sprinkler", savings: "30-50%", efficiency: "80%" },
    { method: "Flood", savings: "0%", efficiency: "40%" },
];

export default function CroppingPage() {
    const [activeTab, setActiveTab] = useState<"Patterns" | "Irrigation">("Patterns");

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Cropping & Irrigation Practices
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Analyzing the shifts in <span className="font-semibold text-emerald-700">Agricultural Patterns</span> and the adoption of <span className="font-semibold text-blue-700">Micro-Irrigation</span> technologies to enhance water use efficiency.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex">
                        <button
                            onClick={() => setActiveTab("Patterns")}
                            className={clsx(
                                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                                activeTab === "Patterns" ? "bg-emerald-50 text-emerald-700 shadow-sm" : "text-gray-500 hover:bg-gray-50"
                            )}
                        >
                            Cropping Patterns
                        </button>
                        <button
                            onClick={() => setActiveTab("Irrigation")}
                            className={clsx(
                                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                                activeTab === "Irrigation" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:bg-gray-50"
                            )}
                        >
                            Irrigation Methods
                        </button>
                    </div>
                </div>

                {/* Content Sections */}
                {activeTab === "Patterns" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                            {/* Distribution Chart */}
                            <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                <h3 className="font-bold text-gray-900 text-lg mb-2">Crop Area Distribution</h3>
                                <p className="text-sm text-gray-500 mb-6">Areal extent of major crops (Acres)</p>

                                <div className="h-[350px] w-full flex-grow">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={CROP_SEASON_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                            <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="area" radius={[4, 4, 0, 0]} barSize={40}>
                                                {CROP_SEASON_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="lg:col-span-4 space-y-4">
                                <div className="bg-emerald-900 text-white p-6 rounded-2xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="font-bold text-lg mb-1">Crop Diversification</h3>
                                        <p className="text-emerald-200 text-sm mb-6">Shift towards horticulture.</p>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                            <span className="text-sm font-medium">Horticulture: 45%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                            <span className="text-sm font-medium">ID Crops: 35%</span>
                                        </div>
                                    </div>
                                    <div className="absolute right-0 bottom-0 opacity-10">
                                        <Sprout size={120} />
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Calendar size={18} className="text-gray-400" /> Seasonal Dominance
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Kharif (Monsoon)</span>
                                            <span className="font-bold text-emerald-600">Rainfed Groundnut</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Rabi (Winter)</span>
                                            <span className="font-bold text-amber-600">Vegetables</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Zaid (Summer)</span>
                                            <span className="font-bold text-red-600">Fallow / Fodder</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Irrigation Content */}
                {activeTab === "Irrigation" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                            {/* Method Split */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-gray-900 text-lg mb-2 self-start">Irrigation Methods</h3>
                                <div className="h-[250px] w-[250px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={IRRIGATION_METHOD_DATA}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {IRRIGATION_METHOD_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <Droplets size={24} className="text-blue-500 mb-1" />
                                        <span className="text-xs font-bold text-gray-400 uppercase">Methods</span>
                                    </div>
                                </div>
                            </div>

                            {/* Efficiency Table */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 text-lg mb-6">Efficiency Comparison</h3>
                                <div className="overflow-hidden rounded-xl border border-gray-100">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                                            <tr>
                                                <th className="px-6 py-3">Method</th>
                                                <th className="px-6 py-3">Efficiency</th>
                                                <th className="px-6 py-3">Water Saving</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {WATER_SAVINGS.map((row) => (
                                                <tr key={row.method} className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 font-bold text-gray-800">{row.method}</td>
                                                    <td className="px-6 py-4 text-emerald-600 font-bold">{row.efficiency}</td>
                                                    <td className="px-6 py-4 text-blue-600">{row.savings}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex gap-3 p-4 bg-blue-50 rounded-xl">
                                    <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-800 leading-relaxed">
                                        Adoption of drip irrigation in horticulture crops like Tomato and Papaya has reduced water consumption by ~45% in the Koundinya basin.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
