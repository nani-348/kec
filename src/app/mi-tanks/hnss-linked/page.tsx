"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";
import { GitMerge, Database, Droplets, Layout, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

// --- Real Data from User ---

const STORAGE_CAPACITY_DATA = [
    { region: "GUDI PALLE", exOTs: 30, addOTs: 7, totalOTs: 37, exStorage: 73.77, addStorage: 4.08, totalStorage: 77.85 },
    { region: "KUPPAM", exOTs: 29, addOTs: 5, totalOTs: 34, exStorage: 192.01, addStorage: 3.3, totalStorage: 195.31 },
    { region: "RAMA KUPPAM", exOTs: 10, addOTs: 5, totalOTs: 15, exStorage: 72.74, addStorage: 11.07, totalStorage: 83.81 },
    { region: "SANTHI PURAM", exOTs: 18, addOTs: 21, totalOTs: 39, exStorage: 60.5, addStorage: 39.37, totalStorage: 99.87 },
    { region: "KADA Region", exOTs: 87, addOTs: 38, totalOTs: 125, exStorage: 399.02, addStorage: 57.82, totalStorage: 456.84, isTotal: true },
];

const REGISTERED_COMMAND_DATA = [
    { region: "Gudipalle", existing: 725.1, additional: 43.9, total: 769.1 },
    { region: "Kuppam", existing: 1495.8, additional: 37.6, total: 1533.4 },
    { region: "Ramakuppam", existing: 687.7, additional: 201.8, total: 889.5 },
    { region: "Shanthipuram", existing: 764.7, additional: 584.5, total: 1349.2 },
    { region: "KADA Region", existing: 3673.3, additional: 867.8, total: 4538, isTotal: true },
];

const OTS_DISCHARGE_DATA = [
    {
        region: "Gudipalle",
        noEx: 3, exList: "19, 20, 23",
        noAdd: 2, addList: "OT1, OT2",
        total: 5,
        dischEx: 116.0, dischAdd: 61.7, dischTotal: 177.7
    },
    {
        region: "Kuppam",
        noEx: 7, exList: "24a, 26, 28, 29, 31, 31A, 32",
        noAdd: 5, addList: "OT3 to OT7",
        total: 12,
        dischEx: 95.9, dischAdd: 26.4, dischTotal: 122.3
    },
    {
        region: "Ramakuppam",
        noEx: 10, exList: "33, 34, 36, 38, 39, 40-44",
        noAdd: 6, addList: "OT8 to OT13",
        total: 16,
        dischEx: 70.6, dischAdd: 17.7, dischTotal: 88.3
    },
    {
        region: "Shanthipuram",
        noEx: 7, exList: "33, 35, 44-48",
        noAdd: 3, addList: "OT14 to OT16",
        total: 10,
        dischEx: 105.9, dischAdd: 61.8, dischTotal: 167.7
    },
    {
        region: "KADA Region",
        noEx: 27, exList: "-",
        noAdd: 16, addList: "-",
        total: 43,
        dischEx: 388.5, dischAdd: 167.5, dischTotal: 556.0,
        isTotal: true
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function HnssLinkedPage() {
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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <GitMerge size={14} />
                        Network Integration
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight">
                                HNSS Linked <span className="text-cyan-600">MI Tanks</span>
                            </h1>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Detailed inventory of tanks connected to the Handri-Neeva Sujala Sravanthi canal network.
                                Analysis of storage capacity augmentation, register command area, and Off-Take Sluice (OTS) discharge planning.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-cyan-600 mb-2">
                                        <Database size={20} />
                                        <span className="font-bold">Total Storage</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">456.84 <span className="text-sm font-normal text-slate-500">MCFT</span></p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-cyan-600 mb-2">
                                        <Layout size={20} />
                                        <span className="font-bold">Command Area</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">4538 <span className="text-sm font-normal text-slate-500">Acres</span></p>
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
                                src="/images/about-kada/mitank.png"
                                alt="HNSS Linked MI Tanks Map"
                                title="HNSS Linked Network"
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
                    {/* Section 1: Storage Capacity */}
                    <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600">
                                    <Database size={20} />
                                </span>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">HNSS Linked MI Tanks Storage Capacity</h2>
                                    <p className="text-sm text-slate-500">Existing vs Additional Capacity (MCFT)</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                    <tr>
                                        <th rowSpan={2} className="px-6 py-4 border-r border-slate-200">Region</th>
                                        <th colSpan={3} className="px-6 py-2 text-center border-b border-slate-200 bg-blue-50/30">Tanks Linked to OTS</th>
                                        <th colSpan={3} className="px-6 py-2 text-center border-b border-slate-200 bg-emerald-50/30">Storage Capacity (MCFT)</th>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-right bg-blue-50/30">Ex OTs</th>
                                        <th className="px-4 py-2 text-right bg-blue-50/30">Add OTs</th>
                                        <th className="px-4 py-2 text-right font-bold bg-blue-50/30">Total</th>
                                        <th className="px-4 py-2 text-right bg-emerald-50/30">Existing</th>
                                        <th className="px-4 py-2 text-right bg-emerald-50/30">Additional</th>
                                        <th className="px-4 py-2 text-right font-bold bg-emerald-50/30">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {STORAGE_CAPACITY_DATA.map((row, idx) => (
                                        <tr key={idx} className={clsx("transition-colors hover:bg-slate-50", row.isTotal ? "bg-slate-100 font-bold text-slate-900" : "text-slate-600")}>
                                            <td className="px-6 py-4 font-medium border-r border-slate-100">{row.region}</td>
                                            <td className="px-4 py-4 text-right bg-blue-50/5">{row.exOTs}</td>
                                            <td className="px-4 py-4 text-right bg-blue-50/5">{row.addOTs}</td>
                                            <td className="px-4 py-4 text-right font-semibold bg-blue-50/10">{row.totalOTs}</td>
                                            <td className="px-4 py-4 text-right bg-emerald-50/5">{row.exStorage.toFixed(2)}</td>
                                            <td className="px-4 py-4 text-right bg-emerald-50/5">{row.addStorage.toFixed(2)}</td>
                                            <td className="px-4 py-4 text-right font-semibold bg-emerald-50/10">{row.totalStorage.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Section 2: Registered Command */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
                                        <Layout size={20} />
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">Registered Command Area</h2>
                                        <p className="text-sm text-slate-500">Area in Acres (Existing vs Additional)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto flex-grow">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-5 py-3">Region</th>
                                            <th className="px-5 py-3 text-right">Existing</th>
                                            <th className="px-5 py-3 text-right">Additional</th>
                                            <th className="px-5 py-3 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {REGISTERED_COMMAND_DATA.map((row, idx) => (
                                            <tr key={idx} className={clsx("hover:bg-slate-50/80 transition-colors", row.isTotal ? "bg-indigo-50/50 font-bold text-slate-900" : "text-slate-600")}>
                                                <td className="px-5 py-3 font-medium">{row.region}</td>
                                                <td className="px-5 py-3 text-right">{row.existing.toFixed(1)}</td>
                                                <td className="px-5 py-3 text-right">{row.additional.toFixed(1)}</td>
                                                <td className="px-5 py-3 text-right font-bold">{row.total.toFixed(1)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Section 3: OTS Discharge */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600">
                                        <Droplets size={20} />
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">OTS Designed Discharge</h2>
                                        <p className="text-sm text-slate-500">Discharge in Cusecs</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto flex-grow">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3">Region</th>
                                            <th className="px-3 py-3 text-right">Ex OTs</th>
                                            <th className="px-3 py-3 text-right">Add OTs</th>
                                            <th className="px-3 py-3 text-right">Total</th>
                                            <th className="px-4 py-3 text-right">Total Disch.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {OTS_DISCHARGE_DATA.map((row, idx) => (
                                            <tr key={idx} className={clsx("hover:bg-slate-50/80 transition-colors", row.isTotal ? "bg-orange-50/50 font-bold text-slate-900" : "text-slate-600")}>
                                                <td className="px-4 py-3 font-medium">
                                                    {row.region}
                                                    {!row.isTotal && (
                                                        <div className="text-[10px] text-slate-400 font-normal mt-0.5 max-w-[100px] truncate" title={`Ex: ${row.exList}, Add: ${row.addList}`}>
                                                            Includes {row.exList}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-right">{row.noEx}</td>
                                                <td className="px-3 py-3 text-right">{row.noAdd}</td>
                                                <td className="px-3 py-3 text-right font-medium">{row.total}</td>
                                                <td className="px-4 py-3 text-right font-bold text-orange-700">{row.dischTotal.toFixed(1)}</td>
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
