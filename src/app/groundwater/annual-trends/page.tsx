"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Clock, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border border-gray-100 shadow-lg rounded-lg">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm mb-1">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: (entry.stroke as string | undefined) ?? entry.color }}
                        ></span>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-semibold text-gray-900">{entry.value} m</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnnualTrendsPage() {
    // Data Structure for Trend Comparison
    // "DecadalAvg": The 10-year baseline (18.31 m)
    // "PreviousYear": 2023-24 Scenario (Stressed)
    // "CurrentYear": 2024-25 Scenario (Recovery)
    const trendData = [
        { month: "May (Pre)", DecadalAvg: 18.31, PreviousYear: 19.67, CurrentYear: 20.30 },
        { month: "Jun", DecadalAvg: 18.31, PreviousYear: 19.40, CurrentYear: 19.50 }, // Estimated interpolation
        { month: "Aug", DecadalAvg: 18.31, PreviousYear: 19.00, CurrentYear: 17.80 }, // Estimated interpolation
        { month: "Nov (Post)", DecadalAvg: 18.31, PreviousYear: 17.99, CurrentYear: 15.26 },
    ];

    const commandSplitData = [
        {
            region: "GUDI PALLE",
            nonCommand: { working: 1072, partial: 460, abandoned: 359 },
            hnss: { working: 763, partial: 277, abandoned: 105 },
        },
        {
            region: "KUPPAM",
            nonCommand: { working: 1349, partial: 764, abandoned: 245 },
            hnss: { working: 401, partial: 206, abandoned: 109 },
        },
        {
            region: "RAMA KUPPAM",
            nonCommand: { working: 676, partial: 1094, abandoned: 296 },
            hnss: { working: 402, partial: 530, abandoned: 316 },
        },
        {
            region: "SANTHI PURAM",
            nonCommand: { working: 693, partial: 521, abandoned: 344 },
            hnss: { working: 616, partial: 552, abandoned: 229 },
        },
        {
            region: "KADA TOTAL",
            nonCommand: { working: 3790, partial: 2839, abandoned: 1244 },
            hnss: { working: 2182, partial: 1565, abandoned: 759 },
        },
    ];

    const nonCommandMandalTotals = [
        { mandal: "GUDI PALLE", total: 1798, working: 1072, partial: 460, abandoned: 359 },
        { mandal: "KUPPAM", total: 2379, working: 1349, partial: 764, abandoned: 245 },
        { mandal: "RAMA KUPPAM", total: 2201, working: 676, partial: 1094, abandoned: 296 },
        { mandal: "SANTHI PURAM", total: 1491, working: 693, partial: 521, abandoned: 344 },
        { mandal: "KADA", total: 7869, working: 3790, partial: 2839, abandoned: 1244 },
    ];

    const hnssMandalTotals = [
        { mandal: "GUDI PALLE", total: 1238, working: 763, partial: 277, abandoned: 105, addBw: 191 },
        { mandal: "KUPPAM", total: 695, working: 401, partial: 206, abandoned: 109, addBw: 100 },
        { mandal: "RAMA KUPPAM", total: 1113, working: 402, partial: 530, abandoned: 316, addBw: 101 },
        { mandal: "SANTHI PURAM", total: 1464, working: 616, partial: 552, abandoned: 229, addBw: 154 },
        { mandal: "KADA", total: 4510, working: 2182, partial: 1565, abandoned: 759, addBw: 546 },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Annual & Long-Term Trends
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Analyzing the region&apos;s groundwater recovery against the 10-year decadal baseline.
                    </p>
                </div>

                {/* Narrative Cards - "The Turnaround" */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: The Deficit */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-l-red-500 shadow-sm opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                <AlertCircle size={24} />
                            </div>
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">May 2025</span>
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm mb-1">Starting Deficit</h3>
                        <p className="text-2xl font-bold text-gray-900">1.99 m</p>
                        <p className="text-xs text-red-500 mt-2 font-medium">Began deeper than Decadal Avg (18.31m)</p>
                    </div>

                    {/* Card 2: The Baseline */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-l-gray-400 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                            <Clock size={100} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                <Clock size={24} />
                            </div>
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Baseline</span>
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm mb-1">Decadal Average</h3>
                        <p className="text-3xl font-bold text-gray-800">18.31 m</p>
                        <p className="text-xs text-gray-400 mt-2">10-Year Mean Level</p>
                    </div>

                    {/* Card 3: The Recovery */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-l-green-500 shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Nov 2025</span>
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm mb-1">Current Surplus</h3>
                        <p className="text-4xl font-bold text-green-600">3.05 m</p>
                        <p className="text-xs text-green-600 mt-2 font-medium">Above the Decadal Baseline!</p>
                    </div>
                </div>

                {/* Main Trend Analysis Chart */}
                <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Activity className="text-primary" size={24} />
                                Recovery Trajectory Analysis
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Notice the sharp &quot;V-Shape&quot; recovery in 2025 where it crosses the dashed baseline, unlike the shallow curve of 2024.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-0.5 border-t-2 border-dashed border-gray-400"></span>
                                <span className="text-gray-600">Decadal Avg</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-gray-900 font-medium">Current Year</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={trendData}
                                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    label={{
                                        value: 'Depth to Water Level (m bgl)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fill: '#9ca3af', fontSize: 12 },
                                        dy: 60
                                    }}
                                    domain={[12, 22]}
                                    reversed={true} // Reverse for Depth logic
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af' }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }} />

                                {/* Decadal Baseline */}
                                <Line
                                    type="monotone"
                                    dataKey="DecadalAvg"
                                    name="Decadal Baseline"
                                    stroke="#9ca3af"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />

                                {/* Previous Year (Context) */}
                                <Line
                                    type="monotone"
                                    dataKey="PreviousYear"
                                    name="Last Year (2024)"
                                    stroke="#cbd5e1"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#cbd5e1' }}
                                />

                                {/* Current Year (Active) */}
                                <Line
                                    type="monotone"
                                    dataKey="CurrentYear"
                                    name="Current Year (2025)"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Additional Insight: Why the Change? */}
                <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Detailed Split: Non-Command vs HNSS Area</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Breakdown of operational status by specific command area zones.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600">
                                    <th className="text-left px-4 py-3 border-b">Region</th>
                                    <th className="text-center px-4 py-3 border-b" colSpan={3}>Non Command Area</th>
                                    <th className="text-center px-4 py-3 border-b" colSpan={3}>HNSS &amp; MIT Command Area</th>
                                </tr>
                                <tr className="text-gray-500">
                                    <th className="text-left px-4 py-2 border-b"></th>
                                    <th className="text-right px-4 py-2 border-b">Working</th>
                                    <th className="text-right px-4 py-2 border-b">Partial</th>
                                    <th className="text-right px-4 py-2 border-b">Abandoned</th>
                                    <th className="text-right px-4 py-2 border-b">Working</th>
                                    <th className="text-right px-4 py-2 border-b">Partial</th>
                                    <th className="text-right px-4 py-2 border-b">Abandoned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commandSplitData.map((row) => (
                                    <tr key={row.region} className="border-b last:border-b-0">
                                        <td className="px-4 py-3 font-medium text-gray-800">{row.region}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{row.nonCommand.working.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{row.nonCommand.partial.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{row.nonCommand.abandoned.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{row.hnss.working.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{row.hnss.partial.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{row.hnss.abandoned.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3">
                                <h3 className="text-sm font-semibold text-gray-700">Non-Command Area: Mandal Totals</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-500">
                                            <th className="text-left px-4 py-2 border-b">Mandal</th>
                                            <th className="text-right px-4 py-2 border-b">Total</th>
                                            <th className="text-right px-4 py-2 border-b">Working</th>
                                            <th className="text-right px-4 py-2 border-b">Partial</th>
                                            <th className="text-right px-4 py-2 border-b">Abandoned</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nonCommandMandalTotals.map((row) => (
                                            <tr key={row.mandal} className="border-b last:border-b-0">
                                                <td className="px-4 py-3 font-medium text-gray-800">{row.mandal}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.total.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.working.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.partial.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.abandoned.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3">
                                <h3 className="text-sm font-semibold text-gray-700">HNSS &amp; MIT Command Area: Mandal Totals</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-500">
                                            <th className="text-left px-4 py-2 border-b">Mandal</th>
                                            <th className="text-right px-4 py-2 border-b">Total</th>
                                            <th className="text-right px-4 py-2 border-b">Working</th>
                                            <th className="text-right px-4 py-2 border-b">Partial</th>
                                            <th className="text-right px-4 py-2 border-b">Abandoned</th>
                                            <th className="text-right px-4 py-2 border-b">Possibility of AddBW</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hnssMandalTotals.map((row) => (
                                            <tr key={row.mandal} className="border-b last:border-b-0">
                                                <td className="px-4 py-3 font-medium text-gray-800">{row.mandal}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.total.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.working.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.partial.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.abandoned.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right text-gray-700">{row.addBw.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Insight: Why the Change? */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white shadow-lg overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingUp size={200} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                <TrendingUp size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-50">Trend Reversal</h3>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-serif">
                            From Stress to Surplus
                        </h2>
                        <p className="text-blue-100 text-lg leading-relaxed mb-8">
                            For the first time in recent cycles, the groundwater curve has aggressively crossed the decadal average. This &quot;Golden Crossover&quot; in late 2025 signifies that the combination of recharge structures and favorable rainfall has successfully reversed the depletion trend.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                                <p className="text-sm text-blue-200">Pre-Monsoon Deviation</p>
                                <p className="text-2xl font-bold text-red-300">-10.8%</p>
                                <p className="text-xs text-blue-300">Below Average</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                                <p className="text-sm text-blue-200">Post-Monsoon Deviation</p>
                                <p className="text-2xl font-bold text-green-300">+16.6%</p>
                                <p className="text-xs text-blue-300">Above Average</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
