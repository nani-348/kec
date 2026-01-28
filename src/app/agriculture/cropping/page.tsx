"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sprout, Droplets, Sun, Calendar, TrendingUp, Info, Activity, LayoutGrid } from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ComposedChart, Line
} from "recharts";
import clsx from "clsx";

// --- Data Constants ---
const CROPPING_PATTERN_DATA = [
    { mandal: "GUDI PALLE", wet: 27, id: 73, flood: 34, micro: 65 },
    { mandal: "KUPPAM", wet: 42, id: 58, flood: 63, micro: 37 },
    { mandal: "RAMA KUPPAM", wet: 14, id: 86, flood: 22, micro: 78 },
    { mandal: "SANTHI PURAM", wet: 35, id: 65, flood: 15, micro: 85 },
];

const KADA_AVG = { wet: 31, id: 69, flood: 28, micro: 72 };

const IRRIGATED_AREA_DATA = [
    {
        mandal: "GUDI PALLE",
        capacity: 2.37,
        nc_working: 2541, nc_partial: 1090,
        hnss_working: 1808, hnss_partial: 656,
        total: 6096
    },
    {
        mandal: "KUPPAM",
        capacity: 1.85,
        nc_working: 2496, nc_partial: 1413,
        hnss_working: 742, hnss_partial: 381,
        total: 5032
    },
    {
        mandal: "RAMA KUPPAM",
        capacity: 1.80,
        nc_working: 1217, nc_partial: 1969,
        hnss_working: 724, hnss_partial: 954,
        total: 4864
    },
    {
        mandal: "SANTHI PURAM",
        capacity: 2.17,
        nc_working: 1504, nc_partial: 1131,
        hnss_working: 1337, hnss_partial: 1198,
        total: 5169
    },
];

