'use client';

import { DynamicSheetTable } from '@/components/ui/DynamicSheetTable';

export default function DynamicDemoPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Dynamic Table Demo
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        These tables adapt automatically to changes in Google Sheets.
                        <br />
                        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Try adding a column in Sheets and watch it appear here!
                        </span>
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Example 1: Groundwater */}
                    <section className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
                        <DynamicSheetTable
                            category="Groundwater"
                            table="REAL-TIME WATER LEVELS"
                            title="📈 Real-Time Groundwater Levels"
                            className="w-full"
                        />
                    </section>

                    {/* Example 2: Overview */}
                    <section className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                        <DynamicSheetTable
                            category="Overview"
                            table="RAINFALL BY MANDAL"
                            title="🌧️ Rainfall Data"
                            className="w-full"
                        />
                    </section>

                    {/* Example 3: Agriculture */}
                    <section className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                        <DynamicSheetTable
                            category="Agriculture"
                            table="CROP AREA DISTRIBUTION"
                            title="🌾 Agricultural Crop Stats"
                            className="w-full"
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}
