"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Droplets,
    AlertTriangle,
    ArrowUp,
    ArrowDown,
    Waves,
    CloudRain,
    Info
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
    Cell
} from "recharts";
import clsx from "clsx";

// --- Mock Data: Real-time Status ---

type TankStatus = {
    id: string;
    name: string;
    mandal: string;
    capacity: number; // MCFT
    currentStorage: number; // MCFT
    ftl: number; // Meters
    currentLevel: number; // Meters
};

const STATUS_DATA: TankStatus[] = [
    { id: "t1", name: "Pedda Cheruvu", mandal: "Gudupalle", capacity: 15.5, currentStorage: 14.8, ftl: 98.5, currentLevel: 97.2 },
    { id: "t2", name: "Chinana Cheruvu", mandal: "Gudupalle", capacity: 4.2, currentStorage: 1.1, ftl: 96.0, currentLevel: 92.5 },
    { id: "t3", name: "Kuppam P.T.", mandal: "Kuppam", capacity: 28.0, currentStorage: 25.2, ftl: 102.4, currentLevel: 101.8 },
    { id: "t4", name: "Kangundhi Tank", mandal: "Kuppam", capacity: 8.5, currentStorage: 3.4, ftl: 94.2, currentLevel: 90.1 },
    { id: "t5", name: "Ramakuppam Tank", mandal: "Ramakuppam", capacity: 18.2, currentStorage: 18.2, ftl: 99.1, currentLevel: 99.2 }, // Overflowing slightly
    { id: "t6", name: "Balla Tank", mandal: "Ramakuppam", capacity: 6.8, currentStorage: 0.5, ftl: 95.5, currentLevel: 90.0 }, // Near empty
    { id: "t7", name: "Shanthipuram C.", mandal: "Shanthipuram", capacity: 22.5, currentStorage: 15.0, ftl: 100.0, currentLevel: 96.5 },
    { id: "t8", name: "Rallaboduguru", mandal: "Shanthipuram", capacity: 11.0, currentStorage: 8.8, ftl: 97.8, currentLevel: 96.2 },
];

// Calculate Derived Stats
const getFillPercentage = (current: number, capacity: number) => Math.min((current / capacity) * 100, 100);

const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "bg-blue-600"; // High / Full
    if (percentage >= 50) return "bg-cyan-500"; // Good
    if (percentage >= 20) return "bg-yellow-500"; // Low
    return "bg-red-500"; // Critical
};

// Aggregation for Chart
const MANDAL_STATS = [
    { name: "Gudupalle", capacity: 19.7, current: 15.9 },
    { name: "Kuppam", capacity: 36.5, current: 28.6 },
    { name: "Ramakuppam", capacity: 25.0, current: 18.7 },
    { name: "Shanthipuram", capacity: 33.5, current: 23.8 },
];

export default function StorageStatusPage() {

    // Total Stats
    const totalCapacity = STATUS_DATA.reduce((acc, curr) => acc + curr.capacity, 0);
    const totalStorage = STATUS_DATA.reduce((acc, curr) => acc + curr.currentStorage, 0);
    const totalPercentage = (totalStorage / totalCapacity) * 100;

    // Filter Alerts
    const criticalTanks = STATUS_DATA.filter(t => (t.currentStorage / t.capacity) < 0.2);
    const floodRiskTanks = STATUS_DATA.filter(t => (t.currentStorage / t.capacity) >= 0.9);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Waves size={14} />
                        Real-Time Monitoring
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        MI Tank Storage Status
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Live dashboard of water levels across the Minor Irrigation network.
                        Monitor <strong>Storage vs. Capacity</strong> and identify critical deficit or surplus conditions.
                    </p>
                </div>

                {/* Dashboard Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Total Storage */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Droplets size={100} className="text-blue-600" />
                        </div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Water Available</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <h2 className="text-4xl font-bold text-blue-600">{totalStorage.toFixed(1)}</h2>
                            <span className="text-sm font-medium text-gray-500">MCFT</span>
                        </div>
                        <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${totalPercentage}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{totalPercentage.toFixed(1)}% of Total Capacity ({totalCapacity.toFixed(1)} MCFT)</p>
                    </div>

                    {/* Alerts Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle size={20} className="text-red-500" />
                            <h3 className="font-bold text-gray-800">Operational Alerts</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Flood Risk */}
                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700 uppercase mb-2 flex items-center gap-1">
                                    <Waves size={12} /> Near Full / Overflow
                                </p>
                                {floodRiskTanks.length > 0 ? (
                                    <ul className="space-y-1">
                                        {floodRiskTanks.map(t => (
                                            <li key={t.id} className="text-sm text-blue-900 font-medium flex justify-between">
                                                <span>{t.name}</span>
                                                <span className="font-bold">{((t.currentStorage / t.capacity) * 100).toFixed(0)}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-sm text-gray-500">No tanks at risk.</p>}
                            </div>

                            {/* Drought Risk */}
                            <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                <p className="text-xs font-bold text-red-700 uppercase mb-2 flex items-center gap-1">
                                    <CloudRain size={12} /> Critical Deficit (&lt;20%)
                                </p>
                                {criticalTanks.length > 0 ? (
                                    <ul className="space-y-1">
                                        {criticalTanks.map(t => (
                                            <li key={t.id} className="text-sm text-red-900 font-medium flex justify-between">
                                                <span>{t.name}</span>
                                                <span className="font-bold">{((t.currentStorage / t.capacity) * 100).toFixed(0)}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-sm text-gray-500">No tanks at risk.</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    {/* Left: Individual Tank Monitors */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800 font-serif text-xl">Real-time Tank Levels</h3>
                            <div className="flex gap-2 text-xs">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Full</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Normal</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {STATUS_DATA.map((tank) => {
                                const fill = getFillPercentage(tank.currentStorage, tank.capacity);
                                const isOverflowing = tank.currentLevel >= tank.ftl;

                                return (
                                    <div key={tank.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="text-xs font-semibold text-gray-900 line-clamp-1">{tank.name}</div>
                                            {isOverflowing && <AlertTriangle size={14} className="text-blue-600 animate-pulse" />}
                                        </div>

                                        {/* Visual Tank Container */}
                                        <div className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            {/* Water */}
                                            <div
                                                className={clsx(
                                                    "absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out opacity-80",
                                                    getStatusColor(fill)
                                                )}
                                                style={{ height: `${fill}%` }}
                                            >
                                                {/* Wave Effect Overlay */}
                                                <div className="absolute top-0 w-full h-[2px] bg-white/30"></div>
                                            </div>

                                            {/* FTL Marker */}
                                            <div className="absolute bottom-[90%] w-full border-t border-dashed border-gray-500 text-[9px] text-gray-500 text-right pr-1">FTL</div>

                                            {/* Text Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className={clsx("text-lg font-bold shadow-sm", fill > 50 ? "text-white drop-shadow-md" : "text-gray-700")}>
                                                    {fill.toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex justify-between text-[10px] text-gray-500">
                                            <span>Cap: {tank.capacity} MCFT</span>
                                            <span>{tank.currentStorage.toFixed(1)} MCFT</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Comparative Chart */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                            <h3 className="font-bold text-gray-800 font-serif text-xl mb-4">Mandal Storage Comparison</h3>
                            <div className="flex-grow h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={MANDAL_STATS}
                                        layout="vertical"
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="current" name="Current Water" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                        <Bar dataKey="capacity" name="Remaining Capacity" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 text-xs text-gray-400 italic">
                                * Comparison of total storage volume vs capacity per mandal.
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
