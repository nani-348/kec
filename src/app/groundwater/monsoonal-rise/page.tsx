"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList
} from "recharts";
import {
    CloudRain,
    TrendingUp,
    Zap,
    Calculator,
    Droplets,
    ArrowUpRight,
    Activity,
    Info
} from "lucide-react";
import { motion } from "framer-motion";

// Data from Image 1: Monsoon Rise in Kada Region
const riseData = [
    {
        name: "Previous Water Year",
        fullName: "Previous Year (May-Nov 24)",
        value: 1.68,
        fill: "#3b82f6", // Blue-500
        desc: "From 19.67m to 17.99m"
    },
    {
        name: "Present Water Year",
        fullName: "Present Year (May-Nov 25)",
        value: 5.04,
        fill: "#0ea5e9", // Sky-500
        desc: "From 20.30m to 15.26m"
    },
    {
        name: "Improvement",
        fullName: "Net Improvement",
        value: 3.36,
        fill: "#10b981", // Emerald-500
        desc: "Rise in Water Level"
    }
];

// Data from Image 1/2: Reduced Stress (Power Saving)
const stressData = [
    {
        name: "Previous Water Year",
        value: 38520,
        formatted: "38,520",
        fill: "#8b5cf6", // Violet-500
    },
    {
        name: "Present Water Year",
        value: 115560,
        formatted: "1,15,560",
        fill: "#6366f1", // Indigo-500
    },
    {
        name: "Improvement",
        value: 77040,
        formatted: "77,040",
        fill: "#14b8a6", // Teal-500
    }
];

// Table Data from Image 2
const tableData = [
    {
        period: "Previous Water Year",
        duration: "May 2024 - Nov 2024",
        rise: "1.68 m",
        range: "(19.67 - 17.99)",
        saving: 38520
    },
    {
        period: "Present Water Year",
        duration: "May 2025 - Nov 2025",
        rise: "5.04 m",
        range: "(20.30 - 15.26)",
        saving: 115560
    },
    {
        period: "Improvement",
        duration: "Compare with last year",
        rise: "3.36 m",
        range: "(5.04 - 1.68)",
        saving: 77040
    }
];

const referenceLevel = 18.31;

