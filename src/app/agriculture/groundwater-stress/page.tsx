"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, Activity, CheckCircle2, AlertCircle, Info } from "lucide-react";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";

export default function GroundwaterStressPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Activity size={14} />
                        Stress Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Ground Water Stress
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Wells Working Status Classification in KADA, Kuppam Region
                    </p>
                </div>

                {/* SIDE BY SIDE: Matter (Left) + Map (Right) */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                        {/* LEFT SIDE: Matter/Content */}
                        <div className="space-y-6">
                            {/* Methodology */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-600 text-white rounded-xl shrink-0">
                                        <Info size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Wells Working Status</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            The KADA region is classified into <span className="font-bold text-gray-900">3 stress categories</span> based on well functionality and groundwater depth index values.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stress Categories based on image legend */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900">Stress Classification (Index Values)</h3>

                                {/* Less Stressed - Blue */}
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-4">
                                    <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-blue-700">&lt;3.75 PW OW</h4>
                                        <p className="text-gray-600 text-sm">Less Stressed - Partially Working Open Wells</p>
                                    </div>
                                </div>

                                {/* Moderately Stressed - Green */}
                                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-4">
                                    <div className="p-2 bg-emerald-500 text-white rounded-lg shrink-0">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-emerald-700">3.75 - 4.25 WBW</h4>
                                        <p className="text-gray-600 text-sm">Moderately Stressed - Working Bore Wells</p>
                                    </div>
                                </div>

                                {/* Highly Stressed - Pink/Red */}
                                <div className="bg-pink-50 border border-pink-200 p-4 rounded-xl flex items-center gap-4">
                                    <div className="p-2 bg-pink-500 text-white rounded-lg shrink-0">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-pink-700">&gt;4.25 PW BW</h4>
                                        <p className="text-gray-600 text-sm">Highly Stressed - Partially Working Bore Wells</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Legend Info */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2 text-sm">Map Boundaries</h4>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-0.5 bg-gray-800"></span>
                                        KADA Boundary
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-0.5 bg-green-500"></span>
                                        Micro Basin Boundary
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-0.5 bg-purple-500"></span>
                                        Mandal Boundary
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-4 h-0.5 bg-gray-400"></span>
                                        Village Boundary
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Stress Map Image */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4">
                                Groundwater Stress Map
                            </h3>
                            <MagnifyingImageViewer
                                src="/images/about-kada/stress.jpg"
                                alt="Groundwater Stress Classification Map of KADA, Kuppam Region"
                                title="KADA Region - Wells Working Status"
                                className="aspect-[3/4]"
                            />
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
