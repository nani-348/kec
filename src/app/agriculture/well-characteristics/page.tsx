"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Ruler,
    ArrowDown,
    Zap,
    Calendar,
    User,
    MapPin,
    Activity,
    Layers,
    Droplet
} from "lucide-react";
import {
    LineChart,
    Line,
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

// --- Mock Data: Well Details ---

type LithologyLayer = {
    id: number;
    depthStart: number; // m
    depthEnd: number; // m
    description: string;
    type: "soil" | "weathered" | "fractured" | "massive";
    color: string;
};

type WellDetails = {
    id: string;
    farmer: "K. Venkatesh";
    location: "Gudupalle (Sy. 102/B)";
    swl: 18.5; // Static Water Level (m)
    depth: 150; // Total Depth (m)
    casingDepth: 22; // m
    pumpDepth: 120; // m
    yield: 2.5; // LPS
    lithology: LithologyLayer[];
};

const WELL_DETAILS: WellDetails = {
    id: "W-108",
    farmer: "K. Venkatesh",
    location: "Gudupalle (Sy. 102/B)",
    swl: 18.5,
    depth: 150,
    casingDepth: 22,
    pumpDepth: 120,
    yield: 2.5,
    lithology: [
        { id: 1, depthStart: 0, depthEnd: 2, description: "Topsoil", type: "soil", color: "bg-amber-200" },
        { id: 2, depthStart: 2, depthEnd: 15, description: "Weathered Granite", type: "weathered", color: "bg-stone-300" },
        { id: 3, depthStart: 15, depthEnd: 45, description: "Fractured Zone (High Yield)", type: "fractured", color: "bg-blue-100 border-dashed border-blue-300" },
        { id: 4, depthStart: 45, depthEnd: 80, description: "Massive Granite", type: "massive", color: "bg-stone-500" },
        { id: 5, depthStart: 80, depthEnd: 95, description: "Deep Fracture 2", type: "fractured", color: "bg-blue-100 border-dashed border-blue-300" },
        { id: 6, depthStart: 95, depthEnd: 150, description: "Hard Rock", type: "massive", color: "bg-stone-700 text-white" },
    ]
};

const YIELD_HISTORY = [
    { year: 2018, yield: 3.2 },
    { year: 2019, yield: 3.1 },
    { year: 2020, yield: 2.8 },
    { year: 2021, yield: 3.5 }, // Good rainfall
    { year: 2022, yield: 2.9 },
    { year: 2023, yield: 2.5 },
];

const PUMP_CURVE = [
    { head: 20, discharge: 300 },
    { head: 40, discharge: 280 },
    { head: 60, discharge: 250 },
    { head: 80, discharge: 200 },
    { head: 100, discharge: 150 },
    { head: 120, discharge: 100 }, // Operating point approx
    { head: 140, discharge: 50 },
];

export default function WellCharacteristicsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wide mb-4">
                            <Activity size={14} />
                            Technical Specifications
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-2">
                            Well Characteristics: {WELL_DETAILS.id}
                        </h1>
                        <p className="text-gray-600 text-lg flex items-center gap-2">
                            <User size={18} /> {WELL_DETAILS.farmer}
                            <span className="text-gray-300">|</span>
                            <MapPin size={18} /> {WELL_DETAILS.location}
                        </p>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex gap-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Depth</p>
                            <p className="text-2xl font-bold text-gray-900">{WELL_DETAILS.depth}m</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Current Yield</p>
                            <p className="text-2xl font-bold text-blue-600">{WELL_DETAILS.yield} LPS</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Well Schematic & Litholog */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                            <h3 className="font-bold text-gray-800 font-serif text-xl mb-6 flex items-center gap-2">
                                <Layers size={20} className="text-stone-600" />
                                Construction & Lithology
                            </h3>

                            <div className="flex-grow flex gap-0 relative h-[600px] overflow-hidden">

                                {/* Depth Axis */}
                                <div className="w-12 flex flex-col justify-between text-xs text-gray-400 font-mono py-2 text-right pr-2">
                                    <span>0m</span>
                                    <span>25m</span>
                                    <span>50m</span>
                                    <span>75m</span>
                                    <span>100m</span>
                                    <span>125m</span>
                                    <span>150m</span>
                                </div>

                                {/* Well Construction Schematic */}
                                <div className="w-20 relative bg-stone-50 border-x border-stone-200 mx-2">
                                    {/* Casing Pipe */}
                                    <div
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-8 bg-gray-300 border-x-2 border-gray-400 z-10"
                                        style={{ height: `${(WELL_DETAILS.casingDepth / WELL_DETAILS.depth) * 100}%` }}
                                    >
                                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[9px] bg-white border border-gray-200 px-1 rounded whitespace-nowrap hidden group-hover:block">
                                            Casing (22m)
                                        </div>
                                    </div>

                                    {/* Static Water Level */}
                                    <div
                                        className="absolute w-full border-t-2 border-blue-500 z-20"
                                        style={{ top: `${(WELL_DETAILS.swl / WELL_DETAILS.depth) * 100}%` }}
                                    >
                                        <div className="w-full h-full bg-blue-500/10 absolute top-0"></div>
                                        <div className="absolute right-full mr-1 -top-2 text-[10px] font-bold text-blue-600">SWL</div>
                                    </div>

                                    {/* Pump Motor */}
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 w-6 h-12 bg-black rounded-sm z-30 flex items-center justify-center"
                                        style={{ top: `${(WELL_DETAILS.pumpDepth / WELL_DETAILS.depth) * 100}%` }}
                                    >
                                        <Zap size={10} className="text-yellow-400" />
                                    </div>
                                    {/* Delivery Pipe */}
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 w-1 bg-black z-20"
                                        style={{
                                            top: 0,
                                            height: `${(WELL_DETAILS.pumpDepth / WELL_DETAILS.depth) * 100}%`
                                        }}
                                    ></div>
                                </div>

                                {/* Lithology Column */}
                                <div className="flex-grow flex flex-col relative">
                                    {WELL_DETAILS.lithology.map((layer) => {
                                        const heightPercent = ((layer.depthEnd - layer.depthStart) / WELL_DETAILS.depth) * 100;
                                        return (
                                            <div
                                                key={layer.id}
                                                className={clsx(
                                                    "w-full border-b border-white/20 flex flex-col justify-center px-4 hover:brightness-95 transition-all cursor-help relative group",
                                                    layer.color,
                                                    layer.type === "fractured" ? "border-l-4 border-l-blue-400" : ""
                                                )}
                                                style={{ height: `${heightPercent}%` }}
                                            >
                                                <span className="text-xs font-bold opacity-80">{layer.description}</span>
                                                <span className="text-[10px] font-mono opacity-60">{layer.depthStart}-{layer.depthEnd}m</span>

                                                {layer.type === "fractured" && (
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 animate-pulse bg-white/50 rounded-full p-1">
                                                        <Droplet size={12} />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Performance Metrics */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Yield History */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 font-serif text-xl mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-blue-500" />
                                Yield History (2018-2023)
                            </h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={YIELD_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="yield" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pump Performance */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 font-serif text-xl mb-4 flex items-center gap-2">
                                <Zap size={20} className="text-amber-500" />
                                Pump Performance Curve
                            </h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={PUMP_CURVE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="head"
                                            label={{ value: 'Head (m)', position: 'insideBottom', offset: -5, fontSize: 12 }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            label={{ value: 'Discharge (LPM)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip />
                                        <Line type="basis" dataKey="discharge" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Operating Point: ~100 LPM @ 120m Head
                            </p>
                        </div>

                        {/* Summary Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Year Drilled</p>
                                <p className="font-bold text-slate-800">2018</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Diameter</p>
                                <p className="font-bold text-slate-800">6.5 inches</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Pump Type</p>
                                <p className="font-bold text-slate-800">Submersible</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Power Rating</p>
                                <p className="font-bold text-slate-800">7.5 HP</p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
