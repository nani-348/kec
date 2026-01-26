"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Activity, Droplets, Zap, Info, ArrowUpRight } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend
} from "recharts";

// --- Data Models ---

const PARAMETER_DATA = [
    { name: 'Kuppam', T: 15.5, Sy: 2.5, K: 1.25, desc: "High Potential" },
    { name: 'Gudupalle', T: 4.8, Sy: 1.2, K: 0.45, desc: "Low Potential" },
    { name: 'Ramakuppam', T: 12.0, Sy: 2.1, K: 0.95, desc: "Moderate Potential" },
    { name: 'Shanthipuram', T: 10.5, Sy: 1.8, K: 0.85, desc: "Moderate Potential" }
];

const METRICS_INFO = [
    {
        title: "Transmissivity (T)",
        value: "10-15",
        unit: "m²/day",
        icon: <Activity size={24} className="text-blue-600" />,
        color: "bg-blue-50 border-blue-100",
        description: "The rate at which water flows horizontally through the aquifer. Higher values indicate better yield potential for borewells."
    },
    {
        title: "Specific Yield (Sy)",
        value: "2-3",
        unit: "%",
        icon: <Droplets size={24} className="text-cyan-600" />,
        color: "bg-cyan-50 border-cyan-100",
        description: "The percentage of water volume that can drain from the rock by gravity. Hard rocks typically have low Sy (<3%)."
    },
    {
        title: "Hydraulic Conductivity (K)",
        value: "0.5-1.5",
        unit: "m/day",
        icon: <Zap size={24} className="text-amber-600" />,
        color: "bg-amber-50 border-amber-100",
        description: "A measure of how easily water can move through the rock's fractures and pores."
    }
];

export default function ParametersPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Aquifer Hydraulic Parameters
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Key hydraulic characteristics defining the <span className="font-semibold text-blue-700">Storage</span> and <span className="font-semibold text-blue-700">Transmission</span> capabilities of the subsurface system.
                    </p>
                </div>

                {/* Metrics Definitions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {METRICS_INFO.map((metric) => (
                        <div key={metric.title} className={`p-6 rounded-2xl border shadow-sm ${metric.color} transition-transform hover:-translate-y-1`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    {metric.icon}
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase">{metric.unit}</p>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{metric.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {metric.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Comparative Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Transmissivity Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                                    <Activity size={20} className="text-blue-500" />
                                    Transmissivity (T)
                                </h3>
                                <p className="text-sm text-gray-500">Mandal-wise comparison of flow potential</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PARAMETER_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        label={{ value: 'm²/day', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="T" name="Transmissivity" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <p className="text-xs text-blue-800">
                                <strong>Insight:</strong> Kuppam exhibits the highest Transmissivity (15.5 m²/day), correlating with its deeper valley-fill sedimentation compared to the rocky terrain of Gudupalle.
                            </p>
                        </div>
                    </div>

                    {/* Specific Yield Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                                    <Droplets size={20} className="text-cyan-500" />
                                    Specific Yield (Sy)
                                </h3>
                                <p className="text-sm text-gray-500">Storage capacity by percentage</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PARAMETER_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        label={{ value: '%', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="Sy" name="Specific Yield (%)" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 p-3 bg-cyan-50/50 rounded-lg border border-cyan-100">
                            <p className="text-xs text-cyan-800">
                                <strong>Insight:</strong> Values range from 1.2% to 2.5%, typical for Granitic terrains. This indicates that for every 100m³ of saturated rock, only ~2m³ of water is extractable.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Educational / Context Section */}
                <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-bold mb-4 font-serif">Implications for Sustainability</h2>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                Understanding these parameters is crucial for groundwater management. Low Transmissivity means interference between borewells happens quickly, while low Specific Yield means groundwater reserves deplete rapidly during droughts.
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                                View Sustainability Report <ArrowUpRight size={16} />
                            </button>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
                                <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                    <Info size={16} /> Cone of Depression
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    In low T aquifers (like Gudupalle), pumping creates deep, steep cones of depression. This causes neighboring wells to dry up faster.
                                </p>
                            </div>
                            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
                                <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                                    <Info size={16} /> Recharge Lag
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Low Hydraulic Conductivity (K) means recharge water from rainfall takes longer to percolate down to the deep fracture zones where borewells tap.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
