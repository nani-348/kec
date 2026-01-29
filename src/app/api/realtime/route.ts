import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Published Google Sheet URL (CSV format for easy parsing)
const PUBLISHED_SHEET_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2SBcUQ1g9uUEYPqLU1PfjTvWQT-GrlzY5pisEyOTTC3m0lRyRWh-t5UKv7wnqaqFAd5VUDaCuC3xj/pub?gid=0&single=true&output=csv';

export async function GET(request: NextRequest) {
    try {
        // Fetch the published CSV directly (no API key needed!)
        const response = await fetch(PUBLISHED_SHEET_CSV, {
            cache: 'no-store', // Always get fresh data
            redirect: 'follow', // Follow redirects
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status}`);
        }

        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
            return NextResponse.json({
                success: false,
                error: 'No data found',
                message: 'Sheet is empty or has no data rows'
            });
        }

        // Parse headers (first row)
        const headers = parseCSVLine(lines[0]);
        
        // Parse data rows
        const data = lines.slice(1).map(line => {
            const values = parseCSVLine(line);
            const obj: Record<string, any> = {};
            
            headers.forEach((header, index) => {
                let value: any = values[index] || null;
                
                // Clean up the header name
                const cleanHeader = header.trim();
                
                // Map header names to expected keys
                const keyMap: Record<string, string> = {
                    'Mandal': 'mandal',
                    'Village': 'village',
                    'Week 1': 'jan1stWeek',
                    'Week 2': 'jan2ndWeek',
                    'Week 3': 'jan3rdWeek',
                    'Week 4': 'jan4thWeek',
                    'Jan-2026': 'currentMonth',
                    'Yesterday': 'yesterday',
                    'Today': 'today',
                    '1 Hr Ago': 'oneHrAgo',
                };
                
                const key = keyMap[cleanHeader] || cleanHeader.toLowerCase().replace(/\s+/g, '');
                
                // Convert numeric columns to numbers (skip mandal and village)
                if (key !== 'mandal' && key !== 'village' && value !== null && value !== '' && value !== '—') {
                    const num = parseFloat(value);
                    value = isNaN(num) ? null : num;
                } else if (value === '—' || value === '-') {
                    value = null;
                }
                
                obj[key] = value;
            });
            
            return obj;
        }).filter(row => row.mandal || row.village); // Filter out empty rows

        return NextResponse.json({
            success: true,
            count: data.length,
            headers: headers,
            data: data,
            lastFetched: new Date().toISOString(),
            source: 'Published Google Sheet'
        });

    } catch (error: any) {
        console.error('Real-Time API Error:', error);
        
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch data',
            message: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

// Helper function to parse CSV line (handles quoted values)
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}
