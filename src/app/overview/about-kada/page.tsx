"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegionMap from "@/components/overview/RegionMap";
import { Trees, CloudRain, Mountain, Map as MapIcon } from "lucide-react";
import RainfallAnalysis from "@/components/overview/RainfallAnalysis";
import { useEffect, useState } from "react";
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
            label: "Average Rainfall",
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
                        if (stat.label.includes("Average Rainfall")) matchedMetric = profileMap.get("Average Rainfall");
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
                    {/* Rainfall Analysis Section */}
                    <RainfallAnalysis />
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
