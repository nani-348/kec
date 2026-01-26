"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Waves,
    ArrowRight,
    CheckCircle,
    Clock,
    AlertCircle,
    TrendingUp,
    GitMerge,
    Droplet
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import clsx from "clsx";

// --- Mock Data: HNSS Linkage ---

type LinkedTank = {
    id: string;
    name: string;
    mandal: string;
    capacity: number; // MCFT
    linkedChannel: "Main Canal" | "Branch A" | "Branch B";
    fillStatus: "Filled" | "Filling" | "Pending";
    lastFilled: string;
    impact: "High" | "Medium" | "Low";
};

const LINKED_TANKS: LinkedTank[] = [
    { id: "h1", name: "Pedda Cheruvu", mandal: "Gudupalle", capacity: 15.5, linkedChannel: "Main Canal", fillStatus: "Filled", lastFilled: "Oct 2025", impact: "High" },
    { id: "h2", name: "Kuppam P.T.", mandal: "Kuppam", capacity: 28.0, linkedChannel: "Branch A", fillStatus: "Filling", lastFilled: "Ongoing", impact: "High" },
    { id: "h3", name: "Ramakuppam Tank", mandal: "Ramakuppam", capacity: 18.2, linkedChannel: "Branch B", fillStatus: "Pending", lastFilled: "N/A", impact: "Medium" },
    { id: "h4", name: "Shanthipuram C.", mandal: "Shanthipuram", capacity: 22.5, linkedChannel: "Main Canal", fillStatus: "Filled", lastFilled: "Nov 2025", impact: "High" },
    { id: "h5", name: "Balla Tank", mandal: "Ramakuppam", capacity: 6.8, linkedChannel: "Branch B", fillStatus: "Pending", lastFilled: "N/A", impact: "Low" },
];

const IMPACT_DATA = [
    { year: "2023", preHNSS: 12.5, postHNSS: 12.5 }, // Baseline
    { year: "2024", preHNSS: 11.8, postHNSS: 13.2 }, // Initial benefits
    { year: "2025", preHNSS: 10.5, postHNSS: 14.8 }, // Significant recharge
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Filled": return "text-green-600 bg-green-50 border-green-200";
        case "Filling": return "text-blue-600 bg-blue-50 border-blue-200 animate-pulse";
        case "Pending": return "text-orange-600 bg-orange-50 border-orange-200";
        default: return "text-gray-600";
    }
};

