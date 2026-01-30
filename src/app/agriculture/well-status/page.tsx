"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Activity,
    CheckCircle2,
    AlertTriangle,
    Droplets,
    Tractor,
    MapPin,
    ArrowUpRight,
    TrendingDown,
    Construction,
    LayoutGrid
} from "lucide-react";
import clsx from "clsx";

// --- Data Constants ---
const REGIONAL_STATS = [
    {
        mandal: "GUDI PALLE",
        total: 3036,
        working: 1835,
        partial: 737,
        abandoned: 464,
    },
    {
        mandal: "KUPPAM",
        total: 3074,
        working: 1750,
        partial: 970,
        abandoned: 354,
    },
    {
        mandal: "RAMA KUPPAM",
        total: 3314,
        working: 1078,
        partial: 1624,
        abandoned: 612,
    },
    {
        mandal: "SANTHI PURAM",
        total: 2955,
        working: 1309,
        partial: 1073,
        abandoned: 573,
    },
];

const OVERALL_TOTALS = {
    total: 12379,
    working: 5972,
    partial: 4404,
    abandoned: 2003
};

const PIE_DATA = [
    { name: "Working", value: 5972, color: "#3b82f6" },
    { name: "Seasonally Working", value: 4404, color: "#f97316" },
    { name: "Abandoned", value: 2003, color: "#9ca3af" },
];

const COMMAND_AREA_STATS = [
    {
        area: "Non Command Area",
        working: 3790,
        partial: 2839,
        abandoned: 1244
    },
    {
        area: "HNSS & MIT Command Area",
        working: 2182,
        partial: 1565,
        abandoned: 759
    }
];

const DETAILED_SPLIT_STATS = [
    {
        mandal: "GUDI PALLE",
        nc_working: 1072, nc_partial: 460, nc_abandoned: 359,
        hnss_working: 763, hnss_partial: 277, hnss_abandoned: 105
    },
    {
        mandal: "KUPPAM",
        nc_working: 1349, nc_partial: 764, nc_abandoned: 245,
        hnss_working: 401, hnss_partial: 206, hnss_abandoned: 109
    },
    {
        mandal: "RAMA KUPPAM",
        nc_working: 676, nc_partial: 1094, nc_abandoned: 296,
        hnss_working: 402, hnss_partial: 530, hnss_abandoned: 316
    },
    {
        mandal: "SANTHI PURAM",
        nc_working: 693, nc_partial: 521, nc_abandoned: 344,
        hnss_working: 616, hnss_partial: 552, hnss_abandoned: 229
    }
];

