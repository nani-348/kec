"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveMap from "@/components/overview/InteractiveMap";
import { ArrowDown, ArrowUp, Droplets, Activity, Layers } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceLine, LabelList
} from "recharts";

export default function CurrentStatusPage() {
    // Data from PDF Page 10 Analysis
    const waterLevelData = [
        {
            name: "Previous Year (2024)",
            rise: 1.68,
            preMonsoon: 19.67,
            postMonsoon: 17.99,
            color: "#94a3b8"
        },
        {
            name: "Present Year (2025)",
            rise: 5.04,
            preMonsoon: 20.30,
            postMonsoon: 15.26,
            color: "#3b82f6"
        }
    ];

    const comparisonData = [
        { name: "2024 Rise", value: 1.68, fill: "#94a3b8" },
        { name: "2025 Rise", value: 5.04, fill: "#3b82f6" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Current Groundwater Level Status
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Monitoring the impact of monsoonal recharge on groundwater levels.
                        Significant recovery observed in the current water year.
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Droplets size={64} className="text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Monsoon Rise (2025)</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-bold text-blue-600">5.04 m</h3>
                            <span className="text-sm font-medium text-green-600 mb-1 flex items-center">
                                <ArrowUp size={16} /> +3.36m vs 2024
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">May '25 to Nov '25</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-sm font-medium text-gray-500 mb-2">Current Level (Nov '25)</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-3xl font-bold text-gray-900">15.26 m</h3>
                            <span className="text-xs text-gray-500 mb-1">bgl</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                            <ArrowDown size={14} /> Improved from 20.30m (May)
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-sm font-medium text-gray-500 mb-2">Reference Average</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-3xl font-bold text-gray-900">18.31 m</h3>
                            <span className="text-xs text-gray-500 mb-1">bgl</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Decadal Mean (Last 10 Yrs)</p>
                    </div>
                </div>

                {/* Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Monsoon Rise Comparison</h2>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
                                2024 vs 2025
                            </span>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        hide
                                        domain={[0, 6]}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={80}>
                                        <LabelList dataKey="value" position="top" formatter={(val) => `${val} m`} style={{ fill: '#374151', fontWeight: 600 }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-gray-500 mt-4 text-center">
                            The monsoonal rise in 2025 is <span className="font-bold text-gray-900">3x higher</span> than in 2024, indicating highly effective recharge.
                        </p>
                    </div>

                    {/* Text / Context */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-lg font-bold text-blue-800 mb-2">Impact Analysis</h3>
                            <p className="text-blue-900/80 leading-relaxed text-sm">
                                The significant rise of <strong>5.04 meters</strong> in groundwater levels during the 2025 monsoon season (May to Nov) highlights a robust aquifer response to rainfall and conservation measures.
                            </p>
                            <div className="mt-4 pt-4 border-t border-blue-200 flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-800/70">Recharge vs Reference Level:</span>
                                    <span className="font-bold text-blue-900">27.52%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-800/70">Net Improvement vs 2024:</span>
                                    <span className="font-bold text-blue-900">+3.36 m</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Activity size={18} className="text-orange-500" />
                                Critical Observation
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                While the rise is substantial, maintaining these levels requires sustained demand-side management as the region enters the non-monsoon extraction period.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Spatial Distribution Map */}
                <section className="mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <Layers size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Spatial Distribution of Water Levels</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <InteractiveMap
                                src="/images/about-kada/page5_img44.png"
                                alt="Pre-Monsoon Water Levels"
                                title="Pre-Monsoon Depth to Water Level (May)"
                                className="h-[400px]"
                            />
                            <InteractiveMap
                                src="/images/about-kada/page5_img45.png"
                                alt="Post-Monsoon Water Levels"
                                title="Post-Monsoon Depth to Water Level (Nov)"
                                className="h-[400px]"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-4 italic text-center">
                            Comparison of Depth to Water Level (DTW) maps between Pre-monsoon and Post-monsoon periods.
                        </p>
                    </div>
                </section>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">Water Year Comparison</h3>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">KADA Region Avg</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Water Year</th>
                                    <th className="px-6 py-4">Pre-Monsoon (May)</th>
                                    <th className="px-6 py-4">Post-Monsoon (Nov)</th>
                                    <th className="px-6 py-4">Monsoon Rise</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gray-900">2024-25 (Present)</td>
                                    <td className="px-6 py-4 text-gray-600">20.30 m</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">15.26 m</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">+5.04 m</td>
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Excellent</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">2023-24 (Previous)</td>
                                    <td className="px-6 py-4 text-gray-600">19.67 m</td>
                                    <td className="px-6 py-4 text-gray-600">17.99 m</td>
                                    <td className="px-6 py-4 text-gray-600">+1.68 m</td>
                                    <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">Moderate</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