export default function HnssLinkedPage() {

    // Stats
    const totalLinkedCapacity = LINKED_TANKS.reduce((sum, t) => sum + t.capacity, 0);
    const filledCapacity = LINKED_TANKS.filter(t => t.fillStatus === "Filled").reduce((sum, t) => sum + t.capacity, 0);
    const fillingTanks = LINKED_TANKS.filter(t => t.fillStatus === "Filling").length;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wide mb-4">
                        <GitMerge size={14} />
                        Inter-Basin Transfer
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        HNSS-Linked MI Tanks
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Status of tanks integrated with the <strong>Handri-Neeva Sujala Sravanthi</strong> canal network.
                        Tracking the augmentation of local reservoirs via canal feeder channels.
                    </p>
                </div>

                {/* Impact Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase">Linked Tanks</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{LINKED_TANKS.length}</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase">Total Linked Capacity</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">{totalLinkedCapacity.toFixed(1)} <span className="text-xs text-gray-500 font-normal">MCFT</span></p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase">Filled / Filling</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold text-green-600">{filledCapacity.toFixed(1)}</span>
                            <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                +{fillingTanks} Active
                            </span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-xl shadow-md text-white">
                        <p className="text-xs font-bold text-blue-100 uppercase">Projected Recharge</p>
                        <div className="flex items-center gap-2 mt-1">
                            <TrendingUp size={24} className="text-blue-200" />
                            <p className="text-2xl font-bold">+15%</p>
                        </div>
                        <p className="text-[10px] text-blue-100 mt-1">Groundwater Level Rise</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                    {/* Left: Network Flow Diagram (Schematic) */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] relative overflow-hidden">
                            <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                                <GitMerge size={20} className="text-blue-500" />
                                Feeder Network Status
                            </h3>

                            {/* Schematic Container */}
                            <div className="relative w-full h-[400px] bg-slate-50 rounded-xl border border-slate-100 p-4">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                                {/* Main Canal (Top) */}
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3/4 max-w-lg h-12 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold tracking-wide z-10">
                                    HNSS Main Canal (Phase II)
                                </div>

                                {/* Connector Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    {/* Main to Branch A */}
                                    <path d="M 50% 70 L 25% 150" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                                    {/* Main to Branch B */}
                                    <path d="M 50% 70 L 75% 150" fill="none" stroke="#cbd5e1" strokeWidth="3" />
                                    {/* Main Direct Center */}
                                    <path d="M 50% 70 L 50% 150" fill="none" stroke="#3b82f6" strokeWidth="3" className="animate-pulse" />
                                </svg>

                                {/* Branch Nodes */}
                                <div className="absolute top-[140px] left-[20%] -translate-x-1/2 bg-white border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm z-10">
                                    Branch A
                                </div>
                                <div className="absolute top-[140px] left-[50%] -translate-x-1/2 bg-white border border-blue-500 px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm z-10 ring-2 ring-blue-100">
                                    Direct Feeder
                                </div>
                                <div className="absolute top-[140px] left-[80%] -translate-x-1/2 bg-white border border-gray-300 px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm z-10">
                                    Branch B
                                </div>

                                {/* Tank Nodes (Bottom Grid) */}
                                <div className="absolute top-[250px] w-full flex justify-around px-4">
                                    {/* Branch A Tanks */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm w-32 relative group hover:-translate-y-1 transition-transform">
                                            <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-blue-100 -z-10"></div>
                                            <p className="text-xs font-bold text-gray-800">Kuppam P.T.</p>
                                            <span className="text-[10px] text-blue-600 font-medium flex items-center gap-1 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div> Filling
                                            </span>
                                        </div>
                                    </div>

                                    {/* Direct Tanks */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-green-200 shadow-sm w-32 relative group hover:-translate-y-1 transition-transform">
                                            <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-blue-400 -z-10"></div>
                                            <p className="text-xs font-bold text-gray-800">Pedda Cheruvu</p>
                                            <span className="text-[10px] text-green-600 font-medium flex items-center gap-1 mt-1">
                                                <CheckCircle size={10} /> Filled
                                            </span>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-green-200 shadow-sm w-32 relative group hover:-translate-y-1 transition-transform">
                                            <div className="absolute -top-[70px] left-1/2 w-0.5 h-[70px] bg-blue-400 -z-10"></div>
                                            <p className="text-xs font-bold text-gray-800">Shanthipuram</p>
                                            <span className="text-[10px] text-green-600 font-medium flex items-center gap-1 mt-1">
                                                <CheckCircle size={10} /> Filled
                                            </span>
                                        </div>
                                    </div>

                                    {/* Branch B Tanks */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm w-32 relative group hover:-translate-y-1 transition-transform opacity-75">
                                            <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-gray-200 -z-10"></div>
                                            <p className="text-xs font-bold text-gray-800">Ramakuppam</p>
                                            <span className="text-[10px] text-orange-600 font-medium flex items-center gap-1 mt-1">
                                                <Clock size={10} /> Pending
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4 text-[10px] text-gray-400 font-mono">
                                    * Schematic Representation
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Impact Analysis */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Comparison Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 font-serif text-lg mb-4">Groundwater Impact</h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={IMPACT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorPost" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPre" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="postHNSS" name="With HNSS" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPost)" />
                                        <Area type="monotone" dataKey="preHNSS" name="Baseline" stroke="#94a3b8" fillOpacity={1} fill="url(#colorPre)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Estimated Depth to Water Level (m bgl) improvement.
                            </p>
                        </div>

                        {/* Status List */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 font-serif text-lg mb-4">Pipeline Status</h3>
                            <div className="space-y-3">
                                {LINKED_TANKS.map(tank => (
                                    <div key={tank.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white p-1.5 rounded-md shadow-sm">
                                                <Droplet size={14} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{tank.name}</p>
                                                <p className="text-[10px] text-gray-500">{tank.linkedChannel}</p>
                                            </div>
                                        </div>
                                        <span className={clsx("px-2 py-1 rounded text-[10px] font-bold uppercase", getStatusColor(tank.fillStatus))}>
                                            {tank.fillStatus}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