export default function MonsoonalRisePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Page Header */}
                <div className="mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4"
                    >
                        <CloudRain size={16} />
                        Seasonal Groundwater Assessment
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight mb-4"
                    >
                        Monsoonal Rise & Impact Analysis
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        Comprehensive analysis of groundwater level fluctuations during the monsoon season and its direct impact on energy conservation in the KADA region.
                    </motion.p>
                </div>

                {/* Section 1: Monsoonal Rise Analysis */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-gray-800 font-serif flex items-center gap-2">
                                <TrendingUp className="text-blue-600" size={24} />
                                Monsoonal Rise in KADA Region
                            </h2>
                            <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Unit: Meters (m)
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={riseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
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
                                        tick={{ fill: '#6b7280' }}
                                        label={{ value: 'Water Level Rise (m)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f3f4f6' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                    />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60} animationDuration={1500}>
                                        <LabelList dataKey="value" position="top" fill="#374151" fontWeight="bold" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Detailed Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Info size={18} className="text-blue-600" />
                                Key Observations
                            </h3>

                            <div className="space-y-6 relative">
                                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 text-xs font-bold z-10">1</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Decadal Reference Level</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Last 10 years Pre-monsoon Average Ground water level in KADA is about <span className="font-bold text-gray-900">18.31 m bgl</span>, considered as the Reference water level.
                                    </p>
                                </div>

                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-cyan-100 border-2 border-white shadow-sm flex items-center justify-center text-cyan-600 text-xs font-bold z-10">2</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Previous Water Year (2024)</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                        Monsoon rise of <span className="font-bold text-gray-900">1.68 m</span> (from 19.67m to 17.99m).
                                    </p>
                                    <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-md">
                                        9.17% of Reference Level
                                    </div>
                                </div>

                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-emerald-100 border-2 border-white shadow-sm flex items-center justify-center text-emerald-600 text-xs font-bold z-10">3</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Present Water Year (2025)</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                        Monsoon rise of <span className="font-bold text-gray-900">5.04 m</span> (from 20.30m to 15.26m).
                                    </p>
                                    <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md">
                                        27.52% of Reference Level (High Impact)
                                    </div>
                                </div>

                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-violet-100 border-2 border-white shadow-sm flex items-center justify-center text-violet-600 text-xs font-bold z-10">4</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Net Improvement</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                        Significant increase in monsoonal rise by <span className="font-bold text-gray-900">3.36 m</span>.
                                    </p>
                                    <div className="inline-block px-3 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded-md">
                                        18.35% Improvement over Reference
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Section 2: Energy Impact Analysis */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="text-amber-500" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900 font-serif">Positive Impact on Energy Consumption</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Energy Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Reduced Stress on Irrigation Pumps
                                </h3>
                                <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    Unit: KWHr (Power Saving)
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 11 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `${value / 1000}k`}
                                            tick={{ fill: '#6b7280' }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f3f4f6' }}
                                            formatter={(value: number | undefined) => [value?.toLocaleString() ?? "0", "KWHr"]}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                        />
                                        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50} animationDuration={1500}>
                                            <LabelList dataKey="formatted" position="top" fill="#4b5563" fontSize={12} fontWeight="bold" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Methodology Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg p-6 lg:p-8 text-white"
                        >
                            <div className="flex items-center gap-2 mb-6 text-blue-300">
                                <Calculator size={20} />
                                <h3 className="font-bold uppercase tracking-wider text-sm">Calculation Methodology</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-slate-300 text-sm mb-3">Power Saving Formula (KWHr):</p>
                                    <div className="bg-white/10 rounded-lg p-4 font-mono text-xs lg:text-sm overflow-x-auto border border-white/10">
                                        <div className="flex flex-col items-center">
                                            <span className="whitespace-nowrap mb-1 border-b border-white/30 pb-1">
                                                Draft × Time(hr) × Const(3600) × Func.Days × 1000 × 9.81 × Rise
                                            </span>
                                            <span className="whitespace-nowrap text-slate-400">
                                                1000 × 3600 × Power Eff.(0.7) × Motor Eff.(0.8)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-xs lg:text-sm">
                                    <div className="space-y-2">
                                        <div className="flex justify-between border-b border-white/10 pb-1">
                                            <span className="text-slate-400">Draft (Q)</span>
                                            <span className="font-mono text-blue-300">1.87 m³/sec</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-1">
                                            <span className="text-slate-400">Pumping (T)</span>
                                            <span className="font-mono text-blue-300">7 Hours</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-1">
                                            <span className="text-slate-400">Days (F)</span>
                                            <span className="font-mono text-blue-300">100 Days</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between border-b border-white/10 pb-1">
                                            <span className="text-slate-400">Gravity (g)</span>
                                            <span className="font-mono text-emerald-300">9.81 m/s²</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-1">
                                            <span className="text-slate-400">Density</span>
                                            <span className="font-mono text-emerald-300">1000 Kg/m³</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-1">
                                            <span className="text-slate-400">Efficiency</span>
                                            <span className="font-mono text-emerald-300">0.56 (Combined)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-100">
                                    <p className="leading-relaxed">
                                        <span className="font-bold text-white">Impact:</span> A 1m sustainable water level rise saves <span className="font-bold text-white">22,930 KWHr</span> in KADA Region annually.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Section 3: Data Summary Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity size={20} className="text-primary" />
                            <h2 className="text-lg font-bold text-gray-900 font-serif">Comprehensive Impact Data</h2>
                        </div>
                        <span className="text-xs font-medium text-gray-500 italic">Data Source: KADA Groundwater Analyis</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Period</th>
                                    <th className="px-6 py-4 text-center">Reference Range</th>
                                    <th className="px-6 py-4 text-right">Monsson Rise (m)</th>
                                    <th className="px-6 py-4 text-right">Energy Saving (KWHr)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tableData.map((row, idx) => (
                                    <tr key={row.period} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 text-sm">{row.period}</div>
                                            <div className="text-xs text-secondary mt-0.5">{row.duration}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-mono">
                                                {row.range}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-blue-600">{row.rise}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-emerald-600 text-base">
                                                {row.saving.toLocaleString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
