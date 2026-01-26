"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Layers,
    Activity,
    ArrowDown,
    Pickaxe,
    Info,
    Database,
    Mountain
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
    ReferenceLine
} from "recharts";
import clsx from "clsx";

// --- Mock Data: Lithological Profiles ---

const LITHOLOGY_PROFILES = {
    gudupalle: {
        name: "Gudupalle Mandal",
        bedrockDepth: 18.5,
        layers: [
            { id: 1, name: "Topsoil & Alluvium", depth: "0 - 2m", type: "soil", color: "bg-amber-100 border-amber-200", description: "Sandy loam, high infiltration." },
            { id: 2, name: "Weathered Granite", depth: "2 - 12m", type: "weathered", color: "bg-stone-200 border-stone-300", description: "Highly weathered, potential aquifer zone." },
            { id: 3, name: "Fractured Zone", depth: "12 - 25m", type: "fractured", color: "bg-stone-400 border-stone-500", description: "Semi-confined aquifer, moderate yield." },
            { id: 4, name: "Massive Bedrock", depth: "> 25m", type: "bedrock", color: "bg-stone-700 border-stone-800 text-white", description: "Hard granite, negligible porosity." },
        ]
    },
    kuppam: {
        name: "Kuppam Mandal",
        bedrockDepth: 14.2,
        layers: [
            { id: 1, name: "Topsoil (Clayey)", depth: "0 - 1.5m", type: "soil", color: "bg-amber-200 border-amber-300", description: "Red soil, moderate infiltration." },
            { id: 2, name: "Weathered Gneiss", depth: "1.5 - 8m", type: "weathered", color: "bg-stone-300 border-stone-400", description: "Moderate weathering." },
            { id: 3, name: "Fractured Zone", depth: "8 - 18m", type: "fractured", color: "bg-stone-500 border-stone-600", description: "Good water bearing fractures common." },
            { id: 4, name: "Massive Bedrock", depth: "> 18m", type: "bedrock", color: "bg-stone-800 border-stone-900 text-white", description: "Basement rock." },
        ]
    },
    shanthipuram: {
        name: "Shanthipuram Mandal",
        bedrockDepth: 10.8,
        layers: [
            { id: 1, name: "Topsoil", depth: "0 - 1m", type: "soil", color: "bg-amber-50 border-amber-100", description: "Thin soil cover." },
            { id: 2, name: "Weathered Zone", depth: "1 - 6m", type: "weathered", color: "bg-stone-200 border-stone-300", description: "Shallow weathering." },
            { id: 3, name: "Fractured Quartzite", depth: "6 - 15m", type: "fractured", color: "bg-stone-400 border-stone-500", description: "High yielding fracture zones." },
            { id: 4, name: "Massive Bedrock", depth: "> 15m", type: "bedrock", color: "bg-stone-700 border-stone-800 text-white", description: "Hard rock basement." },
        ]
    }
};

// --- Mock Data: VES Curves (Resistivity) ---
// AB/2 = Half Current Electrode Spacing (Depth index)
// Rho = Apparent Resistivity
const VES_DATA = [
    { ab2: 2, gudupalle: 120, kuppam: 80, shanthipuram: 150 },
    { ab2: 5, gudupalle: 85, kuppam: 60, shanthipuram: 110 },
    { ab2: 10, gudupalle: 45, kuppam: 200, shanthipuram: 90 }, // Dip indicates fracture/water
    { ab2: 20, gudupalle: 180, kuppam: 350, shanthipuram: 60 },
    { ab2: 40, gudupalle: 800, kuppam: 600, shanthipuram: 400 },
    { ab2: 80, gudupalle: 1200, kuppam: 1100, shanthipuram: 900 },
];

