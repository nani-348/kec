"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegionMap from "@/components/overview/RegionMap";
import { Trees, CloudRain, Mountain, Map as MapIcon, Droplets, TrendingUp, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

// Mandal data with colors for visualization
const MANDAL_COLORS: Record<string, { primary: string; bg: string; gradient: string }> = {
    "Gudi Palle": { primary: "#3b82f6", bg: "bg-blue-500", gradient: "from-blue-500 to-blue-600" },
    "Kuppam": { primary: "#8b5cf6", bg: "bg-violet-500", gradient: "from-violet-500 to-violet-600" },
    "Rama Kuppam": { primary: "#10b981", bg: "bg-emerald-500", gradient: "from-emerald-500 to-emerald-600" },
    "Santhi Puram": { primary: "#f59e0b", bg: "bg-amber-500", gradient: "from-amber-500 to-amber-600" },
};
export default function AboutKadaPage() {
    const [stats, setStats] = useState([
        {
            label: "Total Geographical Area",
            value: "105,190",
            unit: "Ha",
            icon: MapIcon,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Recharge Worthy Area",
            value: "71,790",
            unit: "Ha",
            icon: Trees,
            color: "bg-green-50 text-green-600",
        },
        {
            label: "Hilly Area",
            value: "33,400",
            unit: "Ha",
            icon: Mountain,
            color: "bg-orange-50 text-orange-600",
        },
        {
            label: "Normal Rainfall",
            value: "827",
            unit: "mm",
            icon: CloudRain,
            color: "bg-cyan-50 text-cyan-600",
        },
    ]);
    const [regionData, setRegionData] = useState([
        {
            region: "Gudi Palle",
            geoArea: "16,831",
            rechargeArea: "13,119",
            hillyArea: "3,712",
            rainfall: "856",
        },
        {
            region: "Kuppam",
            geoArea: "43,000",
            rechargeArea: "24,806",
            hillyArea: "18,195",
            rainfall: "865",
        },
        {
            region: "Rama Kuppam",
            geoArea: "29,019",
            rechargeArea: "17,576",
            hillyArea: "11,443",
            rainfall: "773",
        },
        {
            region: "Santhi Puram",
            geoArea: "16,340",
            rechargeArea: "16,290",
            hillyArea: "50",
            rainfall: "813",
        },
    ]);
    const [totalRainfallAvg, setTotalRainfallAvg] = useState("827");
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/overview");
                const result = await response.json();
                if (result.error) return;
                // 1. Update Stats from Administrative Profile
                if (result.profile && Array.isArray(result.profile)) {
                    const profileMap = new Map(result.profile.map((p: any) => [p.metric, p]));
                    setStats(prevStats => prevStats.map(stat => {
                        let matchedMetric: any = null;
                        if (stat.label.includes("Geographical Area")) matchedMetric = profileMap.get("Geographical Area");
                        if (stat.label.includes("Normal Rainfall")) matchedMetric = profileMap.get("Average Rainfall");
                        // Keep hardcoded if not found in sheet (Recharge/Hilly area missing in sheet)
                        if (matchedMetric) {
                            return {
                                ...stat,
                                value: matchedMetric.value.toLocaleString(),
                                unit: matchedMetric.unit === "mm/year" ? "mm" : "Ha" // Align units
                            };
                        }
                        return stat;
                    }));
                }
                // 2. Update Rainfall Data per Mandal
                if (result.rainfall && Array.isArray(result.rainfall)) {
                    setRegionData(prevData => prevData.map(region => {
                        const match = result.rainfall.find((r: any) =>
                            r.name.toLowerCase().includes(region.region.toLowerCase().replace(" ", "")) ||
                            region.region.toLowerCase().includes(r.name.toLowerCase())
                        );
                        return {
                            ...region,
                            rainfall: match ? match.rainfall.toString() : region.rainfall
                        };
                    }));
                    // 3. Update Total Average
                    const avgRow = result.rainfall.find((r: any) => r.isAverage || r.name.includes("Avg"));
                    if (avgRow) {
                        setTotalRainfallAvg(avgRow.rainfall.toString());
                    }
                }
            } catch (error) {
                console.error("Failed to fetch overview data", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Page Header & Map Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
                        <div className="text-center lg:text-left space-y-4">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
                                About KADA Region
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Comprehensive geographical and groundwater profile of the Kuppam Area Development Authority region.
                                Explore the detailed breakdown of the region's recharge areas, hilly terrain, and rainfall statistics.
                            </p>
                        </div>
                        {/* Region Map Image - Interactive (Right Side) */}
                        <div className="w-full">
                            <RegionMap />
                        </div>
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">
                                            {stat.label}
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {stat.value}
                                            <span className="text-sm font-normal text-gray-500 ml-1">
                                                {stat.unit}
                                            </span>
                                        </h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ==================== RAINFALL ANALYSIS SECTION ==================== */}
                    <div className="mb-12">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-200">
                                <CloudRain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 font-serif">Rainfall Analysis</h2>
                                <p className="text-sm text-gray-500">30-Year Average Rainfall Distribution (1994-2023)</p>
                            </div>
                        </div>

                        {/* Visual Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Rainfall Bar Chart */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-blue-500" />
                                        Mandal-wise Rainfall
                                    </h3>
                                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                                        mm/year
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {regionData.map((row) => {
                                        const rainfall = parseInt(row.rainfall.replace(/,/g, ''));
                                        const maxRainfall = 900;
                                        const percentage = (rainfall / maxRainfall) * 100;
                                        const colors = MANDAL_COLORS[row.region] || { primary: "#6b7280", gradient: "from-gray-500 to-gray-600" };
                                        return (
                                            <div key={row.region} className="group">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">{row.region}</span>
                                                    <span className="text-sm font-bold" style={{ color: colors.primary }}>
                                                        {row.rainfall} mm
                                                    </span>
                                                </div>
                                                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${colors.gradient} rounded-lg transition-all duration-700 ease-out group-hover:opacity-90 flex items-center justify-end pr-3`}
                                                        style={{ width: `${percentage}%` }}
                                                    >
                                                        <Droplets className="w-4 h-4 text-white/80" />
                                                    </div>
                                                    {/* Average line marker */}
                                                    <div 
                                                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                                                        style={{ left: `${(827 / maxRainfall) * 100}%` }}
                                                        title="Regional Average: 827mm"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <div className="w-3 h-0.5 bg-red-500" />
                                    <span className="text-xs text-gray-500">Regional Average: {totalRainfallAvg} mm</span>
                                </div>
                            </div>

                            {/* Area Distribution Donut Chart Visualization */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                        <MapIcon className="w-5 h-5 text-emerald-500" />
                                        Area Distribution
                                    </h3>
                                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-medium">
                                        Hectares
                                    </span>
                                </div>
                                
                                {/* Visual Donut Representation */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-48 h-48">
                                        {/* Background circle */}
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                                            {/* Geo Area - Full circle base */}
                                            <circle 
                                                cx="50" cy="50" r="40" fill="none" 
                                                stroke="#3b82f6" strokeWidth="12"
                                                strokeDasharray="251.2" strokeDashoffset="0"
                                                className="drop-shadow-sm"
                                            />
                                            {/* Recharge Area */}
                                            <circle 
                                                cx="50" cy="50" r="40" fill="none" 
                                                stroke="#10b981" strokeWidth="12"
                                                strokeDasharray="251.2" strokeDashoffset="79.5"
                                                className="drop-shadow-sm"
                                            />
                                            {/* Hilly Area */}
                                            <circle 
                                                cx="50" cy="50" r="40" fill="none" 
                                                stroke="#f59e0b" strokeWidth="12"
                                                strokeDasharray="251.2" strokeDashoffset="171.3"
                                                className="drop-shadow-sm"
                                            />
                                        </svg>
                                        {/* Center text */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-gray-900">105,190</span>
                                            <span className="text-xs text-gray-500">Total Ha</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1" />
                                        <p className="text-lg font-bold text-blue-700">105,190</p>
                                        <p className="text-xs text-blue-600">Geographical</p>
                                    </div>
                                    <div className="text-center p-3 bg-emerald-50 rounded-xl">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1" />
                                        <p className="text-lg font-bold text-emerald-700">71,790</p>
                                        <p className="text-xs text-emerald-600">Recharge</p>
                                    </div>
                                    <div className="text-center p-3 bg-amber-50 rounded-xl">
                                        <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-1" />
                                        <p className="text-lg font-bold text-amber-700">33,400</p>
                                        <p className="text-xs text-amber-600">Hilly Area</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mandal Cards with Visual Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {regionData.map((row) => {
                                const colors = MANDAL_COLORS[row.region] || { primary: "#6b7280", bg: "bg-gray-500", gradient: "from-gray-500 to-gray-600" };
                                const rainfall = parseInt(row.rainfall.replace(/,/g, ''));
                                const isAboveAvg = rainfall > 827;
                                return (
                                    <div 
                                        key={row.region}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                                    >
                                        {/* Gradient Header */}
                                        <div className={`bg-gradient-to-r ${colors.gradient} p-4 text-white`}>
                                            <h4 className="font-bold text-lg">{row.region}</h4>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Droplets className="w-4 h-4" />
                                                <span className="text-2xl font-bold">{row.rainfall}</span>
                                                <span className="text-sm opacity-80">mm</span>
                                                {isAboveAvg ? (
                                                    <TrendingUp className="w-4 h-4 ml-1" />
                                                ) : (
                                                    <TrendingUp className="w-4 h-4 ml-1 rotate-180" />
                                                )}
                                            </div>
                                        </div>
                                        {/* Stats */}
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Geographical</span>
                                                <span className="text-sm font-semibold text-gray-800">{row.geoArea} Ha</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Recharge Area</span>
                                                <span className="text-sm font-semibold text-emerald-600">{row.rechargeArea} Ha</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Hilly Area</span>
                                                <span className="text-sm font-semibold text-amber-600">{row.hillyArea} Ha</span>
                                            </div>
                                            {/* Mini progress bar */}
                                            <div className="pt-2">
                                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                                                        style={{ width: `${(rainfall / 900) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary Banner */}
                        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-200/50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">Total Geographical Area</p>
                                    <p className="text-3xl font-bold">105,190 <span className="text-lg font-normal">Ha</span></p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">Recharge Worthy Area</p>
                                    <p className="text-3xl font-bold">71,790 <span className="text-lg font-normal">Ha</span></p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">Hilly Area</p>
                                    <p className="text-3xl font-bold">33,400 <span className="text-lg font-normal">Ha</span></p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">30-Yr Avg Rainfall</p>
                                    <p className="text-3xl font-bold">{totalRainfallAvg} <span className="text-lg font-normal">mm</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ==================== END RAINFALL ANALYSIS ==================== */}

                    {/* Data Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Mandal-wise Breakdown</h2>
                            <span className="text-xs text-secondary font-medium px-2 py-1 bg-secondary/10 rounded-md">
                                2024-25 Data & 30-Year Rainfall Avg (Source: API)
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Region / Mandal</th>
                                        <th className="px-6 py-4 font-medium">Geographical Area (Ha)</th>
                                        <th className="px-6 py-4 font-medium">Recharge Worthy Area (Ha)</th>
                                        <th className="px-6 py-4 font-medium">Hilly Area (Ha)</th>
                                        <th className="px-6 py-4 font-medium">30-Yr Avg Rainfall (mm)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {regionData.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                                                {row.region}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{row.geoArea}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.rechargeArea}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.hillyArea}</td>
                                            <td className="px-6 py-4 text-gray-600 font-medium text-primary">
                                                {row.rainfall}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-primary/5 font-semibold text-gray-900">
                                    <tr>
                                        <td className="px-6 py-4">Total Classification</td>
                                        <td className="px-6 py-4">
                                            {stats.find(s => s.label.includes("Geographical"))?.value || "105,190"}
                                        </td>
                                        <td className="px-6 py-4">71,790</td>
                                        <td className="px-6 py-4">33,400</td>
                                        <td className="px-6 py-4">{totalRainfallAvg} (Avg)</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
