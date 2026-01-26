"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calculator, Database, Info, Droplets, PieChart as PieIcon, ArrowRight } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

// Mock Data for Mandal-wise Storage (MCM = Million Cubic Meters)
const STORAGE_DATA = [
    { name: 'Kuppam', area: 15420, thickness: 17.0, sy: 2.5, storage: 6.55, color: '#3b82f6' },
    { name: 'Gudupalle', area: 12100, thickness: 7.4, sy: 1.5, storage: 1.34, color: '#ef4444' },
    { name: 'Ramakuppam', area: 13800, thickness: 12.8, sy: 2.0, storage: 3.53, color: '#f59e0b' },
    { name: 'Shanthipuram', area: 14500, thickness: 10.5, sy: 1.8, storage: 2.74, color: '#10b981' }
];

const TOTAL_STORAGE = STORAGE_DATA.reduce((acc, item) => acc + item.storage, 0).toFixed(2);

export default function StorageEstimationPage() {
    // Calculator State
    const [calcArea, setCalcArea] = useState<number>(1000); // hectares
    const [calcThickness, setCalcThickness] = useState<number>(10); // meters
    const [calcSy, setCalcSy] = useState<number>(2.0); // percentage

    // MCM Calculation: (Area in ha * 10000 m²/ha * Thickness * Sy/100) / 1,000,000
    // Simplified: Area * Thickness * (Sy/100) / 100
    // Actually: 1 ha-m = 10,000 m³. 
    // Volume (m³) = Area(ha) * 10,000 * Thickness(m) * (Sy/100)
    // Volume (MCM) = Volume (m³) / 1,000,000
    //             = (Area * 10,000 * Thickness * Sy) / (100 * 1,000,000)
    //             = (Area * Thickness * Sy) / 10,000
    const calculatedStorage = ((calcArea * calcThickness * calcSy) / 10000).toFixed(3);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Groundwater In-Storage Estimation
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Quantitative assessment of the <span className="font-semibold text-blue-700">Static Groundwater Resources</span> available in the weathered and fractured zones of the aquifer system.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Left: Total Storage Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Database size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-blue-100 font-medium text-sm uppercase tracking-wider mb-2">Total Estimated Reserve</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">{TOTAL_STORAGE}</span>
                                    <span className="text-xl font-medium text-blue-200">MCM</span>
                                </div>
                                <p className="text-xs text-blue-200 mt-4 leading-relaxed">
                                    Million Cubic Meters (MCM) of extractable groundwater currently estimated in the Top Soil, Weathered, and Fractured zones combined across all 4 Mandals.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <PieIcon size={18} className="text-gray-500" />
                                Mandal-wise Distribution
                            </h4>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={STORAGE_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="storage"
                                        >
                                            {STORAGE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`${value} MCM`, 'Storage']}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Comparative Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">In-Storage by Mandal</h3>
                                <p className="text-sm text-gray-500">Comparison of available volume (MCM)</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <Database size={20} className="text-gray-400" />
                            </div>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={STORAGE_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        width={100}
                                        tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        formatter={(value) => [`${value} MCM`, 'Storage']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="storage" name="Storage (MCM)" radius={[0, 4, 4, 0]} barSize={32}>
                                        {STORAGE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                            {STORAGE_DATA.map((item) => (
                                <div key={item.name} className="p-2 rounded-lg bg-gray-50">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{item.name}</p>
                                    <p className="text-sm font-bold text-gray-900">{item.storage}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Calculator Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                            <Calculator size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Interactive Storage Calculator</h2>
                            <p className="text-sm text-slate-500">Estimate groundwater volume based on GEC methodology parameters.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Inputs */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Area (A)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={calcArea}
                                        onChange={(e) => setCalcArea(Number(e.target.value))}
                                        className="w-full text-lg font-bold text-slate-900 border-b border-slate-200 focus:border-blue-500 outline-none pb-1"
                                    />
                                    <span className="text-xs text-slate-400 font-medium">ha</span>
                                </div>
                                <input
                                    type="range" min="100" max="20000" step="100"
                                    value={calcArea} onChange={(e) => setCalcArea(Number(e.target.value))}
                                    className="w-full mt-3 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Thickness (H)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={calcThickness}
                                        onChange={(e) => setCalcThickness(Number(e.target.value))}
                                        className="w-full text-lg font-bold text-slate-900 border-b border-slate-200 focus:border-blue-500 outline-none pb-1"
                                    />
                                    <span className="text-xs text-slate-400 font-medium">m</span>
                                </div>
                                <input
                                    type="range" min="1" max="50" step="0.5"
                                    value={calcThickness} onChange={(e) => setCalcThickness(Number(e.target.value))}
                                    className="w-full mt-3 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sp. Yield (Sy)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={calcSy}
                                        onChange={(e) => setCalcSy(Number(e.target.value))}
                                        className="w-full text-lg font-bold text-slate-900 border-b border-slate-200 focus:border-blue-500 outline-none pb-1"
                                    />
                                    <span className="text-xs text-slate-400 font-medium">%</span>
                                </div>
                                <input
                                    type="range" min="0.1" max="10" step="0.1"
                                    value={calcSy} onChange={(e) => setCalcSy(Number(e.target.value))}
                                    className="w-full mt-3 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="hidden lg:flex lg:col-span-1 justify-center">
                            <ArrowRight className="text-slate-300" size={32} />
                        </div>

                        {/* Result */}
                        <div className="lg:col-span-4">
                            <div className="bg-slate-900 rounded-2xl p-6 text-center text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                                <div className="relative z-10">
                                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-2">Estimated Volume</p>
                                    <div className="flex items-center justify-center gap-3 mb-1">
                                        <Droplets size={28} className="text-cyan-400" />
                                        <h3 className="text-4xl font-bold">{calculatedStorage}</h3>
                                    </div>
                                    <p className="text-lg font-medium text-slate-300">MCM</p>

                                    <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                                        FORMULA: (A × 10⁴ × H × Sy%) / 10⁶
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology Note */}
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 flex gap-4">
                    <Info className="text-amber-600 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Methodology Note</h4>
                        <p className="text-sm text-amber-800/80 leading-relaxed">
                            The in-storage estimates provided here represent the static reserves based on GEC (Groundwater Estimation Committee) norms. This includes the water stored in the vadose zone and the saturated aquifer zone. 1 MCM = 100 Crore Liters.
                        </p>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
