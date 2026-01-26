"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    MapPin,
    TrendingUp,
    IndianRupee,
    AlertCircle,
    CheckCircle2,
    Calendar,
    ArrowRight,
    Target
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, Cell
} from "recharts";
import clsx from "clsx";

// --- Mock Data Models ---

// Strategic Overview Metrics
const STRATEGY_METRICS = {
    priorityMandals: 12,
    estimatedBudget: 450, // Crore
    projectedRecharge: 2100, // MCM
    beneficiaryVillages: 450
};

// Priority Zones Data (Conceptual)
const PRIORITY_DATA = [
    { name: "High Priority", value: 12, color: "#ef4444", desc: "Critical Over-exploited Mandals" },
    { name: "Medium Priority", value: 18, color: "#f59e0b", desc: "Semi-critical / Watch areas" },
    { name: "Low Priority", value: 24, color: "#10b981", desc: "Safe zones requiring maintenance" },
];

// Expected Outcome Projection (Groundwater Level Recovery)
const PROJECTION_DATA = [
    { year: "2024", current: 15.2, projected: 15.2 },
    { year: "2025", current: 15.8, projected: 14.5 },
    { year: "2026", current: 16.5, projected: 13.8 },
    { year: "2027", current: 17.1, projected: 12.5 },
    { year: "2028", current: 17.8, projected: 11.2 },
    { year: "2029", current: 18.5, projected: 10.0 },
];

// Proposed Interventions List
const PROPOSALS = [
    {
        id: 1,
        title: "Construction of Check Dams in Vempalli",
        type: "Surface Intervention",
        priority: "High",
        status: "DPR Approved",
        cost: "12.5 Cr",
        impact: "Requires immediate funding",
        timeline: "2024-2025"
    },
    {
        id: 2,
        title: "Artificial Recharge Shafts in Rayachoty",
        type: "Sub-surface Intervention",
        priority: "High",
        status: "Technical Sanction",
        cost: "8.2 Cr",
        impact: "Targeting deep aquifers",
        timeline: "2024-25"
    },
    {
        id: 3,
        title: "Restoration of Tank Cascades in Pulivendula",
        type: "Restoration",
        priority: "Medium",
        status: "Proposal Stage",
        cost: "15.0 Cr",
        impact: "Enhancing storage capacity",
        timeline: "2025-26"
    },
    {
        id: 4,
        title: "Supply Side Channel Improvements",
        type: "Canal Works",
        priority: "Medium",
        status: "Surveying",
        cost: "5.5 Cr",
        impact: "Reducing seepage losses",
        timeline: "2025-26"
    }
];

export default function ProposedInterventionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Proposed Conservation Interventions
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Strategic planning for future water security, targeting <span className="font-semibold text-red-600">High Priority Zones</span> with science-based interventions.
                    </p>
                </div>

                {/* Strategic Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Priority Mandals */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all">
                        <div className="p-3 bg-red-50 rounded-xl text-red-600">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Priority Mandals</p>
                            <h3 className="text-2xl font-bold text-gray-900">{STRATEGY_METRICS.priorityMandals}</h3>
                            <p className="text-xs text-red-600 mt-1 font-medium">Critical Intervention Required</p>
                        </div>
                    </div>

                    {/* Estimated Budget */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <IndianRupee size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Est. Budget</p>
                            <h3 className="text-2xl font-bold text-gray-900">{STRATEGY_METRICS.estimatedBudget} Cr</h3>
                            <p className="text-xs text-emerald-600 mt-1 font-medium">For Phase-I Implementation</p>
                        </div>
                    </div>

                    {/* Projected Recharge */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Target Recharge</p>
                            <h3 className="text-2xl font-bold text-gray-900">{STRATEGY_METRICS.projectedRecharge} MCM</h3>
                            <p className="text-xs text-blue-600 mt-1 font-medium">Additional Potential</p>
                        </div>
                    </div>

                    {/* Beneficiaries */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all">
                        <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Beneficiaries</p>
                            <h3 className="text-2xl font-bold text-gray-900">{STRATEGY_METRICS.beneficiaryVillages}</h3>
                            <p className="text-xs text-purple-600 mt-1 font-medium">Villages Covered</p>
                        </div>
                    </div>
                </div>

                {/* Analytical Visualizations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* Priority Zones Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Intervention Prioritization</h3>
                            <p className="text-sm text-gray-500">Mandal classification based on groundwater stress</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={PRIORITY_DATA}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        width={120}
                                        tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                                        {PRIORITY_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend for Priority */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            {PRIORITY_DATA.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-600">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Outcome Projection Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Expected Impact Scenario</h3>
                            <p className="text-sm text-gray-500">Projected groundwater level recovery trend (m bgl)</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={PROJECTION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                    <YAxis
                                        reversed
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        label={{ value: 'Depth (m bgl)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
                                    />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Legend verticalAlign="top" height={36} iconType="circle" />
                                    <Area
                                        type="monotone"
                                        dataKey="current"
                                        name="Business as Usual"
                                        stroke="#ef4444"
                                        fillOpacity={1}
                                        fill="url(#colorCurrent)"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="projected"
                                        name="With Interventions"
                                        stroke="#10b981"
                                        fillOpacity={1}
                                        fill="url(#colorProjected)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* Interventions List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 font-serif">Major Proposed Works</h2>
                            <p className="text-sm text-gray-500">List of high-impact interventions under consideration</p>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                            Download Full DPR <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Intervention Title</th>
                                    <th className="px-6 py-4 font-semibold">Priority</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Est. Cost</th>
                                    <th className="px-6 py-4 font-semibold">Target Timeline</th>
                                    <th className="px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {PROPOSALS.map((proposal) => (
                                    <tr key={proposal.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900">{proposal.title}</span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                    <Target size={12} /> {proposal.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx("px-2 py-1 rounded-full text-xs font-bold",
                                                proposal.priority === "High" ? "bg-red-50 text-red-600" :
                                                    proposal.priority === "Medium" ? "bg-amber-50 text-amber-600" :
                                                        "bg-emerald-50 text-emerald-600"
                                            )}>
                                                {proposal.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {proposal.status === "DPR Approved" ? <CheckCircle2 size={16} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>}
                                                <span className="text-sm text-gray-700 font-medium">{proposal.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono font-medium text-gray-600">
                                            {proposal.cost}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar size={14} />
                                                {proposal.timeline}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
