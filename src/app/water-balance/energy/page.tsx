"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Zap, TrendingUp, DollarSign, Cloud, ArrowRight, Info, BatteryCharging } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

// Mock Data: Depth vs Energy Consumption
const DEPTH_ENERGY_DATA = [
    { depth: 10, kwh: 120, co2: 98 },
    { depth: 20, kwh: 240, co2: 196 },
    { depth: 30, kwh: 380, co2: 311 }, // Efficiency drops
    { depth: 40, kwh: 540, co2: 442 },
    { depth: 50, kwh: 720, co2: 590 },
    { depth: 60, kwh: 950, co2: 779 },
    { depth: 70, kwh: 1200, co2: 984 },
    { depth: 80, kwh: 1500, co2: 1230 },
];

const METRICS = [
    { label: "Avg Pumping Depth", value: "45", unit: "mbgl", icon: <TrendingUp className="text-blue-500" size={24} /> },
    { label: "Energy per Acre", value: "650", unit: "kWh/crop", icon: <Zap className="text-yellow-500" size={24} /> },
    { label: "Carbon Footprint", value: "0.53", unit: "tons CO2", icon: <Cloud className="text-gray-500" size={24} /> },
    { label: "Est. Power Cost", value: "₹4,550", unit: "per acre", icon: <DollarSign className="text-emerald-500" size={24} /> },
];

export default function EnergyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Energy Implications
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Analyzing the <span className="font-semibold text-yellow-600">Water-Energy Nexus</span>. As groundwater levels decline, the energy required for abstraction increases non-linearly, impacting both cost and carbon footprint.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-16">
                    {METRICS.map((metric) => (
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

                {/* Main Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                    {/* Left: Depth-Energy Chart */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                    <Zap size={20} className="text-yellow-500" />
                                    Depth vs. Energy Consumption
                                </h3>
                                <p className="text-sm text-gray-500">Non-linear increase in power requirement with depth</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={DEPTH_ENERGY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="depth"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        label={{ value: 'Depth (mbgl)', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af', fontSize: 12 } }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="kwh" stroke="#eab308" fillOpacity={1} fill="url(#colorKwh)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right: Carbon & Cost Card */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Carbon Footprint */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-white/10 rounded-lg"><Cloud size={20} className="text-gray-300" /></div>
                                    <h3 className="font-bold text-lg">Carbon Footprint</h3>
                                </div>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                    Agriculture pumping contributes significantly to grid emissions.
                                </p>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold">0.82</span>
                                    <span className="text-sm text-gray-400 mb-1">kg CO2 / kWh</span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">AP Grid Emission Factor</p>
                            </div>
                            {/* Decorative Smoke */}
                            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gray-600/30 rounded-full blur-3xl"></div>
                        </div>

                        {/* Cost Subsidy */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Cost vs Subsidy</h3>
                                    <p className="text-sm text-gray-500">Economic Burden</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Farmer Cost</span>
                                        <span className="font-bold text-gray-900">₹0 <span className="text-xs font-normal text-gray-400">(Subsidized)</span></span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-gray-300 h-2 rounded-full w-0"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">State Burden</span>
                                        <span className="font-bold text-gray-900">₹7.00 <span className="text-xs font-normal text-gray-400">/ unit</span></span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-red-500 h-2 rounded-full w-[80%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3">
                            <Info size={18} className="text-yellow-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-yellow-800 leading-relaxed">
                                <span className="font-bold">Did you know?</span> A 10m drop in water level doubles the energy consumption for the same discharge due to pump efficiency losses.
                            </p>
                        </div>

                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
