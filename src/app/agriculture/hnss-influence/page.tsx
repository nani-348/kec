"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import {
    Waves,
    TrendingUp,
    Droplets,
    PlusCircle,
    ArrowUpRight,
    Activity
} from "lucide-react";

// --- Data Constants ---

const INFLUENCE_DATA = [
    {
        mandal: "GUDI PALLE",
        yield_improved: 649,
        sustaining: 208,
        rejuvenated: 79,
        additional: 191
    },
    {
        mandal: "KUPPAM",
        yield_improved: 341,
        sustaining: 155,
        rejuvenated: 82,
        additional: 100
    },
    {
        mandal: "RAMA KUPPAM",
        yield_improved: 342,
        sustaining: 398,
        rejuvenated: 237,
        additional: 101
    },
    {
        mandal: "SANTHI PURAM",
        yield_improved: 524,
        sustaining: 414,
        rejuvenated: 172,
        additional: 154
    },
];

const INFLUENCE_TOTALS = {
    yield_improved: 1855,
    sustaining: 1174,
    rejuvenated: 569,
    additional: 546
};

const AREA_IMPROVEMENT_DATA = [
    {
        mandal: "GUDI PALLE",
        yields_improved: 385,
        sustaining: 123,
        rejuvenated: 140,
        additional: 407,
        total: 1056
    },
    {
        mandal: "KUPPAM",
        yields_improved: 158,
        sustaining: 72,
        rejuvenated: 114,
        additional: 167,
        total: 510
    },
    {
        mandal: "RAMA KUPPAM",
        yields_improved: 154,
        sustaining: 179,
        rejuvenated: 320,
        additional: 164,
        total: 817
    },
    {
        mandal: "SANTHI PURAM",
        yields_improved: 284,
        sustaining: 225,
        rejuvenated: 280,
        additional: 301,
        total: 1090
    },
];

