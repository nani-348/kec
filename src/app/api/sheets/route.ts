import { NextRequest, NextResponse } from 'next/server';
import {
    getCategoryData,
    parseTables,
    getTableData,
    CATEGORY_SHEETS
} from '@/lib/sheets';

export const dynamic = 'force-dynamic'; // Disable caching for real-time data

type SheetCategory = (typeof CATEGORY_SHEETS)[number];

const isSheetCategory = (value: string): value is SheetCategory =>
    CATEGORY_SHEETS.includes(value as SheetCategory);

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const table = searchParams.get('table');

        // Validate category
        if (!category) {
            return NextResponse.json(
                {
                    error: 'Missing required parameter: category',
                    availableCategories: CATEGORY_SHEETS,
                    usage: '/api/sheets?category=Groundwater&table=REAL-TIME'
                },
                { status: 400 }
            );
        }

        // Check if category is valid
        if (!isSheetCategory(category)) {
            return NextResponse.json(
                {
                    error: `Invalid category: ${category}`,
                    availableCategories: CATEGORY_SHEETS
                },
                { status: 400 }
            );
        }

        // If table is specified, return just that table
        if (table) {
            const data = await getTableData(category, table);
            return NextResponse.json({
                success: true,
                category,
                table,
                count: data.length,
                data,
                lastFetched: new Date().toISOString(),
            });
        }

        // Otherwise return all tables in the category
        const rawData = await getCategoryData(category);
        const tables = parseTables(rawData);

        // Convert Map to object for JSON
        const tablesObj: Record<string, unknown[]> = {};
        for (const [title, data] of tables) {
            tablesObj[title] = data;
        }

        return NextResponse.json({
            success: true,
            category,
            tableCount: tables.size,
            tables: Array.from(tables.keys()),
            data: tablesObj,
            lastFetched: new Date().toISOString(),
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch sheet data',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
