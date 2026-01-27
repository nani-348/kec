"use client";

import React, { useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Droplets,
    ArrowUp,
    ArrowDown,
    Activity,
    Scale,
    CloudRain,
    Sprout,
    Home,
    Factory,
    Info
} from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { motion, useInView, animate } from "framer-motion";

// --- Mock Data Models ---

// Water Budget Summary
const BUDGET_SUMMARY = {
    dynamicResource: 15400, // MCM (Million Cubic Meters)
    grossDraft: 9800,       // MCM
    netAvailability: 5600,  // MCM
    stageOfDevelopment: 63.6 // %
};

// Recharge Sources Data
const RECHARGE_DATA = [
    { name: "Rainfall", value: 65, color: "#0ea5e9", icon: <CloudRain size={16} /> },
    { name: "Canal Seepage", value: 15, color: "#3b82f6", icon: <Droplets size={16} /> },
    { name: "Return Flow", value: 12, color: "#6366f1", icon: <ArrowDown size={16} /> },
    { name: "Surface Water Bodies", value: 8, color: "#818cf8", icon: <Activity size={16} /> },
];

// Draft Utilization Data
const DRAFT_DATA = [
    { name: "Irrigation", value: 8500, color: "#10b981", icon: <Sprout size={16} /> },
    { name: "Domestic", value: 800, color: "#f59e0b", icon: <Home size={16} /> },
    { name: "Industrial", value: 500, color: "#6366f1", icon: <Factory size={16} /> },
];

// --- Components ---

const Counter = ({ value, decimals = 0, duration = 2 }: { value: number, decimals?: number, duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = latest.toLocaleString("en-US", {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals,
                        });
                    }
                },
            });
            return () => controls.stop();
        }
    }, [isInView, value, decimals, duration]);

    return <span ref={ref} className="tabular-nums opacity-0 animate-fade-in">{0}</span>;
};

// --- Animations ---

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardHover = {
    rest: { scale: 1, y: 0, transition: { duration: 0.2 } },
    hover: { scale: 1.02, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.01)", transition: { duration: 0.2 } }
};

