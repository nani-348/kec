import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, FileSpreadsheet, Search, Filter, ExternalLink } from "lucide-react";

export default function DownloadsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Header />

            {/* Hero Section */}
            <div className="bg-primary pt-16 pb-12 text-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
                            Data Sources & Downloads
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                            Access raw datasets, reports, and geospatial layers used in the KADA Groundwater Observatory.
                        </p>
                    </div>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 lg:px-6 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search datasets..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                <Filter size={16} />
                                Filter
                            </button>
                            <span className="text-xs text-gray-400">Showing 6 datasets</span>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4">Dataset Name</th>
                                    <th className="px-6 py-4">Source Agency</th>
                                    <th className="px-6 py-4">Format</th>
                                    <th className="px-6 py-4">Last Updated</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-gray-600">
                                {[
                                    {
                                        name: "Groundwater Level Data (2014-2024)",
                                        desc: "Monthly piezometer readings for all 44 mandals.",
                                        source: "AP Groundwater Dept.",
                                        format: "XLSX",
                                        date: "Jan 15, 2024",
                                        size: "4.2 MB"
                                    },
                                    {
                                        name: "Aquifer Parameters (KADA Region)",
                                        desc: "Transmissivity and Specific Yield values derived from pumping tests.",
                                        source: "KADA / Technical Team",
                                        format: "CSV",
                                        date: "Dec 10, 2023",
                                        size: "1.8 MB"
                                    },
                                    {
                                        name: "Rainfall Statistics (Daily)",
                                        desc: "Daily rainfall data from APSDPS automatic weather stations.",
                                        source: "APSDPS",
                                        format: "XLSX",
                                        date: "Jan 01, 2024",
                                        size: "12.5 MB"
                                    },
                                    {
                                        name: "Land Use / Land Cover Map",
                                        desc: "High-resolution LULC classification for the KADA region.",
                                        source: "NRSC / ISRO",
                                        format: "GeoTIFF",
                                        date: "Nov 20, 2023",
                                        size: "145 MB"
                                    },
                                    {
                                        name: "Projected Water Budget 2025",
                                        desc: "Calculated water balance components including inflow and outflow.",
                                        source: "KADA Research Cell",
                                        format: "PDF",
                                        date: "Feb 01, 2024",
                                        size: "5.6 MB"
                                    },
                                    {
                                        name: "Soil Classification Data",
                                        desc: "Detailed soil texture and permeability dataset.",
                                        source: "Dept. of Agriculture",
                                        format: "SHP",
                                        date: "Oct 15, 2023",
                                        size: "28 MB"
                                    }
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 p-2 bg-gray-100 rounded text-gray-500 group-hover:bg-white group-hover:text-primary transition-colors">
                                                    <FileSpreadsheet size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{row.name}</h4>
                                                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{row.desc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <ExternalLink size={12} className="text-gray-400" />
                                                {row.source}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 rounded text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                                                {row.format}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {row.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90 transition-colors shadow-sm">
                                                <Download size={14} />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <span>Showing 1 to 6 of 6 entries</span>
                        <div className="flex gap-1">
                            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 bg-primary text-white rounded">1</button>
                            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
