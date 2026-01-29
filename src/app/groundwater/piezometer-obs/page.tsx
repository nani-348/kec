"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, MapPin, Droplets, AlertTriangle, CheckCircle, ArrowDown, ArrowUp, Filter } from "lucide-react";
import clsx from "clsx";
// Fallback Station Data based on extraction (Page 7/8 PDF)
const FALLBACK_STATION_DATA = [
    // Gudi Palle Mandal
    { id: 1, name: "Dravida University", mandal: "Gudupalle", may: 15.88, nov: 12.87, status: "Moderate" },
    { id: 2, name: "Gudupalle HQ", mandal: "Gudupalle", may: 34.42, nov: 31.07, status: "Critical" },
    { id: 3, name: "Solachinthanapalli", mandal: "Gudupalle", may: 41.92, nov: 39.24, status: "Critical" },
    // Kuppam Mandal
    { id: 4, name: "Adaviboduguru", mandal: "Kuppam", may: 30.69, nov: 25.41, status: "Critical" },
    { id: 5, name: "Kangundhi", mandal: "Kuppam", may: 8.03, nov: 3.52, status: "Safe" },
    // Rama Kuppam Mandal
    { id: 6, name: "Balla", mandal: "Ramakuppam", may: 19.96, nov: 12.91, status: "Moderate" },
    { id: 7, name: "Cheldiganipalle", mandal: "Ramakuppam", may: 23.01, nov: 20.96, status: "Moderate" },
    { id: 8, name: "Ramakuppam HQ", mandal: "Ramakuppam", may: 14.70, nov: 12.05, status: "Moderate" },
    { id: 9, name: "Vijilapuram", mandal: "Ramakuppam", may: 17.85, nov: 6.39, status: "Safe" },
    // Santhi Puram Mandal
    { id: 10, name: "Anikera", mandal: "Shanthipuram", may: 20.45, nov: 9.36, status: "Safe" },
    { id: 11, name: "Gundusettipalli", mandal: "Shanthipuram", may: 18.82, nov: 14.84, status: "Moderate" },
    { id: 12, name: "Rallaboduguru", mandal: "Shanthipuram", may: 2.10, nov: 1.00, status: "Safe" },
    { id: 13, name: "Shanthipuram HQ", mandal: "Shanthipuram", may: 16.03, nov: 15.05, status: "Moderate" },
];
export default function PiezometerObsPage() {
    const [stationData, setStationData] = useState<any[]>(FALLBACK_STATION_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/api/sheets?category=Groundwater&table=PIEZOMETER OBSERVATIONS');
            const result = await response.json();
            if (result.success && result.data.length > 0) {
                // Transform the data and add id
                const transformedData = result.data.map((row: any, index: number) => ({
                    id: index + 1,
                    name: row.name,
                    mandal: row.mandal,
                    may: typeof row.may === 'number' ? row.may : parseFloat(row.may) || 0,
                    nov: typeof row.nov === 'number' ? row.nov : parseFloat(row.nov) || 0,
                    status: row.status || 'Moderate'
                }));
                setStationData(transformedData);
            }
        } catch (error) {
            console.error("Failed to fetch piezometer data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000); // Refresh every 1 second
        return () => clearInterval(interval);
    }, [fetchData]);
    const mandals = ["All", ...Array.from(new Set(stationData.map(s => s.mandal)))];
    const filteredData = useMemo(() => {
        return stationData.filter(station => {
            const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === "All" || station.mandal === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, activeFilter, stationData]);
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow py-8 lg:py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                            Piezometer Observations
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Real-time monitoring network analysis. Station-wise breakdown of water levels showing localized recharge impact.
                        </p>
                    </div>
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            <Filter size={18} className="text-gray-400 shrink-0 mr-2" />
                            {mandals.map((mandal) => (
                                <button
                                    key={mandal}
                                    onClick={() => setActiveFilter(mandal)}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                        activeFilter === mandal
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    {mandal}
                                </button>
                            ))}
                        </div>
                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search station..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>
                    {/* Station Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {filteredData.map((station) => {
                            const rise = (station.may - station.nov).toFixed(2);
                            const isImprovement = parseFloat(rise) > 0;
                            const statusColor = station.status === "Safe" ? "text-green-600 bg-green-50" :
                                station.status === "Critical" ? "text-red-600 bg-red-50" : "text-yellow-600 bg-yellow-50";
                            const BorderColor = station.status === "Safe" ? "border-green-200" :
                                station.status === "Critical" ? "border-red-200" : "border-yellow-200";
                            return (
                                <div key={station.id} className={`bg-white rounded-xl border ${BorderColor} shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden group`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                                {station.mandal}
                                            </span>
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                                                {station.name}
                                            </h3>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                                            {station.status}
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-2 mb-4">
                                        <div className="flex-grow">
                                            <p className="text-xs text-gray-500 mb-1">Current Level (Nov)</p>
                                            <p className="text-2xl font-bold text-gray-900">{station.nov.toFixed(2)} m</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-400 mb-1">Fluctuation</p>
                                            <p className={`text-sm font-bold flex items-center justify-end gap-1 ${isImprovement ? "text-green-600" : "text-red-500"}`}>
                                                {isImprovement ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                                {Math.abs(parseFloat(rise))} m
                                            </p>
                                        </div>
                                    </div>
                                    {/* Mini Bar Visualization */}
                                    <div className="space-y-2">
                                        <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                                                style={{ width: `${Math.min((station.may / 50) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] text-gray-400">
                                            <span>May: {station.may}m</span>
                                            <span>Max Depth (50m)</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Empty State */}
                    {filteredData.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No stations found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                    {/* Summary Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Droplets size={18} className="text-blue-500" />
                            <h3 className="font-semibold text-gray-800">Complete Network Data</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Station Name</th>
                                        <th className="px-6 py-3">Mandal</th>
                                        <th className="px-6 py-3 text-right">Pre-Monsoon (May)</th>
                                        <th className="px-6 py-3 text-right">Post-Monsoon (Nov)</th>
                                        <th className="px-6 py-3 text-right">Net Rise</th>
                                        <th className="px-6 py-3 text-center">Condition</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredData.map((station) => (
                                        <tr key={station.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 font-medium text-gray-900">{station.name}</td>
                                            <td className="px-6 py-3 text-gray-500">{station.mandal}</td>
                                            <td className="px-6 py-3 text-right text-gray-500">{station.may.toFixed(2)}</td>
                                            <td className="px-6 py-3 text-right font-bold text-gray-900">{station.nov.toFixed(2)}</td>
                                            <td className="px-6 py-3 text-right text-green-600 font-medium">
                                                +{(station.may - station.nov).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {station.status === "Safe" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700"><CheckCircle size={12} /> Safe</span>}
                                                {station.status === "Moderate" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700"><AlertTriangle size={12} /> Moderate</span>}
                                                {station.status === "Critical" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700"><AlertTriangle size={12} /> Critical</span>}
                                            </td>
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
