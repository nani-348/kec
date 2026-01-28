"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowUp, TrendingUp, BarChart3, Layout } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import clsx from "clsx";

// --- Data Constants ---
const STORAGE_CHANGE_DATA = [
    { region: "GUDI PALLE", lastYear: 28.86, current: 122.9, improvement: 94.04, percent: 307 },
    { region: "KUPPAM", lastYear: 50.87, current: 121.08, improvement: 70.21, percent: 138 },
    { region: "RAMA KUPPAM", lastYear: 8.26, current: 88.26, improvement: 80, percent: 968 },
    { region: "SANTHI PURAM", lastYear: 61.28, current: 168.36, improvement: 107.08, percent: 175 },
    { region: "KADA Region", lastYear: 149.27, current: 500.6, improvement: 351.33, percent: 232, isTotal: true },
];

const TOTAL_STATS = [
    { name: "Last Year Storage", value: 149.27, fill: "#3b82f6" },
    { name: "Current Storage", value: 500.6, fill: "#10b981" },
    { name: "Increase in Storage", value: 351.33, fill: "#f59e0b" }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StorageChangePage() {
    // Force HMR Refresh
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Scetion */}
                <div className="mb-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <TrendingUp size={14} />
                        Performance Analysis
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight">
                            MI Tank Storage <span className="text-emerald-600">Change Report</span>
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            A comparative analysis of water storage levels against the previous year.
                            Highlighting significant improvements in water retention across the KADA region.
                        </p>
                    </motion.div>

                    {/* Top Level KPI */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Last Year Total</p>
                            <p className="text-3xl font-bold text-slate-600 mt-2">149.27 <span className="text-sm font-normal text-slate-400">MCFT</span></p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 ring-1 ring-emerald-50">
                            <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Current Total</p>
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-4xl font-bold text-slate-900">500.60 <span className="text-sm font-normal text-slate-400">MCFT</span></p>
                                <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">+232%</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl shadow-lg text-white">
                            <p className="text-sm font-bold text-emerald-100 uppercase tracking-wide">Net Improvement</p>
                            <div className="flex items-center gap-2 mt-2">
                                <ArrowUp size={32} className="text-emerald-200" />
                                <p className="text-4xl font-bold">351.33 <span className="text-sm font-normal text-emerald-200">MCFT</span></p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Charts Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
                >
                    {/* Bar Chart: Region Wise Comparison */}
                    <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <BarChart3 size={18} className="text-blue-500" />
                                    Regional Storage Change
                                </h3>
                                <p className="text-xs text-slate-500">Last Year vs Current Year (MCFT)</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={STORAGE_CHANGE_DATA.filter(d => !d.isTotal)}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    barGap={8}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="region" tick={{ fontSize: 10, fill: "#64748b" }} interval={0} />
                                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="lastYear" name="Last Year Storage" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                    <Bar dataKey="current" name="Current Storage" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Bar Chart: Overall Performance */}
                    <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-emerald-500" />
                                    Overall MI Tank Storage Change
                                </h3>
                                <p className="text-xs text-slate-500">Aggregated Impact (MCFT)</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={TOTAL_STATS}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                    />
                                    <Bar dataKey="value" name="Volume (MCFT)" radius={[4, 4, 0, 0]} maxBarSize={60} fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Data Table */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
                                <Layout size={20} />
                            </span>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">MI Tank Storage Change Report</h2>
                                <p className="text-sm text-slate-500">Comparison by Region</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 border-r border-slate-200">Region</th>
                                    <th className="px-4 py-4 text-right border-r border-slate-200 bg-blue-50/20">Last Year Storage <span className="text-[10px] text-slate-400 block">(mcft)</span></th>
                                    <th className="px-4 py-4 text-right border-r border-slate-200 bg-emerald-50/20">Current Storage <span className="text-[10px] text-slate-400 block">(mcft)</span></th>
                                    <th className="px-4 py-4 text-right border-r border-slate-200 bg-amber-50/20">Improvement <span className="text-[10px] text-slate-400 block">(mcft)</span></th>
                                    <th className="px-4 py-4 text-right bg-indigo-50/20">Growth <span className="text-[10px] text-slate-400 block">(%)</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {STORAGE_CHANGE_DATA.map((row, idx) => (
                                    <tr key={idx} className={clsx("transition-colors hover:bg-slate-50", row.isTotal ? "bg-slate-900 text-white font-bold" : "text-slate-600")}>
                                        <td className="px-6 py-4 font-medium border-r border-slate-100/10">{row.region}</td>
                                        <td className={clsx("px-4 py-4 text-right tabular-nums border-r border-slate-100/10", !row.isTotal && "bg-blue-50/5")}>{row.lastYear.toFixed(2)}</td>
                                        <td className={clsx("px-4 py-4 text-right tabular-nums border-r border-slate-100/10", !row.isTotal && "bg-emerald-50/5 font-medium text-slate-800")}>{row.current.toFixed(1)}</td>
                                        <td className={clsx("px-4 py-4 text-right tabular-nums border-r border-slate-100/10 font-bold", row.isTotal ? "text-emerald-400" : "text-emerald-600 bg-amber-50/5")}>{row.improvement.toFixed(2)}</td>
                                        <td className={clsx("px-4 py-4 text-right tabular-nums", row.isTotal ? "text-white" : "text-indigo-600 bg-indigo-50/5")}>
                                            <span className={clsx("px-2 py-0.5 rounded", row.isTotal ? "bg-white/20" : "bg-indigo-50")}>
                                                {row.percent}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
