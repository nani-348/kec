"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Droplets,
    TrendingUp,
    BarChart3,
    Info,
    MapPin,
    Calendar,
    ArrowUpRight
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
    Cell,
    LabelList
} from "recharts";

// --- Data: Ground Water Resources by Region ---
const GWR_DATA = [
    { region: "GUDI PALLE", june2024: 0.152, feb2025: 0.074, june2025: 0.154, jan2026: 0.292 },
    { region: "KUPPAM", june2024: 0.359, feb2025: 1.064, june2025: 0.366, jan2026: 0.742 },
    { region: "RAMA KUPPAM", june2024: 0.148, feb2025: 0.206, june2025: 0.151, jan2026: 0.667 },
    { region: "SANTHI PURAM", june2024: 0.215, feb2025: 0.437, june2025: 0.219, jan2026: 0.466 },
    { region: "KADA Region", june2024: 0.87, feb2025: 1.51, june2025: 0.89, jan2026: 2.22 },
];

// KADA Region Data for second chart
const KADA_REGION_DATA = [
    { period: "June 2024", value: 0.87, color: "#3b82f6" },
    { period: "Feb 2025", value: 1.51, color: "#f97316" },
    { period: "June 2025", value: 0.89, color: "#9ca3af" },
    { period: "Jan 2026", value: 2.22, color: "#f59e0b" },
];

// Chart colors
const CHART_COLORS = {
    june2024: "#3b82f6",
    feb2025: "#f97316",
    june2025: "#9ca3af",
    jan2026: "#f59e0b"
};

// Key Insights
const KEY_INSIGHTS = [
    {
        title: "Net Annual Improvement",
        value: "0.71 TMC",
        description: "Improvement in utilizable ground water resources in KADA Region from 1.51 TMC of Feb-2025 to 2.22 TMC of Jan 2026 due to net rise in ground water levels of 1.45 m (from 17.62 to 16.27)",
        color: "green",
        icon: TrendingUp
    },
    {
        title: "Present Water Year Improvement",
        value: "1.33 TMC",
        description: "Net seasonal improvement from 0.89 TMC of June-2025 to 2.22 TMC of Jan 2026",
        color: "blue",
        icon: Droplets
    },
    {
        title: "Past Water Year Improvement",
        value: "0.64 TMC",
        description: "Net seasonal improvement from 0.87 TMC of June-2024 to 1.51 TMC of Feb 2025",
        color: "amber",
        icon: BarChart3
    }
];

// Custom tooltip for the grouped bar chart
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-semibold">{entry.value.toFixed(3)} TMC</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// Custom tooltip for KADA region chart
const KADATooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { period: string; value: number } }> }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <p className="font-bold text-gray-800">{payload[0].payload.period}</p>
                <p className="text-lg font-bold text-cyan-600">{payload[0].payload.value.toFixed(2)} TMC</p>
            </div>
        );
    }
    return null;
};

