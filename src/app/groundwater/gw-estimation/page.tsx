"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";
import { Droplets, BarChart3, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// --- Data Constants ---

// Annual Ground Water Estimation Data
const GW_ESTIMATION_DATA = [
    { block: "GUDI PALLE", availability: 2196, extraction: 1568, balance: 624, extractionPercent: 60.3, accumulation: 74, depletion: 58 },
    { block: "KUPPAM", availability: 3074, extraction: 1705, balance: 1480, extractionPercent: 58.8, accumulation: 51, depletion: 95 },
    { block: "RAMA KUPPAM", availability: 1985, extraction: 1365, balance: 611, extractionPercent: 72.4, accumulation: 153, depletion: 74 },
    { block: "SANTHI PURAM", availability: 2166, extraction: 1241, balance: 885, extractionPercent: 54.0, accumulation: 81, depletion: 98 },
];

const KADA_TOTAL = {
    block: "KADA Region",
    availability: 9420,
    extraction: 5880,
    balance: 3600,
    extractionPercent: 60.3,
    accumulation: 84,
    depletion: 83
};

// Chart Data - Stage of Extraction
const EXTRACTION_CHART_DATA = [
    ...GW_ESTIMATION_DATA.map(d => ({ name: d.block, value: d.extractionPercent })),
    { name: "KADA Region", value: KADA_TOTAL.extractionPercent }
];

// Chart Data - Accumulation & Depletion Periods
const PERIODS_CHART_DATA = [
    ...GW_ESTIMATION_DATA.map(d => ({ name: d.block, "Accumulation Period": d.accumulation, "Depletion Period": d.depletion })),
    { name: "KADA Region", "Accumulation Period": KADA_TOTAL.accumulation, "Depletion Period": KADA_TOTAL.depletion }
];

export default function GWEstimationPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Droplets size={14} />
                        Groundwater Analysis
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 font-serif mb-4">
                        Annual Ground Water Estimation
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Comprehensive assessment of groundwater resources availability, extraction rates, and sustainability indicators across the KADA region.
                    </p>
                </div>

                {/* Key Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Droplets size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Total Availability</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{KADA_TOTAL.availability.toLocaleString()}</p>
                        <p className="text-xs opacity-75">Ham</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Total Extraction</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{KADA_TOTAL.extraction.toLocaleString()}</p>
                        <p className="text-xs opacity-75">Ham</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <BarChart3 size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Net Balance</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{KADA_TOTAL.balance.toLocaleString()}</p>
                        <p className="text-xs opacity-75">Ham</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Extraction Rate</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{KADA_TOTAL.extractionPercent}%</p>
                        <p className="text-xs opacity-75">Stage of Extraction</p>
                    </div>
                </div>

                {/* Section 1: Annual Ground Water Estimation Table */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Droplets size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">1) Annual Ground Water Estimation</h2>
                            <p className="text-gray-500">Block-wise resource assessment</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                    <tr>
                                        <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Block</th>
                                        <th className="px-4 py-4 text-center font-bold border-r border-blue-500">GW Resources<br /><span className="text-[10px] font-medium opacity-80">Availability (Ham)</span></th>
                                        <th className="px-4 py-4 text-center font-bold border-r border-blue-500">GW Resources<br /><span className="text-[10px] font-medium opacity-80">Extraction (Ham)</span></th>
                                        <th className="px-4 py-4 text-center font-bold border-r border-blue-500">GW Resources<br /><span className="text-[10px] font-medium opacity-80">Balance (Ham)</span></th>
                                        <th className="px-4 py-4 text-center font-bold border-r border-blue-500">Stage of<br /><span className="text-[10px] font-medium opacity-80">Extraction %</span></th>
                                        <th className="px-4 py-4 text-center font-bold border-r border-blue-500">Accumulation<br /><span className="text-[10px] font-medium opacity-80">Period (Yrs)</span></th>
                                        <th className="px-4 py-4 text-center font-bold">Depletion<br /><span className="text-[10px] font-medium opacity-80">Period (Yrs)</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {GW_ESTIMATION_DATA.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-100">{row.block}</td>
                                            <td className="px-4 py-3 text-center text-gray-700 bg-blue-50/20">{row.availability.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center text-gray-700 bg-amber-50/20">{row.extraction.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center font-medium text-emerald-700 bg-emerald-50/20">{row.balance.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center font-bold text-purple-700 bg-purple-50/20">{row.extractionPercent.toFixed(1)}</td>
                                            <td className="px-4 py-3 text-center text-gray-700 bg-cyan-50/20">{row.accumulation}</td>
                                            <td className="px-4 py-3 text-center text-gray-700 bg-orange-50/20">{row.depletion}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-600 text-white font-bold">
                                        <td className="px-4 py-3 border-r border-blue-500">{KADA_TOTAL.block}</td>
                                        <td className="px-4 py-3 text-center">{KADA_TOTAL.availability.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-center">{KADA_TOTAL.extraction.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-center">{KADA_TOTAL.balance.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-center">{KADA_TOTAL.extractionPercent.toFixed(1)}</td>
                                        <td className="px-4 py-3 text-center">{KADA_TOTAL.accumulation}</td>
                                        <td className="px-4 py-3 text-center">{KADA_TOTAL.depletion}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Stage of Extraction Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <BarChart3 size={20} className="text-purple-600" />
                                Stage of Extraction %
                            </h3>
                            <p className="text-sm text-gray-500">Extraction rate by block</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={EXTRACTION_CHART_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} angle={-20} textAnchor="end" />
                                    <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} domain={[0, 80]} label={{ value: 'Stage of Extraction (%)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 11 } }} />
                                    <Tooltip cursor={{ fill: '#f9fafb' }} />
                                    <Bar dataKey="value" name="Extraction %" fill="#3b82f6" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fill: '#3b82f6', fontWeight: 'bold' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Accumulation & Depletion Periods Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Clock size={20} className="text-cyan-600" />
                                Equivalent Accumulation & Depletion Periods
                            </h3>
                            <p className="text-sm text-gray-500">Time periods in years</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PERIODS_CHART_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} angle={-20} textAnchor="end" />
                                    <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} domain={[0, 180]} label={{ value: 'Period (Years)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 11 } }} />
                                    <Tooltip cursor={{ fill: '#f9fafb' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                    <Bar dataKey="Accumulation Period" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Depletion Period" fill="#f97316" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Visual Analysis Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Groundwater Analysis Maps</h2>
                            <p className="text-gray-500">Spatial distribution of groundwater resources</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Map 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Groundwater Resources Distribution</h3>
                                <p className="text-sm text-gray-500">Resource availability analysis</p>
                            </div>
                            <MagnifyingImageViewer
                                src="/images/about-kada/grd.png"
                                alt="Groundwater Analysis Map 1"
                                title="Groundwater Resources Distribution"
                                className="w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden"
                            />
                        </div>

                        {/* Map 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Groundwater Level Analysis</h3>
                                <p className="text-sm text-gray-500">Extraction and balance patterns</p>
                            </div>
                            <MagnifyingImageViewer
                                src="/images/about-kada/grd2.jpg"
                                alt="Groundwater Analysis Map 2"
                                title="Groundwater Level Analysis"
                                className="w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <AlertTriangle size={24} className="text-amber-600" />
                        Key Observations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-purple-600 mb-2">72.4%</div>
                            <div className="text-sm text-gray-600">Rama Kuppam has the highest extraction rate</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-blue-600 mb-2">153 Yrs</div>
                            <div className="text-sm text-gray-600">Longest accumulation period (Rama Kuppam)</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">3,600 Ham</div>
                            <div className="text-sm text-gray-600">Total GW Resources Balance in KADA Region</div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
