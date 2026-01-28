"use client";

import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Droplets, Building, TrendingUp, MapPin, Target, Wrench } from "lucide-react";
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

// 1) Existing Water Conservation Structures
const EXISTING_STRUCTURES = [
    { region: "Gudi Palle", miniPercolationTanks: 11, checkDams: 131, farmPonds: 2560, dugOutPonds: 298 },
    { region: "Kuppam", miniPercolationTanks: 47, checkDams: 187, farmPonds: 2828, dugOutPonds: 307 },
    { region: "Rama Kuppam", miniPercolationTanks: 106, checkDams: 73, farmPonds: 3041, dugOutPonds: 270 },
    { region: "Santhi Puram", miniPercolationTanks: 33, checkDams: 91, farmPonds: 2453, dugOutPonds: 227 },
];

const EXISTING_TOTALS = { miniPercolationTanks: 197, checkDams: 482, farmPonds: 10882, dugOutPonds: 1102 };

// 2) Estimated Recharge to be done
const RECHARGE_DATA = [
    { region: "Gudi Palle", villages: 48, waterLevelConsidered: 39.67, waterLevelRaised: 31.67, recharge: 2165 },
    { region: "Kuppam", villages: 64, waterLevelConsidered: 26.36, waterLevelRaised: 18.36, recharge: 2101 },
    { region: "Rama Kuppam", villages: 38, waterLevelConsidered: 19.76, waterLevelRaised: 11.76, recharge: 865 },
    { region: "Santhi Puram", villages: 59, waterLevelConsidered: 18.68, waterLevelRaised: 10.68, recharge: 861 },
];

const RECHARGE_TOTALS = { villages: 209, waterLevelConsidered: 26.05, waterLevelRaised: 18.05, recharge: 5992 };

// 3) Proposed Water Conservation Plan
const PROPOSED_STRUCTURES = [
    { region: "Gudi Palle", miniPercolationTanks: 222, checkDams: 141, farmPonds: 28, dugOutPonds: 93, rechargeShafts: 91, desiltingCDs: 9, desiltingMITanks: 5 },
    { region: "Kuppam", miniPercolationTanks: 261, checkDams: 177, farmPonds: 91, dugOutPonds: 65, rechargeShafts: 98, desiltingCDs: 15, desiltingMITanks: 11 },
    { region: "Rama Kuppam", miniPercolationTanks: 109, checkDams: 93, farmPonds: 124, dugOutPonds: 172, rechargeShafts: 69, desiltingCDs: 28, desiltingMITanks: 28 },
    { region: "Santhi Puram", miniPercolationTanks: 171, checkDams: 128, farmPonds: 233, dugOutPonds: 332, rechargeShafts: 62, desiltingCDs: 27, desiltingMITanks: 32 },
];

const PROPOSED_TOTALS = { miniPercolationTanks: 763, checkDams: 539, farmPonds: 476, dugOutPonds: 662, rechargeShafts: 320, desiltingCDs: 79, desiltingMITanks: 76 };

// Chart data for existing structures
const CHART_EXISTING = EXISTING_STRUCTURES.map(d => ({
    name: d.region,
    "Mini Percolation Tanks": d.miniPercolationTanks,
    "Check Dams": d.checkDams,
    "Dug-Out Ponds": d.dugOutPonds,
}));

// Chart data for proposed structures
const CHART_PROPOSED = PROPOSED_STRUCTURES.map(d => ({
    name: d.region,
    "Mini Percolation Tanks": d.miniPercolationTanks,
    "Check Dams": d.checkDams,
    "Farm Ponds": d.farmPonds,
    "Dug-Out Ponds": d.dugOutPonds,
}));

