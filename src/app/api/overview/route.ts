import { NextResponse } from 'next/server';
import { getAllTables } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const tables = await getAllTables('Overview');
        
        // Convert Map to object for JSON
        const tablesObj: Record<string, unknown[]> = {};
        for (const [title, data] of tables) {
            tablesObj[title] = data;
        }

        // Extract specific data for the about-kada page
        let profile: unknown[] = [];
        let rainfall: unknown[] = [];
        let seasonalRainfall: unknown[] = [];

        // Find the relevant tables
        for (const [title, data] of tables) {
            if (title.toLowerCase().includes('profile') || title.toLowerCase().includes('administrative')) {
                profile = data;
            }
            if (title.toLowerCase().includes('rainfall') && title.toLowerCase().includes('mandal')) {
                rainfall = data;
            }
            if (title.toLowerCase().includes('seasonal') && title.toLowerCase().includes('rainfall')) {
                seasonalRainfall = data;
            }
        }

        return NextResponse.json({
            success: true,
            profile,
            rainfall,
            seasonalRainfall,
            allTables: tablesObj,
            tableNames: Array.from(tables.keys()),
            lastFetched: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Overview API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch overview data',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
