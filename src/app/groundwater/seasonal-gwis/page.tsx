"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from "recharts";
import { ArrowDown, ArrowUp, Droplets, Map, TrendingUp, Info } from "lucide-react";
import clsx from "clsx";

// --- Data Models ---

type RegionData = {
    mandal: string;
    village: string;
    last10May: number;
    last10Nov: number;
    preMay24: number;
    postNov24: number;
    preMay25: number;
    postNov25: number;
    lastYearDec24: number;
    presentDec25: number;
    isAggregate?: boolean;
};

const VILLAGE_DATA: RegionData[] = [
    { mandal: "Gudupalle", village: "Dravida University", last10May: 14.33, last10Nov: 9.02, preMay24: 14.97, postNov24: 12.49, preMay25: 15.88, postNov25: 16.34, lastYearDec24: 12.47, presentDec25: 11.52 },
    { mandal: "Gudupalle", village: "Gudupalle", last10May: 26.83, last10Nov: 23.54, preMay24: 30.8, postNov24: 31.11, preMay25: 34.42, postNov25: 34.26, lastYearDec24: 31.38, presentDec25: 25.82 },
    { mandal: "Gudupalle", village: "Solachinthanapalli", last10May: 43.17, last10Nov: 39.87, preMay24: 41.92, postNov24: 37.81, preMay25: 41.92, postNov25: 40.1, lastYearDec24: 44.19, presentDec25: 39.24 },
    { mandal: "Kuppam", village: "Adaviboduguru", last10May: 24.42, last10Nov: 12.97, preMay24: 33.6, postNov24: 25.35, preMay25: 30.69, postNov25: 21.81, lastYearDec24: 23.54, presentDec25: 23.34 },
    { mandal: "Kuppam", village: "Kangundhi", last10May: 13.39, last10Nov: 17.96, preMay24: 10.1, postNov24: 7.22, preMay25: 8.03, postNov25: 5.53, lastYearDec24: 5.54, presentDec25: 4.93 },
    { mandal: "Ramakuppam", village: "Balla", last10May: 16.66, last10Nov: 14.03, preMay24: 18.04, postNov24: 19.54, preMay25: 19.96, postNov25: 11.93, lastYearDec24: 16.75, presentDec25: 12.75 },
    { mandal: "Ramakuppam", village: "Cheldiganipalle", last10May: 15.82, last10Nov: 10.45, preMay24: 19.09, postNov24: 20.52, preMay25: 23.01, postNov25: 17.53, lastYearDec24: 20.12, presentDec25: 17.01 },
    { mandal: "Ramakuppam", village: "Ramakuppam", last10May: 12.94, last10Nov: 10.64, preMay24: 14, postNov24: 12.98, preMay25: 14.7, postNov25: 10.91, lastYearDec24: 12.37, presentDec25: 11.54 },
    { mandal: "Ramakuppam", village: "Vijilapuram", last10May: 13.72, last10Nov: 12.6, preMay24: 12.56, postNov24: 15.96, preMay25: 17.85, postNov25: 4.92, lastYearDec24: 13.55, presentDec25: 6.01 },
    { mandal: "Santipuram", village: "Anikera", last10May: 21.6, last10Nov: 17.64, preMay24: 20.31, postNov24: 16, preMay25: 20.45, postNov25: 8.58, lastYearDec24: 14.61, presentDec25: 10.11 },
    { mandal: "Santipuram", village: "Gundusettipalli", last10May: 13.41, last10Nov: 7.96, preMay24: 16.3, postNov24: 15.66, preMay25: 18.82, postNov25: 13.1, lastYearDec24: 14.74, presentDec25: 13.73 },
    { mandal: "Santipuram", village: "Rallaboduguru", last10May: 2.94, last10Nov: 1.71, preMay24: 3.49, postNov24: 0.11, preMay25: 2.1, postNov25: 0.15, lastYearDec24: 1.45, presentDec25: 0.78 },
    { mandal: "Santipuram", village: "Shanthipuram", last10May: 18.78, last10Nov: 16.88, preMay24: 20.5, postNov24: 19.12, preMay25: 16.03, postNov25: 13.16, lastYearDec24: 18.31, presentDec25: 14.3 },
];