export default function MonthlyGWRPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wide mb-4">
                        <Droplets size={14} />
                        Monthly Ground Water Resources
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Utilizable Ground Water Resources
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        The monthly Utilizable Ground Water Resources of the KADA region are estimated on integrating the <strong>Annual Ground Water Resources estimation results</strong> with <strong>Monthly Ground Water Levels</strong> change in the region.
                    </p>
                </div>

                {/* Key Insights Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {KEY_INSIGHTS.map((insight, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl shadow-sm border p-6 relative overflow-hidden
                                ${insight.color === 'green' ? 'border-green-100' :
                                    insight.color === 'blue' ? 'border-blue-100' : 'border-amber-100'}`}
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20
                                ${insight.color === 'green' ? 'bg-green-400' :
                                    insight.color === 'blue' ? 'bg-blue-400' : 'bg-amber-400'}`}
                            ></div>
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                                ${insight.color === 'green' ? 'bg-green-100 text-green-600' :
                                    insight.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}
                            >
                                <insight.icon size={24} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">{insight.title}</h3>
                            <p className={`text-3xl font-bold mb-3
                                ${insight.color === 'green' ? 'text-green-600' :
                                    insight.color === 'blue' ? 'text-blue-600' : 'text-amber-600'}`}
                            >
                                {insight.value}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-10">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 font-serif mb-6 flex items-center gap-3">
                        <BarChart3 className="text-cyan-600" size={24} />
                        Visual Analysis
                    </h2>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                        {/* Chart 1: Monthly Ground Water Resources by Region */}
                        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <MapPin size={18} className="text-cyan-600" />
                                Monthly Ground Water Resources
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">Comparison of GW resources across all mandals (in TMC)</p>

                            <div className="h-[350px] sm:h-[400px] md:h-[450px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={GWR_DATA}
                                        margin={{ top: 30, right: 20, left: 10, bottom: 60 }}
                                        barCategoryGap="15%"
                                        barGap={2}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                        <XAxis
                                            dataKey="region"
                                            tick={{ fontSize: 10, fill: '#374151' }}
                                            angle={-20}
                                            textAnchor="end"
                                            height={60}
                                            interval={0}
                                            tickLine={false}
                                            axisLine={{ stroke: '#d1d5db' }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11, fill: '#374151' }}
                                            label={{
                                                value: 'GW Resources (in TMC)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 11 },
                                                offset: 10
                                            }}
                                            domain={[0, 'auto']}
                                            tickLine={false}
                                            axisLine={{ stroke: '#d1d5db' }}
                                            allowDecimals={true}
                                            tickFormatter={(value) => value.toFixed(1)}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                                        <Legend
                                            wrapperStyle={{ paddingTop: 15, fontSize: 11 }}
                                            iconType="square"
                                            iconSize={10}
                                        />
                                        <Bar
                                            dataKey="june2024"
                                            name="June 2024"
                                            fill={CHART_COLORS.june2024}
                                            radius={[3, 3, 0, 0]}
                                            maxBarSize={35}
                                        >
                                            <LabelList dataKey="june2024" position="top" fontSize={8} fill="#374151" formatter={(value) => typeof value === 'number' ? value.toFixed(3) : value} />
                                        </Bar>
                                        <Bar
                                            dataKey="feb2025"
                                            name="Feb 2025"
                                            fill={CHART_COLORS.feb2025}
                                            radius={[3, 3, 0, 0]}
                                            maxBarSize={35}
                                        >
                                            <LabelList dataKey="feb2025" position="top" fontSize={8} fill="#374151" formatter={(value) => typeof value === 'number' ? value.toFixed(3) : value} />
                                        </Bar>
                                        <Bar
                                            dataKey="june2025"
                                            name="June 2025"
                                            fill={CHART_COLORS.june2025}
                                            radius={[3, 3, 0, 0]}
                                            maxBarSize={35}
                                        >
                                            <LabelList dataKey="june2025" position="top" fontSize={8} fill="#374151" formatter={(value) => typeof value === 'number' ? value.toFixed(3) : value} />
                                        </Bar>
                                        <Bar
                                            dataKey="jan2026"
                                            name="Jan 2026"
                                            fill={CHART_COLORS.jan2026}
                                            radius={[3, 3, 0, 0]}
                                            maxBarSize={35}
                                        >
                                            <LabelList dataKey="jan2026" position="top" fontSize={8} fill="#374151" formatter={(value) => typeof value === 'number' ? value.toFixed(3) : value} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Chart 2: Monthly GWR for KADA Region */}
                        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <Calendar size={18} className="text-cyan-600" />
                                Monthly GWR - KADA Region
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">Temporal variation in KADA Region ground water resources (in TMC)</p>

                            <div className="h-[350px] sm:h-[400px] md:h-[450px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={KADA_REGION_DATA}
                                        margin={{ top: 40, right: 30, left: 20, bottom: 30 }}
                                        barCategoryGap="20%"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                        <XAxis
                                            dataKey="period"
                                            tick={{ fontSize: 11, fill: '#374151' }}
                                            tickLine={false}
                                            axisLine={{ stroke: '#d1d5db' }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11, fill: '#374151' }}
                                            label={{
                                                value: 'GW Resources (in TMC)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 11 },
                                                offset: 10
                                            }}
                                            domain={[0, 'auto']}
                                            tickLine={false}
                                            axisLine={{ stroke: '#d1d5db' }}
                                            tickFormatter={(value) => value.toFixed(1)}
                                        />
                                        <Tooltip content={<KADATooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                                        <Legend
                                            wrapperStyle={{ paddingTop: 15, fontSize: 12 }}
                                            iconType="square"
                                        />
                                        <Bar
                                            dataKey="value"
                                            name="KADA Region"
                                            radius={[6, 6, 0, 0]}
                                            maxBarSize={80}
                                        >
                                            {KADA_REGION_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                            <LabelList
                                                dataKey="value"
                                                position="top"
                                                fontSize={13}
                                                fontWeight="bold"
                                                fill="#374151"
                                                formatter={(value) => typeof value === 'number' ? `${value.toFixed(2)} TMC` : value}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Improvement indicators */}
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <div className="flex items-center gap-2 text-green-700 mb-1">
                                        <ArrowUpRight size={16} />
                                        <span className="text-xs font-bold uppercase">Present Year</span>
                                    </div>
                                    <p className="text-xl font-bold text-green-600">+1.33 TMC</p>
                                    <p className="text-xs text-green-600 opacity-80">June 2025 → Jan 2026</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <ArrowUpRight size={16} />
                                        <span className="text-xs font-bold uppercase">Past Year</span>
                                    </div>
                                    <p className="text-xl font-bold text-blue-600">+0.64 TMC</p>
                                    <p className="text-xs text-blue-600 opacity-80">June 2024 → Feb 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-blue-50">
                        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            <Droplets size={18} className="text-cyan-600" />
                            Utilizable Ground Water Resources in KADA Region (in TMC)
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Region</th>
                                    <th className="px-6 py-4 text-center font-bold bg-blue-50 text-blue-700">June 2024</th>
                                    <th className="px-6 py-4 text-center font-bold bg-orange-50 text-orange-700">Feb 2025</th>
                                    <th className="px-6 py-4 text-center font-bold bg-gray-100 text-gray-700">June 2025</th>
                                    <th className="px-6 py-4 text-center font-bold bg-amber-50 text-amber-700">Jan 2026</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {GWR_DATA.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`hover:bg-gray-50 transition-colors ${row.region === "KADA Region" ? "bg-cyan-50/50 font-semibold" : ""
                                            }`}
                                    >
                                        <td className={`px-6 py-4 ${row.region === "KADA Region" ? "text-cyan-800 font-bold" : "text-gray-800"
                                            }`}>
                                            {row.region}
                                        </td>
                                        <td className="px-6 py-4 text-center text-blue-600">{row.june2024.toFixed(3)}</td>
                                        <td className="px-6 py-4 text-center text-orange-600">{row.feb2025.toFixed(3)}</td>
                                        <td className="px-6 py-4 text-center text-gray-600">{row.june2025.toFixed(3)}</td>
                                        <td className="px-6 py-4 text-center text-amber-600 font-semibold">{row.jan2026.toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Interpretation Note */}
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5 flex gap-4">
                    <Info size={24} className="shrink-0 text-cyan-600 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-cyan-900 mb-2">Key Observations</h4>
                        <ul className="space-y-2 text-sm text-cyan-800 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                                <span>The monthly Utilizable Ground Water Resources of the KADA region are estimated on integrating the Annual Ground Water Resources estimation results with Monthly Ground Water Levels change in the region.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                                <span>The net annual improvement in utilizable ground water resources in KADA Region is <strong>0.71 TMC</strong> (from 1.51 TMC of Feb-2025 to 2.22 TMC of Jan 2026) due to net rise in ground water levels of <strong>1.45 m</strong> (from 17.62 to 16.27)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                                <span>In the present water year, the net seasonal improvement in utilizable ground water resources in KADA Region is <strong>1.33 TMC</strong> from 0.89 TMC of June-2025 to 2.22 TMC of Jan 2026.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                                <span>In the past water year, the net seasonal improvement in utilizable ground water resources in KADA Region is <strong>0.64 TMC</strong> from 0.87 TMC of June-2024 to 1.51 TMC of Feb 2025.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