const KADA_AREA_TOTALS = {
    capacity: 2.11,
    nc_working: 7997, nc_partial: 5990,
    hnss_working: 4604, hnss_partial: 3302,
    total: 21893
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-semibold text-gray-900">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function CroppingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Sprout size={14} />
                        Agricultural Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Cropping & Irrigation Pattern
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Detailed breakdown of cropping patterns (Wet vs ID Crops) and irrigation methods (Flood vs Micro) under bore wells in Kuppam Constituency.
                    </p>
                </div>

                {/* SECTION 1: Cropping & Irrigation Pattern */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Cropping Pattern Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                                <Sprout size={20} className="text-emerald-500" />
                                Crop Type Distribution (%)
                            </h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CROPPING_PATTERN_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="mandal" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                        <Legend />
                                        <Bar dataKey="wet" name="Wet Crops %" stackId="a" fill="#059669" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="id" name="ID Crops %" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Irrigation Method Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                                <Droplets size={20} className="text-blue-500" />
                                Irrigation Method Adoption (%)
                            </h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CROPPING_PATTERN_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="mandal" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                        <Legend />
                                        <Bar dataKey="flood" name="Flood Irrigation" fill="#9ca3af" radius={[4, 4, 0, 0]} barSize={20} />
                                        <Bar dataKey="micro" name="Micro Irrigation" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Data Table 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Detailed Pattern Statistics</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Mandal</th>
                                        <th className="px-6 py-3 text-center text-emerald-700 bg-emerald-50/30">Wet Crops %</th>
                                        <th className="px-6 py-3 text-center text-amber-700 bg-amber-50/30">ID Crops %</th>
                                        <th className="px-6 py-3 text-center text-gray-600 bg-gray-100/50">Flood Irrigation %</th>
                                        <th className="px-6 py-3 text-center text-blue-700 bg-blue-50/30">Micro Irrigation %</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {CROPPING_PATTERN_DATA.map((row) => (
                                        <tr key={row.mandal} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-3 font-medium text-gray-900">{row.mandal}</td>
                                            <td className="px-6 py-3 text-center">{row.wet}</td>
                                            <td className="px-6 py-3 text-center">{row.id}</td>
                                            <td className="px-6 py-3 text-center">{row.flood}</td>
                                            <td className="px-6 py-3 text-center font-bold text-blue-600">{row.micro}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100/80 font-bold border-t-2 border-gray-200">
                                        <td className="px-6 py-3">KADA (AVG)</td>
                                        <td className="px-6 py-3 text-center text-emerald-700">{KADA_AVG.wet}</td>
                                        <td className="px-6 py-3 text-center text-amber-700">{KADA_AVG.id}</td>
                                        <td className="px-6 py-3 text-center text-gray-600">{KADA_AVG.flood}</td>
                                        <td className="px-6 py-3 text-center text-blue-700">{KADA_AVG.micro}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {/* SECTION 2: Irrigated Area */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <LayoutGrid size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Irrigated Area Analysis</h2>
                            <p className="text-gray-500">Area coverage under bore wells across Non-Command and HNSS Zones</p>
                        </div>
                    </div>

                    {/* Chart for Total Area */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <h3 className="font-bold text-gray-900 text-lg mb-6">Total Irrigated Area by Region</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={IRRIGATED_AREA_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="mandal" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                    <Legend />
                                    <Bar dataKey="total" name="Total Area (Acres)" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                    <Bar dataKey="capacity" name="Capacity (Acres/Well)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={0} /> {/* Hidden bar for legend if needed, or use composed chart line */}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Complex Data Table 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 mb-0">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Irrigated Area Inventory</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs md:text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] md:text-xs font-bold tracking-wider">
                                    <tr>
                                        <th className="px-4 py-4 text-left border-r border-slate-200 bg-slate-100 align-bottom" rowSpan={2}>Region</th>
                                        <th className="px-4 py-4 text-center border-r border-slate-200 bg-slate-100 align-bottom" rowSpan={2}>Irrigation Capacity <br /><span className="text-[10px] normal-case text-slate-400">(Acres/Well)</span></th>
                                        <th className="px-4 py-2 text-center border-r border-slate-200 bg-blue-50/50 text-blue-700" colSpan={2}>Non Command Area</th>
                                        <th className="px-4 py-2 text-center border-r border-slate-200 bg-indigo-50/50 text-indigo-700" colSpan={2}>HNSS & MIT Command Area</th>
                                        <th className="px-4 py-4 text-center bg-slate-100 align-bottom" rowSpan={2}>Total <br /><span className="text-[10px] normal-case text-slate-400">Area</span></th>
                                    </tr>
                                    <tr>
                                        {/* Non Command */}
                                        <th className="px-2 py-2 text-center border-r border-slate-100 text-blue-600">Working</th>
                                        <th className="px-2 py-2 text-center border-r border-slate-200 text-orange-600">Partial</th>
                                        {/* HNSS */}
                                        <th className="px-2 py-2 text-center border-r border-slate-100 text-indigo-600">Working</th>
                                        <th className="px-2 py-2 text-center border-r border-slate-200 text-orange-600">Partial</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {IRRIGATED_AREA_DATA.map((row) => (
                                        <tr key={row.mandal} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-100 bg-gray-50/30">{row.mandal}</td>
                                            <td className="px-4 py-3 text-center border-r border-gray-100 font-bold text-emerald-600">{row.capacity}</td>

                                            <td className="px-2 py-3 text-center border-r border-gray-100 text-slate-700">{row.nc_working.toLocaleString()}</td>
                                            <td className="px-2 py-3 text-center border-r border-gray-200 text-slate-500">{row.nc_partial.toLocaleString()}</td>

                                            <td className="px-2 py-3 text-center border-r border-gray-100 text-slate-700 bg-indigo-50/10">{row.hnss_working.toLocaleString()}</td>
                                            <td className="px-2 py-3 text-center border-r border-gray-200 text-slate-500 bg-indigo-50/10">{row.hnss_partial.toLocaleString()}</td>

                                            <td className="px-4 py-3 text-center font-bold text-gray-900 bg-gray-50/50">{row.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {/* Total Row */}
                                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-200 text-slate-900">
                                        <td className="px-4 py-3 border-r border-slate-300">KADA</td>
                                        <td className="px-4 py-3 text-center border-r border-slate-300 text-emerald-800">{KADA_AREA_TOTALS.capacity}</td>

                                        <td className="px-2 py-3 text-center border-r border-slate-300">{KADA_AREA_TOTALS.nc_working.toLocaleString()}</td>
                                        <td className="px-2 py-3 text-center border-r border-slate-300 text-slate-600">{KADA_AREA_TOTALS.nc_partial.toLocaleString()}</td>

                                        <td className="px-2 py-3 text-center border-r border-slate-300">{KADA_AREA_TOTALS.hnss_working.toLocaleString()}</td>
                                        <td className="px-2 py-3 text-center border-r border-slate-300 text-slate-600">{KADA_AREA_TOTALS.hnss_partial.toLocaleString()}</td>

                                        <td className="px-4 py-3 text-center bg-slate-200">{KADA_AREA_TOTALS.total.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
