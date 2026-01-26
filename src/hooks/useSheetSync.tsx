'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSheetSyncOptions {
    category: string;
    table?: string;
    interval?: number; // in milliseconds, default 5000 (5 seconds)
    enabled?: boolean;
}

interface SheetSyncResult<T> {
    data: T[];
    isLoading: boolean;
    error: Error | null;
    lastSynced: Date | null;
    refetch: () => Promise<void>;
}

/**
 * Custom hook for auto-syncing with Google Sheets
 * Polls the API every 5 seconds (configurable) for fresh data
 * 
 * @example
 * const { data, isLoading, lastSynced } = useSheetSync({
 *   category: 'Groundwater',
 *   table: 'REAL-TIME',
 *   interval: 5000,
 * });
 */
export function useSheetSync<T = Record<string, unknown>>({
    category,
    table,
    interval = 5000,
    enabled = true,
}: UseSheetSyncOptions): SheetSyncResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [lastSynced, setLastSynced] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        try {
            const params = new URLSearchParams({ category });
            if (table) params.append('table', table);

            const response = await fetch(`/api/sheets?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.success) {
                if (table && result.data) {
                    setData(result.data);
                } else if (result.data) {
                    setData(result.data);
                }
                setLastSynced(new Date());
                setError(null);
            } else {
                throw new Error(result.error || 'Unknown error');
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            console.error('Sheet sync error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [category, table, enabled]);

    // Cleanup and effect logic
    useEffect(() => {
        if (enabled) {
            fetchData();
            const intervalId = setInterval(fetchData, interval);
            return () => clearInterval(intervalId);
        }
    }, [fetchData, interval, enabled]);

    return {
        data,
        isLoading,
        error,
        lastSynced,
        refetch: fetchData,
    };
}

/**
 * Hook for syncing all tables in a category
 */
export function useCategorySync(category: string, interval = 5000) {
    const [tables, setTables] = useState<Map<string, Record<string, unknown>[]>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [lastSynced, setLastSynced] = useState<Date | null>(null);

    const fetchCategory = useCallback(async () => {
        try {
            const response = await fetch(`/api/sheets?category=${category}`);
            const result = await response.json();

            if (result.success && result.data) {
                const tableMap = new Map<string, Record<string, unknown>[]>();
                Object.entries(result.data).forEach(([title, data]) => {
                    tableMap.set(title, data as Record<string, unknown>[]);
                });
                setTables(tableMap);
                setLastSynced(new Date());
            }
        } catch (err) {
            console.error('Category sync error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchCategory();
        const intervalId = setInterval(fetchCategory, interval);
        return () => clearInterval(intervalId);
    }, [fetchCategory, interval]);

    return { tables, isLoading, lastSynced, refetch: fetchCategory };
}

/**
 * Display component showing sync status
 */
export function SyncStatus({ lastSynced }: { lastSynced: Date | null }) {
    const [, forceUpdate] = useState({});

    // Update display every second
    useEffect(() => {
        const timer = setInterval(() => forceUpdate({}), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!lastSynced) return null;

    const secondsAgo = Math.floor((Date.now() - lastSynced.getTime()) / 1000);

    return (
        <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>
                Synced {secondsAgo === 0 ? 'just now' : `${secondsAgo}s ago`}
            </span>
        </div>
    );
}
