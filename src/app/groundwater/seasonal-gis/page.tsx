"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, ComposedChart
} from "recharts";
import { ArrowDown, Droplets, Map, TrendingUp, Info, MapPin } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
// Fluctuation Data
type FluctuationRow = {
    mandal: string;
    village: string;
    preMonsoon: number;
    postMonsoon: number;
    lastYear: number;
    lastMonth: number;
    currentMonth: number;
    seasonalPre: number;
    seasonalPost: number;
    annual: number;
    monthly: number;
};
const FLUCTUATION_DATA: FluctuationRow[] = [
    { mandal: "Gudupalle", village: "Dravida University", preMonsoon: 15.88, postMonsoon: 16.34, lastYear: 12.60, lastMonth: 11.52, currentMonth: 13.56, seasonalPre: 2.32, seasonalPost: 2.78, annual: -0.96, monthly: -2.04 },
    { mandal: "Gudupalle", village: "Gudupalle", preMonsoon: 34.42, postMonsoon: 34.26, lastYear: 31.09, lastMonth: 25.82, currentMonth: 31.77, seasonalPre: 2.65, seasonalPost: 2.49, annual: -0.68, monthly: -5.95 },
    { mandal: "Gudupalle", village: "Solachinthanapalli", preMonsoon: 41.92, postMonsoon: 40.10, lastYear: 45.85, lastMonth: 39.24, currentMonth: 40.04, seasonalPre: 1.88, seasonalPost: 0.06, annual: 5.81, monthly: -0.80 },
    { mandal: "Kuppam", village: "Adaviboduguru", preMonsoon: 30.69, postMonsoon: 21.81, lastYear: 25.26, lastMonth: 23.34, currentMonth: 28.37, seasonalPre: 2.32, seasonalPost: -6.56, annual: -3.11, monthly: -5.03 },
    { mandal: "Kuppam", village: "Kangundhi", preMonsoon: 8.03, postMonsoon: 5.53, lastYear: 6.05, lastMonth: 4.93, currentMonth: 3.74, seasonalPre: 4.29, seasonalPost: 1.79, annual: 2.31, monthly: 1.19 },
    { mandal: "Ramakuppam", village: "Balla", preMonsoon: 19.96, postMonsoon: 11.93, lastYear: 16.00, lastMonth: 12.75, currentMonth: 13.65, seasonalPre: 6.31, seasonalPost: -1.72, annual: 2.35, monthly: -0.90 },
    { mandal: "Ramakuppam", village: "Cheldiganipalle", preMonsoon: 23.01, postMonsoon: 17.53, lastYear: 18.98, lastMonth: 17.01, currentMonth: 16.90, seasonalPre: 6.11, seasonalPost: 0.63, annual: 2.08, monthly: 0.11 },
    { mandal: "Ramakuppam", village: "Ramakuppam", preMonsoon: 14.70, postMonsoon: 10.91, lastYear: 12.54, lastMonth: 11.54, currentMonth: 12.82, seasonalPre: 1.88, seasonalPost: -1.91, annual: -0.28, monthly: -1.28 },
    { mandal: "Ramakuppam", village: "Vijilapuram", preMonsoon: 17.85, postMonsoon: 4.92, lastYear: 13.32, lastMonth: 6.01, currentMonth: 6.57, seasonalPre: 11.28, seasonalPost: -1.65, annual: 6.75, monthly: -0.56 },
    { mandal: "Santipuram", village: "Anikera", preMonsoon: 20.45, postMonsoon: 8.58, lastYear: 14.99, lastMonth: 10.11, currentMonth: 12.36, seasonalPre: 8.09, seasonalPost: -3.78, annual: 2.63, monthly: -2.25 },
    { mandal: "Santipuram", village: "Gundusettipalli", preMonsoon: 18.82, postMonsoon: 13.10, lastYear: 14.94, lastMonth: 13.73, currentMonth: 14.80, seasonalPre: 4.02, seasonalPost: -1.70, annual: 0.14, monthly: -1.07 },
    { mandal: "Santipuram", village: "Rallaboduguru", preMonsoon: 2.10, postMonsoon: 0.15, lastYear: 0.23, lastMonth: 0.78, currentMonth: 0.83, seasonalPre: 1.27, seasonalPost: -0.68, annual: -0.60, monthly: -0.05 },
    { mandal: "Santipuram", village: "Shanthipuram", preMonsoon: 16.03, postMonsoon: 13.16, lastYear: 18.57, lastMonth: 14.30, currentMonth: 16.16, seasonalPre: -0.13, seasonalPost: -3.00, annual: 2.41, monthly: -1.86 },
];
// GIS Map images
const GIS_MAPS = [
    { title: "Last Year (Jan-2025)", src: "/images/about-kada/1.jpeg" },
    { title: "Pre-Monsoon (May-2025)", src: "/images/about-kada/2.jpeg" },
    { title: "Post-Monsoon (Nov-2025)", src: "/images/about-kada/3.jpeg" },
    { title: "Current (Jan-2026)", src: "/images/about-kada/4.jpeg" },
];
// Seasonal data for charts
const SEASONAL_DATA = [
    { name: "Gudipalli", preMonsoon: 30.74, postMonsoon: 30.23, currentMonth: 28.46 },
    { name: "Kuppam", preMonsoon: 19.36, postMonsoon: 13.67, currentMonth: 16.06 },
    { name: "Ramakuppam", preMonsoon: 18.88, postMonsoon: 11.32, currentMonth: 12.49 },
    { name: "Santipuram", preMonsoon: 14.35, postMonsoon: 8.75, currentMonth: 11.04 },
    { name: "KADA Region", preMonsoon: 20.30, postMonsoon: 15.26, currentMonth: 16.27 },
];
export default function GroundWaterScenarioPage() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Page Title */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wide mb-3">
                                <Droplets size={14} /> Groundwater Analysis
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
                                GroundWater <span className="text-blue-600">Scenario</span>
                            </h1>
                            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                                Comprehensive analysis of groundwater levels including seasonal fluctuations,
                                spatial distribution, and GIS mapping for the KADA region.
                            </p>
                        </div>
                    </div>
                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pre-Monsoon Avg</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold text-gray-900">20.30</h3>
                                    <span className="text-sm text-gray-500">m bgl</span>
                                </div>
                                <p className="text-xs text-amber-600 font-medium mt-1">May 2025</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Droplets size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Post-Monsoon Avg</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold text-gray-900">15.26</h3>
                                    <span className="text-sm text-gray-500">m bgl</span>
                                </div>
                                <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                    <ArrowDown size={12} /> 5.04m rise from pre-monsoon
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg border border-white/10 flex items-center gap-4 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-blue-200 text-xs font-bold uppercase tracking-wide mb-1">Current Status</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold">16.27</h3>
                                    <span className="text-sm text-blue-200">m bgl</span>
                                </div>
                                <p className="text-sm text-blue-100 mt-1">KADA Region Average (Jan 2026)</p>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10">
                                <Map size={100} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-12">
                        {/* Regional Comparison Chart */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-blue-600" />
                                    Regional Comparison (m bgl)
                                </h3>
                                <div className="h-[400px]">
                                    {isMounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={SEASONAL_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                                <YAxis reversed label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }} />
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                                                <Legend />
                                                <Bar dataKey="preMonsoon" name="Pre-Monsoon (May '25)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="postMonsoon" name="Post-Monsoon (Nov '25)" fill="#10b981" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="currentMonth" name="Current (Jan '26)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">Loading chart...</div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-emerald-600" />
                                    Seasonal Trend Analysis
                                </h3>
                                <div className="h-[400px]">
                                    {isMounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={SEASONAL_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                <YAxis reversed label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }} />
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                                                <Legend />
                                                <Line type="monotone" dataKey="preMonsoon" name="Pre-Monsoon" stroke="#f59e0b" strokeWidth={2} dot={{ r: 5 }} />
                                                <Line type="monotone" dataKey="postMonsoon" name="Post-Monsoon" stroke="#10b981" strokeWidth={2} dot={{ r: 5 }} />
                                                <Line type="monotone" dataKey="currentMonth" name="Current" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">Loading chart...</div>
                                    )}
                                </div>
                                <div className="mt-4 p-3 bg-blue-50/50 rounded-xl text-xs text-blue-700 flex items-start gap-2">
                                    <Info size={14} className="shrink-0 mt-0.5" />
                                    <p>Note: Depth is measured from ground level. Lower values (higher on graph) indicate better groundwater availability.</p>
                                </div>
                            </div>
                        </div>
                        {/* Fluctuations Analysis Section */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-amber-600" />
                                    Ground Water Fluctuations Analysis
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Rise (+ve) / Fall (-ve) in meters - Comparing seasonal, annual, and monthly changes</p>
                            </div>
                            <div className="p-6">
                                <div className="h-[400px]">
                                    {isMounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={FLUCTUATION_DATA.map(r => ({ name: r.village.substring(0, 12), seasonalPre: r.seasonalPre, seasonalPost: r.seasonalPost, annual: r.annual, monthly: r.monthly }))}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                                <YAxis label={{ value: 'Fluctuation (m)', angle: -90, position: 'insideLeft' }} />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="seasonalPre" name="Seasonal (Pre)" fill="#f59e0b" />
                                                <Bar dataKey="seasonalPost" name="Seasonal (Post)" fill="#10b981" />
                                                <Line type="monotone" dataKey="annual" name="Annual" stroke="#3b82f6" strokeWidth={2} />
                                                <Line type="monotone" dataKey="monthly" name="Monthly" stroke="#ef4444" strokeWidth={2} />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">Loading chart...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Fluctuations Table */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
                                <h3 className="font-bold text-gray-900">Detailed Fluctuation Data</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="text-left px-4 py-4 font-bold text-gray-700">Mandal</th>
                                            <th className="text-left px-4 py-4 font-bold text-gray-700">Village</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Pre-Monsoon</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Post-Monsoon</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Last Year</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Last Month</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700 bg-blue-50">Current</th>
                                            <th className="text-right px-4 py-4 font-bold bg-amber-50">Seasonal</th>
                                            <th className="text-right px-4 py-4 font-bold bg-green-50">Annual</th>
                                            <th className="text-right px-4 py-4 font-bold bg-red-50">Monthly</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {FLUCTUATION_DATA.map((row, i) => (
                                            <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                                                <td className="px-4 py-3">{row.mandal}</td>
                                                <td className="px-4 py-3 font-medium">{row.village}</td>
                                                <td className="px-4 py-3 text-right font-mono">{row.preMonsoon.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-mono">{row.postMonsoon.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-mono">{row.lastYear.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-mono">{row.lastMonth.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-mono font-bold bg-blue-50/50">{row.currentMonth.toFixed(2)}</td>
                                                <td className={clsx("px-4 py-3 text-right font-mono font-bold bg-amber-50/50", row.seasonalPre > 0 ? "text-green-600" : "text-red-600")}>{row.seasonalPre > 0 ? "+" : ""}{row.seasonalPre.toFixed(2)}</td>
                                                <td className={clsx("px-4 py-3 text-right font-mono font-bold bg-green-50/50", row.annual > 0 ? "text-green-600" : "text-red-600")}>{row.annual > 0 ? "+" : ""}{row.annual.toFixed(2)}</td>
                                                <td className={clsx("px-4 py-3 text-right font-mono font-bold bg-red-50/50", row.monthly > 0 ? "text-green-600" : "text-red-600")}>{row.monthly > 0 ? "+" : ""}{row.monthly.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* GIS Maps Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <MapPin size={20} className="text-emerald-600" />
                                <h3 className="text-lg font-bold text-gray-900">GIS Maps - Spatial Distribution</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {GIS_MAPS.map((map, i) => (
                                    <div key={i} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
                                            <h3 className="font-bold text-gray-900">{map.title}</h3>
                                        </div>
                                        <div className="p-4">
                                            <Image src={map.src} alt={map.title} width={600} height={500} className="w-full h-auto rounded-lg" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-4">GW Zone Legend</h3>
                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-green-500"></div><span className="text-sm">Shallow (&lt;10m)</span></div>
                                    <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-yellow-400"></div><span className="text-sm">Medium (10-20m)</span></div>
                                    <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-red-500"></div><span className="text-sm">Deep (&gt;20m)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
