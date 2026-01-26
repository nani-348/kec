"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Zap, Droplets, ArrowUp, Info, Calculator, Leaf, Lightbulb, Activity } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ComposedChart, Line, Area
} from "recharts";
import clsx from "clsx";

// --- Data Constants ---

const POWER_DATA = [
    {
        region: "KADA Region",
        period: "Previous Water Year (May 2024 - Nov 2024)",
        rise: 1.68,
        range: "(19.67 - 17.99)",
        powerSaved: 44810,
        megaUnits: 0.045
    },
    {
        region: "KADA Region",
        period: "Present Water Year (May 2025 - Nov 2025)",
        rise: 5.04,
        range: "(20.30 - 15.26)",
        powerSaved: 148579,
        megaUnits: 0.148
    },
    {
        region: "Chittoor District",
        period: "Previous Water Year (May 2024 - Nov 2024)",
        rise: 3.02,
        range: "(13.25 - 10.23)",
        powerSaved: 811806,
        megaUnits: 0.812
    },
    {
        region: "Chittoor District",
        period: "Present Water Year (May 2025 - Nov 2025)",
        rise: 5.42,
        range: "(11.87 - 6.45)",
        powerSaved: 1456950,
        megaUnits: 1.456
    }
];

const METHODOLOGY_CONSTANTS = {
    cadaDraftQ: 1.87, // m3/sec
    chittoorDraftQ: 17.05, // m3/sec
    pumpingHours: 9,
    functionalDays: 100,
    density: 1000,
    gravity: 9.81,
    effPower: 0.7,
    effMotor: 0.8
};