const AGGREGATE_DATA: RegionData[] = [
    { mandal: "Summary", village: "Gudipalli Mandal", last10May: 28.11, last10Nov: 24.14, preMay24: 28.56, postNov24: 27.14, preMay25: 30.74, postNov25: 30.23, lastYearDec24: 29.35, presentDec25: 25.53, isAggregate: true },
    { mandal: "Summary", village: "Kuppam Mandal", last10May: 18.91, last10Nov: 15.47, preMay24: 21.85, postNov24: 16.29, preMay25: 19.36, postNov25: 13.67, lastYearDec24: 14.54, presentDec25: 14.14, isAggregate: true },
    { mandal: "Summary", village: "Ramakuppam Mandal", last10May: 14.79, last10Nov: 11.93, preMay24: 15.92, postNov24: 17.25, preMay25: 18.88, postNov25: 11.32, lastYearDec24: 15.70, presentDec25: 11.83, isAggregate: true },
    { mandal: "Summary", village: "Santipuram Mandal", last10May: 14.18, last10Nov: 11.05, preMay25: 14.35, postNov25: 8.75, preMay24: 15.15, postNov24: 12.72, lastYearDec24: 12.28, presentDec25: 9.73, isAggregate: true },
    { mandal: "Summary", village: "KADA Region", last10May: 18.31, last10Nov: 15.02, preMay24: 19.67, postNov24: 17.99, preMay25: 20.30, postNov25: 15.26, lastYearDec24: 17.62, presentDec25: 14.70, isAggregate: true },
    { mandal: "Comparison", village: "Chitoor District", last10May: 12.41, last10Nov: 9.27, preMay24: 13.25, postNov24: 10.23, preMay25: 11.87, postNov25: 6.45, lastYearDec24: 8.89, presentDec25: 6.87, isAggregate: true },
    { mandal: "Comparison", village: "Andhra Pradesh", last10May: 11.04, last10Nov: 8.18, preMay24: 11.74, postNov24: 7.35, preMay25: 9.90, postNov25: 6.08, lastYearDec24: 7.33, presentDec25: 6.54, isAggregate: true },
];