const KADA_SPLIT_TOTALS = {
    nc_working: 3790, nc_partial: 2839, nc_abandoned: 1244,
    hnss_working: 2182, hnss_partial: 1565, hnss_abandoned: 759
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-semibold text-gray-900">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function WellStatusPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Activity size={14} />
                        Constituency Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Status of Bore Wells in Kuppam Constituency
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Comprehensive breakdown of borewell functionality, including working, seasonally working, and abandoned wells across all Mandals.
                    </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Tractor size={64} className="text-gray-900" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Bore Wells</p>
                        <p className="text-4xl font-bold text-gray-900">{OVERALL_TOTALS.total.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md w-fit">
                            <MapPin size={12} />
                            Across 4 Mandals
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={64} className="text-blue-600" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Working</p>
                        <p className="text-4xl font-bold text-blue-600">{OVERALL_TOTALS.working.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md w-fit">
                            <ArrowUpRight size={12} />
                            {((OVERALL_TOTALS.working / OVERALL_TOTALS.total) * 100).toFixed(1)}% Functional
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <AlertTriangle size={64} className="text-orange-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Seasonally Working</p>
                        <p className="text-4xl font-bold text-orange-500">{OVERALL_TOTALS.partial.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-orange-700 bg-orange-50 px-2 py-1 rounded-md w-fit">
                            <TrendingDown size={12} />
                            {((OVERALL_TOTALS.partial / OVERALL_TOTALS.total) * 100).toFixed(1)}% Seasonal Impact
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Construction size={64} className="text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Abandoned</p>
                        <p className="text-4xl font-bold text-gray-400">{OVERALL_TOTALS.abandoned.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-fit">
                            Requires Attention
                        </div>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Left: Chart Visualization */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Mandal-wise Status Breakdown</h2>
                                <p className="text-sm text-gray-500">Comparison of Working vs Seasonally Working vs Abandoned wells</p>
                            </div>
                            <div className="flex gap-4 text-xs font-medium">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-500"></span> Working</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-orange-500"></span> Seasonal</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-gray-400"></span> Abandoned</div>
                            </div>
                        </div>

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={REGIONAL_STATS}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                    barGap={0}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="mandal"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />

                                    <Bar dataKey="working" name="Working" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="partial" name="Seasonal Working" fill="#f97316" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="abandoned" name="Abandoned" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right: Pie Chart Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Overall Composition</h3>
                        <div className="h-[300px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={PIE_DATA}
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                    >
                                        {PIE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                                <div className="text-3xl font-bold text-gray-900">{OVERALL_TOTALS.total.toLocaleString()}</div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Total Wells</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- New Section: Command vs Non-Command Analysis --- */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <LayoutGrid size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Command Area Analysis</h2>
                            <p className="text-gray-500">Comparison between Non-Command Area and HNSS & MIT Command Area</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Command Area Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 text-lg mb-6 text-center">Status Comparison by Area</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={COMMAND_AREA_STATS}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                        barGap={5}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey="area"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 600 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                        <Legend verticalAlign="top" height={36} />

                                        <Bar dataKey="working" name="Working" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                        <Bar dataKey="partial" name="Seasonal Working" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                        <Bar dataKey="abandoned" name="Abandoned" fill="#9ca3af" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Summary Narrative or Small Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 flex flex-col justify-center items-center text-center">
                                <p className="text-xs font-bold text-indigo-500 uppercase mb-2">Non-Command Working</p>
                                <p className="text-3xl font-bold text-indigo-700">3,790</p>
                                <div className="mt-2 text-xs text-indigo-400 font-medium">Critical Dependence</div>
                            </div>
                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 flex flex-col justify-center items-center text-center">
                                <p className="text-xs font-bold text-blue-500 uppercase mb-2">Command Working</p>
                                <p className="text-3xl font-bold text-blue-700">2,182</p>
                                <div className="mt-2 text-xs text-blue-400 font-medium">HNSS Support</div>
                            </div>
                            <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 flex flex-col justify-center items-center text-center">
                                <p className="text-xs font-bold text-orange-500 uppercase mb-2">Total Seasonal</p>
                                <p className="text-3xl font-bold text-orange-600">4,404</p>
                                <div className="mt-2 text-xs text-orange-400 font-medium">Seasonal Issues</div>
                            </div>
                            <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-200 flex flex-col justify-center items-center text-center">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Total Abandoned</p>
                                <p className="text-3xl font-bold text-gray-700">2,003</p>
                                <div className="mt-2 text-xs text-gray-400 font-medium">~16% Failure Rate</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Table Section (Original) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-lg font-serif">Mandal Status Overview</h3>
                        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Download CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Mandal</th>
                                    <th className="px-6 py-4 text-center">Total Bore Wells</th>
                                    <th className="px-6 py-4 text-center text-blue-700 bg-blue-50/50">Working</th>
                                    <th className="px-6 py-4 text-center text-orange-700 bg-orange-50/50">Seasonally Working</th>
                                    <th className="px-6 py-4 text-center text-gray-600 bg-gray-100/50">Abandoned</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {REGIONAL_STATS.map((row) => (
                                    <tr key={row.mandal} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-100/50">{row.mandal}</td>
                                        <td className="px-6 py-4 text-center text-gray-900 border-r border-gray-100/50">{row.total.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center font-medium text-blue-600 bg-blue-50/10 border-r border-blue-100/20">{row.working.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center font-medium text-orange-600 bg-orange-50/10 border-r border-orange-100/20">{row.partial.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-500 bg-gray-50/20">{row.abandoned.toLocaleString()}</td>
                                    </tr>
                                ))}
                                {/* Total Row */}
                                <tr className="bg-gray-100/80 font-bold border-t-2 border-gray-200">
                                    <td className="px-6 py-4 text-gray-900">KADA TOTAL</td>
                                    <td className="px-6 py-4 text-center text-gray-900">{OVERALL_TOTALS.total.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center text-blue-700">{OVERALL_TOTALS.working.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center text-orange-700">{OVERALL_TOTALS.partial.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{OVERALL_TOTALS.abandoned.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detailed Split Table Section (New) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 text-lg font-serif">Detailed Split: Non-Command vs HNSS Area</h3>
                        <p className="text-xs text-gray-500 mt-1">Breakdown of operational status by specific command area zones.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs md:text-sm">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] md:text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="px-4 py-4 text-left border-r border-slate-200 bg-slate-100" rowSpan={2}>Region</th>
                                    <th className="px-4 py-2 text-center border-r border-slate-200 bg-blue-50/50 text-blue-700" colSpan={3}>Non Command Area</th>
                                    <th className="px-4 py-2 text-center bg-indigo-50/50 text-indigo-700" colSpan={3}>HNSS & MIT Command Area</th>
                                </tr>
                                <tr>
                                    {/* Non Command Headers */}
                                    <th className="px-2 py-2 text-center border-r border-slate-100 text-blue-600">Working</th>
                                    <th className="px-2 py-2 text-center border-r border-slate-100 text-orange-600">Seasonal</th>
                                    <th className="px-2 py-2 text-center border-r border-slate-200 text-slate-500">Abandoned</th>
                                    {/* HNSS Headers */}
                                    <th className="px-2 py-2 text-center border-r border-slate-100 text-indigo-600">Working</th>
                                    <th className="px-2 py-2 text-center border-r border-slate-100 text-orange-600">Seasonal</th>
                                    <th className="px-2 py-2 text-center text-slate-500">Abandoned</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {DETAILED_SPLIT_STATS.map((row) => (
                                    <tr key={row.mandal} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-100 bg-gray-50/30">{row.mandal}</td>

                                        {/* Non Command Data */}
                                        <td className="px-2 py-3 text-center border-r border-gray-100 font-medium text-slate-700">{row.nc_working.toLocaleString()}</td>
                                        <td className="px-2 py-3 text-center border-r border-gray-100 text-slate-600">{row.nc_partial.toLocaleString()}</td>
                                        <td className="px-2 py-3 text-center border-r border-gray-200 text-slate-400">{row.nc_abandoned.toLocaleString()}</td>

                                        {/* HNSS Data */}
                                        <td className="px-2 py-3 text-center border-r border-gray-100 font-medium text-slate-700 bg-indigo-50/10">{row.hnss_working.toLocaleString()}</td>
                                        <td className="px-2 py-3 text-center border-r border-gray-100 text-slate-600 bg-indigo-50/10">{row.hnss_partial.toLocaleString()}</td>
                                        <td className="px-2 py-3 text-center text-slate-400 bg-indigo-50/10">{row.hnss_abandoned.toLocaleString()}</td>
                                    </tr>
                                ))}
                                {/* Total Row */}
                                <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                                    <td className="px-4 py-3 text-gray-900 border-r border-slate-300">KADA TOTAL</td>

                                    <td className="px-2 py-3 text-center border-r border-slate-300 text-blue-700">{KADA_SPLIT_TOTALS.nc_working.toLocaleString()}</td>
                                    <td className="px-2 py-3 text-center border-r border-slate-300 text-orange-700">{KADA_SPLIT_TOTALS.nc_partial.toLocaleString()}</td>
                                    <td className="px-2 py-3 text-center border-r border-slate-400 text-slate-600">{KADA_SPLIT_TOTALS.nc_abandoned.toLocaleString()}</td>

                                    <td className="px-2 py-3 text-center border-r border-slate-300 text-indigo-700">{KADA_SPLIT_TOTALS.hnss_working.toLocaleString()}</td>
                                    <td className="px-2 py-3 text-center border-r border-slate-300 text-orange-700">{KADA_SPLIT_TOTALS.hnss_partial.toLocaleString()}</td>
                                    <td className="px-2 py-3 text-center text-slate-600">{KADA_SPLIT_TOTALS.hnss_abandoned.toLocaleString()}</td>
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
