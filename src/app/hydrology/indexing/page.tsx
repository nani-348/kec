"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Info, Layers, Droplets, MapPin } from "lucide-react";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";

export default function IndexingZonePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-4">
                        <Layers size={14} />
                        Hydrology Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Indexing & Zone Identification
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Identification of Runoff Available Areas and Recharge Discharge Areas using ArcGIS Mapping and Indexing.
                    </p>
                </div>

                {/* Main Content Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10">

                    {/* Methodology Description */}
                    <div className="max-w-4xl mx-auto mb-10">
                        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 lg:p-8 border border-emerald-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-600 text-white rounded-xl shrink-0">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Methodology</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        By <span className="font-bold text-emerald-700">indexing and ArcGIS Mapping</span>, <span className="font-semibold text-blue-600">Runoff Available Areas</span> and <span className="font-semibold text-teal-600">Recharge Discharge Areas</span> were identified.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed text-lg mt-4">
                                        In the indexing procedure:
                                    </p>
                                    <ul className="mt-3 space-y-2">
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <span className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">+1</span>
                                            <span className="text-lg">Surface sinks</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <span className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">-1</span>
                                            <span className="text-lg">Sub surface sinks</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <span className="w-8 h-8 bg-gray-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">0</span>
                                            <span className="text-lg">Interactive sinks</span>
                                        </li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed text-lg mt-4">
                                        <span className="font-semibold text-emerald-700">Inverse distance weightage</span> followed for rational interpolation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image 1: Recharge - Intermediate - Discharge Zones */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <MapPin size={20} className="text-emerald-600" />
                                </div>
                                Recharge - Intermediate - Discharge Zones
                            </h3>
                            <MagnifyingImageViewer
                                src="/images/about-kada/index1.jpg"
                                alt="Recharge Intermediate Discharge Zones Map of KADA Region"
                                title="Recharge - Intermediate - Discharge Zones"
                                className="aspect-[4/3]"
                            />
                        </div>

                        {/* Image 2: Runoff Availability Areas */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Droplets size={20} className="text-blue-600" />
                                </div>
                                Runoff Availability Areas
                            </h3>
                            <MagnifyingImageViewer
                                src="/images/about-kada/index2.jpg"
                                alt="Runoff Availability Areas Map of KADA Region"
                                title="Runoff Availability Areas"
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
