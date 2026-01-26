"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Drill, Droplets, Factory, Home, TrendingUp, Pickaxe, Zap } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

const SOURCE_DATA = [
    { name: "Borewells", value: 45.2, count: 15450, color: "#3b82f6", icon: <Drill size={18} /> },
    { name: "Dug Wells", value: 5.8, count: 2100, color: "#10b981", icon: <Pickaxe size={18} /> },
];

const SECTOR_DRAFT_DATA = [
    { name: "Irrigation", value: 92, color: "#10b981", icon: <Droplets size={16} /> },
    { name: "Domestic", value: 6, color: "#3b82f6", icon: <Home size={16} /> },
    { name: "Industrial", value: 2, color: "#6366f1", icon: <Factory size={16} /> },
];

const HISTORICAL_TREND = [
    { year: 2018, draft: 38.5 },
    { year: 2019, draft: 40.2 },
    { year: 2020, draft: 42.1 },
    { year: 2021, draft: 44.8 },
    { year: 2022, draft: 48.5 },
    { year: 2023, draft: 51.0 },
];

export default function ExtractionPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Extraction Components
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Analysis of Groundwater Draft through <span className="font-semibold text-blue-700">Abstraction Structures</span> and Sectoral Usage patterns in the Koundinya Basin.
                    </p>
                </div>

                {/* Main Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                    {/* Left: Sources Breakdown */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Extraction Sources</h3>
                        <p className="text-sm text-gray-500 mb-6">Volume contribution by structure type (MCM)</p>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="h-[200px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={SOURCE_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {SOURCE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value} MCM`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-gray-800">51.0</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Total MCM</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {SOURCE_DATA.map((source) => (
                                    <div key={source.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
                                            {source.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{source.name}</p>
                                            <p className="text-xs text-gray-500">{source.count.toLocaleString()} units</p>
                                            <p className="text-xs font-bold text-blue-600 mt-1">{source.value} MCM</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Sectoral Analysis */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Sectoral Draft</h3>
                        <p className="text-sm text-gray-500 mb-6">Percentage share of groundwater usage</p>

                        <div className="flex-grow flex flex-col justify-center gap-8">
                            {/* Progress Bars */}
                            <div className="space-y-6">
                                {SECTOR_DRAFT_DATA.map((sector) => (
                                    <div key={sector.name}>
                                        <div className="flex justify-between items-end mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="text-gray-400">{sector.icon}</div>
                                                <span className="font-bold text-gray-700 text-sm">{sector.name}</span>
                                            </div>
                                            <span className="font-bold text-lg" style={{ color: sector.color }}>{sector.value}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${sector.value}%`, backgroundColor: sector.color }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                                <div className="text-center">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Irrigation</p>
                                    <p className="font-bold text-gray-900">46.9 MCM</p>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Domestic</p>
                                    <p className="font-bold text-gray-900">3.1 MCM</p>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Industrial</p>
                                    <p className="font-bold text-gray-900">1.0 MCM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Trend Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <TrendingUp size={20} className="text-blue-500" />
                                Historical Draft Trend
                            </h3>
                            <p className="text-sm text-gray-500">Rising extraction over the last 6 years</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                            <Zap size={14} /> +32% Increase
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={HISTORICAL_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorDraft" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Draft (MCM)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="draft" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDraft)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
