import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, CheckCircle, Info, ShieldAlert } from "lucide-react";

export default function AssumptionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Header />

            {/* Hero Section */}
            <div className="bg-primary pt-16 pb-12 text-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
                            Assumptions & Limitations
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                            Understanding the constraints and scientific assumptions inherent in the KADA Groundwater Observatory&apos;s data models and projections.
                        </p>
                    </div>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 lg:px-6 py-12">
                <div className="space-y-16 max-w-5xl mx-auto">

                    {/* Assumptions Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                <CheckCircle size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 font-serif">Key Assumptions</h2>
                                <p className="text-gray-500">Foundational premises used in our hydrological models</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Homogeneity within Micro-watersheds",
                                    desc: "Aquifer properties (Transmissivity, Specific Yield) are assumed to be relatively homogeneous within localized micro-watershed units for calculation purposes."
                                },
                                {
                                    title: "Linear Recharge Response",
                                    desc: "Groundwater recharge from rainfall is assumed to follow a linear response after a specific threshold of soil saturation is reached."
                                },
                                {
                                    title: "Return Flow Coefficients",
                                    desc: "Irrigation return flow is estimated at fixed percentages based on crop type and soil permeability (e.g., 20% for paddy in clayey soils)."
                                },
                                {
                                    title: "Pumping Schedules",
                                    desc: "Groundwater extraction estimates assume an average daily pumping duration of 6 hours for agricultural wells during the rabi season."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Limitations Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                                <AlertTriangle size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 font-serif">Model Limitations</h2>
                                <p className="text-gray-500">Constraints affecting the precision of current estimates</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Spatial Resolution",
                                    desc: "Satellite data (GRACE) has a coarse spatial resolution (>100 km), which limits the detection of localized groundwater storage changes at the village level."
                                },
                                {
                                    title: "Data Gaps",
                                    desc: "Historical water level data may have gaps due to sensor malfunctions or accessibility issues during extreme weather events."
                                },
                                {
                                    title: "Complex Geology",
                                    desc: "The presence of fractured hard rock aquifers introduces heterogeneity that continuum models may not fully capture without high-density subsurface mapping."
                                },
                                {
                                    title: "Unaccounted Abstractions",
                                    desc: "Private unauthorized wells and non-agricultural abstractions are estimated based on census data and may not reflect real-time usage variations."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border-l-4 border-amber-400 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Critical Note */}
                    <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="hidden sm:block text-blue-600 mt-1">
                            <ShieldAlert size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-blue-900 mb-2">Usage Disclaimer</h3>
                            <p className="text-blue-800/80 leading-relaxed">
                                The data and models presented in the KADA Groundwater Observatory are intended for planning and decision-support purposes. While every effort is made to ensure accuracy, they should not be used as the sole basis for legal disputes or individual property-level engineering designs without site-specific validation.
                            </p>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
