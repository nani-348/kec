"use client";
import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Info, ArrowUpRight, Filter, Layers, Droplets, AlertTriangle, CheckCircle, Search } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie
} from "recharts";
import clsx from "clsx";
// --- Data Definitions ---
// Aggregated Mandal Stats (Derived from Station Data)
// Status Logic: Safe (<10m), Moderate (10-20m), Low (>20m)
const MANDAL_SNAPSHOTS = [
    {
        id: "gdp",
        name: "Gudupalle",
        avgDepth: 27.72,
        status: "Low",
        trend: "Stable",
        stations: 3,
        coordinates: { x: 20, y: 30 },
        description: "Northern region showing deepest water levels. Immediate recharge structures needed."
    },
    {
        id: "kpm",
        name: "Kuppam",
        avgDepth: 14.46,
        status: "Moderate",
        trend: "Declining",
        stations: 2,
        coordinates: { x: 50, y: 60 },
        description: "Central urban hub. Moderate stress due to high extraction."
    },
    {
        id: "rmk",
        name: "Ramakuppam",
        avgDepth: 13.07,
        status: "Moderate",
        trend: "Improving",
        stations: 4,
        coordinates: { x: 20, y: 80 },
        description: "Western agricultural belt. Showing signs of recent recovery."
    },
    {
        id: "stp",
        name: "Shanthipuram",
        avgDepth: 10.06,
        status: "Moderate",
        trend: "Improving",
        stations: 4,
        coordinates: { x: 80, y: 50 },
        description: "Eastern zone with relatively better groundwater potential."
    }
];
const DEPTH_RANGES = [
    { name: "Safe (<10m)", value: 4, color: "#22c55e" },
    { name: "Moderate (10-20m)", value: 5, color: "#eab308" },
    { name: "Low (>20m)", value: 4, color: "#ef4444" },
];
// Fallback station data
const FALLBACK_STATIONS = [
    { id: 1, name: "Dravida University", mandal: "Gudupalle", depth: 13.56, status: "Moderate" },
    { id: 2, name: "Gudupalle", mandal: "Gudupalle", depth: 31.77, status: "Low" },
    { id: 3, name: "Solachinthanapalli", mandal: "Gudupalle", depth: 40.04, status: "Low" },
    { id: 4, name: "Adaviboduguru", mandal: "Kuppam", depth: 28.37, status: "Low" },
    { id: 5, name: "Kangundhi", mandal: "Kuppam", depth: 3.74, status: "Safe" },
    { id: 6, name: "Balla", mandal: "Ramakuppam", depth: 13.65, status: "Moderate" },
    { id: 7, name: "Cheldiganipalle", mandal: "Ramakuppam", depth: 16.90, status: "Moderate" },
    { id: 8, name: "Ramakuppam", mandal: "Ramakuppam", depth: 12.82, status: "Moderate" },
    { id: 9, name: "Vijilapuram", mandal: "Ramakuppam", depth: 6.57, status: "Safe" },
    { id: 10, name: "Anikera", mandal: "Shanthipuram", depth: 12.36, status: "Moderate" },
    { id: 11, name: "Gundusettipalli", mandal: "Shanthipuram", depth: 14.80, status: "Moderate" },
    { id: 12, name: "Rallaboduguru", mandal: "Shanthipuram", depth: 0.83, status: "Safe" },
    { id: 13, name: "Shanthipuram", mandal: "Shanthipuram", depth: 16.16, status: "Moderate" },
];
export default function SpatialDistributionPage() {
    const [ALL_STATIONS, setAllStations] = useState<any[]>(FALLBACK_STATIONS);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/api/sheets?category=Groundwater&table=SPATIAL DISTRIBUTION');
            const result = await response.json();
            if (result.success && result.data.length > 0) {
                setAllStations(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch spatial data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, [fetchData]);
    const [selectedMandal, setSelectedMandal] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const filteredStations = ALL_STATIONS.filter(s => {
        const matchesMandal = selectedMandal ? s.mandal === MANDAL_SNAPSHOTS.find(m => m.id === selectedMandal)?.name : true;
        const matchesStatus = filterStatus === "All" || s.status === filterStatus;
        return matchesMandal && matchesStatus;
    });
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Hero */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Spatial Distribution of Water Levels
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Geospatial analysis of groundwater depths. Visualize critical zones and safe pockets across the constituency.
                        </p>
                    </div>
                    {/* Top Section: Schematic Map vs Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                        {/* Left: Schematic Map Interaction */}
                        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-1 relative overflow-hidden min-h-[500px] flex flex-col">
                            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <MapPin size={14} className="text-blue-500" />
                                    Constituency Schematic
                                </span>
                            </div>
                            {/* Map Container */}
                            <div className="flex-grow relative bg-slate-50/50 rounded-xl m-1" style={{
                                backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
                                backgroundSize: "20px 20px"
                            }}>
                                {/* Arrow indicating North */}
                                <div className="absolute top-4 right-4 flex flex-col items-center opacity-30">
                                    <span className="text-xl font-serif font-bold text-slate-800">N</span>
                                    <div className="w-0.5 h-8 bg-slate-800"></div>
                                </div>
                                {/* Mandal Zones */}
                                {MANDAL_SNAPSHOTS.map((mandal) => (
                                    <button
                                        key={mandal.id}
                                        onClick={() => setSelectedMandal(selectedMandal === mandal.id ? null : mandal.id)}
                                        className={clsx(
                                            "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group",
                                            "hover:scale-105 focus:outline-none"
                                        )}
                                        style={{ left: `${mandal.coordinates.x}%`, top: `${mandal.coordinates.y}%` }}
                                    >
                                        {/* Zone Circle */}
                                        <div className={clsx(
                                            "relative w-32 h-32 lg:w-40 lg:h-40 rounded-full flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm border-4 transition-all shadow-lg",
                                            selectedMandal === mandal.id ? "scale-110 shadow-xl" : "shadow-md",
                                            mandal.status === "Safe" ? "bg-green-50/90 border-green-400 text-green-900" :
                                                mandal.status === "Moderate" ? "bg-yellow-50/90 border-yellow-400 text-yellow-900" :
                                                    "bg-red-50/90 border-red-400 text-red-900"
                                        )}>
                                            <h3 className="font-bold text-sm lg:text-base leading-tight">{mandal.name}</h3>
                                            <p className="text-xs font-medium mt-1 opacity-80">{mandal.avgDepth.toFixed(1)}m Avg</p>
                                            {/* Pulse Effect for Critical */}
                                            {mandal.status === "Low" && (
                                                <span className="absolute inset-0 rounded-full border-4 border-red-400 opacity-20 animate-ping"></span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Analytics Panel */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                    <p className="text-xs font-bold text-red-400 uppercase">Low Zone</p>
                                    <p className="text-2xl font-bold text-red-900 mt-1">Gudupalle</p>
                                    <p className="text-xs text-red-700 mt-1">Avg 27.7m Depth</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <p className="text-xs font-bold text-green-600 uppercase">Safest Zone</p>
                                    <p className="text-2xl font-bold text-green-900 mt-1">Shanthipuram</p>
                                    <p className="text-xs text-green-700 mt-1">Avg 10.1m Depth</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Detailed Data Grid */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Droplets size={18} className="text-blue-500" />
                                <h3 className="font-semibold text-gray-800">Station-Level Data Grid</h3>
                            </div>
                            {/* Grid Filters */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Safe">Safe</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <Filter size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Station Name</th>
                                        <th className="px-6 py-3">Mandal</th>
                                        <th className="px-6 py-3 text-right">Groundwater Depth (Nov)</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredStations.length > 0 ? (
                                        filteredStations.map((station, index) => (
                                            <tr key={station.id ?? `station-${index}`} className="hover:bg-gray-50">
                                                <td className="px-6 py-3 font-medium text-gray-900">{station.name}</td>
                                                <td className="px-6 py-3 text-gray-500">{station.mandal}</td>
                                                <td className="px-6 py-3 text-right font-bold text-gray-900">{station.depth != null ? station.depth.toFixed(2) : 'N/A'} m</td>
                                                <td className="px-6 py-3 text-center">
                                                    {station.status === "Safe" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle size={12} /> Safe</span>}
                                                    {station.status === "Moderate" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><AlertTriangle size={12} /> Moderate</span>}
                                                    {station.status === "Low" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><AlertTriangle size={12} /> Low</span>}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                                No stations found matching these filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
