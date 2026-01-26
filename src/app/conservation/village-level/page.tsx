"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    MapPin,
    Users,
    FileText,
    Sprout,
    Droplets,
    Scale,
    AlertTriangle,
    CheckCircle,
    ChevronDown,
    Search
} from "lucide-react";
import clsx from "clsx";

// --- Mock Data Models ---

const VILLAGES = ["Vempalli", "Pulivendula", "Rayachoty", "Galiveedu", "Lakkireddipalli"];

interface VillageData {
    name: string;
    population: number;
    area: number;
    securityPlanStatus: string;
    waterBudget: {
        totalRecharge: number;
        totalDraft: number;
        balance: number;
        status: string;
    };
    cropPlan: {
        proposedReduction: string;
        cropShift: string;
        areaShifted: number;
    };
    resolutions: string[];
    participation: {
        farmersTrained: number;
        womenInvolved: number;
        meetingsHeld: number;
    };
}

const VILLAGE_DATA_MAP: Record<string, VillageData> = {
    "Vempalli": {
        name: "Vempalli",
        population: 4500,
        area: 1250,
        securityPlanStatus: "Implemented",
        waterBudget: { totalRecharge: 1250, totalDraft: 1400, balance: -150, status: "Deficit" },
        cropPlan: { proposedReduction: "20%", cropShift: "Paddy to Millets", areaShifted: 150 },
        resolutions: [
            "Ban on new borewells for 3 years",
            "Mandatory drip irrigation for commercial crops",
            "Protection of local tank catchment area",
            "Ban on water intensive crops in summer"
        ],
        participation: { farmersTrained: 350, womenInvolved: 120, meetingsHeld: 12 }
    },
    "Pulivendula": {
        name: "Pulivendula",
        population: 6200,
        area: 1800,
        securityPlanStatus: "In Progress",
        waterBudget: { totalRecharge: 1600, totalDraft: 1550, balance: 50, status: "Surplus" },
        cropPlan: { proposedReduction: "15%", cropShift: "Cotton to Pulses", areaShifted: 220 },
        resolutions: [
            "Regulation of borewell depth to 200ft",
            "Promotion of farm ponds subsidy",
            "Strict penalties for water wastage",
        ],
        participation: { farmersTrained: 420, womenInvolved: 180, meetingsHeld: 8 }
    },
    "Rayachoty": {
        name: "Rayachoty",
        population: 5100,
        area: 1450,
        securityPlanStatus: "Implemented",
        waterBudget: { totalRecharge: 1300, totalDraft: 1600, balance: -300, status: "Critical Deficit" },
        cropPlan: { proposedReduction: "30%", cropShift: "Horticulture Expansion", areaShifted: 300 },
        resolutions: [
            "Complete ban on summer paddy",
            "Adoption of micro-irrigation for all fruit orchards",
            "Community maintenance of check dams",
        ],
        participation: { farmersTrained: 280, womenInvolved: 95, meetingsHeld: 15 }
    },
    "Galiveedu": {
        name: "Galiveedu",
        population: 3800,
        area: 1100,
        securityPlanStatus: "Review",
        waterBudget: { totalRecharge: 950, totalDraft: 1000, balance: -50, status: "Marginal Deficit" },
        cropPlan: { proposedReduction: "10%", cropShift: "Groundnut Intercropping", areaShifted: 80 },
        resolutions: [
            "Restriction on digging new agricultural borewells",
            "Revival of traditional water bodies",
        ],
        participation: { farmersTrained: 150, womenInvolved: 60, meetingsHeld: 5 }
    },
    "Lakkireddipalli": {
        name: "Lakkireddipalli",
        population: 4100,
        area: 1320,
        securityPlanStatus: "Implemented",
        waterBudget: { totalRecharge: 1100, totalDraft: 900, balance: 200, status: "Safe Surplus" },
        cropPlan: { proposedReduction: "0%", cropShift: "Sustainable Maintenance", areaShifted: 0 },
        resolutions: [
            "Monitoring ground water levels weekly",
            "Awareness campaigns for water literacy",
            "Protection of recharge shafts"
        ],
        participation: { farmersTrained: 200, womenInvolved: 100, meetingsHeld: 10 }
    },
};