export default function WaterConservationPlanPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Droplets size={14} />
                        Conservation Planning
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 font-serif mb-4">
                        Water Conservation Plan Status
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Comprehensive overview of existing and proposed water conservation structures across the KADA region.
                    </p>
                </div>

                {/* Key Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Building size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Total Existing Structures</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{(EXISTING_TOTALS.miniPercolationTanks + EXISTING_TOTALS.checkDams + EXISTING_TOTALS.farmPonds + EXISTING_TOTALS.dugOutPonds).toLocaleString()}</p>
                        <p className="text-xs opacity-75">Across 4 Mandals</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Proposed Structures</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{(PROPOSED_TOTALS.miniPercolationTanks + PROPOSED_TOTALS.checkDams + PROPOSED_TOTALS.farmPonds + PROPOSED_TOTALS.dugOutPonds + PROPOSED_TOTALS.rechargeShafts).toLocaleString()}</p>
                        <p className="text-xs opacity-75">New Constructions</p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Recharge Target</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{RECHARGE_TOTALS.recharge.toLocaleString()}</p>
                        <p className="text-xs opacity-75">mcft</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Villages Covered</h3>
                        </div>
                        <p className="text-4xl font-bold mb-1">{RECHARGE_TOTALS.villages}</p>
                        <p className="text-xs opacity-75">In KADA Region</p>
                    </div>
                </div>

                {/* Section 1: Existing Water Conservation Structures */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Building size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">1) Existing Water Conservation Structures</h2>
                            <p className="text-gray-500">Current infrastructure across all regions</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-bold">Region</th>
                                            <th className="px-4 py-3 text-center font-bold">Mini Percolation Tanks</th>
                                            <th className="px-4 py-3 text-center font-bold">Check Dams</th>
                                            <th className="px-4 py-3 text-center font-bold">Farm Ponds</th>
                                            <th className="px-4 py-3 text-center font-bold">Dug-Out Ponds</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {EXISTING_STRUCTURES.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-4 py-3 font-bold text-gray-900">{row.region}</td>
                                                <td className="px-4 py-3 text-center text-gray-700">{row.miniPercolationTanks}</td>
                                                <td className="px-4 py-3 text-center text-gray-700">{row.checkDams}</td>
                                                <td className="px-4 py-3 text-center text-gray-700">{row.farmPonds.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-center text-gray-700">{row.dugOutPonds}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-blue-600 text-white font-bold">
                                            <td className="px-4 py-3">KADA Region</td>
                                            <td className="px-4 py-3 text-center">{EXISTING_TOTALS.miniPercolationTanks}</td>
                                            <td className="px-4 py-3 text-center">{EXISTING_TOTALS.checkDams}</td>
                                            <td className="px-4 py-3 text-center">{EXISTING_TOTALS.farmPonds.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center">{EXISTING_TOTALS.dugOutPonds.toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Existing Structures by Region</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CHART_EXISTING} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                                        <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Mini Percolation Tanks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Check Dams" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Dug-Out Ponds" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Estimated Recharge to be Done */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">2) Estimated Recharge to be Done</h2>
                            <p className="text-gray-500">Village-wise water level and recharge targets</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-cyan-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-bold">Region</th>
                                        <th className="px-4 py-3 text-center font-bold">Village</th>
                                        <th className="px-4 py-3 text-center font-bold">Water Level Considered (m)</th>
                                        <th className="px-4 py-3 text-center font-bold">Water Level to be Raised (m)</th>
                                        <th className="px-4 py-3 text-center font-bold">Recharge to be Done (mcft)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {RECHARGE_DATA.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-cyan-50/30 transition-colors">
                                            <td className="px-4 py-3 font-bold text-gray-900">{row.region}</td>
                                            <td className="px-4 py-3 text-center text-gray-700">{row.villages}</td>
                                            <td className="px-4 py-3 text-center text-gray-700">{row.waterLevelConsidered.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-center text-gray-700">{row.waterLevelRaised.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-center font-bold text-cyan-700">{row.recharge.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-cyan-600 text-white font-bold">
                                        <td className="px-4 py-3">KADA Region</td>
                                        <td className="px-4 py-3 text-center">{RECHARGE_TOTALS.villages}</td>
                                        <td className="px-4 py-3 text-center">{RECHARGE_TOTALS.waterLevelConsidered.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-center">{RECHARGE_TOTALS.waterLevelRaised.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-center">{RECHARGE_TOTALS.recharge.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Section 3: Proposed Water Conservation Plan */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Target size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">3) Proposed Water Conservation Plan</h2>
                            <p className="text-gray-500">New structures and desilting activities planned</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-emerald-600 text-white">
                                        <tr>
                                            <th rowSpan={2} className="px-4 py-3 text-left font-bold border-r border-emerald-500">Region</th>
                                            <th colSpan={5} className="px-4 py-2 text-center font-bold border-r border-emerald-500">Proposed Water Conservation Structures</th>
                                            <th colSpan={2} className="px-4 py-2 text-center font-bold">Desiltation</th>
                                        </tr>
                                        <tr>
                                            <th className="px-3 py-2 text-center font-medium text-xs">Mini Percolation Tanks</th>
                                            <th className="px-3 py-2 text-center font-medium text-xs">Check Dams</th>
                                            <th className="px-3 py-2 text-center font-medium text-xs">Farm Ponds</th>
                                            <th className="px-3 py-2 text-center font-medium text-xs">Dug-Out Ponds</th>
                                            <th className="px-3 py-2 text-center font-medium text-xs border-r border-emerald-500">Recharge Shafts</th>
                                            <th className="px-3 py-2 text-center font-medium text-xs">Desilting of CDs</th>
                                            <th className="px-3 py-2 text-center font-medium text-xs">Desilting of MI Tanks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {PROPOSED_STRUCTURES.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                                                <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-100">{row.region}</td>
                                                <td className="px-3 py-3 text-center text-gray-700">{row.miniPercolationTanks}</td>
                                                <td className="px-3 py-3 text-center text-gray-700">{row.checkDams}</td>
                                                <td className="px-3 py-3 text-center text-gray-700">{row.farmPonds}</td>
                                                <td className="px-3 py-3 text-center text-gray-700">{row.dugOutPonds}</td>
                                                <td className="px-3 py-3 text-center text-gray-700 border-r border-gray-100">{row.rechargeShafts}</td>
                                                <td className="px-3 py-3 text-center text-gray-700">{row.desiltingCDs}</td>
                                                <td className="px-3 py-3 text-center text-gray-700">{row.desiltingMITanks}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-emerald-600 text-white font-bold">
                                            <td className="px-4 py-3 border-r border-emerald-500">KADA Region</td>
                                            <td className="px-3 py-3 text-center">{PROPOSED_TOTALS.miniPercolationTanks}</td>
                                            <td className="px-3 py-3 text-center">{PROPOSED_TOTALS.checkDams}</td>
                                            <td className="px-3 py-3 text-center">{PROPOSED_TOTALS.farmPonds}</td>
                                            <td className="px-3 py-3 text-center">{PROPOSED_TOTALS.dugOutPonds}</td>
                                            <td className="px-3 py-3 text-center border-r border-emerald-500">{PROPOSED_TOTALS.rechargeShafts}</td>
                                            <td className="px-3 py-3 text-center">{PROPOSED_TOTALS.desiltingCDs}</td>
                                            <td className="px-3 py-3 text-center">{PROPOSED_TOTALS.desiltingMITanks}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Proposed Structures by Region</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CHART_PROPOSED} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                                        <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Mini Percolation Tanks" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Check Dams" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Farm Ponds" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Dug-Out Ponds" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Summary Insights */}
                <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Wrench size={24} className="text-blue-600" />
                        Key Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{EXISTING_TOTALS.farmPonds.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Existing Farm Ponds (highest count)</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">{PROPOSED_TOTALS.miniPercolationTanks}</div>
                            <div className="text-sm text-gray-600">Proposed Mini Percolation Tanks</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-cyan-600 mb-2">{RECHARGE_TOTALS.recharge.toLocaleString()} mcft</div>
                            <div className="text-sm text-gray-600">Total Recharge Target for KADA</div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
