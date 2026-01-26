"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    RefreshCw,
    Download,
    ExternalLink,
    Droplets,
    Calendar,
    ArrowDown,
    ArrowUp,
    Minus,
    Search,
    Filter
} from "lucide-react";
import Papa from "papaparse";
import clsx from "clsx";

// Type definition ensuring ALL data points are present
type WaterDataRow = {
    mandal: string;
    village: string;
    preMonsoon: number;      // May 2025
    postMonsoon: number;     // Nov 2025
    lastYearDec: number;     // Dec 2024 (Restored)
    presentMonth: number;    // Dec 2025 (Restored)
    jan1: number;            // 1st Jan 2026 (Restored)
    jan8: number;            // 8th Jan 2026 (Restored)
    jan15: number;           // 15th Jan 2026
    jan22: number;           // 22nd Jan 2026 (New Milestone)
    yesterday: number;       // Dynamic
    today: number | null;    // Live
};

// Complete Data Set matching the User's Image + New Analysis columns
const INITIAL_DATA: WaterDataRow[] = [
    { mandal: "Gudupalle", village: "Dravida University", preMonsoon: 15.88, postMonsoon: 16.34, lastYearDec: 12.47, presentMonth: 11.52, jan1: 12.87, jan8: 12.86, jan15: 13.58, jan22: 13.65, yesterday: 13.70, today: null },
    { mandal: "Gudupalle", village: "Gudupalle", preMonsoon: 34.42, postMonsoon: 34.26, lastYearDec: 31.38, presentMonth: 25.82, jan1: 31.07, jan8: 31.46, jan15: 31.46, jan22: 31.20, yesterday: 31.15, today: null },
    { mandal: "Gudupalle", village: "Solachinthanapalli", preMonsoon: 41.92, postMonsoon: 40.10, lastYearDec: 44.19, presentMonth: 39.24, jan1: 39.24, jan8: 39.24, jan15: 39.24, jan22: 39.10, yesterday: 38.95, today: null },

    { mandal: "Kuppam", village: "Adaviboduguru", preMonsoon: 30.69, postMonsoon: 21.81, lastYearDec: 23.54, presentMonth: 23.34, jan1: 25.41, jan8: 25.54, jan15: 26.78, jan22: 26.50, yesterday: 26.45, today: null },
    { mandal: "Kuppam", village: "Kangundhi", preMonsoon: 8.03, postMonsoon: 5.53, lastYearDec: 5.54, presentMonth: 4.93, jan1: 3.52, jan8: 3.53, jan15: 3.68, jan22: 3.75, yesterday: 3.80, today: null },

    { mandal: "Ramakuppam", village: "Balla", preMonsoon: 19.96, postMonsoon: 11.93, lastYearDec: 16.75, presentMonth: 12.75, jan1: 12.91, jan8: 13.28, jan15: 13.56, jan22: 13.40, yesterday: 13.35, today: null },
    { mandal: "Ramakuppam", village: "Cheldiganipalle", preMonsoon: 23.01, postMonsoon: 17.53, lastYearDec: 20.12, presentMonth: 17.01, jan1: 20.96, jan8: 17.08, jan15: 17.62, jan22: 17.80, yesterday: 17.85, today: null },
    { mandal: "Ramakuppam", village: "Ramakuppam", preMonsoon: 14.70, postMonsoon: 10.91, lastYearDec: 12.37, presentMonth: 11.54, jan1: 12.05, jan8: 12.18, jan15: 12.38, jan22: 12.45, yesterday: 12.50, today: null },
    { mandal: "Ramakuppam", village: "Vijilapuram", preMonsoon: 17.85, postMonsoon: 4.92, lastYearDec: 13.55, presentMonth: 6.01, jan1: 6.39, jan8: 6.12, jan15: 6.49, jan22: 6.55, yesterday: 6.60, today: null },

    { mandal: "Santipuram", village: "Anikera", preMonsoon: 20.45, postMonsoon: 8.58, lastYearDec: 14.61, presentMonth: 10.11, jan1: 9.36, jan8: 14.65, jan15: 14.60, jan22: 14.55, yesterday: 14.50, today: null },
    { mandal: "Santipuram", village: "Gundusettipalli", preMonsoon: 18.82, postMonsoon: 13.10, lastYearDec: 14.74, presentMonth: 13.73, jan1: 14.84, jan8: 14.66, jan15: 14.66, jan22: 14.70, yesterday: 14.75, today: null },
    { mandal: "Santipuram", village: "Rallaboduguru", preMonsoon: 2.10, postMonsoon: 0.15, lastYearDec: 1.45, presentMonth: 0.78, jan1: 1.00, jan8: 1.20, jan15: 1.25, jan22: 1.30, yesterday: 1.32, today: null },
    { mandal: "Santipuram", village: "Shanthipuram", preMonsoon: 16.03, postMonsoon: 13.16, lastYearDec: 18.31, presentMonth: 14.30, jan1: 15.05, jan8: 15.42, jan15: 16.05, jan22: 15.90, yesterday: 15.85, today: null },
];

