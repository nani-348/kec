"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Layers, Info, Mountain, ArrowDown, Database, Map } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

// --- Data Models ---

const AQUIFER_PROFILES = [
    {
        id: "kpm",
        name: "Kuppam",
        type: "Granitic Gneiss",
        description: "Deep weathering profile due to valley fill. High potential for shallow storage.",
        layers: {
            topsoil: { depth: 1.5, color: "bg-amber-700/80", label: "Red Soil Top Layer" },
            weathered: { depth: 18.5, color: "bg-amber-300/60", label: "Weathered Zone (Phreatic)", pattern: "morph" },
            fractured: { depth: 25.0, color: "bg-slate-400/60", label: "Fractured Zone", pattern: "lines" },
            bedrock: { depth: "Base", color: "bg-slate-800", label: "Massive Basement Rock" }
        },
        metrics: {
            avgWeatheredThickness: 17.0,
            specificYield: "2.5%",
            avgFractureDepth: 35.0,
            yieldRange: "2-5 LPS"
        }
    },
    {
        id: "gdp",
        name: "Gudupalle",
        type: "Migmatite Gneiss",
        description: "Shallow basement with limited weathering. Groundwater restricted to deep fractures.",
        layers: {
            topsoil: { depth: 0.8, color: "bg-amber-800/80", label: "Thin Soil Cover" },
            weathered: { depth: 8.2, color: "bg-amber-200/60", label: "Shallow Weathering", pattern: "morph" },
            fractured: { depth: 40.0, color: "bg-slate-500/60", label: "Deep Fractures", pattern: "lines" },
            bedrock: { depth: "Base", color: "bg-slate-800", label: "Massive Basement Rock" }
        },
        metrics: {
            avgWeatheredThickness: 7.4,
            specificYield: "1.5%",
            avgFractureDepth: 45.0,
            yieldRange: "1-3 LPS"
        }
    },
    {
        id: "rmk",
        name: "Ramakuppam",
        type: "Granite",
        description: "Moderate weathering with significant lineaments enhancing recharge.",
        layers: {
            topsoil: { depth: 1.2, color: "bg-amber-700/80", label: "Sandy Loam" },
            weathered: { depth: 14.0, color: "bg-amber-300/60", label: "Weathered Granite", pattern: "morph" },
            fractured: { depth: 30.0, color: "bg-slate-400/60", label: "Fractured Granite", pattern: "lines" },
            bedrock: { depth: "Base", color: "bg-slate-800", label: "Massive Basement Rock" }
        },
        metrics: {
            avgWeatheredThickness: 12.8,
            specificYield: "2.0%",
            avgFractureDepth: 32.0,
            yieldRange: "1.5-4 LPS"
        }
    },
    {
        id: "stp",
        name: "Shanthipuram",
        type: "Gneissic Complex",
        description: "Highly undulating terrain with variable aquifer capability.",
        layers: {
            topsoil: { depth: 1.0, color: "bg-stone-700/80", label: "Gravelly Soil" },
            weathered: { depth: 11.5, color: "bg-amber-200/60", label: "Weathered Gneiss", pattern: "morph" },
            fractured: { depth: 28.0, color: "bg-slate-400/60", label: "Jointed Gneiss", pattern: "lines" },
            bedrock: { depth: "Base", color: "bg-slate-800", label: "Massive Basement Rock" }
        },
        metrics: {
            avgWeatheredThickness: 10.5,
            specificYield: "1.8%",
            avgFractureDepth: 38.0,
            yieldRange: "1-3 LPS"
        }
    }
];

