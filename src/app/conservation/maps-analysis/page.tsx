"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";
import { Map as MapIcon, Info, Layout, BarChart3 } from "lucide-react";
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
const PRIORITY_DATA = [
    { region: "GUDUPALLE", surface: 7, interactive: 13, subsurface: 21, total: 41 },
    { region: "KUPPAM", surface: 19, interactive: 46, subsurface: 62, total: 127 },
    { region: "RAMAKUPPAM", surface: 4, interactive: 31, subsurface: 35, total: 70 },
    { region: "SANTHIPURAM", surface: 9, interactive: 6, subsurface: 21, total: 36 },
];

const PRIORITY_TOTAL = {
    region: "KADA Region", surface: 39, interactive: 96, subsurface: 139, total: 274
};

const CHART_DATA = PRIORITY_DATA.map(d => ({
    name: d.region,
    "1st Priority (Surface)": d.surface,
    "2nd Priority (Interactive)": d.interactive,
    "3rd Priority (Subsurface)": d.subsurface
}));

export default function ConservationMapsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <MapIcon size={14} />
                        Visual Analysis
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 font-serif mb-4">
                        Conservation Maps & Analysis
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Visual representation of the proposed water conservation structures and recharge planning across the KADA region.
                    </p>
                </div>

                {/* Maps Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Map 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Conservation Structures Map</h2>
                            <p className="text-sm text-gray-500">Spatial distribution of proposed interventions</p>
                        </div>
                        <MagnifyingImageViewer
                            src="/images/about-kada/water.png"
                            alt="Water Conservation Plan Map 1"
                            title="Conservation Structures Map"
                            className="w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden"
                        />
                    </div>

                    {/* Map 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Recharge Structures Visual</h2>
                            <p className="text-sm text-gray-500">Proposed locations for recharge shafts and ponds</p>
                        </div>
                        <MagnifyingImageViewer
                            src="/images/about-kada/water2.jpg"
                            alt="Water Conservation Plan Map 2"
                            title="Recharge Structures Visual"
                            className="w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden"
                        />
                    </div>
                </div>

                {/* Priority Analysis Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Layout size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Priority Intervention Zones</h2>
                            <p className="text-gray-500">Breakdown of conservation priorities by region</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Table */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 font-bold border-r border-indigo-500">Region</th>
                                            <th className="px-4 py-4 text-center font-bold border-r border-indigo-500">1st Priority<br /><span className="text-[10px] font-medium opacity-80">(Surface)</span></th>
                                            <th className="px-4 py-4 text-center font-bold border-r border-indigo-500">2nd Priority<br /><span className="text-[10px] font-medium opacity-80">(Interactive)</span></th>
                                            <th className="px-4 py-4 text-center font-bold border-r border-indigo-500">3rd Priority<br /><span className="text-[10px] font-medium opacity-80">(Subsurface)</span></th>
                                            <th className="px-4 py-4 text-center font-bold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {PRIORITY_DATA.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-indigo-50/10 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-100">{row.region}</td>
                                                <td className="px-4 py-4 text-center text-gray-700 font-medium bg-emerald-50/30">{row.surface}</td>
                                                <td className="px-4 py-4 text-center text-gray-700 font-medium bg-blue-50/30">{row.interactive}</td>
                                                <td className="px-4 py-4 text-center text-gray-700 font-medium bg-amber-50/30">{row.subsurface}</td>
                                                <td className="px-4 py-4 text-center font-bold text-indigo-700 bg-indigo-50/10">{row.total}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-indigo-50 font-bold border-t-2 border-indigo-100">
                                            <td className="px-6 py-4 text-indigo-900 border-r border-indigo-200">{PRIORITY_TOTAL.region}</td>
                                            <td className="px-4 py-4 text-center text-indigo-900">{PRIORITY_TOTAL.surface}</td>
                                            <td className="px-4 py-4 text-center text-indigo-900">{PRIORITY_TOTAL.interactive}</td>
                                            <td className="px-4 py-4 text-center text-indigo-900">{PRIORITY_TOTAL.subsurface}</td>
                                            <td className="px-4 py-4 text-center text-indigo-700">{PRIORITY_TOTAL.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <BarChart3 className="text-indigo-500" size={20} />
                                <h3 className="font-bold text-gray-900">Priority Distribution</h3>
                            </div>
                            <div className="h-[300px] w-full flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CHART_DATA} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} />
                                        <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                                        <Tooltip cursor={{ fill: '#f9fafb' }} />
                                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                        <Bar dataKey="1st Priority (Surface)" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="2nd Priority (Interactive)" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="3rd Priority (Subsurface)" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
                        <Info className="shrink-0 text-blue-600 mt-1" size={24} />
                        <div>
                            <h3 className="font-bold text-blue-900 mb-1">About These Maps</h3>
                            <p className="text-blue-800/80 text-sm leading-relaxed">
                                These maps illustrate the strategic placement of various water conservation structures such as Mini Percolation Tanks, Check Dams, and Farm Ponds.
                                The planning takes into account the topological and hydrological characteristics of the Gudi Palle, Kuppam, Rama Kuppam, and Santhi Puram regions.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
