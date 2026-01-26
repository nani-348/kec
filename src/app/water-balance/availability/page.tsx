"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Droplets, Calculator, Scale, AlertTriangle, Sprout, Home } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

const MANDAL_DATA = [
    { name: "Kuppam", mcm: 12.50, tmc: 0.441, color: "#3b82f6" },
    { name: "Gudupalle", mcm: 8.20, tmc: 0.289, color: "#ef4444" },
    { name: "Ramakuppam", mcm: 14.80, tmc: 0.522, color: "#10b981" },
    { name: "Shanthipuram", mcm: 10.40, tmc: 0.367, color: "#f59e0b" },
];

const SECTOR_DATA = [
    { name: "Irrigation", value: 95, color: "#10b981", icon: <Sprout size={16} /> },
    { name: "Domestic & Industrial", value: 5, color: "#3b82f6", icon: <Home size={16} /> },
];

const TOTAL_MCM = MANDAL_DATA.reduce((acc, item) => acc + item.mcm, 0);
const TOTAL_TMC = (TOTAL_MCM / 28.317).toFixed(3); // 1 TMC = 28.317 MCM

export default function AvailabilityPage() {
    const [unit, setUnit] = useState<"MCM" | "TMC">("TMC");

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Groundwater Availability
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Assessment of Net Annual Groundwater Availability in <span className="font-semibold text-blue-700">TMC (Thousand Million Cubic Feet)</span> and Sector-wise Allocation.
                    </p>
                </div>

                {/* Main Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                    {/* Left: Conversion & Total */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Scale size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-blue-100 font-medium text-sm uppercase tracking-wider mb-2">Net Annual Availability</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">{unit === "TMC" ? TOTAL_TMC : TOTAL_MCM.toFixed(2)}</span>
                                    <span className="text-xl font-medium text-blue-200">{unit}</span>
                                </div>
                                <div className="mt-6 flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                    <Calculator className="text-blue-200" size={20} />
                                    <div className="flex-grow">
                                        <p className="text-xs text-blue-200 font-medium uppercase">Unit Converter</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => setUnit("MCM")}
                                                className={clsx("text-xs font-bold px-2 py-1 rounded transition-colors", unit === "MCM" ? "bg-white text-blue-700" : "text-blue-200 hover:bg-white/10")}
                                            >
                                                MCM
                                            </button>
                                            <span className="text-blue-400">|</span>
                                            <button
                                                onClick={() => setUnit("TMC")}
                                                className={clsx("text-xs font-bold px-2 py-1 rounded transition-colors", unit === "TMC" ? "bg-white text-blue-700" : "text-blue-200 hover:bg-white/10")}
                                            >
                                                TMC
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-blue-300 mt-4 text-center font-mono">1 TMC ≈ 28.317 MCM</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><AlertTriangle size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-none">Stage of Development</h3>
                                    <p className="text-xs text-gray-500">Utilization vs Availability</p>
                                </div>
                            </div>
                            <div className="relative pt-4 pb-2">
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-full w-[72%] rounded-full relative">
                                        <div className="absolute right-0 -top-1 w-1.5 h-5 bg-gray-800 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-bold text-gray-400 uppercase">
                                    <span>Safe</span>
                                    <span className="text-gray-800">72%</span>
                                    <span>Critical</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Allocation & Mandal Breakdown */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Sector Allocation */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Sector-wise Allocation</h3>
                            <p className="text-sm text-gray-500 mb-6">Future Utilization Planning</p>

                            <div className="flex-grow flex flex-col items-center justify-center">
                                <div className="h-[200px] w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={SECTOR_DATA}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {SECTOR_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-bold text-gray-800">95%</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase">Irrigation</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    {SECTOR_DATA.map((item) => (
                                        <div key={item.name} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mandal Breakdown */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Mandal Distribution</h3>
                            <p className="text-sm text-gray-500 mb-6 font-mono">Unit: {unit}</p>

                            <div className="flex-grow">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={MANDAL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }} />
                                        <Tooltip
                                            formatter={(value: any) => [unit === "TMC" ? value : value + " MCM", "Availability"]}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey={unit === "TMC" ? "tmc" : "mcm"} radius={[0, 4, 4, 0]} barSize={20}>
                                            {MANDAL_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
