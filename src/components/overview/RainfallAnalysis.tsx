"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  CloudRain,
  TrendingUp,
  TrendingDown,
  Filter,
  BarChart3,
  LineChart,
  RefreshCw,
  Calendar,
  MapPin,
} from "lucide-react";

interface RainfallApiResponse {
  success: boolean;
  mandals: string[];
  years: number[];
  yearlyData: Record<number, Record<string, number>>;
  monthlyData: Record<string, Record<number, number>>;
  mandalAverages: Record<string, number>;
  error?: string;
  message?: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MANDAL_COLORS: Record<string, string> = {
  "RAMA KUPPAM": "#3b82f6",
  "SANTHI PURAM": "#10b981",
  "GUDI PALLE": "#f59e0b",
  KUPPAM: "#8b5cf6",
};

// 2024-25 Mandal-wise breakdown data
const MANDAL_BREAKDOWN = [
  { name: "GUDI PALLE", geoArea: 16831, rechargeArea: 13119, hillyArea: 3712, rainfall: 856 },
  { name: "KUPPAM", geoArea: 43000, rechargeArea: 24806, hillyArea: 18195, rainfall: 865 },
  { name: "RAMA KUPPAM", geoArea: 29019, rechargeArea: 17576, hillyArea: 11443, rainfall: 773 },
  { name: "SANTHI PURAM", geoArea: 16340, rechargeArea: 16290, hillyArea: 50, rainfall: 813 },
];
const TOTAL_BREAKDOWN = { geoArea: 105190, rechargeArea: 71790, hillyArea: 33400, avgRainfall: 827 };

export default function RainfallAnalysis() {
  const [data, setData] = useState<RainfallApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMandals, setSelectedMandals] = useState<string[]>([]);
  const [selectedYearRange, setSelectedYearRange] = useState<[number, number]>([1994, 2023]);
  const [viewMode, setViewMode] = useState<"yearly" | "monthly" | "comparison" | "breakdown">("yearly");
  const [breakdownMetric, setBreakdownMetric] = useState<"area" | "rainfall">("area");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchRainfallData() {
      try {
        setLoading(true);
        const response = await fetch("/api/rainfall");
        const result = await response.json();
        if (result.error) {
          setError(result.message || "Failed to load data");
          return;
        }
        setData(result);
        if (result.mandals && result.mandals.length > 0) {
          setSelectedMandals(result.mandals);
        }
        if (result.years && result.years.length > 0) {
          setSelectedYearRange([result.years[0], result.years[result.years.length - 1]]);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch rainfall data:", err);
        setError("Failed to connect to data source");
      } finally {
        setLoading(false);
      }
    }
    fetchRainfallData();
  }, []);

  const filteredYearlyData = useMemo(() => {
    if (!data?.yearlyData) return {};
    const filtered: Record<number, Record<string, number>> = {};
    for (const year of Object.keys(data.yearlyData).map(Number)) {
      if (year >= selectedYearRange[0] && year <= selectedYearRange[1]) {
        filtered[year] = {};
        for (const mandal of selectedMandals) {
          if (data.yearlyData[year]?.[mandal] !== undefined) {
            filtered[year][mandal] = data.yearlyData[year][mandal];
          }
        }
      }
    }
    return filtered;
  }, [data, selectedMandals, selectedYearRange]);

  const stats = useMemo(() => {
    if (!data?.mandalAverages || selectedMandals.length === 0) {
      return { avg: 0, max: 0, min: 0, maxMandal: "", minMandal: "" };
    }
    const values = selectedMandals
      .map((m) => ({ mandal: m, avg: data.mandalAverages[m] || 0 }))
      .filter((v) => v.avg > 0);
    if (values.length === 0) return { avg: 0, max: 0, min: 0, maxMandal: "", minMandal: "" };
    const avgAll = values.reduce((sum, v) => sum + v.avg, 0) / values.length;
    const maxEntry = values.reduce((max, v) => (v.avg > max.avg ? v : max), values[0]);
    const minEntry = values.reduce((min, v) => (v.avg < min.avg ? v : min), values[0]);
    return {
      avg: avgAll,
      max: maxEntry.avg,
      min: minEntry.avg,
      maxMandal: maxEntry.mandal,
      minMandal: minEntry.mandal,
    };
  }, [data, selectedMandals]);

  const maxYearlyRainfall = useMemo(() => {
    let max = 0;
    for (const yearData of Object.values(filteredYearlyData)) {
      for (const value of Object.values(yearData)) {
        if (value > max) max = value;
      }
    }
    return max || 1500;
  }, [filteredYearlyData]);

  const toggleMandal = (mandal: string) => {
    setSelectedMandals((prev) =>
      prev.includes(mandal) ? prev.filter((m) => m !== mandal) : [...prev, mandal]
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-blue-500" />
          Rainfall Analysis
        </h2>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-500">Loading rainfall data from Google Sheets...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-blue-500" />
          Rainfall Analysis
        </h2>
        <div className="text-center py-8 text-gray-500">
          <CloudRain className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>{error || "No rainfall data available."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-blue-500" />
          Rainfall Analysis (1994-2023)
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-md">
            Live from Sheets
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showFilters ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Select Mandals
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.mandals.map((mandal) => (
                <button
                  key={mandal}
                  onClick={() => toggleMandal(mandal)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedMandals.includes(mandal)
                      ? "text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  }`}
                  style={{
                    backgroundColor: selectedMandals.includes(mandal)
                      ? MANDAL_COLORS[mandal] || "#6b7280"
                      : undefined,
                  }}
                >
                  {mandal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Year Range: {selectedYearRange[0]} - {selectedYearRange[1]}
            </label>
            <div className="flex items-center gap-4 mt-2">
              <select
                value={selectedYearRange[0]}
                onChange={(e) => setSelectedYearRange([parseInt(e.target.value), selectedYearRange[1]])}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
              >
                {data.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <span className="text-gray-400">to</span>
              <select
                value={selectedYearRange[1]}
                onChange={(e) => setSelectedYearRange([selectedYearRange[0], parseInt(e.target.value)])}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
              >
                {data.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              View Mode
            </label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setViewMode("yearly")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "yearly" ? "bg-blue-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                Yearly Trend
              </button>
              <button
                onClick={() => setViewMode("monthly")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "monthly" ? "bg-blue-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                Monthly Pattern
              </button>
              <button
                onClick={() => setViewMode("comparison")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "comparison" ? "bg-blue-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                Mandal Comparison
              </button>
              <button
                onClick={() => setViewMode("breakdown")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "breakdown" ? "bg-blue-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                Area Breakdown
              </button>
            </div>
          </div>

          {viewMode === "breakdown" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                Breakdown Metric
              </label>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setBreakdownMetric("area")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    breakdownMetric === "area" ? "bg-emerald-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  Area Distribution
                </button>
                <button
                  onClick={() => setBreakdownMetric("rainfall")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    breakdownMetric === "rainfall" ? "bg-emerald-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  30-Year Rainfall
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-blue-600 font-medium">Avg Annual Rainfall</p>
          <p className="text-xl font-bold text-blue-900">{stats.avg.toFixed(0)} mm</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-xs text-green-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Highest (Avg)
          </p>
          <p className="text-xl font-bold text-green-900">{stats.max.toFixed(0)} mm</p>
          <p className="text-xs text-green-600 truncate">{stats.maxMandal}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> Lowest (Avg)
          </p>
          <p className="text-xl font-bold text-orange-900">{stats.min.toFixed(0)} mm</p>
          <p className="text-xs text-orange-600 truncate">{stats.minMandal}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-xs text-purple-600 font-medium">Data Period</p>
          <p className="text-xl font-bold text-purple-900">
            {selectedYearRange[1] - selectedYearRange[0] + 1} Years
          </p>
          <p className="text-xs text-purple-600">{selectedMandals.length} Mandals</p>
        </div>
      </div>

      {viewMode === "yearly" && (
        <YearlyTrendChart yearlyData={filteredYearlyData} mandals={selectedMandals} maxValue={maxYearlyRainfall} />
      )}
      {viewMode === "monthly" && <MonthlyPatternChart monthlyData={data.monthlyData} mandals={selectedMandals} />}
      {viewMode === "comparison" && <MandalComparisonChart averages={data.mandalAverages} mandals={selectedMandals} />}
      {viewMode === "breakdown" && <MandalBreakdownChart selectedMandals={selectedMandals} metric={breakdownMetric} />}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-4 justify-center">
          {selectedMandals.map((mandal) => (
            <div key={mandal} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: MANDAL_COLORS[mandal] || "#6b7280" }}
              />
              <span className="text-xs text-gray-600">{mandal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function YearlyTrendChart({
  yearlyData,
  mandals,
  maxValue,
}: {
  yearlyData: Record<number, Record<string, number>>;
  mandals: string[];
  maxValue: number;
}) {
  const years = Object.keys(yearlyData).map(Number).sort((a, b) => a - b);
  if (years.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available for selected filters</div>;
  }
  const showLabel = (index: number) => years.length <= 15 || index % 5 === 0;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <LineChart className="w-4 h-4" />
        Yearly Rainfall Trend
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex mb-2">
            <div className="w-12 text-right text-xs text-gray-400 pr-2">{maxValue.toFixed(0)}</div>
            <div className="flex-1" />
          </div>
          <div className="flex items-end gap-1 h-64 border-l border-b border-gray-200 pl-2 pb-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-100 w-full" />
              ))}
            </div>
            {years.map((year, idx) => {
              const yearData = yearlyData[year] || {};
              return (
                <div key={year} className="flex-1 flex flex-col items-center justify-end gap-0.5 relative group">
                  <div className="flex gap-0.5 items-end h-56">
                    {mandals.map((mandal) => {
                      const value = yearData[mandal] || 0;
                      const height = (value / maxValue) * 100;
                      return (
                        <div
                          key={mandal}
                          className="w-2 md:w-3 rounded-t transition-all hover:opacity-80"
                          style={{
                            height: `${height}%`,
                            backgroundColor: MANDAL_COLORS[mandal] || "#6b7280",
                            minHeight: value > 0 ? "2px" : "0",
                          }}
                          title={`${mandal}: ${value.toFixed(0)} mm`}
                        />
                      );
                    })}
                  </div>
                  {showLabel(idx) && (
                    <span className="text-[10px] text-gray-500 mt-1 transform -rotate-45 origin-top-left">{year}</span>
                  )}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    <div className="font-semibold">{year}</div>
                    {mandals.map((mandal) => (
                      <div key={mandal} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: MANDAL_COLORS[mandal] }} />
                        {(yearData[mandal] || 0).toFixed(0)} mm
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center text-xs text-gray-400 mt-6">Year</div>
        </div>
      </div>
    </div>
  );
}

function MonthlyPatternChart({
  monthlyData,
  mandals,
}: {
  monthlyData: Record<string, Record<number, number>>;
  mandals: string[];
}) {
  const avgMonthly: Record<string, number[]> = {};
  for (const mandal of mandals) {
    avgMonthly[mandal] = [];
    const mandalData = monthlyData[mandal] || {};
    for (let month = 1; month <= 12; month++) {
      avgMonthly[mandal].push((mandalData[month] || 0) / 30);
    }
  }
  const maxMonthly = Math.max(...mandals.flatMap((m) => avgMonthly[m] || [])) || 200;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Monthly Rainfall Pattern (30-Year Average)
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="flex items-end gap-2 h-48 border-l border-b border-gray-200 pl-2 pb-2">
            {MONTHS.map((month, idx) => (
              <div key={month} className="flex-1 flex flex-col items-center justify-end gap-0.5 group relative">
                <div className="flex gap-0.5 items-end h-40">
                  {mandals.map((mandal) => {
                    const value = avgMonthly[mandal]?.[idx] || 0;
                    const height = (value / maxMonthly) * 100;
                    return (
                      <div
                        key={mandal}
                        className="w-3 md:w-4 rounded-t transition-all hover:opacity-80"
                        style={{
                          height: `${height}%`,
                          backgroundColor: MANDAL_COLORS[mandal] || "#6b7280",
                          minHeight: value > 0 ? "2px" : "0",
                        }}
                        title={`${mandal}: ${value.toFixed(1)} mm`}
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-gray-500 mt-1">{month}</span>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-semibold">{month}</div>
                  {mandals.map((mandal) => (
                    <div key={mandal} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: MANDAL_COLORS[mandal] }} />
                      {(avgMonthly[mandal]?.[idx] || 0).toFixed(1)} mm
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MandalComparisonChart({
  averages,
  mandals,
}: {
  averages: Record<string, number>;
  mandals: string[];
}) {
  const maxAvg = Math.max(...mandals.map((m) => averages[m] || 0)) || 1000;
  const overallAvg = mandals.length > 0 ? mandals.reduce((sum, m) => sum + (averages[m] || 0), 0) / mandals.length : 0;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Mandal-wise 30-Year Average Comparison
      </h3>
      <div className="space-y-3">
        {mandals.map((mandal) => {
          const value = averages[mandal] || 0;
          const percentage = (value / maxAvg) * 100;
          const isAboveAvg = value > overallAvg;
          return (
            <div key={mandal} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{mandal}</span>
                <span className="flex items-center gap-1">
                  <span className="font-bold" style={{ color: MANDAL_COLORS[mandal] }}>
                    {value.toFixed(0)} mm
                  </span>
                  {isAboveAvg ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-orange-500" />
                  )}
                </span>
              </div>
              <div className="h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                  className="h-full rounded-lg transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: MANDAL_COLORS[mandal] || "#6b7280",
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                  style={{ left: `${(overallAvg / maxAvg) * 100}%` }}
                  title={`Regional Average: ${overallAvg.toFixed(0)} mm`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
        <div className="w-3 h-0.5 bg-red-500" />
        <span>Regional Average: {overallAvg.toFixed(0)} mm/year</span>
      </div>
    </div>
  );
}

function MandalBreakdownChart({
  selectedMandals,
  metric,
}: {
  selectedMandals: string[];
  metric: "area" | "rainfall";
}) {
  const filteredData = MANDAL_BREAKDOWN.filter((m) => selectedMandals.includes(m.name));
  
  if (filteredData.length === 0) {
    return <div className="text-center py-8 text-gray-500">Select mandals to view breakdown</div>;
  }

  const AREA_COLORS = {
    geoArea: "#3b82f6",
    rechargeArea: "#10b981",
    hillyArea: "#f59e0b",
  };

  if (metric === "rainfall") {
    const maxRainfall = Math.max(...filteredData.map((m) => m.rainfall));
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          30-Year Average Rainfall by Mandal (2024-25 Data)
        </h3>
        <div className="space-y-3">
          {filteredData.map((mandal) => {
            const percentage = (mandal.rainfall / maxRainfall) * 100;
            return (
              <div key={mandal.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{mandal.name}</span>
                  <span className="font-bold" style={{ color: MANDAL_COLORS[mandal.name] }}>
                    {mandal.rainfall} mm
                  </span>
                </div>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: MANDAL_COLORS[mandal.name] || "#6b7280",
                    }}
                  >
                    <span className="text-xs text-white font-medium">{mandal.rainfall} mm</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Regional Average</span>
            <span className="font-bold text-gray-900">{TOTAL_BREAKDOWN.avgRainfall} mm</span>
          </div>
        </div>
      </div>
    );
  }

  // Area breakdown view
  const maxArea = Math.max(...filteredData.map((m) => m.geoArea));
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Mandal-wise Area Distribution (2024-25 Data)
      </h3>
      
      {/* Grouped Bar Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="flex items-end gap-4 h-64 border-l border-b border-gray-200 pl-2 pb-2">
            {filteredData.map((mandal) => (
              <div key={mandal.name} className="flex-1 flex flex-col items-center group relative">
                <div className="flex gap-1 items-end h-52">
                  <div
                    className="w-6 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${(mandal.geoArea / maxArea) * 100}%`,
                      backgroundColor: AREA_COLORS.geoArea,
                    }}
                    title={`Geographical: ${mandal.geoArea.toLocaleString()} Ha`}
                  />
                  <div
                    className="w-6 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${(mandal.rechargeArea / maxArea) * 100}%`,
                      backgroundColor: AREA_COLORS.rechargeArea,
                    }}
                    title={`Recharge: ${mandal.rechargeArea.toLocaleString()} Ha`}
                  />
                  <div
                    className="w-6 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${(mandal.hillyArea / maxArea) * 100}%`,
                      backgroundColor: AREA_COLORS.hillyArea,
                    }}
                    title={`Hilly: ${mandal.hillyArea.toLocaleString()} Ha`}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center font-medium">{mandal.name}</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  <div className="font-semibold mb-1">{mandal.name}</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AREA_COLORS.geoArea }} />
                    Geo: {mandal.geoArea.toLocaleString()} Ha
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AREA_COLORS.rechargeArea }} />
                    Recharge: {mandal.rechargeArea.toLocaleString()} Ha
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AREA_COLORS.hillyArea }} />
                    Hilly: {mandal.hillyArea.toLocaleString()} Ha
                  </div>
                  <div className="mt-1 pt-1 border-t border-gray-700">
                    Rainfall: {mandal.rainfall} mm
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: AREA_COLORS.geoArea }} />
          <span className="text-xs text-gray-600">Geographical Area</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: AREA_COLORS.rechargeArea }} />
          <span className="text-xs text-gray-600">Recharge Worthy Area</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: AREA_COLORS.hillyArea }} />
          <span className="text-xs text-gray-600">Hilly Area</span>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Total Classification</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-blue-600">Geographical Area</p>
            <p className="text-lg font-bold text-blue-900">{TOTAL_BREAKDOWN.geoArea.toLocaleString()} Ha</p>
          </div>
          <div>
            <p className="text-xs text-green-600">Recharge Worthy</p>
            <p className="text-lg font-bold text-green-900">{TOTAL_BREAKDOWN.rechargeArea.toLocaleString()} Ha</p>
          </div>
          <div>
            <p className="text-xs text-orange-600">Hilly Area</p>
            <p className="text-lg font-bold text-orange-900">{TOTAL_BREAKDOWN.hillyArea.toLocaleString()} Ha</p>
          </div>
          <div>
            <p className="text-xs text-purple-600">Avg Rainfall</p>
            <p className="text-lg font-bold text-purple-900">{TOTAL_BREAKDOWN.avgRainfall} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
