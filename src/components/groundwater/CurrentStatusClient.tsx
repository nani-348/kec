"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CurrentStatusClientProps {
    waterLevelData: any[];
    comparisonData: any[];
    zoneAreaData: any[];
}

export default function CurrentStatusClient({ waterLevelData, comparisonData, zoneAreaData }: CurrentStatusClientProps) {
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
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Depth Zone Trends</h3>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={zoneAreaData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="period" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" label={{ value: 'Area (%)', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="less3m" name="< 3m" fill="#10b981" stackId="a" />
                                        <Bar dataKey="range3to8m" name="3-8m" fill="#3b82f6" stackId="a" />
                                        <Bar dataKey="range8to20m" name="8-20m" fill="#f59e0b" stackId="a" />
                                        <Bar dataKey="more20m" name="> 20m" fill="#ef4444" stackId="a" />
                                    </BarChart>
                                </ResponsiveContainer>
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
