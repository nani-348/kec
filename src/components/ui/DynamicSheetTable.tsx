'use client';

import { useSheetSync, SyncStatus } from '@/hooks/useSheetSync';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

interface DynamicSheetTableProps {
    category: string;
    table: string;
    title?: string;
    interval?: number;
    className?: string;
    data?: Array<Record<string, unknown>>; // Allow passing pre-fetched/filtered data
}

/**
 * Dynamic Table Component
 * Automatically renders a table based on the structure of data in Google Sheets.
 * If you add columns in the Sheet, they will automatically appear here.
 */
export function DynamicSheetTable({
    category,
    table,
    title,
    interval = 5000,
    className = '',
    data: providedData,
}: DynamicSheetTableProps) {
    const { data: fetchedData, isLoading, lastSynced, error } = useSheetSync({
        category,
        table,
        interval,
        enabled: !providedData, // Only fetch if data not provided
    });

    const data = providedData || fetchedData;

    // Dynamically discover headers from the first row of data
    const headers = useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]);
    }, [data]);

    // Format header key to Title Case (e.g. "rainfall_mm" -> "Rainfall Mm")
    const formatHeader = (key: string) => {
        return key
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    };

    if (isLoading && data.length === 0) {
        return (
            <div className={`p-6 border rounded-lg bg-gray-50/50 animate-pulse ${className}`}>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`p-6 border border-red-200 rounded-lg bg-red-50 text-red-700 ${className}`}>
                <h3 className="font-bold mb-2">Error Loading Data</h3>
                <p>{error.message}</p>
                <p className="text-sm mt-2 opacity-75">
                    Check if the category &quot;{category}&quot; and table &quot;{table}&quot; exist in the Sheet.
                </p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={`p-6 border rounded-lg bg-gray-50 text-gray-500 text-center ${className}`}>
                No data found for <strong>{table}</strong>.
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                    {title || table}
                </h3>
                <SyncStatus lastSynced={lastSynced} />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm touch-auto -webkit-overflow-scrolling-touch">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                        <tr>
                            {headers.map((header) => (
                                <th key={header} className="px-6 py-3 whitespace-nowrap bg-gray-100/80">
                                    {formatHeader(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {headers.map((header, colIndex) => {
                                    const value = row[header];

                                    // Custom formatting for different types
                                    let displayValue: ReactNode = value as ReactNode;

                                    if (value === null || value === undefined) {
                                        displayValue = <span className="text-gray-300">-</span>;
                                    } else if (typeof value === 'boolean') {
                                        displayValue = value ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                No
                                            </span>
                                        );
                                    } else if (typeof value === 'object') {
                                        displayValue = JSON.stringify(value);
                                    }

                                    return (
                                        <td
                                            key={`${rowIndex}-${header}`}
                                            className={`px-6 py-4 whitespace-nowrap ${colIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                                                }`}
                                        >
                                            {displayValue}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-2 text-xs text-right text-gray-400">
                Source: {category} &gt; {table}
            </div>
        </div>
    );
}
