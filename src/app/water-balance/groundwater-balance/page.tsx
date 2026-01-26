"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Scale,
    ArrowRight,
    Droplets,
    CloudRain,
    TrendingDown,
    ArrowDownRight,
    ArrowUpRight,
    Tractor,
    Home,
    Factory,
    Info
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";
import clsx from "clsx";

// --- Mock Data: Water Budget (MCM) ---

const INFLOWS = {
    rainfall: 45.2,
    canal: 12.5,
    rechargeStructures: 8.4,
    returnFlow: 5.6
};

const OUTFLOWS = {
    irrigation: 58.4,
    domestic: 4.2,
    industrial: 1.5,
    naturalDischarge: 2.8
};

const TOTAL_INFLOW = Object.values(INFLOWS).reduce((a, b) => a + b, 0);
const TOTAL_OUTFLOW = Object.values(OUTFLOWS).reduce((a, b) => a + b, 0);
const NET_BALANCE = TOTAL_INFLOW - TOTAL_OUTFLOW;

// Chart Data
const INFLOW_DATA = [
    { name: "Rainfall Infiltration", value: INFLOWS.rainfall, color: "#3b82f6" },
    { name: "Canal Seepage (HNSS)", value: INFLOWS.canal, color: "#0ea5e9" },
    { name: "Check Dams / Tanks", value: INFLOWS.rechargeStructures, color: "#22c55e" },
    { name: "Return Flow", value: INFLOWS.returnFlow, color: "#14b8a6" },
];

const OUTFLOW_DATA = [
    { name: "Irrigation Draft", value: OUTFLOWS.irrigation, color: "#f97316" },
    { name: "Domestic Use", value: OUTFLOWS.domestic, color: "#eab308" },
    { name: "Industrial Use", value: OUTFLOWS.industrial, color: "#64748b" },
    { name: "Natural Discharge", value: OUTFLOWS.naturalDischarge, color: "#94a3b8" },
];

