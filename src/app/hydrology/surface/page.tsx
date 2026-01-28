"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Waves, Info, Layers, Target } from "lucide-react";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";

export default function FlowAccumulationPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wide mb-4">
                        <Layers size={14} />
                        Hydrology Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Flow Accumulation Analysis
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Surface and Subsurface hydrological analysis using ArcGIS Hydrology Module for KADA Region.
                    </p>
                </div>

                {/* Main Content Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10">

                    {/* Methodology Description */}
                    <div className="max-w-4xl mx-auto mb-10">
                        <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-6 lg:p-8 border border-indigo-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-600 text-white rounded-xl shrink-0">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Methodology</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        In the <span className="font-bold text-indigo-700">ArcGIS Hydrology Module</span>, Surface of Area (Topography / 30 m SRTM DEM) given to get <span className="font-semibold text-blue-600">Surface flow pattern</span>, <span className="font-semibold text-blue-600">Surface flow accumulation lines</span> and <span className="font-semibold text-blue-600">Surface accumulation points / sinks / surface depressions</span>.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed text-lg mt-4">
                                        Similarly <span className="font-bold text-emerald-700">Reduced Ground Water Levels surface</span> given to get <span className="font-semibold text-cyan-600">SubSurface flow pattern</span> and <span className="font-semibold text-cyan-600">SubSurface flow accumulation lines</span> and <span className="font-semibold text-cyan-600">SubSurface accumulation points / sinks / subsurface depressions / high transmissive locations</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image 1: Flow Accumulation Pattern */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Waves size={20} className="text-blue-600" />
                                </div>
                                Flow Accumulation Pattern
                            </h3>
                            <MagnifyingImageViewer
                                src="/images/about-kada/hyro1.jpg"
                                alt="Flow Accumulation Pattern Map of KADA Region"
                                title="Flow Accumulation Pattern"
                                className="aspect-[4/3]"
                            />
                        </div>

                        {/* Image 2: Flow Accumulation Points */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Target size={20} className="text-indigo-600" />
                                </div>
                                Flow Accumulation Points
                            </h3>
                            <MagnifyingImageViewer
                                src="/images/about-kada/hyro2.jpg"
                                alt="Flow Accumulation Points Map of KADA Region"
                                title="Flow Accumulation Points"
                                className="aspect-[4/3]"
                            />
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
