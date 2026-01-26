import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronRight, FileText, Beaker, Database, Calculator } from "lucide-react";

export default function MethodologyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Header />

            {/* Hero Section */}
            <div className="bg-primary pt-16 pb-12 text-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
                            Methodology & Framework
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                            A comprehensive overview of the scientific approaches, data models, and analytical techniques used in the KADA Groundwater Observatory.
                        </p>
                    </div>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 lg:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sticky Sidebar */}
                    <aside className="lg:w-1/4 hidden lg:block">
                        <div className="sticky top-28 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                Contents
                            </h3>
                            <nav className="space-y-1">
                                {[
                                    { label: "Data Collection", id: "data-collection", icon: Database },
                                    { label: "Groundwater Modeling", id: "modeling", icon: Calculator },
                                    { label: "hydrology Analysis", id: "hydrology", icon: Beaker },
                                    { label: "Quality Assurance", id: "qa-qc", icon: FileText },
                                ].map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all group"
                                    >
                                        <item.icon size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                                        {item.label}
                                        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary/50" />
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:w-3/4 space-y-16">
                        {/* Section 1: Data Collection */}
                        <section id="data-collection" className="scroll-mt-28">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Database size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-serif">Data Collection Framework</h2>
                                </div>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>
                                        The foundation of the KADA Groundwater Observatory relies on a robust multi-source data collection framework. We integrate real-time telemetry from piezometers, satellite-based remote sensing data, and historical records from state agencies.
                                    </p>
                                    <ul className="mt-4 space-y-2 list-disc pl-5">
                                        <li><strong>Real-time Telemetry:</strong> High-frequency water level monitoring from automated digital water level recorders (DWLRs).</li>
                                        <li><strong>Remote Sensing:</strong> GRACE satellite data for large-scale storage anomalies and Sentinel-1 SAR for surface deformation correlations.</li>
                                        <li><strong>Field Surveys:</strong> Periodic manual measurements to validate automated readings and check for sensor drift.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Groundwater Modeling */}
                        <section id="modeling" className="scroll-mt-28">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                        <Calculator size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-serif">Groundwater Modeling</h2>
                                </div>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>
                                        We utilize numeric groundwater flow models to simulate aquifer behavior under various stress scenarios. These models help in calculating the water budget, estimating recharge rates, and predicting future trends.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 mt-6 not-prose">
                                        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                            <h4 className="font-semibold text-gray-900 mb-2">Aquifer Parameters</h4>
                                            <p className="text-sm text-gray-500">
                                                Estimation of Transmissivity (T) and Specific Yield (Sy) using pumping test data and lithological logs.
                                            </p>
                                        </div>
                                        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                            <h4 className="font-semibold text-gray-900 mb-2">Recharge Estimation</h4>
                                            <p className="text-sm text-gray-500">
                                                Rainfall Infiltration Factor (RIF) method combined with Water Table Fluctuation (WTF) analysis.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Hydrology Analysis */}
                        <section id="hydrology" className="scroll-mt-28">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                        <Beaker size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-serif">Hydrology Analysis</h2>
                                </div>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>
                                        Surface and subsurface hydrology are analyzed to understand the interaction between rainfall, runoff, and groundwater recharge. We employ GIS-based spatial analysis to delineate watersheds and identify potential recharge zones.
                                    </p>
                                    <p className="mt-4">
                                        Key analytical outputs include:
                                    </p>
                                    <ul className="mt-2 space-y-2 list-disc pl-5">
                                        <li><strong>Runoff Coefficient Mapping:</strong> Based on land use/land cover (LULC) and soil characteristics.</li>
                                        <li><strong>Drainage Density Analysis:</strong> To assess the surface permeability and potential for infiltration.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: QA/QC */}
                        <section id="qa-qc" className="scroll-mt-28">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                        <FileText size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-serif">Quality Assurance / Quality Control</h2>
                                </div>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>
                                        Rigorous QA/QC protocols are applied to all incoming data. Outlier detection algorithms identify potential sensor errors, which are then flagged for manual review. Cross-validation with nearby stations ensures spatial consistency.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
