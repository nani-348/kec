import { NextResponse } from "next/server";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQt4tCGjYm78UXtlulNkF4TjiFCsJuGlXTAwNLGm-vMPToMEqLwH9_dI_8WScvOKoBAQNNPxwH_iWK/pub?output=csv";

export async function GET() {
  try {
    const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("Failed to fetch");
    const csvText = await response.text();
    const lines = csvText.split("\n").filter((line) => line.trim());
    const mandals = ["RAMA KUPPAM", "SANTHI PURAM", "GUDI PALLE", "KUPPAM"];
    const records: { mandal: string; year: number; month: number; day: number; rainfall: number }[] = [];

    for (let i = 2; i < lines.length; i++) {
      const values = lines[i].split(",");
      for (let m = 0; m < mandals.length; m++) {
        const offset = m * 4;
        const month = parseInt(values[offset]) || 0;
        const day = parseInt(values[offset + 1]) || 0;
        const year = parseInt(values[offset + 2]) || 0;
        const rainfall = parseFloat(values[offset + 3]) || 0;
        if (year >= 1994 && year <= 2030 && month >= 1 && month <= 12) {
          records.push({ mandal: mandals[m], year, month, day, rainfall });
        }
      }
    }

    const years = [...new Set(records.map((r) => r.year))].sort((a, b) => a - b);
    const yearlyData: Record<number, Record<string, number>> = {};
    const monthlyData: Record<string, Record<number, number>> = {};
    mandals.forEach((m) => {
      monthlyData[m] = {};
      for (let i = 1; i <= 12; i++) monthlyData[m][i] = 0;
    });

    for (const r of records) {
      if (!yearlyData[r.year]) yearlyData[r.year] = {};
      yearlyData[r.year][r.mandal] = (yearlyData[r.year][r.mandal] || 0) + r.rainfall;
      monthlyData[r.mandal][r.month] += r.rainfall;
    }

    const mandalAverages: Record<string, number> = {};
    mandals.forEach((m) => {
      mandalAverages[m] = years.reduce((sum, y) => sum + (yearlyData[y]?.[m] || 0), 0) / years.length;
    });

    return NextResponse.json({ success: true, mandals, years, yearlyData, monthlyData, mandalAverages });
  } catch (error) {
    return NextResponse.json({ error: true, message: "Failed to fetch rainfall data" });
  }
}
