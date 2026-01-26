"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Construction,
    Droplets,
    Waves,
    ArrowUpRight,
    TrendingUp,
    MapPin,
    AlertTriangle,
    CheckCircle2
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
    PieChart,
    Pie,
    Cell
} from "recharts";
import clsx from "clsx";

// --- Mock Data: Recharge Structures ---

const STRUCTURE_STATS = [
    { type: "Check Dams", count: 145, capacity: 5.8, rechargePotential: 4.2 }, // Capacity in MCFT, Recharge in MCM/yr
    { type: "Percolation Tanks", count: 32, capacity: 12.4, rechargePotential: 8.5 },
    { type: "Farm Ponds", count: 210, capacity: 3.2, rechargePotential: 1.8 },
    { type: "Recharge Shafts", count: 56, capacity: 0.5, rechargePotential: 2.1 },
];

const TOTAL_COUNT = STRUCTURE_STATS.reduce((a, b) => a + b.count, 0);
const TOTAL_CAPACITY = STRUCTURE_STATS.reduce((a, b) => a + b.capacity, 0);
const TOTAL_POTENTIAL = STRUCTURE_STATS.reduce((a, b) => a + b.rechargePotential, 0);

const CHART_DATA = STRUCTURE_STATS.map(s => ({
    name: s.type,
    Capacity: s.capacity,
    Recharge: s.rechargePotential
}));

const PIE_DATA = STRUCTURE_STATS.map((s, index) => ({
    name: s.type,
    value: s.count,
    color: ["#3b82f6", "#0ea5e9", "#22c55e", "#f59e0b"][index % 4]
}));

// Mock List of Specific Structures
const SAMPLE_STRUCTURES = [
    { id: 1, name: "Peddavanka Check Dam", type: "Check Dam", location: "Gudupalle", capacity: 0.15, status: "Good", siltation: 10 },
    { id: 2, name: "Nalla PT", type: "Percolation Tank", location: "Kuppam", capacity: 0.8, status: "Silted", siltation: 45 },
    { id: 3, name: "Rallaboduguru CD", type: "Check Dam", location: "Shanthipuram", capacity: 0.12, status: "Good", siltation: 5 },
    { id: 4, name: "Mandal Farm Pond Clust.", type: "Farm Ponds", location: "Ramakuppam", capacity: 0.05, status: "Good", siltation: 0 },
];

export default function RechargeComponentsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 lg:flex items-end justify-between">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wide mb-4">
                            <Construction size={14} />
                            Artificial Recharge
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Recharge Components Inventory
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Catalog of <strong>Artificial Recharge Structures (ARS)</strong> designed to augment the groundwater table.
                            Monitoring capacity, recharge efficiency, and maintenance status.
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="mt-8 lg:mt-0 lg:ml-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:w-auto w-full">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[150px]">
                            <p className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
                                <Construction size={12} /> Total Structures
                            </p>
                            <p className="text-2xl font-bold text-gray-900">{TOTAL_COUNT}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[150px]">
                            <p className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
                                <Waves size={12} /> Storage Vol.
                            </p>
                            <p className="text-2xl font-bold text-blue-600">{TOTAL_CAPACITY.toFixed(1)} <span className="text-sm text-gray-400 font-normal">MCFT</span></p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[150px] col-span-2 lg:col-span-1">
                            <p className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1">
                                <TrendingUp size={12} /> Annual Recharge
                            </p>
                            <p className="text-2xl font-bold text-green-600">{TOTAL_POTENTIAL.toFixed(1)} <span className="text-sm text-gray-400 font-normal">MCM</span></p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Structure Distribution Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                            <Construction size={20} className="text-blue-500" />
                            Structure Mix
                        </h3>
                        <div className="flex items-center flex-grow">
                            <div className="h-[250px] w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={PIE_DATA}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {PIE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 space-y-3 pl-4">
                                {PIE_DATA.map((item) => (
                                    <div key={item.name} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Impact Analysis Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                            <Droplets size={20} className="text-green-500" />
                            Capacity vs. Recharge Potential
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={CHART_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="Capacity" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Storage (MCFT)" />
                                    <Bar dataKey="Recharge" fill="#22c55e" radius={[4, 4, 0, 0]} name="Recharge (MCM)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* Structure Directory */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg">Key Structures Directory</h3>
                        <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={12} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Structure Name</th>
                                    <th className="px-6 py-4">Type & Location</th>
                                    <th className="px-6 py-4">Capacity</th>
                                    <th className="px-6 py-4">Maintenance Status</th>
                                    <th className="px-6 py-4 text-right">Siltation Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {SAMPLE_STRUCTURES.map((s) => (
                                    <tr key={s.id} className="hover:bg-blue-50/10 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{s.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="font-medium text-gray-800">{s.type}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <MapPin size={10} /> {s.location}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{s.capacity} MCFT</td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                                                s.status === "Good" ? "text-green-700 bg-green-50 border-green-200" : "text-amber-700 bg-amber-50 border-amber-200"
                                            )}>
                                                {s.status === "Good" ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className="text-xs font-bold text-gray-600">{s.siltation}%</span>
                                                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={clsx("h-full rounded-full", s.siltation > 30 ? "bg-amber-500" : "bg-blue-500")}
                                                        style={{ width: `${s.siltation}%` }}
                                                    ></div>
                                                </div>
                                            </div>
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