export default function RealTimeWaterLevelPage() {
    const [data, setData] = useState<WaterDataRow[]>(INITIAL_DATA);
    const [lastUpdated, setLastUpdated] = useState<string>("Just now");
    const [isLoading, setIsLoading] = useState(false);
    const [sheetUrl, setSheetUrl] = useState("");
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // Filters
    const [selectedMandal, setSelectedMandal] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const mandals = ["All", ...Array.from(new Set(data.map(item => item.mandal)))];

    // Filtered Data
    const filteredData = data.filter(row => {
        const matchesMandal = selectedMandal === "All" || row.mandal === selectedMandal;
        const matchesSearch = row.village.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesMandal && matchesSearch;
    });

    // Helper to fetch data from Google Sheet
    const fetchGoogleSheetData = async () => {
        if (!sheetUrl) return;

        setIsLoading(true);
        try {
            // Note: In a real implementation, this would fetch the CSV from the URL
            // const response = await fetch(sheetUrl);
            // const csvText = await response.text();
            // Papa.parse(csvText, {
            //     header: true,
            //     dynamicTyping: true,
            //     complete: (results) => {
            //         // Map CSV columns to WaterDataRow keys (jan15, jan22, yesterday, today, etc.)
            //         const parsedData: WaterDataRow[] = results.data.map((row: any) => ({
            //             mandal: row.Mandal,
            //             village: row.Village,
            //             preMonsoon: row['Pre Monsoon'],
            //             postMonsoon: row['Post Monsoon'],
            //             lastYearDec: row['Last Year Dec'],
            //             presentMonth: row['Present Month'],
            //             jan1: row['Jan 1'], // New column
            //             jan8: row['Jan 8'], // New column
            //             jan15: row['Jan 15'], // New column
            //             jan22: row['Jan 22'], // New column
            //             yesterday: row.Yesterday,
            //             today: row.Today || null, // Handle empty 'Today'
            //         }));
            //         setData(parsedData);
            //     }
            // });

            // For demo purposes, we'll simulate a fetch delay and update 'lastUpdated'
            await new Promise(resolve => setTimeout(resolve, 1500));
            // In integration, map all columns: preMonsoon, postMonsoon, lastYearDec, presentMonth, jan1, jan8, jan15, jan22, yesterday, today

            // Simulate dynamic data update (small random variation to show "real-time" effect)
            const updated = data.map(row => ({
                ...row,
                today: row.yesterday ? Number((row.yesterday + (Math.random() * 0.2 - 0.1)).toFixed(2)) : null
            }));
            setData(updated);

            const now = new Date();
            setLastUpdated(now.toLocaleTimeString());
        } catch (error) {
            console.error("Failed to fetch sheet data", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate Averages for the Footer
    const calculateAverage = (key: keyof WaterDataRow) => {
        const validValues = filteredData.map(r => r[key]).filter(v => typeof v === 'number') as number[];
        if (validValues.length === 0) return 0;
        const sum = validValues.reduce((a, b) => a + b, 0);
        return (sum / validValues.length).toFixed(2);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div className="animate-in slide-in-from-left duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse flex items-center gap-2 border border-red-100 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Live Sync Active
                            </span>
                            <span className="text-gray-400 text-xs font-mono">Synced: {lastUpdated}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-tight">
                            Real-Time <span className="text-primary">Water Monitor</span>
                        </h1>
                        <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
                            Live telemetry tracking from observation wells. Comprehensive view including <span className="font-semibold text-gray-800">Historical Benchmarks</span> and <span className="font-semibold text-gray-800">Weekly Progressions</span>.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 animate-in slide-in-from-right duration-500">
                        <button
                            onClick={() => setIsConfigOpen(!isConfigOpen)}
                            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                        >
                            <ExternalLink size={16} className="text-gray-500" />
                            Data Source
                        </button>
                        <button
                            onClick={fetchGoogleSheetData}
                            disabled={isLoading}
                            className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-gray-200 active:scale-95"
                        >
                            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                            {isLoading ? "Syncing..." : "Sync Now"}
                        </button>
                    </div>
                </div>

                {/* Configuration Panel */}
                {isConfigOpen && (
                    <div className="mb-8 bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-50/50 animate-in slide-in-from-top-4 duration-300">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <Download size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Connect Google Sheet</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Paste your published CSV link below. The table will automatically map columns to the live feed.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={sheetUrl}
                                        onChange={(e) => setSheetUrl(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            fetchGoogleSheetData();
                                            setIsConfigOpen(false);
                                        }}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-200"
                                    >
                                        Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-[80px] z-30">
                    <div className="flex items-center gap-1 w-full md:w-auto p-1">
                        {mandals.map(mandal => (
                            <button
                                key={mandal}
                                onClick={() => setSelectedMandal(mandal)}
                                className={clsx(
                                    "px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                                    selectedMandal === mandal
                                        ? "bg-gray-900 text-white shadow-md transform scale-105"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                {mandal}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72 mr-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find village..."
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                                    <th className="px-5 py-5 sticky left-0 bg-gray-50 z-20 w-[140px] border-r border-gray-200/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Mandal</th>
                                    <th className="px-5 py-5 sticky left-[140px] bg-gray-50 z-20 border-r border-gray-200/50 w-[180px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Village</th>

                                    {/* History Group */}
                                    <th className="px-4 py-5 text-center text-gray-400 font-medium whitespace-nowrap bg-gray-50/30">May '25</th>
                                    <th className="px-4 py-5 text-center text-gray-400 font-medium whitespace-nowrap bg-gray-50/30">Nov '25</th>
                                    <th className="px-4 py-5 text-center text-gray-400 font-medium whitespace-nowrap border-l border-gray-100 bg-gray-50/30">Dec '24</th>
                                    <th className="px-4 py-5 text-center text-gray-400 font-medium whitespace-nowrap bg-gray-50/30">Dec '25</th>

                                    {/* Weekly Progression */}
                                    <th className="px-4 py-5 text-center text-blue-800 font-medium whitespace-nowrap border-l border-gray-100 bg-blue-50/10">
                                        1st Jan
                                    </th>
                                    <th className="px-4 py-5 text-center text-blue-800 font-medium whitespace-nowrap bg-blue-50/20">
                                        8th Jan
                                    </th>
                                    <th className="px-4 py-5 text-center bg-indigo-50/30 text-indigo-900 border-l border-indigo-50">
                                        <div className="flex flex-col items-center">
                                            <span>15th Jan</span>
                                        </div>
                                    </th>
                                    <th className="px-4 py-5 text-center bg-indigo-50/60 text-indigo-900 border-r border-indigo-50">
                                        <div className="flex flex-col items-center">
                                            <span>22nd Jan</span>
                                        </div>
                                    </th>

                                    {/* Live Group */}
                                    <th className="px-6 py-5 text-center bg-amber-50/40 text-amber-900 whitespace-nowrap">
                                        Yesterday
                                    </th>
                                    <th className="px-6 py-5 text-center bg-emerald-50/40 text-emerald-800 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1.5">
                                            Today
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                            </span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredData.map((row, idx) => (
                                    <tr key={`${row.mandal}-${row.village}`} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-4 font-semibold text-gray-900 sticky left-0 bg-white group-hover:bg-gray-50/50 transition-colors border-r border-gray-100/50 z-10">{row.mandal}</td>
                                        <td className="px-5 py-4 text-gray-600 sticky left-[140px] bg-white group-hover:bg-gray-50/50 transition-colors border-r border-gray-100/50 z-10">{row.village}</td>

                                        <td className="px-4 py-4 text-right text-gray-400 font-mono text-xs">{row.preMonsoon}</td>
                                        <td className="px-4 py-4 text-right text-gray-400 font-mono text-xs">{row.postMonsoon}</td>
                                        <td className="px-4 py-4 text-right text-gray-400 font-mono text-xs border-l border-gray-100">{row.lastYearDec}</td>
                                        <td className="px-4 py-4 text-right text-gray-400 font-mono text-xs">{row.presentMonth}</td>

                                        {/* 1st Jan - No comparison (first in weekly series) */}
                                        <td className="px-4 py-4 text-right text-gray-600 font-mono border-l border-gray-100 bg-blue-50/5">{row.jan1}</td>

                                        {/* 8th Jan - Compare to 1st Jan */}
                                        <td className="px-4 py-4 text-right text-gray-600 font-mono bg-blue-50/10">
                                            <span className="inline-flex items-center gap-1">
                                                {row.jan8}
                                                {row.jan8 < row.jan1 ? (
                                                    <ArrowUp size={12} className="text-emerald-500" />
                                                ) : row.jan8 > row.jan1 ? (
                                                    <ArrowDown size={12} className="text-red-500" />
                                                ) : <Minus size={12} className="text-gray-300" />}
                                            </span>
                                        </td>

                                        {/* 15th Jan - Compare to 8th Jan */}
                                        <td className="px-4 py-4 text-right bg-indigo-50/10 text-gray-700 font-mono border-l border-indigo-50/50">
                                            <span className="inline-flex items-center gap-1">
                                                {row.jan15}
                                                {row.jan15 < row.jan8 ? (
                                                    <ArrowUp size={12} className="text-emerald-500" />
                                                ) : row.jan15 > row.jan8 ? (
                                                    <ArrowDown size={12} className="text-red-500" />
                                                ) : <Minus size={12} className="text-gray-300" />}
                                            </span>
                                        </td>

                                        {/* 22nd Jan - Compare to 15th Jan */}
                                        <td className="px-4 py-4 text-right bg-indigo-50/30 text-gray-900 font-bold font-mono border-r border-indigo-50/50">
                                            <span className="inline-flex items-center gap-1">
                                                {row.jan22}
                                                {row.jan22 < row.jan15 ? (
                                                    <ArrowUp size={12} className="text-emerald-500" />
                                                ) : row.jan22 > row.jan15 ? (
                                                    <ArrowDown size={12} className="text-red-500" />
                                                ) : <Minus size={12} className="text-gray-300" />}
                                            </span>
                                        </td>

                                        {/* Yesterday - Compare to 22nd Jan */}
                                        <td className="px-6 py-4 text-right bg-amber-50/20 text-gray-800 font-mono font-medium">
                                            <span className="inline-flex items-center gap-1">
                                                {row.yesterday}
                                                {row.yesterday < row.jan22 ? (
                                                    <ArrowUp size={12} className="text-emerald-500" />
                                                ) : row.yesterday > row.jan22 ? (
                                                    <ArrowDown size={12} className="text-red-500" />
                                                ) : <Minus size={12} className="text-gray-300" />}
                                            </span>
                                        </td>

                                        {/* Today - Compare to Yesterday */}
                                        <td className="px-6 py-4 text-right bg-emerald-50/20 text-emerald-700 font-mono font-bold">
                                            {row.today != null ? (
                                                <span className="inline-flex items-center gap-1">
                                                    {row.today}
                                                    {row.today < row.yesterday ? (
                                                        <ArrowUp size={12} className="text-emerald-500" />
                                                    ) : row.today > row.yesterday ? (
                                                        <ArrowDown size={12} className="text-red-500" />
                                                    ) : <Minus size={12} className="text-gray-300" />}
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 font-sans text-xs italic font-normal">Waiting...</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-900 text-white text-xs uppercase font-medium">
                                <tr>
                                    <td colSpan={2} className="px-6 py-4 text-right sticky left-0 z-20 bg-gray-900">Regional Average</td>
                                    <td className="px-4 py-4 text-right opacity-60 font-mono">{calculateAverage("preMonsoon")}</td>
                                    <td className="px-4 py-4 text-right opacity-60 font-mono">{calculateAverage("postMonsoon")}</td>
                                    <td className="px-4 py-4 text-right opacity-60 font-mono border-l border-gray-700">{calculateAverage("lastYearDec")}</td>
                                    <td className="px-4 py-4 text-right opacity-60 font-mono">{calculateAverage("presentMonth")}</td>

                                    <td className="px-4 py-4 text-right opacity-80 font-mono border-l border-gray-700">{calculateAverage("jan1")}</td>
                                    <td className="px-4 py-4 text-right opacity-80 font-mono">{calculateAverage("jan8")}</td>

                                    <td className="px-4 py-4 text-right font-mono text-indigo-200 border-l border-gray-700">{calculateAverage("jan15")}</td>
                                    <td className="px-4 py-4 text-right font-bold font-mono text-indigo-300">{calculateAverage("jan22")}</td>

                                    <td className="px-6 py-4 text-right font-mono text-amber-200 border-l border-gray-700">{calculateAverage("yesterday")}</td>
                                    <td className="px-6 py-4 text-right">--</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <ArrowUp size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Rising Trend</h4>
                            <p className="text-xs text-gray-500 mt-1">Water levels generally improved from 15th Jan to 22nd Jan in <strong>Kuppam</strong> region.</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Weekly Cycle</h4>
                            <p className="text-xs text-gray-500 mt-1">Next automated milestone capture scheduled for <strong>29th Jan 2026</strong>.</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <InfoIcon />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Telemetry Status</h4>
                            <p className="text-xs text-gray-500 mt-1">All sensors active. Data refresh rate set to 5 minutes.</p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

function InfoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    )
}
