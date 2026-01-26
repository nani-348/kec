'use client';

import { useSheetSync, SyncStatus } from '@/hooks/useSheetSync';

/**
 * Example component showing how to use auto-sync with Google Sheets
 * Data refreshes every 5 seconds automatically
 */
export default function ExampleSheetSyncPage() {
    // Auto-sync with Groundwater real-time data every 5 seconds
    const { data, isLoading, lastSynced, error } = useSheetSync<{
        mandal: string;
        village: string;
        preMonsoon: number;
        postMonsoon: number;
        today: number | null;
    }>({
        category: 'Groundwater',
        table: 'REAL-TIME',
        interval: 5000, // 5 seconds
    });

    if (isLoading && data.length === 0) {
        return (
            <div className="p-8">
                <div className="animate-pulse">Loading data from Google Sheets...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Real-Time Water Levels</h1>
                <SyncStatus lastSynced={lastSynced} />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-emerald-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Mandal</th>
                            <th className="px-4 py-3 text-left">Village</th>
                            <th className="px-4 py-3 text-center">Pre-Monsoon</th>
                            <th className="px-4 py-3 text-center">Post-Monsoon</th>
                            <th className="px-4 py-3 text-center">Today</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{row.mandal}</td>
                                <td className="px-4 py-3">{row.village}</td>
                                <td className="px-4 py-3 text-center">{row.preMonsoon}</td>
                                <td className="px-4 py-3 text-center">{row.postMonsoon}</td>
                                <td className="px-4 py-3 text-center">
                                    {row.today ?? <span className="text-gray-400">--</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-sm text-gray-500">
                💡 This data syncs automatically every 5 seconds. Edit the Google Sheet and watch it update!
            </p>
        </div>
    );
}