export default function SubsurfacePage() {
    const [selectedMandal, setSelectedMandal] = useState<keyof typeof LITHOLOGY_PROFILES>("gudupalle");
    const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

    const currentProfile = LITHOLOGY_PROFILES[selectedMandal];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Layers size={14} />
                        Hydrogeology
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Subsurface Hydrology & Lithology
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Geophysical characterization of the aquifer system using <strong>Lithological Logs</strong> and <strong>Vertical Electrical Sounding (VES)</strong>.
                        Understanding the vertical stratification is key to identifying potential water-bearing zones.
                    </p>
                </div>

                {/* Control Bar */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 inline-flex gap-1">
                        {(Object.keys(LITHOLOGY_PROFILES) as Array<keyof typeof LITHOLOGY_PROFILES>).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSelectedMandal(key)}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                                    selectedMandal === key
                                        ? "bg-stone-800 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                {LITHOLOGY_PROFILES[key].name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Lithological Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                            <h3 className="font-bold text-gray-800 font-serif text-xl mb-1 flex items-center gap-2">
                                <Mountain size={20} className="text-stone-600" />
                                Stratification Profile
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">Vertical soil & rock distribution.</p>

                            <div className="flex-grow relative flex flex-col gap-1 w-full max-w-md mx-auto">
                                {/* Depth Markers */}
                                <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-xs text-stone-400 font-mono py-2">
                                    <span>0m</span>
                                    <span>~10m</span>
                                    <span>~20m</span>
                                    <span>30m+</span>
                                </div>

                                {currentProfile.layers.map((layer) => (
                                    <div
                                        key={layer.id}
                                        onMouseEnter={() => setHoveredLayer(layer.id)}
                                        onMouseLeave={() => setHoveredLayer(null)}
                                        className={clsx(
                                            "relative rounded-lg border-2 p-4 cursor-help transition-all duration-300 flex-grow flex flex-col justify-center",
                                            layer.color,
                                            hoveredLayer === layer.id ? "scale-[1.02] shadow-lg z-10" : "hover:brightness-95"
                                        )}
                                        style={{ minHeight: layer.type === 'bedrock' ? '120px' : '80px' }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm lg:text-base">{layer.name}</span>
                                            <span className="text-xs font-mono opacity-80 bg-black/10 px-2 py-0.5 rounded">{layer.depth}</span>
                                        </div>

                                        {/* Description reveals on hover or general view if space permits */}
                                        <div className={clsx(
                                            "mt-2 text-xs lg:text-sm opacity-90 transition-opacity duration-300",
                                            // hoveredLayer === layer.id ? "block" : "hidden lg:block"
                                        )}>
                                            {layer.description}
                                        </div>

                                        {layer.type === 'fractured' && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 transform rotate-12">
                                                <Activity size={48} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Summary Footer for Column */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-stone-600">
                                <span>Est. Depth to Bedrock:</span>
                                <span className="font-bold text-lg text-stone-900">{currentProfile.bedrockDepth} m</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: VES Analysis & Metrics */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Comparison Card (Mock Metrics) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Aquifer Thickness</p>
                                        <h4 className="text-2xl font-bold text-blue-900 mt-1">~12.5 m</h4>
                                        <p className="text-xs text-blue-700 mt-1">Saturated Weathered Zone</p>
                                    </div>
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-blue-500">
                                        <Database size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Yield Potential</p>
                                        <h4 className="text-2xl font-bold text-amber-900 mt-1">Moderate</h4>
                                        <p className="text-xs text-amber-700 mt-1">1.5 - 2.5 LPS</p>
                                    </div>
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-amber-500">
                                        <Pickaxe size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VES Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-gray-800 font-serif text-xl flex items-center gap-2">
                                        <Activity size={20} className="text-blue-600" />
                                        VES Resistivity Data
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Detecting subsurface layers via resistivity (Ohm-m). Dips often indicate water.
                                    </p>
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={VES_DATA}
                                        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="ab2"
                                            label={{ value: 'AB/2 (Electrode Spacing) [m]', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#6b7280' }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            label={{ value: 'Resistivity (Ωm)', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#6b7280' }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            formatter={(value: any) => [`${value} Ωm`, 'Resistivity']}
                                        />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line
                                            type="monotone"
                                            dataKey="gudupalle"
                                            name="Gudupalle"
                                            stroke={selectedMandal === 'gudupalle' ? "#3b82f6" : "#cbd5e1"}
                                            strokeWidth={selectedMandal === 'gudupalle' ? 3 : 1}
                                            dot={{ r: 4 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="kuppam"
                                            name="Kuppam"
                                            stroke={selectedMandal === 'kuppam' ? "#f59e0b" : "#cbd5e1"}
                                            strokeWidth={selectedMandal === 'kuppam' ? 3 : 1}
                                            dot={{ r: 4 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="shanthipuram"
                                            name="Shanthipuram"
                                            stroke={selectedMandal === 'shanthipuram' ? "#10b981" : "#cbd5e1"}
                                            strokeWidth={selectedMandal === 'shanthipuram' ? 3 : 1}
                                            dot={{ r: 4 }}
                                        />
                                        <ReferenceLine y={100} label="Transition Zone" stroke="#9ca3af" strokeDasharray="3 3" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-4 bg-stone-50 p-3 rounded-lg text-xs leading-relaxed text-stone-600 flex items-start gap-2">
                                <Info size={16} className="shrink-0 mt-0.5" />
                                <p>
                                    <strong>Interpretation:</strong> Lower resistivity values (dips in the curve) typically indicate the presence of moisture or clay content (weathering). High values (&gt;500 Ωm) usually indicate massive, unfractured bedrock.
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
