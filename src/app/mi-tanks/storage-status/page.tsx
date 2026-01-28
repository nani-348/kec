"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";
import {
    Droplets,
    PieChart as PieChartIcon,
    BarChart3,
    ArrowUpRight,
    Layout,
    Database
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { motion } from "framer-motion";
import clsx from "clsx";

// --- Real Data Constants ---

const STORAGE_DATA = [
    { name: "GUDI PALLE", capacity: 232.61, current: 122.9 },
    { name: "KUPPAM", capacity: 336.66, current: 121.08 },
    { name: "RAMA KUPPAM", capacity: 325.95, current: 88.26 },
    { name: "SANTHI PURAM", capacity: 301.16, current: 168.36 },
];

const FILLING_STATUS_DATA = [
    { name: "100% Filled", value: 95, color: "#3b82f6" }, // Blue
    { name: "75% Filled", value: 63, color: "#f59e0b" }, // Amber
    { name: "50% Filled", value: 93, color: "#94a3b8" }, // Gray
    { name: "25% Filled", value: 112, color: "#fbbf24" }, // Yellow
    { name: "0% Filled", value: 192, color: "#64748b" }, // Slate
];

const TABLE_DATA = [
    { region: "GUDI PALLE", tanks: 182, capacity: 232.61, current: 122.9, percent: 52.84, full: 41, p75: 19, p50: 30, p25: 30, p0: 62 },
    { region: "KUPPAM", tanks: 129, capacity: 336.66, current: 121.08, percent: 35.97, full: 37, p75: 4, p50: 8, p25: 28, p0: 52 },
    { region: "RAMA KUPPAM", tanks: 133, capacity: 325.95, current: 88.26, percent: 27.08, full: 12, p75: 6, p50: 9, p25: 31, p0: 75 },
    { region: "SANTHI PURAM", tanks: 111, capacity: 301.16, current: 168.36, percent: 55.9, full: 5, p75: 34, p50: 46, p25: 23, p0: 3 },
    { region: "KADA Region", tanks: 555, capacity: 1196.38, current: 500.6, percent: 41.8, full: 95, p75: 63, p50: 93, p25: 112, p0: 192, isTotal: true },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StorageStatusPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero / Header */}
                <div className="mb-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <Database size={14} />
                        Real-Time Monitoring
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight">
                                MI Tank Current <span className="text-blue-600">Storage/Filling Report</span>
                            </h1>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Comprehensive analysis of Minor Irrigation tank storage levels across the KADA region.
                                Tracking capacity utilization and filling status distribution.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Database size={20} />
                                        <span className="font-bold">Total Storage</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-slate-900">500.6</p>
                                        <span className="text-sm font-medium text-slate-500">MCFT</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">out of 1196.38 Capacity</p>
                                </div>
                                <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                        <PieChartIcon size={20} />
                                        <span className="font-bold">Avg Filling</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-slate-900">41.8%</p>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Regional Average</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Reference Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200"
                        >
                            <MagnifyingImageViewer
                                src="/images/about-kada/micurrent.jpg"
                                alt="MI Tank Current Storage Report"
                                title="Current Storage Status"
                                className="aspect-[4/3] bg-slate-100"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Charts Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
                >
                    {/* Storage Chart */}
                    <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <BarChart3 size={18} className="text-blue-500" />
                                    MI Tanks Storage vs Capacity
                                </h3>
                                <p className="text-xs text-slate-500">MCFT (Million Cubic Feet)</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={STORAGE_DATA}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    barGap={8}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="capacity" name="Total Capacity" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                    <Bar dataKey="current" name="Current Storage" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Filling Status Donut Chart */}
                    <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <PieChartIcon size={18} className="text-emerald-500" />
                                    Filling Status Distribution
                                </h3>
                                <p className="text-xs text-slate-500">Number of Tanks by Fill Level</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={FILLING_STATUS_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {FILLING_STATUS_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-900">555</p>
                                    <p className="text-xs text-slate-500 font-medium uppercase">Total Tanks</p>
                                </div>
                            </div>
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
                                <h2 className="text-xl font-bold text-slate-800">MI Tank Current Storage / Filling Report</h2>
                                <p className="text-sm text-slate-500">Detailed Regional Breakdown</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                <tr>
                                    <th rowSpan={2} className="px-6 py-4 border-r border-slate-200">Region</th>
                                    <th rowSpan={2} className="px-4 py-4 text-right border-r border-slate-200">No. of Tanks</th>
                                    <th colSpan={3} className="px-4 py-2 text-center border-b border-r border-slate-200 bg-blue-50/20">Storage Analysis</th>
                                    <th colSpan={5} className="px-4 py-2 text-center border-b border-slate-200 bg-emerald-50/20">No. of Tanks with Filling Status</th>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 text-right bg-blue-50/20">Capacity <span className="text-[10px] text-slate-400 block">(mcft)</span></th>
                                    <th className="px-4 py-2 text-right bg-blue-50/20">Current <span className="text-[10px] text-slate-400 block">(mcft)</span></th>
                                    <th className="px-4 py-2 text-right bg-blue-50/20">% Fill</th>
                                    <th className="px-3 py-2 text-center bg-emerald-50/20 text-blue-600">Full</th>
                                    <th className="px-3 py-2 text-center bg-emerald-50/20 text-amber-600">75%</th>
                                    <th className="px-3 py-2 text-center bg-emerald-50/20 text-slate-500">50%</th>
                                    <th className="px-3 py-2 text-center bg-emerald-50/20 text-yellow-600">25%</th>
                                    <th className="px-3 py-2 text-center bg-emerald-50/20 text-slate-400">0%</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {TABLE_DATA.map((row, idx) => (
                                    <tr key={idx} className={clsx("transition-colors hover:bg-slate-50", row.isTotal ? "bg-slate-100 font-bold text-slate-900" : "text-slate-600")}>
                                        <td className="px-6 py-4 font-medium border-r border-slate-100">{row.region}</td>
                                        <td className="px-4 py-4 text-right border-r border-slate-100">{row.tanks}</td>

                                        <td className="px-4 py-4 text-right tabular-nums bg-blue-50/5 border-r border-slate-100">{row.capacity.toFixed(2)}</td>
                                        <td className="px-4 py-4 text-right tabular-nums bg-blue-50/5 border-r border-slate-100 font-medium text-slate-800">{row.current.toFixed(2)}</td>
                                        <td className="px-4 py-4 text-right tabular-nums bg-blue-50/5 border-r border-slate-100">
                                            <span className={clsx("px-1.5 py-0.5 rounded text-xs", row.percent > 50 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                                                {row.percent}%
                                            </span>
                                        </td>

                                        <td className="px-3 py-4 text-center tabular-nums bg-emerald-50/5 text-blue-600 font-medium border-r border-slate-100">{row.full}</td>
                                        <td className="px-3 py-4 text-center tabular-nums bg-emerald-50/5 border-r border-slate-100">{row.p75}</td>
                                        <td className="px-3 py-4 text-center tabular-nums bg-emerald-50/5 border-r border-slate-100">{row.p50}</td>
                                        <td className="px-3 py-4 text-center tabular-nums bg-emerald-50/5 border-r border-slate-100">{row.p25}</td>
                                        <td className="px-3 py-4 text-center tabular-nums bg-emerald-50/5 text-slate-400">{row.p0}</td>
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
