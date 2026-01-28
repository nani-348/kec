"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Waves, Droplets, Battery,
    BarChart3, MapPin
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend, PieChart, Pie, Cell
} from "recharts";
import clsx from "clsx";

// --- Data Models ---

// MI Tank Storage Data by Region
const MI_TANK_DATA = [
    {
        region: "GUDI PALLE",
        tanks: 182,
        capacityMcft: 232.61,
        currentStorageMcft: 122.95,
        fillPercent: 52.84,
        full: 4,
        filled75: 11,
        filled50: 9,
        filled25: 30,
        empty: 62
    },
    {
        region: "KUPPAM",
        tanks: 129,
        capacityMcft: 336.66,
        currentStorageMcft: 121.08,
        fillPercent: 35.97,
        full: 3,
        filled75: 7,
        filled50: 4,
        filled25: 8,
        empty: 52
    },
    {
        region: "RAMA KUPPAM",
        tanks: 133,
        capacityMcft: 325.95,
        currentStorageMcft: 88.26,
        fillPercent: 27.08,
        full: 1,
        filled75: 2,
        filled50: 6,
        filled25: 9,
        empty: 75
    },
    {
        region: "SANTHI PURAM",
        tanks: 111,
        capacityMcft: 301.16,
        currentStorageMcft: 168.36,
        fillPercent: 55.95,
        full: 3,
        filled75: 4,
        filled50: 4,
        filled25: 6,
        empty: 23
    }
];

// KADA Region Total
const KADA_TOTAL = {
    region: "KADA REGION",
    tanks: 555,
    capacityMcft: 1196.38,
    currentStorageMcft: 500.64,
    fillPercent: 41.85,
    full: 95,
    filled75: 63,
    filled50: 93,
    filled25: 112,
    empty: 192,
    totalFilled: 363, // 555 - 192
    totalEmpty: 192
};

// Chart Data - Storage Comparison
const STORAGE_CHART_DATA = MI_TANK_DATA.map(d => ({
    name: d.region.replace(" ", "\n"),
    capacity: d.capacityMcft,
    current: d.currentStorageMcft,
    deficit: d.capacityMcft - d.currentStorageMcft
}));

// Filling Status Distribution
const FILLING_STATUS_DATA = [
    { name: "100% Full", value: 95, color: "#10b981" },
    { name: "75% Filled", value: 63, color: "#3b82f6" },
    { name: "50% Filled", value: 93, color: "#f59e0b" },
    { name: "25% Filled", value: 112, color: "#ef4444" },
    { name: "0% Empty", value: 192, color: "#64748b" }
];


