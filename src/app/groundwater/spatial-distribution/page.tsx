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
                                {/* Connecting Lines (Cosmetic) */}
                                <svg className="absolute inset-0 pointer-events-none opacity-20" width="100%" height="100%">
                                    <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                    <line x1="50%" y1="60%" x2="20%" y2="80%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                    <line x1="50%" y1="60%" x2="80%" y2="50%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                </svg>
                            </div>
                            {/* Selected Zone Info Panel */}
                            {selectedMandal && (
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-gray-200 shadow-lg rounded-xl p-4 z-20 animate-in slide-in-from-bottom-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                {MANDAL_SNAPSHOTS.find(m => m.id === selectedMandal)?.name}
                                                <span className={clsx(
                                                    "text-xs px-2 py-0.5 rounded-full border",
                                                    MANDAL_SNAPSHOTS.find(m => m.id === selectedMandal)?.status === "Low" ? "bg-red-50 border-red-200 text-red-700" :
                                                        "bg-yellow-50 border-yellow-200 text-yellow-700"
                                                )}>
                                                    {MANDAL_SNAPSHOTS.find(m => m.id === selectedMandal)?.status}
                                                </span>
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1 max-w-md">
                                                {MANDAL_SNAPSHOTS.find(m => m.id === selectedMandal)?.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedMandal(null)}
                                            className="text-xs text-blue-600 font-bold hover:underline"
                                        >
                                            Close map view
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Right: Analytics Panel */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Overall Distribution Chart */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Layers size={18} className="text-blue-600" />
                                    <h3 className="font-bold text-gray-800">Groundwater Depth Zones</h3>
                                </div>
                                <div className="h-[200px] flex items-center justify-center">
                                    {isMounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={DEPTH_RANGES}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {DEPTH_RANGES.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#1f2937">
                                                        {ALL_STATIONS.length}
                                                    </tspan>
                                                    <tspan x="50%" dy="1.5em" fontSize="12" fill="#6b7280">
                                                        Stations
                                                    </tspan>
                                                </text>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="text-gray-400 text-xs">Loading chart...</div>
                                    )}
                                </div>
                                <div className="flex justify-center gap-4 mt-4 text-xs">
                                    {DEPTH_RANGES.map((range) => (
                                        <div key={range.name} className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: range.color }}></span>
                                            <span className="text-gray-600">{range.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
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

                    {/* GIS Maps - Temporal Analysis Section */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 font-serif flex items-center gap-2">
                                    <Layers className="text-primary" size={28} />
                                    GIS Maps - Spatial Distribution
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Temporal analysis of groundwater levels across KADA region showing seasonal variations
                                </p>
                            </div>
                        </div>

                        {/* Maps Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Map 1: Jan-2025 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin size={18} className="text-blue-600" />
                                        January 2025 - Post-Monsoon Status
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">Initial assessment after monsoon season</p>
                                </div>
                                <div className="p-4">
                                    <div className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-blue-300 transition-all">
                                        <img
                                            src="/images/about-kada/1.jpeg"
                                            alt="Ground Water Levels in KADA Region (Jan-2025)"
                                            className="w-full h-auto cursor-zoom-in hover:scale-105 transition-transform duration-300"
                                            onClick={(e) => {
                                                const img = e.currentTarget;
                                                if (img.requestFullscreen) img.requestFullscreen();
                                            }}
                                        />
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                        <Info size={14} />
                                        <span>Click image to zoom • Shows recovery after monsoon</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map 2: May-2025 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all">
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin size={18} className="text-amber-600" />
                                        May 2025 - Pre-Monsoon Status
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">Peak summer stress period</p>
                                </div>
                                <div className="p-4">
                                    <div className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-amber-300 transition-all">
                                        <img
                                            src="/images/about-kada/2.jpeg"
                                            alt="Ground Water Levels in KADA Region (May-2025)"
                                            className="w-full h-auto cursor-zoom-in hover:scale-105 transition-transform duration-300"
                                            onClick={(e) => {
                                                const img = e.currentTarget;
                                                if (img.requestFullscreen) img.requestFullscreen();
                                            }}
                                        />
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                        <AlertTriangle size={14} className="text-amber-600" />
                                        <span>Click image to zoom • Deepest water levels observed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map 3: Nov-2025 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all">
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin size={18} className="text-green-600" />
                                        November 2025 - Post-Monsoon Recovery
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">Significant improvement after monsoon</p>
                                </div>
                                <div className="p-4">
                                    <div className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-green-300 transition-all">
                                        <img
                                            src="/images/about-kada/3.jpeg"
                                            alt="Ground Water Levels in KADA Region (Nov-2025)"
                                            className="w-full h-auto cursor-zoom-in hover:scale-105 transition-transform duration-300"
                                            onClick={(e) => {
                                                const img = e.currentTarget;
                                                if (img.requestFullscreen) img.requestFullscreen();
                                            }}
                                        />
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                        <CheckCircle size={14} className="text-green-600" />
                                        <span>Click image to zoom • Best recovery observed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map 4: Jan-2026 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all">
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin size={18} className="text-purple-600" />
                                        January 2026 - Current Status
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">Latest groundwater assessment</p>
                                </div>
                                <div className="p-4">
                                    <div className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-purple-300 transition-all">
                                        <img
                                            src="/images/about-kada/4.jpeg"
                                            alt="Ground Water Levels in KADA Region (Jan-2026)"
                                            className="w-full h-auto cursor-zoom-in hover:scale-105 transition-transform duration-300"
                                            onClick={(e) => {
                                                const img = e.currentTarget;
                                                if (img.requestFullscreen) img.requestFullscreen();
                                            }}
                                        />
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                        <Droplets size={14} className="text-purple-600" />
                                        <span>Click image to zoom • Sustained improvement trend</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legend and Key Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Legend */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Layers size={20} />
                                    GW Zone Legend
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-green-500 border-2 border-white shadow-sm"></div>
                                        <div>
                                            <p className="font-semibold">Shallow (&lt;10m)</p>
                                            <p className="text-xs text-gray-300">Safe groundwater levels</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-yellow-400 border-2 border-white shadow-sm"></div>
                                        <div>
                                            <p className="font-semibold">Medium (10-20m)</p>
                                            <p className="text-xs text-gray-300">Moderate stress levels</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-red-500 border-2 border-white shadow-sm"></div>
                                        <div>
                                            <p className="font-semibold">Deep (&gt;20m)</p>
                                            <p className="text-xs text-gray-300">Low water availability - needs intervention</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Insights */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                                    <Info size={20} className="text-blue-600" />
                                    Key Observations
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <ArrowUpRight size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span><strong>Gudupalle</strong> shows persistent deep water levels (red zones) requiring urgent recharge interventions</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowUpRight size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span><strong>Seasonal variation</strong> clearly visible between May (pre-monsoon) and Nov (post-monsoon) periods</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowUpRight size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span><strong>Shanthipuram & Ramakuppam</strong> maintain relatively better groundwater status (green zones)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowUpRight size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                        <span><strong>Recovery trend</strong> observed from Nov-2025 to Jan-2026 indicating effective monsoon recharge</span>
                                    </li>
                                </ul>
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
                                {selectedMandal && (
                                    <button
                                        onClick={() => setSelectedMandal(null)}
                                        className="text-xs font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        Clear Map Selection
                                    </button>
                                )}
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
