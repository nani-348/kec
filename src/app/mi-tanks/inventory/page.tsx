"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Database,
    Droplets,
    MapPin,
    Search,
    Filter,
    ArrowUpRight,
    TrendingUp,
    Waves
} from "lucide-react";
import { DynamicSheetTable } from "@/components/ui/DynamicSheetTable";
import { useSheetSync } from "@/hooks/useSheetSync";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ZAxis,
    Legend
} from "recharts";
import clsx from "clsx";

// --- Mock Data: MI Tank Inventory ---

type Tank = {
    id: string;
    name: string;
    village: string;
    mandal: "Gudupalle" | "Kuppam" | "Ramakuppam" | "Shanthipuram";
    type: "System" | "Non-System";
    ayacut: number; // in Acres
    capacity: number; // in MCFT
    ftl: number; // Full Tank Level in meters
    currentLevel: number; // % full mock
};

const TANK_DATA: Tank[] = [
    { id: "t1", name: "Pedda Cheruvu", village: "Gudupalle", mandal: "Gudupalle", type: "System", ayacut: 120, capacity: 15.5, ftl: 98.5, currentLevel: 65 },
    { id: "t2", name: "Chinana Cheruvu", village: "Nallagampalle", mandal: "Gudupalle", type: "Non-System", ayacut: 45, capacity: 4.2, ftl: 96.0, currentLevel: 30 },
    { id: "t3", name: "Kuppam Pedda Tank", village: "Kuppam", mandal: "Kuppam", type: "System", ayacut: 210, capacity: 28.0, ftl: 102.4, currentLevel: 82 },
    { id: "t4", name: "Kangundhi Tank", village: "Kangundhi", mandal: "Kuppam", type: "Non-System", ayacut: 85, capacity: 8.5, ftl: 94.2, currentLevel: 45 },
    { id: "t5", name: "Ramakuppam MI Tank", village: "Ramakuppam", mandal: "Ramakuppam", type: "System", ayacut: 150, capacity: 18.2, ftl: 99.1, currentLevel: 55 },
    { id: "t6", name: "Balla Tank", village: "Balla", mandal: "Ramakuppam", type: "Non-System", ayacut: 60, capacity: 6.8, ftl: 95.5, currentLevel: 20 },
    { id: "t7", name: "Shanthipuram Cheruvu", village: "Shanthipuram", mandal: "Shanthipuram", type: "System", ayacut: 180, capacity: 22.5, ftl: 100.0, currentLevel: 70 },
    { id: "t8", name: "Rallaboduguru Tank", village: "Rallaboduguru", mandal: "Shanthipuram", type: "Non-System", ayacut: 95, capacity: 11.0, ftl: 97.8, currentLevel: 60 },
];

export default function MiTankInventoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMandal, setSelectedMandal] = useState<string>("All");
    const [selectedType, setSelectedType] = useState<string>("All");

    // Fetch Full Tank Data
    const { data: tankData, isLoading } = useSheetSync({
        category: "MITanks",
        table: "TANK INVENTORY"
    });

    // Unique Mandals for Filter
    const mandals = useMemo(() => {
        if (!tankData) return [];
        const m = new Set(tankData.map((t: any) => t.mandal || t.Mandal));
        return ["All", ...Array.from(m)];
    }, [tankData]);

    // Filter Logic
    const filteredTanks = useMemo(() => {
        if (!tankData) return [];
        return tankData.filter((tank: any) => {
            const name = (tank.name || tank.Name || "").toLowerCase();
            const village = (tank.village || tank.Village || "").toLowerCase();
            const mandal = tank.mandal || tank.Mandal;
            const type = tank.type || tank.Type;

            const matchesSearch = name.includes(searchTerm.toLowerCase()) || village.includes(searchTerm.toLowerCase());
            const matchesMandal = selectedMandal === "All" || mandal === selectedMandal;
            const matchesType = selectedType === "All" || type === selectedType;
            return matchesSearch && matchesMandal && matchesType;
        });
    }, [searchTerm, selectedMandal, selectedType, tankData]);

    // Aggregated Stats
    const totalCapacity = filteredTanks.reduce((sum, tank: any) => sum + (Number(tank.capacity || tank.Capacity) || 0), 0);
    const totalAyacut = filteredTanks.reduce((sum, tank: any) => sum + (Number(tank.ayacut || tank.Ayacut) || 0), 0);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 lg:flex items-end justify-between">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wide mb-4">
                            <Waves size={14} />
                            Surface Water Assets
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Minor Irrigation Tank Inventory
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Comprehensive database of <strong>Water Harvesting Structures</strong> including system and non-system tanks.
                            Monitor storage capacity, registered ayacut, and structural status.
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="mt-8 lg:mt-0 lg:ml-8 grid grid-cols-2 md:grid-cols-3 gap-4 lg:w-auto w-full">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-xs text-gray-500 font-bold uppercase">Total Tanks</p>
                            <p className="text-2xl font-bold text-gray-900">{filteredTanks.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-xs text-gray-500 font-bold uppercase">Capacity (MCFT)</p>
                            <p className="text-2xl font-bold text-blue-600">{totalCapacity.toFixed(1)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[140px] col-span-2 md:col-span-1">
                            <p className="text-xs text-gray-500 font-bold uppercase">Ayacut (Acres)</p>
                            <p className="text-2xl font-bold text-green-600">{totalAyacut}</p>
                        </div>
                    </div>
                </div>

                {/* Capacity Analysis Chart - Resilient to missing data */}
                {filteredTanks.length > 0 && (
                    <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 font-serif text-xl mb-2 flex items-center gap-2">
                            <TrendingUp size={20} className="text-blue-500" />
                            Storage Efficiency Analysis
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">Comparing Tank Capacity (MCFT) vs. Irrigated Area (Ayacut).</p>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        type="number"
                                        dataKey="capacity"
                                        name="Capacity"
                                        unit=" MCFT"
                                        label={{ value: 'Storage Capacity (MCFT)', position: 'insideBottom', offset: -10, fontSize: 12 }}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="ayacut"
                                        name="Ayacut"
                                        unit=" Ac"
                                        label={{ value: 'Ayacut Area (Acres)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ strokeDasharray: '3 3' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend />
                                    <Scatter name="MI Tanks" data={filteredTanks} fill="#0ea5e9" shape="circle" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Filters & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-20 z-10 transition-shadow duration-300">
                    <div className="relative flex-grow max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Tank Name or Village..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 whitespace-nowrap">
                            <Filter size={14} className="text-gray-500" />
                            <select
                                className="bg-transparent text-sm text-gray-700 font-medium focus:outline-none cursor-pointer"
                                value={selectedMandal}
                                onChange={(e) => setSelectedMandal(e.target.value)}
                            >
                                <option value="All">All Mandals</option>
                                {mandals.filter(m => m !== 'All').map(m => (
                                    <option key={m} value={m as string}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 whitespace-nowrap">
                            <Database size={14} className="text-gray-500" />
                            <select
                                className="bg-transparent text-sm text-gray-700 font-medium focus:outline-none cursor-pointer"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="All">All Types</option>
                                <option value="System">System Tank</option>
                                <option value="Non-System">Non-System</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Dynamic Table with Filtered Data */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <DynamicSheetTable
                        category="MITanks"
                        table="TANK INVENTORY"
                        data={filteredTanks} // Pass filtered data
                        title={`Tank Inventory (${filteredTanks.length})`}
                        className="bg-transparent"
                    />
                </div>

            </main>
            <Footer />
        </div>
    );
}
