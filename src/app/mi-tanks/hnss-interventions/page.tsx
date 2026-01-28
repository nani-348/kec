"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Info, Map as MapIcon, Droplets, ArrowRight, Layout, BarChart3, Radio } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";

const DISTRIBUTION_DATA = [
    { region: "HNSS Command Area", area: 198, tanks: 227, remarks: "Connected 125 (97 filled once + 28 to be filled)" },
    { region: "Upstream Non Command Area", area: 162, tanks: 196, remarks: "Difficult / Need Lift" },
    { region: "Down Stream Non Command Area", area: 172, tanks: 85, remarks: "Some What Easy, Lift/Gravity" },
    { region: "Isolated Area", area: 432, tanks: 73, remarks: "Extremely Difficult" },
    { region: "KADA Region", area: 964, tanks: 581, remarks: "", isTotal: true },
];

const GRAVITY_DATA = [
    { location: "47", length: 12, type: "Gravity", connected: 18 },
    { location: "44", length: 5, type: "Gravity", connected: 8 },
    { location: "45", length: 3.5, type: "Gravity", connected: 4 },
    { location: "33 Start", length: 8.5, type: "Gravity", connected: 4 },
    { location: "33 end", length: 3, type: "Gravity", connected: 4 },
    { location: "33 middle", length: 4, type: "Gravity", connected: 4 },
    { location: "31 end", length: 3, type: "Gravity", connected: 6 },
    { location: "24q middle", length: 2.5, type: "Gravity", connected: 4 },
    { location: "35", length: 5, type: "Gravity", connected: 15 },
    { location: "Total:", length: 46, type: "", connected: 67, isTotal: true },
];

const LIFT_DATA = [
    { id: "19", length: "6+3", scheme: "Lift 20m + Gravity", details: "18 + Bagalnatham / Bandalapalli IC" },
    { id: "31", length: "8+3", scheme: "Lift 80m + Gravity", details: "10 + Lingapuramdinne / Pogurupalli / IC" },
    { id: "AOT1", length: "4+6", scheme: "Lift 30 m + Gravity", details: "15 + Bagalnatham / Bandalapalli IC" },
    { id: "38", length: "3+2", scheme: "Lift 80m + Gravity", details: "12 + Lingapuramdinne / Pogurupalli / IC" },
    { id: "Total:", length: "21+14", scheme: "", details: "55", isTotal: true },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function HnssInterventionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <Droplets size={14} className="fill-blue-600/20" />
                        Strategic Water Management
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight">
                                Interventions to Improve <span className="text-blue-600">HNSS Command</span>
                            </h1>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Comprehensive planning for the distribution of MI Tanks within the HNSS Command area.
                                Our strategy details interventions for upstream, downstream, and isolated regions to ensure
                                equitable and efficient water resource utilization across the KADA region.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Layout size={20} />
                                        <span className="font-bold">Total Area</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">964 <span className="text-sm font-normal text-slate-500">Sq KM</span></p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Radio size={20} />
                                        <span className="font-bold">Total Tanks</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">581 <span className="text-sm font-normal text-slate-500">Units</span></p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Map Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200"
                        >
                            <MagnifyingImageViewer
                                src="/images/about-kada/gravity.png"
                                alt="HNSS Gravity Linkage Map"
                                title="Proposed Lift & Gravity Schemes"
                                className="aspect-[4/3] bg-slate-100"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="space-y-12"
                >
                    {/* Section 1: MI Tanks Distribution */}
                    <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
                                    <BarChart3 size={20} />
                                </span>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">MI Tanks Distribution</h2>
                                    <p className="text-sm text-slate-500">Regional breakdown of water assets</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Region</th>
                                        <th className="px-6 py-4 text-right">Area (Sq KM)</th>
                                        <th className="px-6 py-4 text-right">MI Tanks & Ponds</th>
                                        <th className="px-6 py-4">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {DISTRIBUTION_DATA.map((row, idx) => (
                                        <tr key={idx} className={clsx("transition-colors hover:bg-slate-50", row.isTotal ? "bg-blue-50/50 font-bold text-slate-900" : "text-slate-600")}>
                                            <td className="px-6 py-4 relative">
                                                {row.isTotal && <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                                                {row.region}
                                            </td>
                                            <td className="px-6 py-4 text-right">{row.area}</td>
                                            <td className="px-6 py-4 text-right">{row.tanks}</td>
                                            <td className="px-6 py-4">
                                                <span className={clsx("inline-block px-2 py-1 rounded text-xs",
                                                    !row.remarks ? "" :
                                                        row.remarks.includes("Difficult") ? "bg-red-50 text-red-700" :
                                                            row.remarks.includes("Easy") ? "bg-green-50 text-green-700" :
                                                                "bg-slate-100 text-slate-700"
                                                )}>
                                                    {row.remarks}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Section 2: Gravity Linkage */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600">
                                        <ArrowRight size={20} />
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">Gravity Linkage</h2>
                                        <p className="text-sm text-slate-500">Natural flow connectivity analysis</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto flex-grow">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-5 py-3">OT Location</th>
                                            <th className="px-5 py-3 text-right">Length (KM)</th>
                                            <th className="px-5 py-3 text-right">Connected</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {GRAVITY_DATA.map((row, idx) => (
                                            <tr key={idx} className={clsx("hover:bg-slate-50/80 transition-colors", row.isTotal ? "bg-emerald-50/50 font-bold text-slate-900" : "text-slate-600")}>
                                                <td className="px-5 py-3 font-medium">{row.location}</td>
                                                <td className="px-5 py-3 text-right">{row.length}</td>
                                                <td className="px-5 py-3 text-right">{row.connected}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Section 3: Lift Scheme */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100 text-amber-600">
                                        <Info size={20} />
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">Lift Scheme</h2>
                                        <p className="text-sm text-slate-500">Proposed mechanical interventions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto flex-grow">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-5 py-3">Linkage ID</th>
                                            <th className="px-5 py-3 text-right">Length</th>
                                            <th className="px-5 py-3">Scheme & Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {LIFT_DATA.map((row, idx) => (
                                            <tr key={idx} className={clsx("hover:bg-slate-50/80 transition-colors", row.isTotal ? "bg-amber-50/50 font-bold text-slate-900" : "text-slate-600")}>
                                                <td className="px-5 py-3 font-medium">{row.id}</td>
                                                <td className="px-5 py-3 text-right text-xs">{row.length}</td>
                                                <td className="px-5 py-3">
                                                    {row.isTotal ? (
                                                        <span className="font-bold">{row.details}</span>
                                                    ) : (
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-slate-800 text-xs">{row.scheme}</span>
                                                            <span className="text-[10px] text-slate-500 leading-tight mt-0.5">{row.details}</span>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
