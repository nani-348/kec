"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowDown, ThermometerSun, CloudRain, TrendingDown, RefreshCw } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend, ReferenceLine
} from "recharts";
// Fallback data
const INITIAL_DATA = [
    { name: "Gudi Palle", PreMonsoon: 30.74, PostMonsoon: 25.53, Fluctuation: 5.21, color: "#6366f1" },
    { name: "Kuppam", PreMonsoon: 19.36, PostMonsoon: 14.14, Fluctuation: 5.22, color: "#3b82f6" },
    { name: "Rama Kuppam", PreMonsoon: 18.88, PostMonsoon: 11.83, Fluctuation: 7.05, color: "#8b5cf6" },
    { name: "Santhi Puram", PreMonsoon: 14.35, PostMonsoon: 9.73, Fluctuation: 4.62, color: "#06b6d4" },
    { name: "KADA Region (Avg)", PreMonsoon: 20.30, PostMonsoon: 15.26, Fluctuation: 5.04, color: "#10b981", isAverage: true },
];
export default function SeasonalFluctuationPage() {
    const [mandalFluctuationData, setData] = useState(INITIAL_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/sheets?category=Groundwater&table=SEASONAL FLUCTUATION');
                const result = await response.json();
                if (result.success && result.data.length > 0) {
                    const sheetData = result.data.map((row: any) => ({
                        name: row.name || '',
                        PreMonsoon: Number(row.PreMonsoon) || 0,
                        PostMonsoon: Number(row.PostMonsoon) || 0,
                        Fluctuation: Number(row.Fluctuation) || 0,
                        color: row.color || '#3b82f6',
                        isAverage: row.isAverage === true || row.isAverage === 'true',
                    }));
                    setData(sheetData);
                }
            } catch (error) {
                console.error("Failed to fetch sheet data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
        const intervalId = setInterval(fetchData, 1000); // 1 second for real-time updates
        return () => clearInterval(intervalId);
    }, []);
    // Helper functions to extract dynamic insight data
    const getMandal = (name: string) => mandalFluctuationData.find(m => m.name.toLowerCase().includes(name.toLowerCase()));
    const getHighestRecovery = () => {
        const nonAvg = mandalFluctuationData.filter(m => !m.isAverage);
        return nonAvg.reduce((max, m) => m.Fluctuation > max.Fluctuation ? m : max, nonAvg[0]);
    };
    const getBestWaterLevel = () => {
        const nonAvg = mandalFluctuationData.filter(m => !m.isAverage);
        return nonAvg.reduce((best, m) => m.PostMonsoon < best.PostMonsoon ? m : best, nonAvg[0]);
    };
    const getDeepestLevel = () => {
        const nonAvg = mandalFluctuationData.filter(m => !m.isAverage);
        return nonAvg.reduce((deep, m) => m.PostMonsoon > deep.PostMonsoon ? m : deep, nonAvg[0]);
    };
    const getRegionalAvg = () => mandalFluctuationData.find(m => m.isAverage) || mandalFluctuationData[mandalFluctuationData.length - 1];
    const kuppam = getMandal('Kuppam');
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-100 shadow-lg rounded-lg">
                    <p className="font-bold text-gray-800 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm mb-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className="text-gray-600">{entry.name}:</span>
                            <span className="font-semibold text-gray-900">{entry.value} m</span>
                        </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-green-600 font-bold">
                            Rise: {(payload[0].value - payload[1].value).toFixed(2)} m
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Seasonal Groundwater Fluctuation
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Detailed analysis of water level changes between Pre-monsoon (May) and Post-monsoon (Nov) periods across Mandals.
                        </p>
                    </div>
                    {/* Key Insights Grid - Dynamic from sheet data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                        {/* Highest Recovery */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Highest Recovery</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{getHighestRecovery()?.name || '-'}</h3>
                            <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                                <ArrowDown className="text-green-500" size={18} />
                                {getHighestRecovery()?.Fluctuation.toFixed(2) || '0'} m
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Max Pre-Post Fluctuation</p>
                        </div>
                        {/* Kuppam */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-indigo-500">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Kuppam</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{kuppam?.PostMonsoon.toFixed(2) || '-'} m</h3>
                            <p className="text-xl font-bold text-indigo-600 flex items-center gap-1">
                                <ArrowDown className="text-indigo-500" size={16} />
                                {kuppam?.Fluctuation.toFixed(2) || '0'} m rise
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Post-Monsoon Level</p>
                        </div>
                        {/* Best Water Level */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-cyan-500">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Best Water Level</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{getBestWaterLevel()?.name || '-'}</h3>
                            <p className="text-2xl font-bold text-cyan-600">{getBestWaterLevel()?.PostMonsoon.toFixed(2) || '0'} m</p>
                            <p className="text-xs text-gray-400 mt-2">Post-Monsoon (Nov &apos;25)</p>
                        </div>
                        {/* Deepest Level */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-red-500">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Deepest Level</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{getDeepestLevel()?.name || '-'}</h3>
                            <p className="text-2xl font-bold text-red-500">{getDeepestLevel()?.PostMonsoon.toFixed(2) || '0'} m</p>
                            <p className="text-xs text-gray-400 mt-2">Post-Monsoon (Nov &apos;25)</p>
                        </div>
                        {/* Regional Avg */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Regional Avg Rise</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">KADA Region</h3>
                            <p className="text-2xl font-bold text-blue-600">{getRegionalAvg()?.Fluctuation.toFixed(2) || '0'} m</p>
                            <p className="text-xs text-gray-400 mt-2">Mean Fluctuation</p>
                        </div>
                    </div>
                    {/* Main Content Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Left: Chart Section */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Mandal-wise Comparative Analysis</h2>
                                    <p className="text-sm text-gray-500">Pre-Monsoon vs Post-Monsoon Levels (2025)</p>
                                </div>
                                <div className="flex gap-4 text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-sm bg-orange-400"></span> May (Pre)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-sm bg-blue-500"></span> Nov (Post)
                                    </div>
                                </div>
                            </div>
                            <div className="h-[400px] w-full min-h-[400px]">
                                {isMounted ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={mandalFluctuationData}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                            barGap={0}
                                            barCategoryGap="20%"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                label={{ value: 'Depth to Water Level (m bgl)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                                reversed={true}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                            <Legend wrapperStyle={{ display: 'none' }} />
                                            <Bar dataKey="PreMonsoon" name="May (Pre)" fill="#fb923c" radius={[0, 0, 4, 4]} />
                                            <Bar dataKey="PostMonsoon" name="Nov (Post)" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Loading chart...</div>
                                )}
                            </div>
                            <p className="text-center text-sm text-gray-400 mt-4 italic">
                                * Note: Since y-axis represents &quot;Depth to Water&quot;, lower bars indicate deeper water, higher bars (closer to 0) indicate shallower (better) water levels.
                            </p>
                        </div>
                        {/* Right: Detailed Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">Fluctuation Data Table</h3>
                                <p className="text-xs text-gray-500 mt-1">Pre vs Post Monsoon Comparison (2025)</p>
                            </div>
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold">Mandal</th>
                                        <th className="px-4 py-3 text-right font-semibold">Pre (May)</th>
                                        <th className="px-4 py-3 text-right font-semibold">Post (Nov)</th>
                                        <th className="px-4 py-3 text-right font-semibold">Rise (m)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mandalFluctuationData.map((row, idx) => (
                                        <tr key={idx} className={row.isAverage ? "bg-blue-50/50 font-semibold" : "hover:bg-gray-50"}>
                                            <td className="px-4 py-3 text-gray-900">{row.name}</td>
                                            <td className="px-4 py-3 text-right text-orange-600 tabular-nums">{row.PreMonsoon.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right text-blue-600 tabular-nums">{row.PostMonsoon.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right text-green-600 font-bold tabular-nums">{row.Fluctuation.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 border-t border-gray-100 bg-blue-50/50">
                                <div className="flex items-start gap-2">
                                    <TrendingDown size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                    <p className="text-xs text-gray-600 leading-snug">
                                        <strong>Rama Kuppam</strong> recorded the most significant recharge, indicating highly effective percolation structures or favorable geology in that zone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
