"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveMap from "@/components/overview/InteractiveMap";
import { ArrowDown, ArrowUp, Droplets, Activity, Layers, TrendingUp, Info } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LabelList, Legend, Cell
} from "recharts";
import clsx from "clsx";

export default function CurrentStatusPage() {
    // Data Updated from User Image
    const waterLevelData = [
        {
            name: "Previous Year (2024)",
            rise: 1.68,
            preMonsoon: 19.67,
            postMonsoon: 17.99,
            color: "#94a3b8"
        },
        {
            name: "Present Year (2025)",
            rise: 5.04,
            preMonsoon: 20.30,
            postMonsoon: 15.26,
            color: "#3b82f6"
        }
    ];

    const comparisonData = [
        { name: "Prev Water Year (2024)", rise: 1.68, fill: "#94a3b8" },
        { name: "Present Water Year (2025)", rise: 5.04, fill: "#3b82f6" }
    ];

    const zoneAreaData = [
        {
            period: "Premonsoon / May",
            less3m: 0,
            range3to8m: 7.7,
            range8to20m: 53.8,
            more20m: 38.5
        },
        {
            period: "Post Monsoon / Nov 2024",
            less3m: 7.7,
            range3to8m: 7.7,
            range8to20m: 53.8,
            more20m: 30.8
        },
        {
            period: "Post Monsoon / Nov 2025",
            less3m: 7.7,
            range3to8m: 15.4,
            range8to20m: 53.8,
            more20m: 23.1
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4 leading-tight">
                        Current Groundwater Level Status
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Influence of additional recharge due to filling of MI Tanks through <span className="font-semibold text-blue-700">HNSS canal releases</span> in KADA.
                    </p>
                </div>

                {/* Comparison Card (Replaces KPI Grid logic with specific requested data) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2 bg-gradient-to-r from-blue-50 to-white">
                        <Droplets className="text-blue-600" size={20} />
                        <h2 className="font-bold text-gray-800 text-lg">Monsoon Rise Analysis</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Comparison Table */}
                        <div className="p-0 border-r border-gray-100 overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-blue-600 text-white uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Region</th>
                                        <th className="px-6 py-4">Period</th>
                                        <th className="px-6 py-4 text-center">Monsoon Rise in<br />GW Levels</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    <tr className="hover:bg-gray-50">
                                        <td rowSpan={2} className="px-6 py-4 font-bold text-gray-900 align-top border-r border-gray-50">
                                            KADA Region
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <span className="font-bold block mb-1">Previous Water Year</span>
                                            (May 2024 - Nov 2024)
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="font-bold text-gray-900 text-lg">1.68 m</div>
                                            <div className="text-xs text-gray-500 font-mono">(19.67 - 17.99)</div>
                                        </td>
                                    </tr>
                                    <tr className="bg-blue-50/30 hover:bg-blue-50/50">
                                        <td className="px-6 py-4 text-gray-700">
                                            <span className="font-bold block mb-1 text-blue-800">Present Water Year</span>
                                            (May 2025 - Nov 2025)
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="font-bold text-blue-700 text-xl">5.04 m</div>
                                            <div className="text-xs text-gray-500 font-mono">(20.30 - 15.26)</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Chart */}
                        <div className="p-6 flex flex-col justify-center bg-gray-50/30">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6 text-center">Comparative Rise (Meters)</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={comparisonData} layout="vertical" margin={{ left: 20, right: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11, fontWeight: 600 }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="rise" barSize={32} radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="rise" position="right" formatter={(val) => val != null ? `${val} m` : ''} style={{ fontWeight: 'bold' }} />
                                            {comparisonData.map((entry, index) => (
                                                <Cell key={index} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Observations List */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                            <Info className="text-amber-500" /> Key Observations
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed p-3 bg-gray-50 rounded-lg">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                <span>
                                    <strong>Reference Water Level:</strong> Decadal / Last 10 years Premonsoon Average Ground water level in KADA is about <span className="font-bold">18.31 m bgl</span>.
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed p-3 bg-gray-50 rounded-lg">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                <span>
                                    <strong>Previous Water Year (2024):</strong> Monsoon Rise is <span className="font-bold">1.68 m</span> (from 19.67 m to 17.99 m), which is <span className="font-bold text-blue-700">9.17%</span> of Reference Water level.
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></div>
                                <span>
                                    <strong>Present Water Year (2025):</strong> Monsoon Rise is <span className="text-xl font-bold text-blue-700 block my-1">5.04 m</span> (from 20.30 m to 15.26 m), which is <span className="font-bold text-blue-700">27.52%</span> of Reference Water level.
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed p-3 bg-green-50 border border-green-100 rounded-lg">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-600 shrink-0"></div>
                                <span>
                                    <strong>Net Improvement:</strong> Increase in Monsoon Rise is about <span className="font-bold text-green-700">3.36 m</span> (from 1.68 to 5.04 m). This increase represents <span className="font-bold text-green-700">18.35%</span> of the Reference Water level.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex-grow flex flex-col justify-center">
                            <div className="relative z-10">
                                <h3 className="font-serif text-2xl font-bold mb-4 text-indigo-100">Zone Shift Analysis</h3>
                                <p className="text-blue-200/90 leading-relaxed mb-6">
                                    About <span className="text-white font-bold text-lg">8% area increased</span> in Shallow Water zone (3-8 m Zone) and about <span className="text-white font-bold text-lg">8% area reduced</span> in Deep Water Zone (&gt;20m Zone).
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300/60">
                                    <Activity size={16} /> Significant Recovery
                                </div>
                            </div>
                            <Activity className="absolute bottom-[-20px] right-[-20px] text-white/5 w-40 h-40" />
                        </div>
                    </div>
                </div>

                {/* Zone Area Table Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="text-gray-400" size={20} />
                            <h3 className="font-bold text-gray-800">Zone Area Distribution (%)</h3>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center">
                            <thead>
                                <tr className="bg-gray-100 text-xs uppercase font-bold text-gray-600 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left w-1/4">Period</th>
                                    <th className="px-6 py-4 bg-cyan-500 text-white">&lt; 3m</th>
                                    <th className="px-6 py-4 bg-green-500 text-white">3 - 8m</th>
                                    <th className="px-6 py-4 bg-yellow-500 text-white">8 - 20m</th>
                                    <th className="px-6 py-4 bg-red-500 text-white">&gt; 20m</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {zoneAreaData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors bg-white">
                                        <td className="px-6 py-4 font-bold text-gray-900 text-left border-r border-gray-100">
                                            {row.period}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-medium tabular-nums">{row.less3m}</td>
                                        <td className="px-6 py-4 text-gray-700 font-medium tabular-nums bg-green-50/30">{row.range3to8m}</td>
                                        <td className="px-6 py-4 text-gray-700 font-medium tabular-nums">{row.range8to20m}</td>
                                        <td className="px-6 py-4 text-gray-700 font-medium tabular-nums bg-red-50/20">{row.more20m}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-gray-50 text-xs text-center text-gray-500 border-t border-gray-100">
                        Shows the percentage of KADA Region area falling within specific groundwater depth zones.
                    </div>
                </div>

                {/* Spatial Distribution Map (Leftover from previous design, useful context) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Layers size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Spatial Context: Pre vs Post Monsoon</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <InteractiveMap
                            src="/images/about-kada/page5_img44.png"
                            alt="Pre-Monsoon Water Levels"
                            title="Pre-Monsoon Depth (May '25)"
                            className="h-[350px]"
                        />
                        <InteractiveMap
                            src="/images/about-kada/page5_img45.png"
                            alt="Post-Monsoon Water Levels"
                            title="Post-Monsoon Depth (Nov '25)"
                            className="h-[350px]"
                        />
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
