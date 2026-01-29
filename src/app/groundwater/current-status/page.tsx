"use client";

import React, { useState, useEffect, useCallback } from "react";
import CurrentStatusClient from "@/components/groundwater/CurrentStatusClient";

// Fallback data for depth zones
const FALLBACK_ZONE_DATA = [
    { period: "Premonsoon / May", less3m: 0, range3to8m: 7.7, range8to20m: 53.8, more20m: 38.5 },
    { period: "Post Monsoon / Nov 2024", less3m: 7.7, range3to8m: 7.7, range8to20m: 53.8, more20m: 30.8 },
    { period: "Post Monsoon / Nov 2025", less3m: 7.7, range3to8m: 15.4, range8to20m: 53.8, more20m: 23.1 },
];

export default function CurrentStatusPage() {
    const [waterLevelData, setWaterLevelData] = useState<any[]>([]);
    const [comparisonData, setComparisonData] = useState<any[]>([]);
    const [zoneAreaData, setZoneAreaData] = useState<any[]>(FALLBACK_ZONE_DATA);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            // Fetch Year-over-Year Comparison Data
            const response = await fetch('/api/sheets?category=Groundwater&table=YEAR-OVER-YEAR');
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                // Normalize keys for water level data with multiple possible column names
                const formattedData = result.data.map((item: any) => ({
                    name: String(item.name || item.Name || item.NAME || ''),
                    rise: Number(item.rise || item.Rise || item.RISE || item['Water Rise'] || 0),
                    preMonsoon: Number(item.preMonsoon || item['Pre-Monsoon'] || item['PRE-MONSOON'] || item.premonsoon || 0),
                    postMonsoon: Number(item.postMonsoon || item['Post-Monsoon'] || item['POST-MONSOON'] || item.postmonsoon || 0),
                    color: String(item.color || item.Color || item.COLOR || '#3b82f6')
                }));

                // Create comparison data with cleaner labels
                const compData = formattedData.map((item: any) => {
                    let label = item.name;
                    const nameLower = item.name.toLowerCase();

                    if (nameLower.includes("2024") || nameLower.includes("prev")) {
                        label = "Prev Water Year (2024)";
                    } else if (nameLower.includes("2025") || nameLower.includes("present") || nameLower.includes("current")) {
                        label = "Present Water Year (2025)";
                    } else if (nameLower.includes("improvement") || nameLower.includes("change")) {
                        label = "Improvement";
                    }

                    return {
                        name: label,
                        rise: item.rise,
                        fill: item.color
                    };
                });

                setWaterLevelData(formattedData);
                setComparisonData(compData);
            }

            // Fetch Depth Zone Area Data
            const zoneResponse = await fetch('/api/sheets?category=Groundwater&table=DEPTH ZONE');
            const zoneResult = await zoneResponse.json();

            if (zoneResult.success && zoneResult.data.length > 0) {
                // Normalize keys for zone data with multiple possible column names
                const formattedZone = zoneResult.data.map((item: any) => ({
                    period: String(item.period || item.Period || item.PERIOD || item.name || ''),
                    less3m: Number(item.less3m || item['<3m'] || item['Less than 3m'] || item['LESS_3M'] || 0),
                    range3to8m: Number(item.range3to8m || item['3-8m'] || item['3 to 8m'] || item['RANGE_3_8M'] || 0),
                    range8to20m: Number(item.range8to20m || item['8-20m'] || item['8 to 20m'] || item['RANGE_8_20M'] || 0),
                    more20m: Number(item.more20m || item['>20m'] || item['More than 20m'] || item['MORE_20M'] || 0)
                }));

                setZoneAreaData(formattedZone);
            } else {
                // Keep fallback data if API returns empty
                setZoneAreaData(FALLBACK_ZONE_DATA);
            }
        } catch (error) {
            console.error("Failed to fetch groundwater status data:", error);
            // On error, ensure we have fallback data
            setZoneAreaData(FALLBACK_ZONE_DATA);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        // Refresh every 30 seconds for sheet data
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    if (isLoading && waterLevelData.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-gray-600">Loading groundwater status...</p>
                </div>
            </div>
        );
    }

    return (
        <CurrentStatusClient
            waterLevelData={waterLevelData}
            comparisonData={comparisonData}
            zoneAreaData={zoneAreaData}
        />
    );
}
