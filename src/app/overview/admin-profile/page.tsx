"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveMap from "@/components/overview/InteractiveMap";
import { DynamicSheetTable } from "@/components/ui/DynamicSheetTable";
import { Landmark, Map as MapIcon, Droplets, Mountain } from "lucide-react";
export default function AdminProfilePage() {
    const adminDivisions = [
        { name: "Kuppam", district: "Chittoor", type: "Mandal" },
        { name: "Gudi Palle", district: "Chittoor", type: "Mandal" },
        { name: "Santhi Puram", district: "Chittoor", type: "Mandal" },
        { name: "Rama Kuppam", district: "Chittoor", type: "Mandal" },
    ];
    const riverBasins = [
        {
            name: "Palar Basin",
            area: "687.5 sq. km",
            percentage: "65%",
            description: "Major drainage basin covering the southern and central parts of the region.",
            color: "bg-blue-50 text-blue-700 border-blue-100"
        },
        {
            name: "Ponniar Basin",
            area: "364.4 sq. km",
            percentage: "35%",
            description: "Covers the northern parts of the region, draining towards the east.",
            color: "bg-indigo-50 text-indigo-700 border-indigo-100"
        }
    ];
    // Placeholder data for Assessment Units - to be verified/expanded with PDF data
    const assessmentUnits = [
        { id: "CTR_PALAR_CHINNAERU_NADIMURU", basin: "Palar", watershed: "Chinnaeru Nadimuru", area: "15,240 Ha", category: "Critical" },
        { id: "CTR_PALAR_PEDDAVANKA", basin: "Palar", watershed: "Peddavanka", area: "12,110 Ha", category: "Semi-Critical" },
        { id: "CTR_PONNIAR_KOUNDINYA", basin: "Ponniar", watershed: "Koundinya", area: "9,850 Ha", category: "Safe" },
        // Add more rows as extracted
    ];
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Administrative & Geographic Profile
                        </h1>
                        <p className="text-gray-600 text-lg">
                            A detailed breakdown of the KADA region's administrative divisions, river basins, and groundwater assessment units.
                        </p>
                    </div>
                    {/* Administrative Profile */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Landmark size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Administrative Divisions</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {adminDivisions.map((div, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{div.type}</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{div.name}</h3>
                                    <div className="text-sm font-medium text-secondary bg-secondary/10 inline-block px-2 py-1 rounded-md">
                                        {div.district} Dist.
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* Geographic Profile (Basins) & Map Layout */}
                    <section className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left: Basin Content */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Droplets size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">River Basins</h2>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-gray-600 leading-relaxed">
                                        The KADA region is hydraulically distinct, primarily drained by two major river basins: the <span className="font-semibold text-gray-900">Palar Basin</span> and the <span className="font-semibold text-gray-900">Ponniar Basin</span>. These basins dictate the flow of surface water and the recharge potential of groundwater aquifers.
                                    </p>
                                    <div className="grid gap-4">
                                        {riverBasins.map((basin, idx) => (
                                            <div key={idx} className={`p-5 rounded-xl border ${basin.color} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                                                <div>
                                                    <h3 className="text-lg font-bold mb-1">{basin.name}</h3>
                                                    <p className="text-sm opacity-80">{basin.description}</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className="text-2xl font-bold">{basin.percentage}</div>
                                                    <div className="text-xs uppercase font-semibold opacity-70">Coverage</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Right: Map */}
                            <div>
                                <InteractiveMap
                                    src="/images/about-kada/page13_img93.png"
                                    alt="River Basins and Watersheds Map"
                                    title="KADA Region - Basins & Watersheds"
                                    className="h-[400px] lg:h-[500px]"
                                />
                                <p className="text-sm text-gray-500 mt-3 text-center italic">
                                    Map showing the drainage network and basin boundaries.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* Assessment Units Table */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                <Mountain size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Assessment Units (Watersheds)</h2>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <DynamicSheetTable
                                category="Overview"
                                table="ASSESSMENT UNITS"
                                title="Watershed Categorization"
                                className="bg-transparent"
                            />
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
