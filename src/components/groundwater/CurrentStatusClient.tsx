"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CurrentStatusClientProps {
    waterLevelData: any[];
    comparisonData: any[];
    zoneAreaData: any[];
}

export default function CurrentStatusClient({ waterLevelData, comparisonData, zoneAreaData }: CurrentStatusClientProps) {
    const latestZone = zoneAreaData.length > 0 ? zoneAreaData[zoneAreaData.length - 1] : null;
    const zonePieData = latestZone ? [
        { name: "Shallow < 3m", value: latestZone.less3m, color: "#10b981" },
        { name: "Medium 3-8m", value: latestZone.range3to8m, color: "#3b82f6" },
        { name: "Deep 8-20m", value: latestZone.range8to20m, color: "#f59e0b" },
        { name: "Very Deep > 20m", value: latestZone.more20m, color: "#ef4444" },
    ] : [];

    const totalAreaShare = zonePieData.reduce((sum, item) => sum + (typeof item.value === "number" ? item.value : 0), 0);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-green-50">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Current Groundwater Status
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Real-time analysis of groundwater levels and depth zone distribution across the KADA region
                        </p>
                    </div>

                    {/* Year-over-Year Comparison */}
                    {waterLevelData.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Year-over-Year Water Level Rise</h2>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Period</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">Rise (m)</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">Pre-Monsoon (m)</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">Post-Monsoon (m)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {waterLevelData.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-900">{item.name}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.rise.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.preMonsoon.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.postMonsoon.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {comparisonData.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Water Level Rise Comparison</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={comparisonData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis dataKey="name" stroke="#6b7280" />
                                            <YAxis stroke="#6b7280" label={{ value: 'Rise (m)', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Bar dataKey="rise" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Depth Zone Distribution */}
                    {zoneAreaData.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Depth Zone Distribution (% of Area)</h2>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Period</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">&lt; 3m (%)</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">3-8m (%)</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">8-20m (%)</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700">&gt; 20m (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {zoneAreaData.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-900">{item.period}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.less3m.toFixed(1)}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.range3to8m.toFixed(1)}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.range8to20m.toFixed(1)}</td>
                                                <td className="px-4 py-3 text-right text-gray-900">{item.more20m.toFixed(1)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">Depth Zone Trends</h3>
                                        <p className="text-sm text-gray-500">Latest period distribution snapshot</p>
                                    </div>
                                    {latestZone && (
                                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {latestZone.period}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl border border-gray-100 p-6 shadow-sm">
                                        <div className="h-[320px] w-full relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={zonePieData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={90}
                                                        outerRadius={130}
                                                        paddingAngle={3}
                                                        stroke="#ffffff"
                                                        strokeWidth={2}
                                                    >
                                                        {zonePieData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip formatter={(value: any) => [`${value}%`, "Area Share"]} />
                                                </PieChart>
                                            </ResponsiveContainer>

                                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                <p className="text-xs uppercase tracking-widest text-gray-400">Total</p>
                                                <p className="text-3xl font-bold text-gray-900">{totalAreaShare.toFixed(1)}%</p>
                                                <p className="text-xs text-gray-500">Area Coverage</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {zonePieData.map((zone) => (
                                            <div key={zone.name} className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: zone.color }} />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">{zone.name}</p>
                                                        <p className="text-xs text-gray-500">Depth zone share</p>
                                                    </div>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{zone.value.toFixed(1)}%</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Key Insights */}
                            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                                <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Insights</h3>
                                <ul className="list-disc list-inside space-y-2 text-blue-800">
                                    <li>Groundwater levels show positive trends in shallow zones (&lt; 3m)</li>
                                    <li>Progressive improvement observed from 2024 to 2025</li>
                                    <li>Recharge interventions are effectively influencing water table depths</li>
                                    <li>Continued monitoring essential for sustainable groundwater management</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
