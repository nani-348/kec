"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveMap from "@/components/overview/InteractiveMap";
import { CloudRain, Droplets, TrendingUp, Calendar } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";

export default function RainfallPage() {
    // Data extracted from PDF / KADA Region Profile
    const mandalData = [
        { name: "Gudi Palle", rainfall: 856 },
        { name: "Kuppam", rainfall: 865 },
        { name: "Rama Kuppam", rainfall: 773 },
        { name: "Santhi Puram", rainfall: 813 },
        { name: "Regional Avg", rainfall: 827, isAverage: true },
    ];

    // Estimated Seasonal Distribution (Typical for Chittoor/Rayalaseema Region)
    // Adjust numeric values if precise PDF data is extracted later
    const seasonalData = [
        { name: "South-West Monsoon", value: 450, color: "#3b82f6" }, // Approx 55%
        { name: "North-East Monsoon", value: 300, color: "#6366f1" }, // Approx 35%
        { name: "Winter & Summer", value: 77, color: "#f59e0b" },    // Approx 10%
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-primary font-medium">
                        {payload[0].value} mm
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Rainfall Characteristics
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Analysis of spatial and temporal rainfall distribution across the KADA region, a critical input for groundwater recharge estimation.
                    </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                            <CloudRain size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Annual Average</p>
                            <h3 className="text-2xl font-bold text-gray-900">827 mm</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                            <Droplets size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Primary Season</p>
                            <h3 className="text-2xl font-bold text-gray-900">SW Monsoon</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Highest Rainfall</p>
                            <h3 className="text-2xl font-bold text-gray-900">Kuppam (865 mm)</h3>
                        </div>
                    </div>
                </div>

                {/* Top Section: Charts & Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Left: Mandal-wise Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Mandal-wise Annual Rainfall</h2>
                            <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">2024-25</div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mandalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 11 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 11 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                    <Bar dataKey="rainfall" radius={[4, 4, 0, 0]}>
                                        {mandalData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.isAverage ? '#f59e0b' : '#3b82f6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            Comparison of annual rainfall (mm) across 4 Mandals vs Regional Average.
                        </p>
                    </div>

                    {/* Right: Seasonal Distribution */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Seasonal Distribution</h2>
                            <div className="p-1 bg-gray-50 rounded-md">
                                <Calendar size={16} className="text-gray-400" />
                            </div>
                        </div>
                        <div className="h-[300px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={seasonalData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {seasonalData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text overlay */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                                <div className="text-2xl font-bold text-gray-900">827</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold">mm Total</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <MapIcon size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Rainfall & Isohyetal Map</h2>
                    </div>

                    <InteractiveMap
                        src="/images/about-kada/page19_img131.png"
                        alt="Rainfall Distribution Map"
                        title="Isohyetal Map - Annual Rainfall Distribution"
                        className="h-[400px] lg:h-[500px] border border-gray-100"
                    />
                    <p className="text-sm text-gray-500 mt-4 italic text-center">
                        Spatial distribution of rainfall showing high intensity zones in Kuppam and lower intensity in Rama Kuppam.
                    </p>
                </div>

                {/* Detailed Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Detailed Classification</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Mandal Name</th>
                                    <th className="px-6 py-4">Annual Rainfall (mm)</th>
                                    <th className="px-6 py-4">Deviation from Avg</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mandalData.filter(d => !d.isAverage).map((row, idx) => {
                                    const deviation = row.rainfall - 827;
                                    const isPositive = deviation >= 0;
                                    return (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                                            <td className="px-6 py-4 font-mono text-gray-600">{row.rainfall}</td>
                                            <td className={`px-6 py-4 font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                                                {isPositive ? '+' : ''}{deviation} mm
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${isPositive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {isPositive ? 'Above Normal' : 'Below Normal'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

// Icon wrapper to avoid conflict with lucide-react Map
function MapIcon({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
    )
}