export default function WaterBalancePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wide mb-4">
                        <Scale size={14} />
                        Aquifer Accounting
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Groundwater Water Balance
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Comprehensive accounting of the aquifer's budget. Comparing total <strong>Inflow (Recharge)</strong> vs. total <strong>Outflow (Draft)</strong> to determine the sustainability status.
                    </p>
                </div>

                {/* Net Balance Equation Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-gray-200 to-orange-500"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                        {/* Inflow */}
                        <div className="text-center group">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Inflow</p>
                            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 transition-transform group-hover:scale-105">
                                {TOTAL_INFLOW.toFixed(1)} <span className="text-lg font-medium text-gray-400">MCM</span>
                            </h2>
                            <p className="text-xs text-blue-500 mt-2 font-medium flex items-center justify-center gap-1">
                                <ArrowUpRight size={14} /> Annual Recharge
                            </p>
                        </div>

                        {/* Minus Operator */}
                        <div className="text-gray-300 text-6xl font-light hidden lg:block">-</div>

                        {/* Outflow */}
                        <div className="text-center group">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Outflow</p>
                            <h2 className="text-4xl lg:text-5xl font-bold text-orange-600 transition-transform group-hover:scale-105">
                                {TOTAL_OUTFLOW.toFixed(1)} <span className="text-lg font-medium text-gray-400">MCM</span>
                            </h2>
                            <p className="text-xs text-orange-500 mt-2 font-medium flex items-center justify-center gap-1">
                                <ArrowDownRight size={14} /> Annual Draft
                            </p>
                        </div>

                        {/* Equals Operator */}
                        <div className="text-gray-300 text-6xl font-light hidden lg:block">=</div>

                        {/* Net Result */}
                        <div className="text-center relative bg-gray-50 px-8 py-4 rounded-2xl border border-gray-200">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Net Balance</p>
                            <h2 className={clsx(
                                "text-4xl lg:text-5xl font-bold transition-all",
                                NET_BALANCE >= 0 ? "text-green-600" : "text-red-600"
                            )}>
                                {NET_BALANCE > 0 ? "+" : ""}{NET_BALANCE.toFixed(1)} <span className="text-lg font-medium text-gray-400">MCM</span>
                            </h2>
                            <div className={clsx(
                                "mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase",
                                NET_BALANCE >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                                {NET_BALANCE >= 0 ? "Surplus Status" : "Deficit Warning"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flow Diagram / Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Inflow Breakdown */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                            <CloudRain size={20} className="text-blue-500" />
                            Recharge Components (Inflow)
                        </h3>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="h-[250px] w-full md:w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={INFLOW_DATA}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {INFLOW_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`${value} MCM`, 'Volume']}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2 space-y-3 pl-0 md:pl-4">
                                {INFLOW_DATA.map((item) => (
                                    <div key={item.name} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{item.value} MCM</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Outflow Breakdown */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                            <TrendingDown size={20} className="text-orange-500" />
                            Draft Components (Outflow)
                        </h3>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="h-[250px] w-full md:w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={OUTFLOW_DATA}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {OUTFLOW_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`${value} MCM`, 'Volume']}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2 space-y-3 pl-0 md:pl-4">
                                {OUTFLOW_DATA.map((item) => (
                                    <div key={item.name} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{item.value} MCM</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Balance Sheet */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            <Scale size={18} /> Detailed Balance Sheet
                        </h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Component Category</th>
                                    <th className="px-6 py-4">Sub-Component</th>
                                    <th className="px-6 py-4 text-right">Volume (MCM)</th>
                                    <th className="px-6 py-4 text-right">% Contribution</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Inflows */}
                                {Object.entries(INFLOWS).map(([key, value], idx) => (
                                    <tr key={`in-${key}`} className="hover:bg-blue-50/30">
                                        {idx === 0 && <td rowSpan={4} className="px-6 py-4 font-bold text-blue-600 bg-white border-r border-gray-50 align-top">Inflows (Recharge)</td>}
                                        <td className="px-6 py-4 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-gray-900">{value.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right text-gray-500">{((value / TOTAL_INFLOW) * 100).toFixed(1)}%</td>
                                    </tr>
                                ))}
                                <tr className="bg-blue-50 border-t-2 border-blue-100">
                                    <td colSpan={2} className="px-6 py-3 font-bold text-blue-800 text-right uppercase text-xs tracking-wide">Total Annual Recharge</td>
                                    <td className="px-6 py-3 text-right font-bold text-blue-800">{TOTAL_INFLOW.toFixed(2)}</td>
                                    <td className="px-6 py-3"></td>
                                </tr>

                                {/* Outflows */}
                                {Object.entries(OUTFLOWS).map(([key, value], idx) => (
                                    <tr key={`out-${key}`} className="hover:bg-orange-50/30">
                                        {idx === 0 && <td rowSpan={4} className="px-6 py-4 font-bold text-orange-600 bg-white border-r border-gray-50 align-top">Outflows (Draft)</td>}
                                        <td className="px-6 py-4 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-gray-900">{value.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right text-gray-500">{((value / TOTAL_OUTFLOW) * 100).toFixed(1)}%</td>
                                    </tr>
                                ))}
                                <tr className="bg-orange-50 border-t-2 border-orange-100 text-orange-700">
                                    <td colSpan={2} className="px-6 py-3 font-bold text-orange-800 text-right uppercase text-xs tracking-wide">Total Annual Draft</td>
                                    <td className="px-6 py-3 text-right font-bold text-orange-800">{TOTAL_OUTFLOW.toFixed(2)}</td>
                                    <td className="px-6 py-3"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Interpretation Note */}
                <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 text-sm text-indigo-900">
                    <Info size={20} className="shrink-0 text-indigo-600 mt-0.5" />
                    <div>
                        <h4 className="font-bold mb-1">Hydrogeologist's Assessment</h4>
                        <p className="opacity-90 leading-relaxed">
                            The current water balance indicates a <span className="font-bold text-red-600">Net Deficit of {Math.abs(NET_BALANCE).toFixed(1)} MCM</span>.
                            Extraction for irrigation (primarily paddy/sugarcane) exceeds the natural and artificial recharge rates.
                            Immediate demand-side management and crop diversification are recommended to bridge the 6.7 MCM gap.
                        </p>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