export default function MonsoonPowerPage() {
    // Calculator State
    const [calcRise, setCalcRise] = useState<number>(1.0); // Meters
    const [activeTab, setActiveTab] = useState<"formula" | "calculator">("formula");

    // Calculation Logic
    // Formula: (Q * T * F * g * rho * H) / (1000 * 3600 * np * nm)
    // Denominator = 1000 * 3600 * 0.7 * 0.8 = 2,016,000 W-sec => KW-hr conversion factor relative to J?
    // Wait, let's follow the image exactly:
    // Denominator = 1000 * 3600 * 0.7 * 0.8 
    // Numerator = Q * (9 * 3600) * 100 * 1000 * 9.81 * H
    
    // Constant Factor C = (9 * 3600 * 100 * 1000 * 9.81) / (1000 * 3600 * 0.7 * 0.8)
    // Simplify:
    // (9 * 100 * 9.81) / (0.7 * 0.8) = (8829) / 0.56 = 15,766.07
    
    // KADA Savings = 1.87 * 15,766.07 = 29,482.5 (Matches ~29,480 in image)
    // Chittoor Savings = 17.05 * 15,766.07 = 268,811 (Matches ~2,68,810 in image)

    const SAVINGS_PER_METER_KADA = 29480;
    const SAVINGS_PER_METER_CHITTOOR = 268810;

    const projectedKadaSavings = (calcRise * SAVINGS_PER_METER_KADA).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    const projectedChittoorSavings = (calcRise * SAVINGS_PER_METER_CHITTOOR).toLocaleString('en-IN', { maximumFractionDigits: 0 });

    const chartData = [
        {
            name: "KADA (Prev)",
            rise: 1.68,
            power: 44810,
        },
        {
            name: "KADA (Present)",
            rise: 5.04,
            power: 148579,
        },
        {
            name: "Chittoor (Prev)",
            rise: 3.02,
            power: 811806,
        },
        {
            name: "Chittoor (Present)",
            rise: 5.42,
            power: 1456950,
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Hero Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wide mb-3">
                        <Zap size={14} className="fill-amber-500 text-amber-600" />
                        Energy-Water Nexus
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
                                Monsoon Rise & <span className="text-amber-600">Power Savings</span>
                            </h1>
                            <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-2xl">
                                Quantifying the energy conservation impact of groundwater recharge.
                                Higher water levels reduce hydraulic lift requirements, saving millions of units of electricity per crop season.
                            </p>
                        </div>
                        
                        {/* Summary Stat */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-700">
                                <Leaf size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">KADA Energy Saved (2025)</p>
                                <p className="text-2xl font-bold text-gray-900">0.148 <span className="text-sm font-medium text-gray-500">MU</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Data Table & Chart Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    
                    {/* Left: Table */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full">
                            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Activity size={18} className="text-blue-600" />
                                    Comparative Analysis Table
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-gray-100 text-xs uppercase font-bold text-gray-500">
                                            <th className="px-6 py-4">Region</th>
                                            <th className="px-6 py-4">Period</th>
                                            <th className="px-6 py-4 text-center">
                                                Monsoon Rise <br/>
                                                <span className="text-[10px] text-gray-400 normal-case">(m) & (Levels mbgl)</span>
                                            </th>
                                            <th className="px-6 py-4 text-right">Power Saved <br/><span className="text-[10px] text-gray-400 normal-case">(KWHrs)</span></th>
                                            <th className="px-6 py-4 text-right">Mega Units <br/><span className="text-[10px] text-gray-400 normal-case">(MU)</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {POWER_DATA.map((row, idx) => (
                                            <tr key={idx} className={clsx(
                                                "hover:bg-gray-50 transition-colors",
                                                idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                            )}>
                                                <td className={clsx("px-6 py-4 font-bold", 
                                                    row.region.includes("KADA") ? "text-emerald-700" : "text-blue-700"
                                                )}>
                                                    {row.period.includes("Previous") ? row.region : ""} 
                                                    {/* Hack to show region only once per group visually or keep simplified */}
                                                    {row.region}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    <span className={clsx("px-2 py-1 rounded text-xs font-semibold", 
                                                        row.period.includes("Present") ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                                                    )}>
                                                        {row.period.split(' (')[0]}
                                                    </span>
                                                    <div className="text-[10px] text-gray-400 mt-1">{row.period.match(/\((.*?)\)/)?.[0]}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="font-bold text-gray-900 text-lg">{row.rise} m</div>
                                                    <div className="text-xs text-gray-500 font-mono">{row.range}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-gray-700">
                                                    {row.powerSaved.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-amber-600">
                                                    {row.megaUnits}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visualization */}
                    <div className="lg:col-span-12 xl:col-span-5">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
                            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Zap size={18} className="text-amber-500" />
                                Impact Visualization
                            </h3>
                            <div className="flex-grow min-h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid stroke="#f3f4f6" vertical={false} />
                                        <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} angle={-15} textAnchor="end" height={60} />
                                        <YAxis yAxisId="left" orientation="left" label={{ value: 'Rise (m)', angle: -90, position: 'insideLeft' }} />
                                        <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => (v/100000).toFixed(1) + 'L'} label={{ value: 'Power (Units)', angle: 90, position: 'insideRight' }} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                        />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="rise" name="Water Level Rise (m)" fill="#3b82f6" barSize={30} radius={[4, 4, 0, 0]} />
                                        <Line yAxisId="right" type="monotone" dataKey="power" name="Power Saved (KWHr)" stroke="#d97706" strokeWidth={3} dot={{r: 4, fill: "#d97706"}} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology & Calculator Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left: Scientific Formula */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Lightbulb size={200} />
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold mb-2 text-amber-400">Scientific Methodology</h3>
                            <p className="text-slate-400 mb-8 text-sm">
                                Calculation of power saved in one crop season for a sustainable rise of Groundwater levels.
                            </p>

                            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm mb-6">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-3">The Formula</p>
                                <div className="font-mono text-sm lg:text-base text-center leading-loose">
                                    <span className="text-blue-300">Power Saved (KWHr)</span> = <br/>
                                    <div className="inline-block border-b border-slate-500 px-4 py-2 mb-2">
                                        Q × T × F × g × ρ × <span className="text-emerald-400 font-bold">H</span>
                                    </div>
                                    <br/>
                                    <span className="text-slate-400">1000 × 3600 × η_p × η_m</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 font-mono">
                                <div>
                                    <p><strong className="text-slate-200">Q</strong> = Unit Draft (m³/sec)</p>
                                    <p><strong className="text-slate-200">T</strong> = Pumping Period ({METHODOLOGY_CONSTANTS.pumpingHours} hrs)</p>
                                    <p><strong className="text-slate-200">F</strong> = Functional Days ({METHODOLOGY_CONSTANTS.functionalDays})</p>
                                </div>
                                <div>
                                    <p><strong className="text-slate-200">g</strong> = Gravity ({METHODOLOGY_CONSTANTS.gravity} m/s²)</p>
                                    <p><strong className="text-slate-200">ρ</strong> = Density ({METHODOLOGY_CONSTANTS.density} Kg/m³)</p>
                                    <p><strong className="text-slate-200">H</strong> = Water Level Rise (m)</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-slate-800 text-xs">
                                <span className="text-amber-500 font-bold">Constants:</span> Power Efficiency (0.7), Motor Efficiency (0.8). 
                                <br/>KADA Draft Q = 1.87 m³/sec | Chittoor Draft Q = 17.05 m³/sec
                            </div>
                        </div>
                    </div>

                    {/* Right: Live Calculator */}
                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                                <Calculator size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 font-serif">Savings Simulator</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Simulate Water Level Rise (meters)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="range" 
                                        min="0.5" 
                                        max="10" 
                                        step="0.1" 
                                        value={calcRise}
                                        onChange={(e) => setCalcRise(parseFloat(e.target.value))}
                                        className="flex-grow h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                    />
                                    <div className="bg-white px-4 py-2 rounded-xl border border-amber-200 font-bold text-amber-800 min-w-[80px] text-center">
                                        {calcRise} m
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">KADA Potential Savings</p>
                                    <h4 className="text-2xl font-bold text-gray-900">{projectedKadaSavings}</h4>
                                    <p className="text-xs text-amber-600 font-medium">Units (KWHrs)</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Chittoor Potential Savings</p>
                                    <h4 className="text-2xl font-bold text-gray-900">{projectedChittoorSavings}</h4>
                                    <p className="text-xs text-amber-600 font-medium">Units (KWHrs)</p>
                                </div>
                            </div>

                            <div className="p-4 bg-amber-100/50 rounded-xl text-xs text-amber-800 italic leading-relaxed">
                                <Info size={14} className="inline mr-1 -mt-0.5" />
                                Based on the standard formula: for every 1m of groundwater rise, KADA saves approx 29,480 units, and Chittoor saves 2.68 Lakh units due to reduced lifting head.
                            </div>
                        </div>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
