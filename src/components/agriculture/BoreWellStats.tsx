"use client";

import React from "react";
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
import { Droplets, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

// --- Data Constants ---

// 1. Overall Status Details (Image 1 Table & Pie Chart)
const OVERALL_STATUS = [
    { name: "Working", value: 5972, color: "#3b82f6" }, // Blue
    { name: "Partially Working", value: 4404, color: "#f97316" }, // Orange
    { name: "Abandoned", value: 2003, color: "#9ca3af" }, // Gray
];

const TOTAL_WELLS = 12379;

// 2. Command Area vs Non-Command Area (Image 2 Bar Chart)
const COMMAND_AREA_DATA = [
    {
        name: "Non Command Area",
        Working: 3790,
        Partial: 2839,
        Abandoned: 1244,
    },
    {
        name: "HNSS & MIT Command Area",
        Working: 2182,
        Partial: 1565,
        Abandoned: 759,
    },
];

// 3. Detailed Breakdown Table (Image 3)
const DETAILED_TABLE_DATA = [
    {
        mandal: "GUDI PALLE",
        nonCommand: { working: 1072, partial: 460, abandoned: 359 },
        hnss: { working: 763, partial: 277, abandoned: 105 },
        total: { working: 1835, partial: 737, abandoned: 464 },
        grandTotal: 3036,
    },
    {
        mandal: "KUPPAM",
        nonCommand: { working: 1349, partial: 764, abandoned: 245 },
        hnss: { working: 401, partial: 206, abandoned: 109 },
        total: { working: 1750, partial: 970, abandoned: 354 },
        grandTotal: 3074,
    },
    {
        mandal: "RAMA KUPPAM",
        nonCommand: { working: 676, partial: 1094, abandoned: 296 },
        hnss: { working: 402, partial: 530, abandoned: 316 },
        total: { working: 1078, partial: 1624, abandoned: 612 },
        grandTotal: 3314,
    },
    {
        mandal: "SANTHI PURAM",
        nonCommand: { working: 693, partial: 521, abandoned: 344 },
        hnss: { working: 616, partial: 552, abandoned: 229 },
        total: { working: 1309, partial: 1073, abandoned: 573 },
        grandTotal: 2955,
    },
];

const KADA_TOTALS = {
    nonCommand: { working: 3790, partial: 2839, abandoned: 1244 },
    hnss: { working: 2182, partial: 1565, abandoned: 759 },
    total: { working: 5972, partial: 4404, abandoned: 2003 },
    grandTotal: 12379
}


export default function BoreWellStats() {
    return (
        <div className="space-y-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Droplets size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-serif">
                        Borewell Status Analsysis
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Constituency-wide analysis of borewell functionality across command areas.
                    </p>
                </div>
            </div>

            {/* 1. Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                        <Activity size={48} />
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Borewells</p>
                    <p className="text-3xl font-bold text-gray-900">{TOTAL_WELLS.toLocaleString()}</p>
                    <div className="mt-2 text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded inline-block">
                        Constituency Total
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1 h-full bg-blue-500"></div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Working</p>
                    <p className="text-3xl font-bold text-blue-600">{OVERALL_STATUS[0].value.toLocaleString()}</p>
                    <p className="text-xs text-blue-600/80 font-medium mt-1">
                        {((OVERALL_STATUS[0].value / TOTAL_WELLS) * 100).toFixed(1)}% of Total
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1 h-full bg-orange-500"></div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Partially Working</p>
                    <p className="text-3xl font-bold text-orange-600">{OVERALL_STATUS[1].value.toLocaleString()}</p>
                    <p className="text-xs text-orange-600/80 font-medium mt-1">
                        {((OVERALL_STATUS[1].value / TOTAL_WELLS) * 100).toFixed(1)}% of Total
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1 h-full bg-gray-400"></div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Abandoned</p>
                    <p className="text-3xl font-bold text-gray-500">{OVERALL_STATUS[2].value.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                        {((OVERALL_STATUS[2].value / TOTAL_WELLS) * 100).toFixed(1)}% of Total
                    </p>
                </div>
            </div>

            {/* 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        Overall Status Distribution
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={OVERALL_STATUS}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {OVERALL_STATUS.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#374151', fontSize: '14px', fontWeight: 500 }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500" />
                        Command Area Breakdown
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={COMMAND_AREA_DATA}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="Working" fill="#3b82f6" name="Working" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Partial" fill="#f97316" name="Partially Working" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Abandoned" fill="#9ca3af" name="Abandoned" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. Detailed Data Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-lg">Detailed Borewell Census by Mandal</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-800 text-white text-xs uppercase tracking-wider">
                                <th rowSpan={2} className="px-6 py-4 font-semibold text-left border-r border-gray-700">Region (Mandal)</th>
                                <th colSpan={3} className="px-6 py-2 text-center border-r border-gray-700 bg-gray-700/50">Non Command Area</th>
                                <th colSpan={3} className="px-6 py-2 text-center bg-gray-700/50">HNSS & MIT Command Area</th>
                            </tr>
                            <tr className="bg-gray-800 text-white text-xs font-semibold border-b border-gray-700">
                                <th className="px-4 py-3 text-right bg-blue-900/30">Working</th>
                                <th className="px-4 py-3 text-right bg-orange-900/30">Partial</th>
                                <th className="px-4 py-3 text-right border-r border-gray-700 bg-gray-700/30">Abd.</th>
                                <th className="px-4 py-3 text-right bg-blue-900/30">Working</th>
                                <th className="px-4 py-3 text-right bg-orange-900/30">Partial</th>
                                <th className="px-4 py-3 text-right bg-gray-700/30">Abd.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {DETAILED_TABLE_DATA.map((row, index) => (
                                <tr key={row.mandal} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-100">{row.mandal}</td>

                                    {/* Non Command */}
                                    <td className="px-4 py-4 text-right font-medium text-gray-700">{row.nonCommand.working}</td>
                                    <td className="px-4 py-4 text-right font-medium text-gray-700">{row.nonCommand.partial}</td>
                                    <td className="px-4 py-4 text-right font-medium text-gray-400 border-r border-gray-100">{row.nonCommand.abandoned}</td>

                                    {/* HNSS */}
                                    <td className="px-4 py-4 text-right font-medium text-gray-700">{row.hnss.working}</td>
                                    <td className="px-4 py-4 text-right font-medium text-gray-700">{row.hnss.partial}</td>
                                    <td className="px-4 py-4 text-right font-medium text-gray-400">{row.hnss.abandoned}</td>
                                </tr>
                            ))}

                            {/* Total Row */}
                            <tr className="bg-gray-50 font-bold border-t-2 border-gray-200">
                                <td className="px-6 py-4 text-gray-900 border-r border-gray-200">KADA Total</td>
                                {/* Non Command */}
                                <td className="px-4 py-4 text-right text-blue-700">{KADA_TOTALS.nonCommand.working}</td>
                                <td className="px-4 py-4 text-right text-orange-700">{KADA_TOTALS.nonCommand.partial}</td>
                                <td className="px-4 py-4 text-right text-gray-500 border-r border-gray-200">{KADA_TOTALS.nonCommand.abandoned}</td>

                                {/* HNSS */}
                                <td className="px-4 py-4 text-right text-blue-700">{KADA_TOTALS.hnss.working}</td>
                                <td className="px-4 py-4 text-right text-orange-700">{KADA_TOTALS.hnss.partial}</td>
                                <td className="px-4 py-4 text-right text-gray-500">{KADA_TOTALS.hnss.abandoned}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
