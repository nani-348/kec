"use client";
import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    RefreshCw, Search, X, BarChart3
} from "lucide-react";
import clsx from "clsx";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
// Type definitions
type WaterDataRow = {
    mandal: string;
    village: string;
    jan1stWeek: number;
    jan2ndWeek: number;
    jan3rdWeek: number;
    jan4thWeek: number;
    currentMonth: number;
    yesterday: number | null;
    today: number | null;
    oneHrAgo: number | null;
};
// Mandal Averages
const MANDAL_AVERAGES = [
    { name: "Gudipalli", jan1stWeek: 27.73, jan2ndWeek: 27.85, jan3rdWeek: 28.09, jan4thWeek: 28.12, currentMonth: 28.46, preMonsoon: 30.74, postMonsoon: 30.23 },
    { name: "Kuppam", jan1stWeek: 14.47, jan2ndWeek: 14.54, jan3rdWeek: 15.23, jan4thWeek: 15.66, currentMonth: 16.06, preMonsoon: 19.36, postMonsoon: 13.67 },
    { name: "Ramakuppam", jan1stWeek: 13.08, jan2ndWeek: 12.17, jan3rdWeek: 12.51, jan4thWeek: 12.54, currentMonth: 12.49, preMonsoon: 18.88, postMonsoon: 11.32 },
    { name: "Santipuram", jan1stWeek: 10.06, jan2ndWeek: 11.48, jan3rdWeek: 11.64, jan4thWeek: 11.79, currentMonth: 11.04, preMonsoon: 14.35, postMonsoon: 8.75 },
    { name: "KADA Region", jan1stWeek: 15.74, jan2ndWeek: 15.94, jan3rdWeek: 16.26, jan4thWeek: 16.38, currentMonth: 16.27, preMonsoon: 20.30, postMonsoon: 15.26 },
];
const MANDAL_COLORS: Record<string, string> = {
    "Gudupalle": "#3b82f6", "Kuppam": "#10b981", "Ramakuppam": "#f59e0b", "Santipuram": "#8b5cf6",
};
// Complete Data from GWL_KEC.docx - Table 1
const REALTIME_DATA: WaterDataRow[] = [
    { mandal: "Gudupalle", village: "Dravida University", jan1stWeek: 12.87, jan2ndWeek: 12.86, jan3rdWeek: 13.58, jan4thWeek: 13.66, currentMonth: 13.56, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Gudupalle", village: "Gudupalle", jan1stWeek: 31.07, jan2ndWeek: 31.46, jan3rdWeek: 31.46, jan4thWeek: 31.46, currentMonth: 31.77, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Gudupalle", village: "Solachinthanapalli", jan1stWeek: 39.24, jan2ndWeek: 39.24, jan3rdWeek: 39.24, jan4thWeek: 39.24, currentMonth: 40.04, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Kuppam", village: "Adaviboduguru", jan1stWeek: 25.41, jan2ndWeek: 25.54, jan3rdWeek: 26.78, jan4thWeek: 27.60, currentMonth: 28.37, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Kuppam", village: "Kangundhi", jan1stWeek: 3.52, jan2ndWeek: 3.53, jan3rdWeek: 3.68, jan4thWeek: 3.72, currentMonth: 3.74, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Ramakuppam", village: "Balla", jan1stWeek: 12.91, jan2ndWeek: 13.28, jan3rdWeek: 13.56, jan4thWeek: 13.70, currentMonth: 13.65, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Ramakuppam", village: "Cheldiganipalle", jan1stWeek: 20.96, jan2ndWeek: 17.08, jan3rdWeek: 17.62, jan4thWeek: 18.26, currentMonth: 16.90, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Ramakuppam", village: "Ramakuppam", jan1stWeek: 12.05, jan2ndWeek: 12.18, jan3rdWeek: 12.38, jan4thWeek: 11.54, currentMonth: 12.82, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Ramakuppam", village: "Vijilapuram", jan1stWeek: 6.39, jan2ndWeek: 6.12, jan3rdWeek: 6.49, jan4thWeek: 6.65, currentMonth: 6.57, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Santipuram", village: "Anikera", jan1stWeek: 9.36, jan2ndWeek: 14.65, jan3rdWeek: 14.60, jan4thWeek: 14.86, currentMonth: 12.36, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Santipuram", village: "Gundusettipalli", jan1stWeek: 14.84, jan2ndWeek: 14.66, jan3rdWeek: 14.66, jan4thWeek: 14.66, currentMonth: 14.80, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Santipuram", village: "Rallaboduguru", jan1stWeek: 1.00, jan2ndWeek: 1.20, jan3rdWeek: 1.25, jan4thWeek: 1.40, currentMonth: 0.83, yesterday: null, today: null, oneHrAgo: null },
    { mandal: "Santipuram", village: "Shanthipuram", jan1stWeek: 15.05, jan2ndWeek: 15.42, jan3rdWeek: 16.05, jan4thWeek: 16.23, currentMonth: 16.16, yesterday: null, today: null, oneHrAgo: null },
];
export default function RealTimeWaterLevelPage() {
    const [data, setData] = useState<WaterDataRow[]>(REALTIME_DATA);
    const [lastUpdated, setLastUpdated] = useState<string>("Loading...");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMandal, setSelectedMandal] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const mandals = ["All", ...Array.from(new Set(data.map(item => item.mandal)))];
    const filteredData = useMemo(() => {
        return data.filter(row => {
            const matchesMandal = selectedMandal === "All" || row.mandal === selectedMandal;
            const matchesSearch = row.village.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesMandal && matchesSearch;
        });
    }, [data, selectedMandal, searchQuery]);
    const chartData = useMemo(() => {
        return filteredData.map(row => ({
            name: row.village.length > 10 ? row.village.substring(0, 10) + "..." : row.village,
            fullName: row.village, mandal: row.mandal,
            "Week 1": row.jan1stWeek, "Week 2": row.jan2ndWeek, "Week 3": row.jan3rdWeek, "Week 4": row.jan4thWeek, "Current": row.currentMonth,
        }));
    }, [filteredData]);
    const fetchSheetData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/sheets?category=Groundwater&table=REAL-TIME WATER LEVELS');
            const result = await response.json();
            if (result.success && result.data.length > 0) {
                const sheetData: WaterDataRow[] = result.data.map((row: any) => ({
                    mandal: row.mandal || '', village: row.village || '',
                    jan1stWeek: Number(row.jan1stWeek) || 0, jan2ndWeek: Number(row.jan2ndWeek) || 0,
                    jan3rdWeek: Number(row.jan3rdWeek) || 0, jan4thWeek: Number(row.jan4thWeek) || 0,
                    currentMonth: Number(row.currentMonth) || 0, yesterday: row.yesterday ? Number(row.yesterday) : null,
                    today: row.today ? Number(row.today) : null, oneHrAgo: row.oneHrAgo ? Number(row.oneHrAgo) : null,
                }));
                setData(sheetData);
                setLastUpdated(new Date().toLocaleTimeString());
            } else { setLastUpdated("Using cached data"); }
        } catch (error) { console.error("Failed to fetch:", error); setLastUpdated("Offline mode"); }
        finally { setIsLoading(false); }
    };
    useEffect(() => {
        fetchSheetData();
        const interval = setInterval(fetchSheetData, 1000); // 1 second for real-time updates
        return () => clearInterval(interval);
    }, []);
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100">
                    <p className="font-bold text-gray-900 mb-2">{payload[0]?.payload?.fullName || label}</p>
                    <p className="text-xs text-gray-500 mb-2">Mandal: {payload[0]?.payload?.mandal}</p>
                    {payload.map((entry: any, i: number) => (
                        <p key={i} className="text-sm flex justify-between gap-4">
                            <span style={{ color: entry.color }}>{entry.name}:</span>
                            <span className="font-mono font-bold">{entry.value?.toFixed(2)} m</span>
                        </p>
                    ))}
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
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse flex items-center gap-2 border border-red-100">
                                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                                    Live Sync Active
                                </span>
                                <span className="text-gray-400 text-xs font-mono">Synced: {lastUpdated}</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-tight">
                                Real-Time <span className="text-primary">Water Monitor</span>
                            </h1>
                            <p className="text-gray-600 mt-3 max-w-2xl text-lg">Ground Water Levels in KADA Region - January 2026</p>
                        </div>
                        <button onClick={fetchSheetData} disabled={isLoading} className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg">
                            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                            {isLoading ? "Syncing..." : "Sync Now"}
                        </button>
                    </div>
                    {/* Real-Time Levels Content - No tabs needed anymore */}
                    <>
                        {/* Weekly Chart */}
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-purple-50/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white"><BarChart3 size={20} /></div>
                                    <div><h3 className="text-lg font-bold text-gray-900">Weekly Water Level Comparison</h3><p className="text-xs text-gray-500">January 2026 - Depth in meters (m bgl)</p></div>
                                </div>
                                <span className="text-xs text-gray-400 font-mono">{filteredData.length} stations</span>
                            </div>
                            <div className="p-6">
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} angle={-45} textAnchor="end" height={80} interval={0} />
                                        <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} label={{ value: 'Depth (m bgl)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ paddingTop: 20 }} />
                                        <Bar dataKey="Week 1" fill="#93c5fd" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="Week 2" fill="#60a5fa" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="Week 3" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="Week 4" fill="#2563eb" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="Current" fill="#10b981" radius={[2, 2, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* Data Table */}
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex flex-col lg:flex-row gap-6 items-center justify-between">
                                <div className="flex flex-wrap items-center gap-2">
                                    {mandals.map(mandal => (
                                        <button key={mandal} onClick={() => setSelectedMandal(mandal)}
                                            className={clsx("px-5 py-2 rounded-xl text-sm font-bold transition-all",
                                                selectedMandal === mandal ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:bg-white hover:shadow-sm")}>
                                            {mandal}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative w-full lg:w-80">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="Search village..." className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={16} /></button>}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="text-left px-6 py-4 font-bold text-gray-700">Mandal</th>
                                            <th className="text-left px-6 py-4 font-bold text-gray-700">Village</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Week 1</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Week 2</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Week 3</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700">Week 4</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700 bg-green-50">Jan-2026</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700 bg-amber-50">Yesterday</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700 bg-blue-50">Today</th>
                                            <th className="text-right px-4 py-4 font-bold text-gray-700 bg-red-50">1 Hr Ago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((row, i) => (
                                            <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4"><span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: MANDAL_COLORS[row.mandal] }}></span>{row.mandal}</span></td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{row.village}</td>
                                                <td className="px-4 py-4 text-right font-mono">{row.jan1stWeek.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-right font-mono">{row.jan2ndWeek.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-right font-mono">{row.jan3rdWeek.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-right font-mono">{row.jan4thWeek.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-right font-mono font-bold text-green-700 bg-green-50/50">{row.currentMonth.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-right font-mono text-amber-700 bg-amber-50/50">{row.yesterday !== null ? row.yesterday.toFixed(2) : '—'}</td>
                                                <td className="px-4 py-4 text-right font-mono font-bold text-blue-700 bg-blue-50/50">{row.today !== null ? row.today.toFixed(2) : '—'}</td>
                                                <td className="px-4 py-4 text-right font-mono text-red-700 bg-red-50/50">{row.oneHrAgo !== null ? row.oneHrAgo.toFixed(2) : '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    {/* Mandal Averages Summary */}
                    <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <h3 className="font-bold text-gray-900">Mandal & Regional Averages</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left px-6 py-3 font-bold">Region</th>
                                        <th className="text-right px-4 py-3 font-bold">Week 1</th>
                                        <th className="text-right px-4 py-3 font-bold">Week 2</th>
                                        <th className="text-right px-4 py-3 font-bold">Week 3</th>
                                        <th className="text-right px-4 py-3 font-bold">Week 4</th>
                                        <th className="text-right px-4 py-3 font-bold bg-blue-50">Current</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MANDAL_AVERAGES.map((row, i) => (
                                        <tr key={i} className={clsx("border-b", row.name === "KADA Region" ? "bg-indigo-50 font-bold" : "")}>
                                            <td className="px-6 py-3">{row.name}</td>
                                            <td className="px-4 py-3 text-right font-mono">{row.jan1stWeek.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right font-mono">{row.jan2ndWeek.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right font-mono">{row.jan3rdWeek.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right font-mono">{row.jan4thWeek.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-blue-700 bg-blue-50/50">{row.currentMonth.toFixed(2)}</td>
                                        </tr>
                                    ))}
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
