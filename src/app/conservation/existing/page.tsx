"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Waves,
    Construction,
    CheckCircle2,
    Activity,
    Droplets,
    ArrowUpFromLine,
    Info,
    LayoutGrid,
    Sprout
} from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import clsx from "clsx";

// --- Mock Data Models ---

// Key Metrics
const SUMMARY_METRICS = {
    totalStructures: 12450,
    grossStorage: 4500, // MCM
    functionalStatus: 88, // %
    renovatedCount: 3200
};

// Structure Type Distribution
const STRUCTURE_DISTRIBUTION = [
    { name: "Check Dams", value: 45, color: "#0ea5e9", icon: <Construction size={16} /> },
    { name: "Percolation Tanks", value: 25, color: "#3b82f6", icon: <Waves size={16} /> },
    { name: "Farm Ponds", value: 20, color: "#10b981", icon: <Sprout size={16} /> },
    { name: "Recharge Shafts", value: 10, color: "#f59e0b", icon: <ArrowUpFromLine size={16} /> },
];

// Impact Analysis (Recharge Contribution)
const IMPACT_DATA = [
    { name: "Check Dams", value: 1200, color: "#0ea5e9" },
    { name: "Percolation Tanks", value: 950, color: "#3b82f6" },
    { name: "Farm Ponds", value: 450, color: "#10b981" },
    { name: "Recharge Shafts", value: 300, color: "#f59e0b" },
];

// Structure Inventory Details
const STRUCTURE_TYPES = [
    {
        name: "Check Dams",
        count: 5602,
        capacity: "1,200 MCM",
        status: "Good",
        description: "Barriers built across small streams to reduce water flow velocity and promote infiltration.",
        icon: <Construction size={24} className="text-blue-600" />,
        bg: "bg-blue-50",
        border: "border-blue-100",
        text: "text-blue-600"
    },
    {
        name: "Percolation Tanks",
        count: 3112,
        capacity: "1,800 MCM",
        status: "Review",
        description: "Artificially created surface water bodies submerged in highly permeable land areas.",
        icon: <Waves size={24} className="text-indigo-600" />,
        bg: "bg-indigo-50",
        border: "border-indigo-100",
        text: "text-indigo-600"
    },
    {
        name: "Farm Ponds",
        count: 2490,
        capacity: "900 MCM",
        status: "Good",
        description: "Small tanks dug by farmers for harvesting rainwater and using it for critical irrigation.",
        icon: <Sprout size={24} className="text-emerald-600" />,
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        text: "text-emerald-600"
    },
    {
        name: "Recharge Shafts",
        count: 1246,
        capacity: "600 MCM",
        status: "Active",
        description: "Bored holes used to replenish groundwater aquifers in areas with low permeability.",
        icon: <ArrowUpFromLine size={24} className="text-amber-600" />,
        bg: "bg-amber-50",
        border: "border-amber-100",
        text: "text-amber-600"
    }
];

export default function ExistingStructuresPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Existing Conservation Structures
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Inventory and functionality assessment of <span className="font-semibold text-blue-600">Artificial Recharge Structures</span> aimed at augmenting groundwater resources.
                    </p>
                </div>

                {/* Summary Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Structures */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LayoutGrid size={64} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Structures</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{SUMMARY_METRICS.totalStructures.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 font-medium">Units</span>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                            <CheckCircle2 size={12} className="mr-1" />
                            Verified Inventory
                        </div>
                    </div>

                    {/* Gross Storage */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Droplets size={64} className="text-emerald-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Gross Storage</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{SUMMARY_METRICS.grossStorage.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 font-medium">MCM</span>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit">
                            <Activity size={12} className="mr-1" />
                            Total Capacity
                        </div>
                    </div>

                    {/* Functional Status */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={64} className="text-purple-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Functional Status</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{SUMMARY_METRICS.functionalStatus}%</span>
                            <span className="text-xs text-gray-400 font-medium">Operational</span>
                        </div>
                        <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full"
                                style={{ width: `${SUMMARY_METRICS.functionalStatus}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Recently Renovated */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Construction size={64} className="text-amber-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Renovated (FY24)</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{SUMMARY_METRICS.renovatedCount.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 font-medium">Units</span>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full w-fit">
                            <ArrowUpFromLine size={12} className="mr-1" />
                            Restored
                        </div>
                    </div>
                </div>

                {/* Analytical Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Structure Distribution Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Structure Composition</h3>
                            <p className="text-sm text-gray-500">Distribution of conservation structures by type</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="h-[250px] w-full md:w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={STRUCTURE_DISTRIBUTION}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {STRUCTURE_DISTRIBUTION.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number | string) => [`${value}%`, 'Share']}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                {STRUCTURE_DISTRIBUTION.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white shadow-sm text-gray-700" style={{ color: item.color }}>
                                                {item.icon}
                                            </div>
                                            <span className="font-medium text-gray-700 text-sm">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Impact Analysis Bar Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Recharge Impact</h3>
                            <p className="text-sm text-gray-500">Estimated annual recharge contribution (MCM) by structure type</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={IMPACT_DATA}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#4b5563', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#4b5563', fontSize: 12 }}
                                        label={{ value: 'Recharge (MCM)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: number | string) => [`${value} MCM`, 'Recharge']}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={48}>
                                        {IMPACT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* Structure Inventory Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-serif mb-8">Structure Inventory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STRUCTURE_TYPES.map((type, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                                <div className={clsx("w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", type.bg)}>
                                    {type.icon}
                                </div>
                                <h3 className={clsx("text-lg font-bold mb-2 group-hover:text-primary transition-colors", type.text)}>
                                    {type.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 min-h-[60px]">
                                    {type.description}
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">Count</span>
                                        <span className="font-bold text-gray-900">{type.count.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">Capacity</span>
                                        <span className="font-bold text-gray-900">{type.capacity}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Status</span>
                                        <span className={clsx("font-bold text-xs px-2 py-0.5 rounded-full bg-gray-100",
                                            type.status === "Good" ? "text-emerald-600 bg-emerald-50" :
                                                type.status === "Active" ? "text-blue-600 bg-blue-50" :
                                                    "text-amber-600 bg-amber-50"
                                        )}>
                                            {type.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
