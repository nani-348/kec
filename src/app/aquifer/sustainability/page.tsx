"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Droplets,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Activity,
    ArrowUpRight,
    Info
} from "lucide-react";
import { DynamicSheetTable } from "@/components/ui/DynamicSheetTable";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    Cell
} from "recharts";
import clsx from "clsx";

// --- Mock Data ---

// Key definitions:
// SOD (Stage of Development) = (Gross Groundwater Draft / Net Groundwater Availability) * 100
// < 70% : Safe
// 70-90% : Moderate
// 90-100% : Low
// > 100% : Over-Exploited

const SUSTAINABILITY_DATA = [
    {
        id: "gdp",
        name: "Gudupalle",
        availability: 12.5, // Net Annual Groundwater Availability (MCM)
        draft: 14.2,        // Gross Groundwater Draft (MCM)
        sod: 113.6,         // Calculated SOD %
        category: "Over-Exploited",
        description: "Extraction exceeds recharge. Urgent need for artificial recharge structures.",
        trend: "worsening"
    },
    {
        id: "kpm",
        name: "Kuppam",
        availability: 18.2,
        draft: 16.5,
        sod: 90.6,
        category: "Low",
        description: "High urban demand putting stress on aquifers. Near 100% utilization.",
        trend: "stable"
    },
    {
        id: "rmk",
        name: "Ramakuppam",
        availability: 15.8,
        draft: 11.2,
        sod: 70.9,
        category: "Moderate",
        description: "Agricultural extraction is high but balanced by good recharge zones.",
        trend: "improving"
    },
    {
        id: "stp",
        name: "Shanthipuram",
        availability: 14.5,
        draft: 9.4,
        sod: 64.8,
        category: "Safe",
        description: "Healthy balance. Potential for further sustainable development.",
        trend: "improving"
    }
];

// Aggregated Stats
const TOTAL_AVAILABILITY = SUSTAINABILITY_DATA.reduce((acc, curr) => acc + curr.availability, 0);
const TOTAL_DRAFT = SUSTAINABILITY_DATA.reduce((acc, curr) => acc + curr.draft, 0);
const AVG_SOD = (TOTAL_DRAFT / TOTAL_AVAILABILITY) * 100;

// Helper for Category Styling
const getCategoryColor = (category: string) => {
    switch (category) {
        case "Safe": return "text-green-600 bg-green-50 border-green-200";
        case "Moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200";
        case "Low": return "text-orange-600 bg-orange-50 border-orange-200";
        case "Over-Exploited": return "text-red-600 bg-red-50 border-red-200";
        default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
};

const getProgressBarColor = (sod: number) => {
    if (sod < 70) return "#22c55e"; // Green
    if (sod < 90) return "#eab308"; // Yellow
    if (sod < 100) return "#f97316"; // Orange
    return "#ef4444"; // Red
};

export default function SustainabilityPage() {
    const [selectedMandal, setSelectedMandal] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Activity size={14} />
                        Sustainability Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Groundwater Sustainability Indicators
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Analyzing the balance between <strong>Groundwater Recharge</strong> (Deposits) and <strong>Extraction</strong> (Withdrawals).
                        The <strong>Stage of Development (SOD)</strong> helps identify mandates for conservation versus utilization.
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: Availability */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Droplets size={64} className="text-blue-600" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Net Annual Availability</p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <h3 className="text-3xl font-bold text-gray-900">{TOTAL_AVAILABILITY.toFixed(1)}</h3>
                                <span className="text-sm font-medium text-gray-500">MCM</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 font-medium bg-blue-50 w-fit px-2 py-1 rounded-lg">
                                <ArrowUpRight size={14} /> Total Replenishable Resource
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Draft */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={64} className="text-orange-600" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Gross Annual Draft</p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <h3 className="text-3xl font-bold text-gray-900">{TOTAL_DRAFT.toFixed(1)}</h3>
                                <span className="text-sm font-medium text-gray-500">MCM</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-orange-600 font-medium bg-orange-50 w-fit px-2 py-1 rounded-lg">
                                <Activity size={14} /> Total Extraction
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Average SOD */}
                    <div className={clsx(
                        "p-6 rounded-xl shadow-sm border relative overflow-hidden group hover:shadow-md transition-all",
                        AVG_SOD > 90 ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
                    )}>
                        <div className="relative z-10">
                            <p className={clsx("text-sm font-semibold uppercase tracking-wide", AVG_SOD > 90 ? "text-red-700" : "text-yellow-800")}>
                                Constituency SOD
                            </p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <h3 className={clsx("text-3xl font-bold", AVG_SOD > 90 ? "text-red-900" : "text-yellow-900")}>
                                    {AVG_SOD.toFixed(1)}%
                                </h3>
                                <span className={clsx("text-sm font-medium", AVG_SOD > 90 ? "text-red-700" : "text-yellow-800")}>
                                    Utilization
                                </span>
                            </div>
                            <p className={clsx("mt-4 text-xs font-medium w-fit px-2 py-1 rounded-lg flex items-center gap-1",
                                AVG_SOD > 90 ? "bg-white/50 text-red-800" : "bg-white/50 text-yellow-800"
                            )}>
                                {AVG_SOD > 90 ? <AlertTriangle size={14} /> : <Info size={14} />}
                                {AVG_SOD > 100 ? "Over-Exploited" : AVG_SOD > 90 ? "Critical Category" : "Semi-Critical"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content: Charts & Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Chart: Recharge vs Draft */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800 font-serif text-xl">Recharge vs. Extraction</h3>
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Unit: MCM</div>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={SUSTAINABILITY_DATA}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ecf0f1" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar dataKey="availability" name="Availability (Recharge)" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="draft" name="Draft (Extraction)" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart: SOD Visualization */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-800 font-serif text-xl">Stage of Development (SOD)</h3>
                            <p className="text-sm text-gray-500 mt-1">Percentage of available water being extracted.</p>
                        </div>

                        <div className="flex-grow space-y-6 flex flex-col justify-center">
                            {SUSTAINABILITY_DATA.map((item) => (
                                <div key={item.id} className="group">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="font-semibold text-gray-700">{item.name}</span>
                                        <span className={clsx("text-sm font-bold",
                                            item.sod > 100 ? "text-red-600" :
                                                item.sod > 90 ? "text-orange-600" :
                                                    item.sod > 70 ? "text-yellow-600" : "text-green-600"
                                        )}>
                                            {item.sod.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-90"
                                            style={{
                                                width: `${Math.min(item.sod, 100)}%`,
                                                backgroundColor: getProgressBarColor(item.sod)
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                                        <span>0%</span>
                                        <span className={clsx(item.sod > 100 && "font-bold text-red-400")}>100% (Critical Cap)</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Detailed Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden px-6 pb-6 pt-2">
                    <DynamicSheetTable
                        category="Aquifer"
                        table="SUSTAINABILITY INDICATORS"
                        title="Detailed Mandal Report"
                        className="w-full"
                    />
                </div>

            </main>
            <Footer />
        </div>
    );
}
