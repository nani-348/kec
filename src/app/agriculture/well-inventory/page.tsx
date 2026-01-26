"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Tractor,
    Droplets,
    Search,
    Filter,
    MapPin,
    Activity,
    AlertOctagon,
    CheckCircle2,
    Clock,
    ArrowDown
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

// --- Mock Data: Well Census ---

type Well = {
    id: string;
    farmerName: string;
    surveyNo: string;
    village: string;
    mandal: string;
    depth: number; // feet
    yield: number; // LPS (Liters Per Second)
    status: "Functional" | "Dried" | "Seasonal";
    pumpType: "Submersible" | "Monoblock" | "Jet";
    yearDrilled: number;
};

const WELL_DATA: Well[] = [
    { id: "w001", farmerName: "R. Naidu", surveyNo: "124/A", village: "Gudupalle", mandal: "Gudupalle", depth: 450, yield: 2.5, status: "Functional", pumpType: "Submersible", yearDrilled: 2018 },
    { id: "w002", farmerName: "K. Reddy", surveyNo: "88/B", village: "Nallagampalle", mandal: "Gudupalle", depth: 850, yield: 0, status: "Dried", pumpType: "Submersible", yearDrilled: 2015 },
    { id: "w003", farmerName: "M. Gowda", surveyNo: "210", village: "Kuppam", mandal: "Kuppam", depth: 600, yield: 3.2, status: "Functional", pumpType: "Submersible", yearDrilled: 2020 },
    { id: "w004", farmerName: "S. Murthy", surveyNo: "45/2", village: "Kangundhi", mandal: "Kuppam", depth: 320, yield: 0.5, status: "Seasonal", pumpType: "Jet", yearDrilled: 2010 },
    { id: "w005", farmerName: "P. Lakshmi", surveyNo: "156", village: "Ramakuppam", mandal: "Ramakuppam", depth: 550, yield: 1.8, status: "Functional", pumpType: "Submersible", yearDrilled: 2019 },
    { id: "w006", farmerName: "V. Babu", surveyNo: "302", village: "Balla", mandal: "Ramakuppam", depth: 900, yield: 0, status: "Dried", pumpType: "Submersible", yearDrilled: 2016 },
    { id: "w007", farmerName: "A. Rao", surveyNo: "77/C", village: "Shanthipuram", mandal: "Shanthipuram", depth: 480, yield: 2.1, status: "Functional", pumpType: "Monoblock", yearDrilled: 2021 },
    { id: "w008", farmerName: "T. Krishnan", surveyNo: "12", village: "Rallaboduguru", mandal: "Shanthipuram", depth: 1100, yield: 1.5, status: "Seasonal", pumpType: "Submersible", yearDrilled: 2022 },
];

const DEPTH_RANGES = [
    { name: "< 300 ft", count: WELL_DATA.filter(w => w.depth < 300).length },
    { name: "300-600 ft", count: WELL_DATA.filter(w => w.depth >= 300 && w.depth <= 600).length },
    { name: "600-900 ft", count: WELL_DATA.filter(w => w.depth > 600 && w.depth <= 900).length },
    { name: "> 900 ft", count: WELL_DATA.filter(w => w.depth > 900).length },
];

const PUMP_DATA = [
    { name: "Submersible", value: WELL_DATA.filter(w => w.pumpType === "Submersible").length, color: "#3b82f6" },
    { name: "Monoblock", value: WELL_DATA.filter(w => w.pumpType === "Monoblock").length, color: "#f59e0b" },
    { name: "Jet Pump", value: WELL_DATA.filter(w => w.pumpType === "Jet").length, color: "#10b981" },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Functional": return "text-green-600 bg-green-50 border-green-200";
        case "Dried": return "text-red-600 bg-red-50 border-red-200";
        case "Seasonal": return "text-orange-600 bg-orange-50 border-orange-200";
        default: return "text-gray-600";
    }
};

export default function WellInventoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter Logic
    const filteredWells = useMemo(() => {
        return WELL_DATA.filter(well => {
            const matchesSearch = well.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                well.village.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "All" || well.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    const functionalCount = WELL_DATA.filter(w => w.status === "Functional").length;
    const driedCount = WELL_DATA.filter(w => w.status === "Dried").length;
    const avgDepth = WELL_DATA.reduce((acc, curr) => acc + curr.depth, 0) / WELL_DATA.length;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 lg:flex items-end justify-between">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-4">
                            <Tractor size={14} />
                            Groundwater Abstraction
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Agricultural Well Inventory
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Census of borewells and open wells across the constituency.
                            Monitoring <strong>Functional Status</strong>, <strong>Depth Trends</strong>, and <strong>Extraction Equipment</strong>.
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="mt-8 lg:mt-0 lg:ml-8 grid grid-cols-2 md:grid-cols-3 gap-4 lg:w-auto w-full">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-xs text-gray-500 font-bold uppercase">Total Sampled</p>
                            <p className="text-2xl font-bold text-gray-900">{WELL_DATA.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-xs text-gray-500 font-bold uppercase">Functional Rate</p>
                            <p className="text-2xl font-bold text-green-600">{((functionalCount / WELL_DATA.length) * 100).toFixed(0)}%</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[140px] col-span-2 md:col-span-1">
                            <p className="text-xs text-gray-500 font-bold uppercase">Avg. Depth</p>
                            <p className="text-2xl font-bold text-blue-600">{avgDepth.toFixed(0)} <span className="text-sm text-gray-400 font-normal">ft</span></p>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Depth Histogram */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                            <ArrowDown size={20} className="text-blue-500" />
                            Depth Distribution
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DEPTH_RANGES} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="count" name="Number of Wells" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pump Types */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                            <Activity size={20} className="text-emerald-500" />
                            Pump Equipment
                        </h3>
                        <div className="flex items-center">
                            <div className="h-[250px] w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={PUMP_DATA}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {PUMP_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 space-y-3 pl-4">
                                {PUMP_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        <span className="ml-auto font-bold text-gray-900 text-xs px-2 py-0.5 bg-gray-100 rounded">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Well Directory */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="font-bold text-gray-800 text-lg">Well Directory</h3>

                        <div className="flex gap-3">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Farmer / Village..."
                                    className="pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-48"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
                                <Filter size={14} className="text-gray-400" />
                                <select
                                    className="text-xs font-medium text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Functional">Functional</option>
                                    <option value="Dried">Dried</option>
                                    <option value="Seasonal">Seasonal</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Farmer Details</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Tech Specs</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Yield (LPS)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredWells.map((well) => (
                                    <tr key={well.id} className="hover:bg-emerald-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{well.farmerName}</p>
                                            <p className="text-xs text-gray-500">Sy No: {well.surveyNo}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-gray-700">
                                                <MapPin size={14} className="text-gray-400" />
                                                <span>{well.village}, {well.mandal}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs space-y-1">
                                                <p><span className="text-gray-500">Depth:</span> <span className="font-semibold">{well.depth} ft</span></p>
                                                <p><span className="text-gray-500">Pump:</span> {well.pumpType}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", getStatusColor(well.status))}>
                                                {well.status === "Functional" && <CheckCircle2 size={12} />}
                                                {well.status === "Dried" && <AlertOctagon size={12} />}
                                                {well.status === "Seasonal" && <Clock size={12} />}
                                                {well.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {well.yield > 0 ? (
                                                <div className="inline-block text-right">
                                                    <span className="font-bold text-gray-900 text-lg">{well.yield}</span>
                                                    <span className="text-xs text-gray-500 block">LPS</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">Nil</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredWells.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No wells found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