export default function SeasonalGWisPage() {
    const [viewMode, setViewMode] = useState<"table" | "chart">("table");

    // Charts Data Preparation
    const regionSummary = AGGREGATE_DATA.filter(d => d.mandal === "Summary" || d.village === "KADA Region");
    const comparisonSummary = AGGREGATE_DATA.filter(d => d.mandal !== "Summary");

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wide mb-3">
                            <Droplets size={14} /> Seasonal Analysis
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
                            Seasonal GWis <span className="text-blue-600">Monitoring</span>
                        </h1>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                            Comparative analysis of groundwater levels (m bgl) across different monsoonal periods.
                            Tracking deviations against <span className="font-semibold text-gray-800">Decadal Averages</span> and regional benchmarks.
                        </p>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        <button
                            onClick={() => setViewMode("table")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                                viewMode === "table" ? "bg-gray-900 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <Map size={16} /> Data Table
                        </button>
                        <button
                            onClick={() => setViewMode("chart")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                                viewMode === "chart" ? "bg-gray-900 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <TrendingUp size={16} /> Trends
                        </button>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">KADA Avg (Dec '25)</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold text-gray-900">14.70</h3>
                                <span className="text-sm text-gray-500">m bgl</span>
                            </div>
                            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                <ArrowDown size={12} /> 2.92m improvement vs Dec '24
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                            <Droplets size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">State Avg (Dec '25)</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold text-gray-900">6.54</h3>
                                <span className="text-sm text-gray-500">m bgl</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg border border-white/10 flex items-center gap-4 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-blue-200 text-xs font-bold uppercase tracking-wide mb-1">Status Summary</p>
                            <p className="text-sm leading-relaxed text-blue-50/90 font-medium">
                                Post-monsoon levels in 2025 across KADA (15.26m) show significant improvement compared to May 2025 (20.30m), reflecting effective recharge.
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <Map size={100} />
                        </div>
                    </div>
                </div>

                {viewMode === "table" ? (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        {/* Main Data Table */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th rowSpan={2} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left border-r border-gray-200 sticky left-0 bg-gray-50 z-20">Mandal</th>
                                            <th rowSpan={2} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left border-r border-gray-200 sticky left-[100px] bg-gray-50 z-20 min-w-[200px]">Village Name</th>
                                            <th colSpan={2} className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase border-r border-gray-200 bg-blue-50/30">Last 10 Years Avg</th>
                                            <th colSpan={2} className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase border-r border-gray-200 bg-orange-50/30">2024</th>
                                            <th colSpan={2} className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase border-r border-gray-200 bg-emerald-50/30">2025</th>
                                            <th colSpan={2} className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase bg-indigo-50/30">Current Comparison</th>
                                        </tr>
                                        <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-blue-50/30">May</th>
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-blue-50/30">Nov</th>
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-orange-50/30">Pre (May)</th>
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-orange-50/30">Post (Nov)</th>
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-emerald-50/30">Pre (May)</th>
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-emerald-50/30">Post (Nov)</th>
                                            <th className="px-4 py-3 text-center border-r border-gray-200 bg-indigo-50/30">Dec '24</th>
                                            <th className="px-4 py-3 text-center bg-indigo-50/30 text-indigo-700 font-bold">Dec '25</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {/* Village Rows */}
                                        {VILLAGE_DATA.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-100 sticky left-0 bg-white">{row.mandal}</td>
                                                <td className="px-6 py-4 text-gray-600 border-r border-gray-100 sticky left-[100px] bg-white">{row.village}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-500 border-r border-gray-100 bg-blue-50/5">{row.last10May}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-500 border-r border-gray-100 bg-blue-50/5">{row.last10Nov}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-500 border-r border-gray-100 bg-orange-50/5">{row.preMay24}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-500 border-r border-gray-100 bg-orange-50/5">{row.postNov24}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-800 font-medium border-r border-gray-100 bg-emerald-50/5">{row.preMay25}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-800 font-medium border-r border-gray-100 bg-emerald-50/5">{row.postNov25}</td>
                                                <td className="px-4 py-4 text-right tabular-nums text-gray-500 border-r border-gray-100 bg-indigo-50/5">{row.lastYearDec24}</td>
                                                <td className={clsx("px-4 py-4 text-right tabular-nums font-bold bg-indigo-50/10",
                                                    row.presentDec25 < row.lastYearDec24 ? "text-emerald-600" : "text-amber-600"
                                                )}>{row.presentDec25}</td>
                                            </tr>
                                        ))}
                                        {/* Aggregate Rows */}
                                        {AGGREGATE_DATA.map((row, idx) => (
                                            <tr key={`agg-${idx}`} className={clsx(
                                                "border-t border-gray-200",
                                                row.village === "KADA Region" ? "bg-gray-900 text-white" : "bg-gray-100 font-semibold text-gray-900"
                                            )}>
                                                <td className={clsx("px-6 py-4 border-r sticky left-0",
                                                    row.village === "KADA Region" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"
                                                )} colSpan={2}>
                                                    {row.village === "KADA Region" ? (
                                                        <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                                                            <Map size={14} className="text-secondary" /> {row.village}
                                                        </span>
                                                    ) : (
                                                        <span className="pl-4">{row.village}</span>
                                                    )}
                                                </td>
                                                <td className="hidden"></td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 opacity-90">{row.last10May}</td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 opacity-90">{row.last10Nov}</td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 opacity-90">{row.preMay24}</td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 opacity-90">{row.postNov24}</td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 font-bold">{row.preMay25}</td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 font-bold">{row.postNov25}</td>
                                                <td className="px-4 py-4 text-right tabular-nums border-r border-white/10 opacity-90">{row.lastYearDec24}</td>
                                                <td className="px-4 py-4 text-right tabular-nums font-bold text-secondary">{row.presentDec25}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-300">
                        {/* Comparison Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <TrendingUp size={20} className="text-blue-600" />
                                Regional Comparison (2025)
                            </h3>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={comparisonSummary}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="village" tick={{ fontSize: 11 }} />
                                        <YAxis label={{ value: 'Depth (m bgl)', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="preMay25" name="Pre Monsoon (May '25)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="postNov25" name="Post Monsoon (Nov '25)" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="presentDec25" name="Present (Dec '25)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        {/* Reference Line for KADA Avg? */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Mandal Wise Trend */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <trending-up size={20} className="text-emerald-600" />
                                Mandal Level Fluctuations (Dec '24 vs Dec '25)
                            </h3>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={regionSummary.filter(d => d.mandal === "Summary")}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="village" tick={{ fontSize: 10 }} />
                                        <YAxis reversed label={{ value: 'Depth (m bgl)', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="lastYearDec24" name="Dec 2024" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="presentDec25" name="Dec 2025" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-50 text-sm text-blue-800 flex items-start gap-2">
                                <Info size={16} className="mt-0.5 shrink-0" />
                                <p>
                                    Note: Lower values indicate water levels closer to the ground surface (Improvement).
                                    <span className="font-semibold"> Kuppam & Santipuram</span> show the most significant recovery compared to last year.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
