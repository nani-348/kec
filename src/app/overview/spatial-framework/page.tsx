"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveMap from "@/components/overview/InteractiveMap";
import { Layers, Activity, Zap, Droplets } from "lucide-react";
export default function SpatialFrameworkPage() {
    const [stats, setStats] = useState({
        totalSinks: "268",
        subsurfaceSinks: "139",
        surfaceSinks: "39",
        interactiveSinks: "90"
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/overview");
                const result = await response.json();
                if (result.spatial && Array.isArray(result.spatial)) {
                    const spatialMap = new Map(result.spatial.map((s: any) => [s.metric || s.Metric, s.value || s.Value]));
                    setStats({
                        totalSinks: spatialMap.get("Total Sinks Identified")?.toString() || "268",
                        subsurfaceSinks: spatialMap.get("Subsurface Sinks")?.toString() || "139",
                        surfaceSinks: spatialMap.get("Surface Sinks")?.toString() || "39",
                        interactiveSinks: spatialMap.get("Interactive Sinks")?.toString() || "90"
                    });
                }
            } catch (error) {
                console.error("Failed to fetch spatial data", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Spatial Framework
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Advanced GIS-based hydrological analysis of the KADA region, mapping sinks, recharge zones, and surface runoff indices to guide conservation planning.
                        </p>
                    </div>
                    {/* Layer 1: Hydrological Sinks */}
                    <section className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Droplets size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Hydrological Sinks Analysis</h2>
                                </div>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        A sink is an area or cell in the elevation model with undefined drainage direction; no surrounding cells are lower. This analysis identifies internal drainage patterns crucial for understanding localized recharge potential.
                                    </p>
                                    <ul className="space-y-3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-4">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                            <span className="font-semibold text-gray-900">Total Sinks Identified:</span> {stats.totalSinks}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                            <span className="font-semibold text-gray-900">Subsurface Sinks:</span> {stats.subsurfaceSinks} (Primary Recharge)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                            <span className="font-semibold text-gray-900">Surface Sinks:</span> {stats.surfaceSinks}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                            <span className="font-semibold text-gray-900">Interactive Sinks:</span> {stats.interactiveSinks}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full">
                                <InteractiveMap
                                    src="/images/about-kada/page20_img138.png"
                                    alt="Hydrological Sinks Map"
                                    title="Hydrological Sinks Distribution"
                                    className="h-[400px] lg:h-[500px]"
                                />
                            </div>
                        </div>
                    </section>
                    {/* Layer 2: Recharge - Intermediate - Discharge Zonation */}
                    <section className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                            <div className="order-1 lg:order-2">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                        <Layers size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Recharge & Discharge Zonation</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Based on sink analysis and topography, the region is classified into three distinct zones. This zonation helps in siting specific conservation structures:
                                </p>
                                <div className="grid gap-4">
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                                        <h3 className="font-bold text-green-800 mb-1">Recharge Zones</h3>
                                        <p className="text-sm text-green-700">High elevation catchments where precipitation infiltrates. Ideal for check dams.</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                        <h3 className="font-bold text-yellow-800 mb-1">Intermediate Zones</h3>
                                        <p className="text-sm text-yellow-700">Transition areas. Suitable for percolation tanks and farm ponds.</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                        <h3 className="font-bold text-blue-800 mb-1">Discharge Zones</h3>
                                        <p className="text-sm text-blue-700">Valley floors where groundwater flows out. Focus on drainage and salinity management.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full order-2 lg:order-1">
                                <InteractiveMap
                                    src="/images/about-kada/page22_img148.png"
                                    alt="Recharge Zonation Map"
                                    title="Recharge - Intermediate - Discharge Zones"
                                    className="h-[400px] lg:h-[500px]"
                                />
                            </div>
                        </div>
                    </section>
                    {/* Layer 3: Stress & Runoff Indexing */}
                    <section className="mb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                        <Activity size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Runoff Availability & Stress Index</h2>
                                </div>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        This composite index integrates surface sinks (+1), subsurface sinks (-1), and interactive sinks (0) to identify areas of high water stress versus high runoff availability.
                                    </p>
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <Zap size={18} className="text-yellow-500" />
                                            Index Interpretation
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                                <span className="text-gray-600">High Positive Index</span>
                                                <span className="font-medium text-blue-600">Surface Runoff Potential</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                                <span className="text-gray-600">Negative Index</span>
                                                <span className="font-medium text-red-500">Groundwater Stress / Recharge</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">Near Zero</span>
                                                <span className="font-medium text-gray-500">Interactive / Balanced</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <InteractiveMap
                                    src="/images/about-kada/page21_img143.png"
                                    alt="Stress and Runoff Availability Map"
                                    title="Groundwater Stress & Runoff Index"
                                    className="h-[400px] lg:h-[500px]"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