export default function AvailabilityPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <motion.main
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl"
            >

                {/* Hero Section */}
                <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Groundwater Availability & Balance
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Comprehensive assessment of the aquifer&apos;s <span className="font-semibold text-blue-600">Replenishable Resources</span> versus <span className="font-semibold text-red-600">Extraction Draft</span>.
                    </p>
                </motion.div>

                {/* Summary Metrics Cards */}
                <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Dynamic Resource */}
                    <motion.div
                        variants={fadeInUp}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        custom={cardHover}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group transition-all"
                    >
                        <motion.div
                            variants={cardHover}
                            className="bg-white rounded-2xl h-full w-full absolute inset-0 -z-10"
                        />
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <Droplets size={64} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Dynamic Resource</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                <Counter value={BUDGET_SUMMARY.dynamicResource} />
                            </span>
                            <span className="text-xs text-gray-400 font-medium">MCM</span>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit">
                            <ArrowUp size={12} className="mr-1" />
                            Annual Replenishable
                        </div>
                    </motion.div>

                    {/* Gross Draft */}
                    <motion.div
                        variants={fadeInUp}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        custom={cardHover}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group transition-all"
                    >
                        <motion.div
                            variants={cardHover}
                            className="bg-white rounded-2xl h-full w-full absolute inset-0 -z-10"
                        />
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <ArrowDown size={64} className="text-amber-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Gross Draft</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                <Counter value={BUDGET_SUMMARY.grossDraft} />
                            </span>
                            <span className="text-xs text-gray-400 font-medium">MCM</span>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full w-fit">
                            <Activity size={12} className="mr-1" />
                            Total Extraction
                        </div>
                    </motion.div>

                    {/* Net Availability */}
                    <motion.div
                        variants={fadeInUp}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        custom={cardHover}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group transition-all"
                    >
                        <motion.div
                            variants={cardHover}
                            className="bg-white rounded-2xl h-full w-full absolute inset-0 -z-10"
                        />
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <Scale size={64} className="text-emerald-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Net Availability</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                <Counter value={BUDGET_SUMMARY.netAvailability} />
                            </span>
                            <span className="text-xs text-gray-400 font-medium">MCM</span>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                            <Info size={12} className="mr-1" />
                            Available for Future
                        </div>
                    </motion.div>

                    {/* Stage of Development */}
                    <motion.div
                        variants={fadeInUp}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        custom={cardHover}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group transition-all"
                    >
                        <motion.div
                            variants={cardHover}
                            className="bg-white rounded-2xl h-full w-full absolute inset-0 -z-10"
                        />
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <Activity size={64} className="text-purple-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Stage of Dev.</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                <Counter value={BUDGET_SUMMARY.stageOfDevelopment} decimals={1} />%
                            </span>
                            <span className="text-xs text-gray-400 font-medium">Safe</span>
                        </div>
                        <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${BUDGET_SUMMARY.stageOfDevelopment}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full"
                            ></motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Analytical Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Recharge Mix Pie Chart */}
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Recharge Composition</h3>
                            <p className="text-sm text-gray-500">Contribution of various sources to aquifer replenishment</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="h-[250px] w-full md:w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={RECHARGE_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            isAnimationActive={true}
                                            animationDuration={1500}
                                            animationBegin={200}
                                        >
                                            {RECHARGE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`${value ?? 0}%`, 'Contribution']}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                {RECHARGE_DATA.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white shadow-sm text-gray-700" style={{ color: item.color }}>
                                                {item.icon}
                                            </div>
                                            <span className="font-medium text-gray-700 text-sm">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.value}%</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Draft Profile Bar Chart */}
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Extraction Profile</h3>
                            <p className="text-sm text-gray-500">Sector-wise groundwater draft utilization (MCM)</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={DRAFT_DATA}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        width={100}
                                        tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`${value ?? 0} MCM`, 'Draft']}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} animationDuration={1500} animationBegin={200}>
                                        {DRAFT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                </div>

                {/* Conceptual Water Balance Equation */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
                >
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-bold font-serif mb-10">Water Balance Equation</h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">

                            {/* Inflow */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm border border-emerald-500/30"
                                >
                                    <CloudRain size={32} className="text-emerald-400" />
                                </motion.div>
                                <div>
                                    <p className="text-xs text-emerald-400 font-bold tracking-wider uppercase mb-1">Inflow</p>
                                    <p className="text-xl font-bold">Recharge</p>
                                </div>
                            </motion.div>

                            {/* Operator */}
                            <div className="text-4xl font-light text-slate-500">−</div>

                            {/* Outflow */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                    className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center backdrop-blur-sm border border-amber-500/30"
                                >
                                    <ArrowUp size={32} className="text-amber-400" />
                                </motion.div>
                                <div>
                                    <p className="text-xs text-amber-400 font-bold tracking-wider uppercase mb-1">Outflow</p>
                                    <p className="text-xl font-bold">Draft</p>
                                </div>
                            </motion.div>

                            {/* Operator */}
                            <div className="text-4xl font-light text-slate-500">=</div>

                            {/* Storage Change */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                                    className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/30"
                                >
                                    <Scale size={32} className="text-blue-400" />
                                </motion.div>
                                <div>
                                    <p className="text-xs text-blue-400 font-bold tracking-wider uppercase mb-1">Result</p>
                                    <p className="text-xl font-bold">Change in Storage</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mt-10 max-w-2xl mx-auto text-slate-400 text-sm leading-relaxed"
                        >
                            The groundwater balance is defined as the difference between the total annual replenishable recharge and the total annual extraction. A positive balance indicates a surplus (safe), while a negative balance indicates over-exploitation.
                        </motion.div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                            className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                        ></motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
                        ></motion.div>
                    </div>
                </motion.div>

            </motion.main>
            <Footer />
        </div>
    );
}
