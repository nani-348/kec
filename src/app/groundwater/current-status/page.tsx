"use client";
import React, { useState, useEffect } from "react";
import CurrentStatusClient from "@/components/groundwater/CurrentStatusClient";
export default function CurrentStatusPage() {
    const [waterLevelData, setWaterLevelData] = useState<any[]>([]);
    const [comparisonData, setComparisonData] = useState<any[]>([]);
    const [zoneAreaData, setZoneAreaData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            // Fetch Comparison Data
            const response = await fetch('/api/sheets?category=Groundwater&table=YEAR-OVER-YEAR');
            const result = await response.json();
            if (result.success && result.data.length > 0) {
                const formattedData = result.data.map((item: any) => ({
                    name: String(item.name || ''),
                    rise: Number(item.rise || 0),
                    preMonsoon: Number(item.preMonsoon || 0),
                    postMonsoon: Number(item.postMonsoon || 0),
                    color: String(item.color || '#000000')
                }));
                const compData = formattedData.map((item: any) => {
                    let label = item.name;
                    if (item.name.toLowerCase().includes("2024")) {
                        label = "Prev Water Year (2024)";
                    } else if (item.name.toLowerCase().includes("2025")) {
                        label = "Present Water Year (2025)";
                    } else if (item.name.toLowerCase().includes("improvement")) {
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
            // Fetch Zone Area Data
            const zoneResponse = await fetch('/api/sheets?category=Groundwater&table=DEPTH%20ZONE');
            const zoneResult = await zoneResponse.json();
            if (zoneResult.success && zoneResult.data.length > 0) {
                const formattedZone = zoneResult.data.map((item: any) => ({
                    period: String(item.period || ''),
                    less3m: Number(item.less3m || 0),
                    range3to8m: Number(item.range3to8m || 0),
                    range8to20m: Number(item.range8to20m || 0),
                    more20m: Number(item.more20m || 0)
                }));
                setZoneAreaData(formattedZone);
            } else {
                // Fallback to initial values if sheet is empty
                setZoneAreaData([
                    { period: "Premonsoon / May", less3m: 0, range3to8m: 7.7, range8to20m: 53.8, more20m: 38.5 },
                    { period: "Post Monsoon / Nov 2024", less3m: 7.7, range3to8m: 7.7, range8to20m: 53.8, more20m: 30.8 },
                    { period: "Post Monsoon / Nov 2025", less3m: 7.7, range3to8m: 15.4, range8to20m: 53.8, more20m: 23.1 },
                ]);
            }
        } catch (error) {
            console.error("Failed to fetch year data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000); // 1 second for real-time updates
        return () => clearInterval(interval);
    }, []);
    if (isLoading && waterLevelData.length === 0) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    return (
        <CurrentStatusClient
            waterLevelData={waterLevelData}
            comparisonData={comparisonData}
            zoneAreaData={zoneAreaData}
        />
    );
}