export default function DemarcationPage() {
    const [selectedId, setSelectedId] = useState("kpm");
    const activeProfile = AQUIFER_PROFILES.find(p => p.id === selectedId) || AQUIFER_PROFILES[0];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Aquifer Demarcation & Disposition
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Visualizing the vertical extent of the <span className="font-semibold text-blue-700">Hard Rock Aquifer System</span>. Analyze weathered and fractured zones across the constituency.
                    </p>
                </div>

                {/* Controller Section */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 inline-flex items-center gap-1">
                        {AQUIFER_PROFILES.map((profile) => (
                            <button
                                key={profile.id}
                                onClick={() => setSelectedId(profile.id)}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    selectedId === profile.id
                                        ? "bg-slate-800 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                {profile.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                    {/* Left: Interactive Cross Section */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px] relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6 z-10">
                            <Layers className="text-blue-600" size={20} />
                            <h3 className="font-bold text-gray-800">Vertical Hydrogeological Profile</h3>
                        </div>

                        {/* Visualization Container */}
                        <div className="flex-grow relative rounded-xl overflow-hidden border border-gray-200 bg-sky-50">
                            {/* Sky/Atmosphere */}
                            <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-sky-200 to-sky-50 z-0"></div>

                            {/* Surface Line */}
                            <div className="absolute top-8 w-full border-t-[3px] border-emerald-600/50 z-10 flex items-center justify-center">
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 rounded-b-md font-bold uppercase tracking-wider">Ground Level</span>
                            </div>

                            {/* Layers Container - Pushed down by sky */}
                            <div className="absolute top-8 bottom-0 w-full flex flex-col items-center justify-start pt-0.5">

                                {/* Topsoil */}
                                <motion.div
                                    className={`w-full relative border-b border-white/10 flex items-center justify-center group ${activeProfile.layers.topsoil.color}`}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${activeProfile.layers.topsoil.depth * 3}%`, minHeight: '24px' }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                    <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-30 mix-blend-overlay"></div>
                                    <span className="text-white text-xs font-medium drop-shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Topsoil ({activeProfile.layers.topsoil.depth}m)
                                    </span>
                                </motion.div>

                                {/* Weathered Zone */}
                                <motion.div
                                    className={`w-full relative border-b border-white/10 flex items-center justify-center group ${activeProfile.layers.weathered.color}`}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${activeProfile.layers.weathered.depth * 2}%` }} // Scaling factor for visual
                                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                                >
                                    {/* Weathered Pattern SVG */}
                                    <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                                        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1.5" className="fill-current text-amber-900" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#dotPattern)" />
                                    </svg>

                                    <div className="flex flex-col items-center z-10">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-sm border border-amber-200">
                                            {activeProfile.layers.weathered.label}
                                        </span>
                                        <div className="mt-2 flex items-center text-[10px] text-amber-900 font-mono bg-white/50 px-2 rounded">
                                            <ArrowDown size={12} className="mr-1" /> Depth: ~{activeProfile.layers.weathered.depth}m
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Fractured Zone */}
                                <motion.div
                                    className={`w-full relative flex items-center justify-center group ${activeProfile.layers.fractured.color}`}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${activeProfile.layers.fractured.depth * 1.5}%` }}
                                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                                >
                                    {/* Fracture Lines SVG */}
                                    <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
                                        <pattern id="crackPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M0 40 L40 0 M20 40 L40 20" stroke="currentColor" strokeWidth="1.5" className="text-slate-800" fill="none" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#crackPattern)" />
                                    </svg>

                                    <div className="flex flex-col items-center z-10">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                                            {activeProfile.layers.fractured.label}
                                        </span>
                                        <div className="mt-2 text-[10px] text-slate-800 font-medium bg-white/50 px-2 rounded">
                                            Extends to {activeProfile.layers.fractured.depth}m+
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bedrock (Rest of height) */}
                                <motion.div
                                    className={`w-full flex-grow relative flex items-center justify-center ${activeProfile.layers.bedrock.color}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                >
                                    <div className="text-slate-500 font-bold text-xl uppercase tracking-widest opacity-20 select-none">
                                        Hard Rock Basement
                                    </div>
                                </motion.div>
                            </div>

                            {/* Depth Ruler (Side) */}
                            <div className="absolute top-8 bottom-0 left-0 w-8 bg-white/80 backdrop-blur border-r border-gray-200 flex flex-col justify-between py-2 items-center text-[9px] text-gray-500 font-mono z-20">
                                <span>0m</span>
                                <span>10m</span>
                                <span>20m</span>
                                <span>30m</span>
                                <span>40m</span>
                                <span>50m</span>
                                <span>Base</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Metrics & Info */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Summary Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <Mountain size={24} className="text-slate-700" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{activeProfile.name} Mandal</h2>
                                    <p className="text-sm text-gray-500">{activeProfile.type} Formation</p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                {activeProfile.description}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 hover:shadow-md transition-shadow">
                                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Weathered Thickness</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-bold text-amber-900">{activeProfile.metrics.avgWeatheredThickness}</span>
                                    <span className="text-sm font-medium text-amber-700 mb-1">m</span>
                                </div>
                                <p className="text-[10px] text-amber-600/80 mt-1">Primary storage zone</p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Specific Yield</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-bold text-blue-900">{activeProfile.metrics.specificYield}</span>
                                </div>
                                <p className="text-[10px] text-blue-600/80 mt-1">Water release capacity</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Est. Well Yield</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-2xl font-bold text-slate-900">{activeProfile.metrics.yieldRange}</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Fracture Depth</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-2xl font-bold text-slate-900">{activeProfile.metrics.avgFractureDepth}</span>
                                    <span className="text-sm font-medium text-slate-700 mb-1">m</span>
                                </div>
                            </div>
                        </div>

                        {/* Geology Note */}
                        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                            <div className="flex items-start gap-2">
                                <Info size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-indigo-900/80 leading-relaxed">
                                    <strong>Geological Context:</strong> The region is predominantly underlain by Archaean Granites and Gneisses. Groundwater occurrence represents a typical "Hard Rock" environment where storage depends entirely on the depth of weathering and intensity of secondary fractures.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