export default function VillageLevelPage() {
    const [selectedVillage, setSelectedVillage] = useState("Vempalli");

    const currentData = VILLAGE_DATA_MAP[selectedVillage] || VILLAGE_DATA_MAP["Vempalli"];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
                        Community-Led Water Security Plans
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Empowering local communities with data to create and implement their own <span className="font-semibold text-blue-600">Water Security Plans</span> for sustainable resource management.
                    </p>
                </div>

                {/* Village Selector & Status Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={selectedVillage}
                            onChange={(e) => setSelectedVillage(e.target.value)}
                            className="block w-full pl-10 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors appearance-none text-gray-700 font-medium"
                        >
                            {VILLAGES.map((v) => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg whitespace-nowrap">
                            <span className="text-sm text-gray-500">Plan Status:</span>
                            <span className={clsx("text-sm font-bold flex items-center gap-1",
                                currentData.securityPlanStatus === "Implemented" ? "text-emerald-600" :
                                    currentData.securityPlanStatus === "In Progress" ? "text-blue-600" : "text-amber-600"
                            )}>
                                <CheckCircle size={14} /> {currentData.securityPlanStatus}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg whitespace-nowrap">
                            <span className="text-sm text-gray-500">Last Audit:</span>
                            <span className="text-sm font-bold text-blue-600">Dec 2024</span>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Water Budget & Crop Plan */}
                    <div className="space-y-6">
                        {/* Water Budget Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Scale size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Village Water Budget</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                        <Droplets size={16} className="text-emerald-500" /> Supply (Recharge)
                                    </span>
                                    <span className="font-bold text-gray-900">{currentData.waterBudget.totalRecharge}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border border-amber-100">
                                    <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                        <AlertTriangle size={16} className="text-amber-500" /> Demand (Draft)
                                    </span>
                                    <span className="font-bold text-gray-900">{currentData.waterBudget.totalDraft}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500">Balance</span>
                                    <span className={clsx("text-lg font-bold", currentData.waterBudget.balance >= 0 ? "text-emerald-500" : "text-red-500")}>
                                        {currentData.waterBudget.balance > 0 ? "+" : ""}{currentData.waterBudget.balance}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Crop Planning Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <Sprout size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Crop Planning</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Proposed Reduction</p>
                                    <p className="text-2xl font-bold text-gray-900">{currentData.cropPlan.proposedReduction}</p>
                                    <p className="text-xs text-green-600 mt-1">In water intensive area</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Major Crop Shift</p>
                                    <p className="text-lg font-semibold text-gray-800">{currentData.cropPlan.cropShift}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Area Shifted</p>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                    <p className="text-xs text-gray-600 text-right">{currentData.cropPlan.areaShifted} Ha achieved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Community Resolutions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Resolutions */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                        <FileText size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Community Resolutions</h3>
                                </div>
                                <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-1 rounded-md">
                                    Gram Sabha Approved
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentData.resolutions.map((res, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 items-start group hover:bg-white hover:shadow-md transition-all">
                                        <div className="mt-0.5">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                        <p className="text-gray-700 font-medium text-sm leading-relaxed group-hover:text-gray-900">
                                            {res}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Participation Stats */}
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">Participation Metrics</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                                        <div className="flex justify-center mb-2 text-orange-500"><Users size={24} /></div>
                                        <div className="text-2xl font-bold text-gray-900">{currentData.participation.farmersTrained}</div>
                                        <div className="text-xs font-medium text-orange-600">Farmers Trained</div>
                                    </div>
                                    <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-100">
                                        <div className="flex justify-center mb-2 text-pink-500"><Users size={24} /></div>
                                        <div className="text-2xl font-bold text-gray-900">{currentData.participation.womenInvolved}</div>
                                        <div className="text-xs font-medium text-pink-600">Women Involved</div>
                                    </div>
                                    <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <div className="flex justify-center mb-2 text-indigo-500"><Users size={24} /></div>
                                        <div className="text-2xl font-bold text-gray-900">{currentData.participation.meetingsHeld}</div>
                                        <div className="text-xs font-medium text-indigo-600">Meetings Held</div>
                                    </div>
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
