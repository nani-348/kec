import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

// Real-Time Water Levels Sheet ID - Create a new sheet and put the ID here
const REALTIME_SHEET_ID = process.env.GOOGLE_SHEETS_ID_REALTIME || process.env.GOOGLE_SHEETS_ID_GROUNDWATER;

const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

export async function GET(request: NextRequest) {
    try {
        if (!CLIENT_EMAIL || !PRIVATE_KEY || !REALTIME_SHEET_ID) {
            return NextResponse.json({
                success: false,
                error: 'API not configured',
                message: 'Missing Google Sheets credentials or sheet ID'
            }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Read all data from the sheet (first sheet/tab)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: REALTIME_SHEET_ID,
            range: 'A:J', // Columns A to J (Mandal to 1 Hr Ago)
        });

        const rows = response.data.values;
        
        if (!rows || rows.length < 2) {
            return NextResponse.json({
                success: false,
                error: 'No data found',
                message: 'Sheet is empty or has no data rows'
            });
        }

        // First row is headers
        const headers = rows[0].map((h: string) => h.trim());
        
        // Convert remaining rows to objects
        const data = rows.slice(1).map((row: any[]) => {
            const obj: Record<string, any> = {};
            headers.forEach((header: string, index: number) => {
                let value = row[index] || null;
                
                // Convert numeric columns to numbers
                if (index >= 2 && value !== null && value !== '' && value !== '—') {
                    const num = parseFloat(value);
                    value = isNaN(num) ? null : num;
                }
                
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
                
                const key = keyMap[header] || header.toLowerCase().replace(/\s+/g, '');
                obj[key] = value;
            });
            return obj;
        });

        return NextResponse.json({
            success: true,
            count: data.length,
            headers: headers,
            data: data,
            lastFetched: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Real-Time API Error:', error);
        
        // Handle quota exceeded error
        if (error.code === 429) {
            return NextResponse.json({
                success: false,
                error: 'Rate limit exceeded',
                message: 'Too many requests. Please wait a minute and try again.',
                retryAfter: 60
            }, { status: 429 });
        }
        
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch data',
            message: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
