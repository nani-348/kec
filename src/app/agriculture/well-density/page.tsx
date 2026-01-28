"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MagnifyingImageViewer from "@/components/ui/MagnifyingImageViewer";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Line
} from "recharts";
import {
    Activity,
    Map,
    Droplets,
    Layout
} from "lucide-react";

// --- Data Constants ---
const DENSITY_DATA = [
    {
        mandal: "GUDI PALLE",
        wells: 3036,
        density: 26,
    },
    {
        mandal: "KUPPAM",
        wells: 3074,
        density: 18,
    },
    {
        mandal: "RAMA KUPPAM",
        wells: 3314,
        density: 21,
    },
    {
        mandal: "SANTHI PURAM",
        wells: 2955,
        density: 20,
    },
];

const KADA_TOTALS = {
    wells: 12379,
    avgDensity: 21
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

export default function WellDensityPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="mb-12 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                        <Layout size={14} />
                        Spatial Analysis
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-6">
                        Well Density in Kuppam Constituency
                    </h1>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            In the <strong>KADA Region / Kuppam Constituency</strong>, the total number of agricultural bore wells is about <strong>{KADA_TOTALS.wells.toLocaleString()}</strong>, with an average well density of <strong>{KADA_TOTALS.avgDensity} wells per sq Km</strong>.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Out of <strong>209 villages</strong>, <strong>127 villages</strong> have significant influence under <strong>HNSS-Kuppam Branch Canal</strong> and its OT linked MI Tanks and Ponds through Streamlets/Feeder Channels.
                        </p>
                    </div>
                </div>

                {/* Key Metrics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Activity size={24} className="text-white" />
                            </div>
                            <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">Total Bore Wells</p>
                        </div>
                        <p className="text-4xl font-bold">{KADA_TOTALS.wells.toLocaleString()}</p>
                        <p className="text-sm text-blue-100 mt-2">Across 4 Mandals</p>
                    </div>

                    <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Map size={24} className="text-white" />
                            </div>
                            <p className="text-emerald-100 font-medium uppercase tracking-wider text-sm">Average Density</p>
                        </div>
                        <p className="text-4xl font-bold">{KADA_TOTALS.avgDensity}</p>
                        <p className="text-sm text-emerald-100 mt-2">Wells per Sq km</p>
                    </div>
                </div>

                {/* Main Content Split: Chart & Table */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Visual Analysis Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Mandal-wise Density & Count</h3>
                            <p className="text-sm text-gray-500">Comparing total wells vs density per sq km</p>
                        </div>

                        <div className="flex-grow min-h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={DENSITY_DATA}
                                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                                >
                                    <CartesianGrid stroke="#f3f4f6" vertical={false} />
                                    <XAxis
                                        dataKey="mandal"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        orientation="left"
                                        stroke="#3b82f6"
                                        axisLine={false}
                                        tickLine={false}
                                        label={{ value: 'No. of Wells', angle: -90, position: 'insideLeft', fill: '#3b82f6', fontSize: 12 }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#10b981"
                                        axisLine={false}
                                        tickLine={false}
                                        label={{ value: 'Density (Wells/SqKm)', angle: 90, position: 'insideRight', fill: '#10b981', fontSize: 12 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />

                                    <Bar yAxisId="left" dataKey="wells" name="No of Bore Wells" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Line yAxisId="right" type="monotone" dataKey="density" name="Well Density" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Simple Data Table */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Statistical Breakdown</h3>
                            <p className="text-sm text-gray-500">Official figures by Mandal</p>
                        </div>

                        <div className="overflow-x-auto flex-grow">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-4 bg-gray-50 font-bold text-gray-600 border-b border-gray-200">Mandal</th>
                                        <th className="py-3 px-4 bg-gray-50 font-bold text-gray-900 text-right border-b border-gray-200">No of Bore Wells</th>
                                        <th className="py-3 px-4 bg-gray-50 font-bold text-emerald-600 text-right border-b border-gray-200">Well Density <span className="text-xs font-normal text-gray-500 block">(No Wells/ Sq KM)</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DENSITY_DATA.map((row, index) => (
                                        <tr key={row.mandal} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                                            <td className="py-3 px-4 font-medium text-gray-800">{row.mandal}</td>
                                            <td className="py-3 px-4 text-right font-medium text-gray-900">{row.wells.toLocaleString()}</td>
                                            <td className="py-3 px-4 text-right font-bold text-emerald-600 bg-emerald-50/10">{row.density}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-bold border-t-2 border-gray-200">
                                        <td className="py-4 px-4 text-gray-900">KADA TOTAL</td>
                                        <td className="py-4 px-4 text-right text-gray-900">{KADA_TOTALS.wells.toLocaleString()}</td>
                                        <td className="py-4 px-4 text-right text-emerald-700">{KADA_TOTALS.avgDensity}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="relative w-full rounded-xl overflow-hidden">
                        <MagnifyingImageViewer
                            src="/images/about-kada/bore.png"
                            alt="Borewell Density Map"
                            title="Well Density & Distribution"
                            className="aspect-[16/9] bg-gray-50"
                        />
                    </div>
                </div>

                {/* Ground Water Stress Section */}
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wide mb-4">
                            <Droplets size={14} />
                            Stress Analysis
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-serif mb-4">
                            Ground Water Stress
                        </h2>
                    </div>

                    {/* Description Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 mb-8">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            During well inventory, about <strong className="text-blue-600">500 No of Wells</strong> were observed in the KADA Region.
                            By indexing the entire area, it is classified into <strong>3 categories</strong>:
                        </p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">1</div>
                                    <h4 className="font-bold text-emerald-700">Less Stressed Area</h4>
                                </div>
                                <p className="text-gray-600 text-sm">Partially working open wells</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border-l-4 border-amber-500 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">2</div>
                                    <h4 className="font-bold text-amber-700">Moderately Stressed Area</h4>
                                </div>
                                <p className="text-gray-600 text-sm">Working bore wells</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">3</div>
                                    <h4 className="font-bold text-red-700">More Stressed Area</h4>
                                </div>
                                <p className="text-gray-600 text-sm">Partially working bore wells</p>
                            </div>
                        </div>
                    </div>

                    {/* Stress Map Image */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <MagnifyingImageViewer
                            src="/images/about-kada/stress.jpg"
                            alt="Groundwater Stress Classification Map of KADA Region"
                            title="KADA Region Groundwater Stress Map"
                            className="w-full"
                        />
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