const AREA_TOTALS = {
    yields_improved: 979,
    sustaining: 619,
    rejuvenated: 900,
    additional: 1037,
    total: 3535
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-semibold text-gray-900">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function HNSSInfluencePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-12 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Waves size={14} />
                        Project Impact Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-6">
                        Influence of HNSS & MIT Command
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Analyzing the transformative impact of the <strong>Handri-Neeva Sujala Sravanthi (HNSS)</strong> project and <strong>Minor Irrigation Tanks (MIT)</strong> on bore well performance and irrigated area expansion in the Kuppam Constituency.
                    </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <TrendingUp size={64} className="text-emerald-600" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Yield Improved Wells</p>
                        <p className="text-4xl font-bold text-emerald-600">{INFLUENCE_TOTALS.yield_improved.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md w-fit">
                            <ArrowUpRight size={12} />
                            85% of Working Wells
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Activity size={64} className="text-orange-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Sustaining Wells</p>
                        <p className="text-4xl font-bold text-orange-500">{INFLUENCE_TOTALS.sustaining.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-orange-700 bg-orange-50 px-2 py-1 rounded-md w-fit">
                            75% of Partial Wells
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Droplets size={64} className="text-blue-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Rejuvenated Wells</p>
                        <p className="text-4xl font-bold text-blue-600">{INFLUENCE_TOTALS.rejuvenated.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md w-fit">
                            65% of Abandoned Wells
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <PlusCircle size={64} className="text-purple-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">New Potential Wells</p>
                        <p className="text-4xl font-bold text-purple-600">{INFLUENCE_TOTALS.additional.toLocaleString()}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-md w-fit">
                            Additional Capacity
                        </div>
                    </div>
                </div>

                {/* Section 1: Influence on Bore Wells */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Waves size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Impact on Bore Well Status</h2>
                            <p className="text-gray-500">Number of wells positively influenced by irrigation projects</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 text-lg mb-6">Mandal-wise Influence Distribution</h3>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={INFLUENCE_DATA}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="mandal" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                        <Legend />
                                        <Bar dataKey="yield_improved" name="Yield Improved" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="sustaining" name="Sustaining" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="rejuvenated" name="Rejuvenated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="additional" name="Additional/New" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Summary for Chart */}
                        <div className="space-y-4">
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                <h4 className="font-bold text-emerald-900 mb-2">Highest Impact</h4>
                                <p className="text-emerald-700 text-sm mb-4">
                                    <strong>KADA Total</strong> shows a massive improvement in <strong>{INFLUENCE_TOTALS.yield_improved}</strong> existing wells.
                                </p>
                                <div className="h-1 w-full bg-emerald-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[45%]"></div>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-blue-900 mb-2">Revival Success</h4>
                                <p className="text-blue-700 text-sm mb-4">
                                    <strong>{INFLUENCE_TOTALS.rejuvenated}</strong> previously abandoned wells have been rejuvenated across the constituency.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Table 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Detailed Influence Inventory</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Region</th>
                                        <th className="px-6 py-4 text-center text-emerald-700 bg-emerald-50/50">Yield Improved<br /><span className="text-[10px] text-emerald-500 normal-case">(85% Working)</span></th>
                                        <th className="px-6 py-4 text-center text-orange-700 bg-orange-50/50">Sustaining<br /><span className="text-[10px] text-orange-500 normal-case">(75% Partial)</span></th>
                                        <th className="px-6 py-4 text-center text-blue-700 bg-blue-50/50">Rejuvenated<br /><span className="text-[10px] text-blue-500 normal-case">(65% Abandoned)</span></th>
                                        <th className="px-6 py-4 text-center text-purple-700 bg-purple-50/50">Possibility of<br /><span className="text-[10px] text-purple-500 normal-case">Additional Wells</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {INFLUENCE_DATA.map((row) => (
                                        <tr key={row.mandal} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-100">{row.mandal}</td>
                                            <td className="px-6 py-4 text-center border-r border-gray-100 text-emerald-700 font-medium">{row.yield_improved.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center border-r border-gray-100 text-orange-700">{row.sustaining.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center border-r border-gray-100 text-blue-700">{row.rejuvenated.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center font-bold text-purple-700">{row.additional.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-200">
                                        <td className="px-6 py-4 text-gray-900 border-r border-slate-200">KADA TOTAL</td>
                                        <td className="px-6 py-4 text-center border-r border-slate-200 text-emerald-800">{INFLUENCE_TOTALS.yield_improved.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center border-r border-slate-200 text-orange-800">{INFLUENCE_TOTALS.sustaining.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center border-r border-slate-200 text-blue-800">{INFLUENCE_TOTALS.rejuvenated.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center text-purple-800">{INFLUENCE_TOTALS.additional.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Section 2: Improvement in Irrigated Area */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <PlusCircle size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Irrigated Area Expansion</h2>
                            <p className="text-gray-500">Projected improvement in irrigated acreage under bore wells (Acres)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Stacked Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 text-lg mb-6">Area Improvement Projection</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={AREA_IMPROVEMENT_DATA}
                                        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="mandal" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                        <Legend />
                                        <Bar dataKey="yields_improved" name="Yield Improved Area" stackId="a" fill="#10b981" />
                                        <Bar dataKey="sustaining" name="Sustaining Area" stackId="a" fill="#f59e0b" />
                                        <Bar dataKey="rejuvenated" name="Rejuvenated Area" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="additional" name="Additional Area" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Area to be Improved</p>
                                    <p className="text-3xl font-bold text-emerald-600">{AREA_TOTALS.total.toLocaleString()}</p>
                                    <p className="text-xs text-emerald-600 font-medium">Acres</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">New Development</p>
                                    <p className="text-3xl font-bold text-purple-600">{(AREA_TOTALS.rejuvenated + AREA_TOTALS.additional).toLocaleString()}</p>
                                    <p className="text-xs text-purple-600 font-medium">Acres (Rejuv + New)</p>
                                </div>
                                <div className="sm:col-span-2 p-4 rounded-xl bg-blue-50 border border-blue-100">
                                    <p className="text-sm text-blue-800 font-medium mb-2">
                                        <strong>Interpretation:</strong> The project aims to not only stabilize the existing {AREA_TOTALS.yields_improved + AREA_TOTALS.sustaining} acres of irrigated land but also bring nearly <strong>{(AREA_TOTALS.rejuvenated + AREA_TOTALS.additional)} additional acres</strong> under cultivation through rejuvenation and new bore wells.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Table 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 text-lg font-serif">Improvement in Irrigated Area</h3>
                            <p className="text-xs text-gray-500 mt-1">Breakdown of area improvement in Acres</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                                    <tr>
                                        <th className="px-6 py-4 border-r border-slate-200" rowSpan={2}>Region</th>
                                        <th className="px-6 py-2 text-center border-r border-slate-200 bg-green-50 text-green-700" colSpan={2}>Already Functioning</th>
                                        <th className="px-6 py-2 text-center border-r border-slate-200 bg-blue-50 text-blue-700" colSpan={2}>To be Developed</th>
                                        <th className="px-6 py-4 text-center bg-gray-100 text-gray-700" rowSpan={2}>Total <br /><span className="text-[10px] normal-case">(Acres)</span></th>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-center border-r border-slate-100 text-emerald-600">Yields Improved</th>
                                        <th className="px-4 py-2 text-center border-r border-slate-200 text-orange-600">Sustaining</th>
                                        <th className="px-4 py-2 text-center border-r border-slate-100 text-blue-600">Rejuvenated</th>
                                        <th className="px-4 py-2 text-center border-r border-slate-200 text-purple-600">Additional</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {AREA_IMPROVEMENT_DATA.map((row) => (
                                        <tr key={row.mandal} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 font-bold text-gray-900 border-r border-gray-100">{row.mandal}</td>
                                            <td className="px-4 py-3 text-center border-r border-gray-100 font-medium">{row.yields_improved}</td>
                                            <td className="px-4 py-3 text-center border-r border-gray-100">{row.sustaining}</td>
                                            <td className="px-4 py-3 text-center border-r border-gray-100">{row.rejuvenated}</td>
                                            <td className="px-4 py-3 text-center border-r border-gray-100">{row.additional}</td>
                                            <td className="px-6 py-3 text-center font-bold text-gray-900 bg-gray-50/50 border-l border-gray-200">{row.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                                        <td className="px-6 py-4 text-gray-900 border-r border-slate-300">KADA TOTAL</td>
                                        <td className="px-4 py-4 text-center border-r border-slate-300 text-emerald-800">{AREA_TOTALS.yields_improved.toLocaleString()}</td>
                                        <td className="px-4 py-4 text-center border-r border-slate-300 text-orange-800">{AREA_TOTALS.sustaining.toLocaleString()}</td>
                                        <td className="px-4 py-4 text-center border-r border-slate-300 text-blue-800">{AREA_TOTALS.rejuvenated.toLocaleString()}</td>
                                        <td className="px-4 py-4 text-center border-r border-slate-300 text-purple-800">{AREA_TOTALS.additional.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center text-gray-900 bg-slate-200 border-l border-slate-300">{AREA_TOTALS.total.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
