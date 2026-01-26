import { google } from 'googleapis';

// Ensure environment variables are available
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    console.warn('Google Sheets credentials not configured. Using mock data.');
}

// Initialize auth once
const auth = CLIENT_EMAIL && PRIVATE_KEY ? new google.auth.GoogleAuth({
    credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
}) : null;

const sheets = auth ? google.sheets({ version: 'v4', auth }) : null;

// ============================================================
// 11 CATEGORY SHEETS
// ============================================================

export const CATEGORY_SHEETS = [
    'Overview',
    'Groundwater',
    'Aquifer',
    'MITanks',
    'WaterBalance',
    'Hydrology',
    'Agriculture',
    'Conservation',
    'DataMethods',
    'Resources',
    'CaseStudies',
] as const;

export type CategorySheet = typeof CATEGORY_SHEETS[number];

// Table metadata - maps table titles to their row ranges within each category sheet
// Format: { title: string, startRow: number, endRow: number }
export interface TableInfo {
    title: string;
    headers: string[];
    startRow: number;
    rowCount: number;
}

/**
 * Fetches all data from a category sheet
 * Returns raw 2D array - caller can parse tables using section headers
 */
export async function getCategoryData(
    categoryName: CategorySheet
): Promise<(string | number | boolean | null)[][]> {
    if (!sheets || !SPREADSHEET_ID) {
        console.warn(`Sheet data not available for ${categoryName}. Using fallback.`);
        return [];
    }

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: categoryName,
        });

        return (response.data.values || []) as (string | number | boolean | null)[][];
    } catch (error) {
        console.error(`Error fetching category ${categoryName}:`, error);
        throw error;
    }
}

/**
 * Parses a category sheet into individual tables
 * Tables are separated by blank rows, with title row followed by header row
 */
export function parseTables(
    rawData: (string | number | boolean | null)[][]
): Map<string, Record<string, unknown>[]> {
    const tables = new Map<string, Record<string, unknown>[]>();

    let currentTitle = '';
    let currentHeaders: string[] = [];
    let currentRows: Record<string, unknown>[] = [];
    let expectingHeaders = false;

    for (const row of rawData) {
        // Empty row - save current table and reset
        if (!row || row.length === 0 || row.every(cell => cell === null || cell === '')) {
            if (currentTitle && currentRows.length > 0) {
                tables.set(currentTitle, currentRows);
            }
            currentTitle = '';
            currentHeaders = [];
            currentRows = [];
            expectingHeaders = false;
            continue;
        }

        // Check if this is a title row (starts with emoji or all caps first cell)
        const firstCell = String(row[0] || '');
        const isTitle = firstCell.match(/^[📊🌧️📋📈🗺️🌊⬆️⬇️⚖️🚰💧🔬⚠️🏗️💡🌾🔧⚡🔄📍🌾]/);

        if (isTitle) {
            // Save previous table if exists
            if (currentTitle && currentRows.length > 0) {
                tables.set(currentTitle, currentRows);
            }
            currentTitle = firstCell;
            currentHeaders = [];
            currentRows = [];
            expectingHeaders = true;
            continue;
        }

        // If expecting headers, this row is the header row
        if (expectingHeaders) {
            currentHeaders = row.map(cell => String(cell || ''));
            expectingHeaders = false;
            continue;
        }

        // Data row - convert to object using headers
        if (currentHeaders.length > 0) {
            const obj: Record<string, unknown> = {};
            currentHeaders.forEach((header, index) => {
                const value = row[index];
                if (value === '' || value === undefined || value === null) {
                    obj[header] = null;
                } else if (value === 'true' || value === 'TRUE') {
                    obj[header] = true;
                } else if (value === 'false' || value === 'FALSE') {
                    obj[header] = false;
                } else {
                    const numValue = parseFloat(String(value));
                    obj[header] = !isNaN(numValue) && String(numValue) === String(value) ? numValue : value;
                }
            });
            currentRows.push(obj);
        }
    }

    // Don't forget the last table
    if (currentTitle && currentRows.length > 0) {
        tables.set(currentTitle, currentRows);
    }

    return tables;
}

/**
 * Get a specific table from a category by its title (or partial match)
 */
export async function getTableData<T = Record<string, unknown>>(
    categoryName: CategorySheet,
    tableTitle: string
): Promise<T[]> {
    const rawData = await getCategoryData(categoryName);
    const tables = parseTables(rawData);

    // Find table by partial title match
    for (const [title, data] of tables) {
        if (title.toLowerCase().includes(tableTitle.toLowerCase())) {
            return data as T[];
        }
    }

    console.warn(`Table "${tableTitle}" not found in ${categoryName}`);
    return [];
}

/**
 * Get all tables from a category
 */
export async function getAllTables(
    categoryName: CategorySheet
): Promise<Map<string, Record<string, unknown>[]>> {
    const rawData = await getCategoryData(categoryName);
    return parseTables(rawData);
}

// ============================================================
// CONVENIENCE FUNCTIONS FOR COMMON DATA
// ============================================================

// Groundwater
export async function getRealTimeWaterData() {
    return getTableData('Groundwater', 'REAL-TIME WATER LEVELS');
}

export async function getSeasonalFluctuationData() {
    return getTableData('Groundwater', 'SEASONAL FLUCTUATION');
}

export async function getYearComparisonData() {
    return getTableData('Groundwater', 'YEAR-OVER-YEAR');
}

// Overview
export async function getRainfallData() {
    return getTableData('Overview', 'RAINFALL BY MANDAL');
}

export async function getSeasonalRainfallData() {
    return getTableData('Overview', 'SEASONAL RAINFALL');
}

// Aquifer
export async function getAquiferParameters() {
    return getTableData('Aquifer', 'AQUIFER PARAMETERS');
}

export async function getSustainabilityData() {
    return getTableData('Aquifer', 'SUSTAINABILITY');
}

// MI Tanks
export async function getTankInventory() {
    return getTableData('MITanks', 'TANK INVENTORY');
}

export async function getTankStorageStatus() {
    return getTableData('MITanks', 'CURRENT STORAGE STATUS');
}

// Water Balance
export async function getInflowsData() {
    return getTableData('WaterBalance', 'INFLOWS');
}

export async function getOutflowsData() {
    return getTableData('WaterBalance', 'OUTFLOWS');
}

// Conservation
export async function getConservationMetrics() {
    return getTableData('Conservation', 'SUMMARY METRICS');
}

export async function getStructureDistribution() {
    return getTableData('Conservation', 'STRUCTURE DISTRIBUTION');
}

// Agriculture
export async function getCropData() {
    return getTableData('Agriculture', 'CROP AREA');
}

export async function getIrrigationMethods() {
    return getTableData('Agriculture', 'IRRIGATION METHODS');
}