export default function MITanksEnergyPage() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    const displayData = selectedRegion
        ? MI_TANK_DATA.find(d => d.region === selectedRegion) || KADA_TOTAL
        : KADA_TOTAL;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 font-serif mb-4">
                        MI Tank Storage Status
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Comprehensive analysis of <span className="font-semibold text-blue-600">MI Tank Storage</span> across KADA region,
                        highlighting current filling levels and regional variations.
                    </p>
                </div>

                {/* Key Metrics Dashboard */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Waves size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Total Tanks</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{KADA_TOTAL.tanks}</p>
                        <p className="text-xs opacity-75">Across 4 Mandals</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Droplets size={20} className="text-cyan-600" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Capacity</h3>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 mb-1">{KADA_TOTAL.capacityMcft.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">mcft</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Battery size={20} className="text-emerald-600" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Current Storage</h3>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 mb-1">{KADA_TOTAL.currentStorageMcft.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">mcft</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <BarChart3 size={20} className="text-purple-600" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Fill Rate</h3>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 mb-1">{KADA_TOTAL.fillPercent.toFixed(1)}%</p>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                            <div
                                className="bg-gradient-to-r from-purple-400 to-purple-600 h-1.5 rounded-full"
                                style={{ width: `${KADA_TOTAL.fillPercent}%` }}
                            ></div>
                        </div>
                    </div>

                </div>



                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Storage Comparison Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                                <Droplets size={22} className="text-blue-600" />
                                MI Tanks Storage by Region
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Capacity vs Current Storage (mcft)</p>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={STORAGE_CHART_DATA}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 11 }}
                                        angle={-15}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        label={{ value: 'Storage (mcft)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: any) => `${value.toFixed(2)} mcft`}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: '20px' }}
                                        iconType="circle"
                                    />
                                    <Bar dataKey="capacity" name="Capacity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="current" name="Current Storage" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Filling Status Distribution */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                                <BarChart3 size={22} className="text-purple-600" />
                                Tank Filling Status Distribution
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Number of tanks by fill percentage</p>
                        </div>
                        <div className="h-[350px] w-full flex items-center justify-center">
                            <div className="w-full h-full flex flex-col md:flex-row items-center gap-8">
                                <div className="h-[250px] w-full md:w-1/2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={FILLING_STATUS_DATA}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={120}
                                                paddingAngle={3}
                                                dataKey="value"
                                            >
                                                {FILLING_STATUS_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value: any) => [`${value} tanks`, 'Count']}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full md:w-1/2 space-y-3">
                                    {FILLING_STATUS_DATA.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all duration-200 group cursor-default">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm"
                                                    style={{ backgroundColor: item.color }}
                                                ></div>
                                                <span className="font-medium text-slate-600 text-sm group-hover:text-slate-800 transition-colors">{item.name}</span>
                                            </div>
                                            <span className="text-lg font-bold text-slate-800 tabular-nums">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Detailed Regional Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
                        <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                            <MapPin size={22} className="text-blue-600" />
                            MI Tank Current Storage / Filling Report
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Comprehensive breakdown by region with filling status</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Region
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        No. of MI Tanks
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Storage Capacity<br /><span className="text-[10px] font-normal">(mcft)</span>
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Current Storage<br /><span className="text-[10px] font-normal">(mcft)</span>
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Fill %
                                    </th>
                                    <th colSpan={5} className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border-l border-gray-200">
                                        No. of Tanks with Different Current Storage / Filling
                                    </th>
                                </tr>
                                <tr className="bg-gray-50">
                                    <th colSpan={5}></th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-emerald-700 border-l border-gray-200">Full</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700">75%</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-amber-700">50%</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-orange-700">25%</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">0%</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MI_TANK_DATA.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-bold text-gray-900">{row.region}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-semibold text-gray-900">{row.tanks}</td>
                                        <td className="px-6 py-4 text-center font-semibold text-gray-900">{row.capacityMcft.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center font-semibold text-gray-900">{row.currentStorageMcft.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="font-bold text-gray-900">{row.fillPercent.toFixed(2)}%</span>
                                                <div className="w-20 bg-gray-100 rounded-full h-1.5">
                                                    <div
                                                        className={clsx(
                                                            "h-1.5 rounded-full",
                                                            row.fillPercent >= 75 ? "bg-emerald-500" :
                                                                row.fillPercent >= 50 ? "bg-blue-500" :
                                                                    row.fillPercent >= 25 ? "bg-amber-500" : "bg-red-500"
                                                        )}
                                                        style={{ width: `${row.fillPercent}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm">
                                                {row.full}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
                                                {row.filled75}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 text-amber-700 font-bold text-sm">
                                                {row.filled50}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 text-orange-700 font-bold text-sm">
                                                {row.filled25}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-gray-700 font-bold text-sm">
                                                {row.empty}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {/* KADA Total Row */}
                                <tr className="bg-blue-600 text-white font-bold">
                                    <td className="px-6 py-4 whitespace-nowrap text-lg">KADA REGION</td>
                                    <td className="px-6 py-4 text-center text-lg">{KADA_TOTAL.tanks}</td>
                                    <td className="px-6 py-4 text-center text-lg">{KADA_TOTAL.capacityMcft.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center text-lg">{KADA_TOTAL.currentStorageMcft.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center text-lg">{KADA_TOTAL.fillPercent.toFixed(2)}%</td>
                                    <td className="px-4 py-4 text-center text-lg border-l border-blue-500">{KADA_TOTAL.full}</td>
                                    <td className="px-4 py-4 text-center text-lg">{KADA_TOTAL.filled75}</td>
                                    <td className="px-4 py-4 text-center text-lg">{KADA_TOTAL.filled50}</td>
                                    <td className="px-4 py-4 text-center text-lg">{KADA_TOTAL.filled25}</td>
                                    <td className="px-4 py-4 text-center text-lg">{KADA_TOTAL.empty}</td>
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
