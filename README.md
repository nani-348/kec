# KADA-GWIS - Koundinya Area Development Authority Ground Water Information System

A comprehensive Decision Support System (DSS) for groundwater monitoring and management in the KADA region, Kuppam, Andhra Pradesh.

## 🌊 Overview

KADA-GWIS is a Next.js-powered web application that provides real-time insights into groundwater resources, hydrology analysis, conservation planning, and water balance monitoring for the Koundinya Area Development Authority.

## 🚀 Features

- **Groundwater Levels Monitoring**: Real-time piezometer observations, seasonal fluctuations, and spatial distribution analysis
- **Hydrology Analysis**: Flow accumulation patterns, sink analysis, and zone identification
- **Water Balance**: Groundwater resources estimation, energy savings calculations, and MI tank storage monitoring
- **Conservation Planning**: Existing structures, proposed interventions, and village-level planning
- **Agriculture & Wells**: Well inventory, density mapping, cropping patterns, and HNSS influence analysis
- **Interactive Maps & Charts**: Dynamic visualizations with magnifying image viewers

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.4
- **UI**: React 19, Tailwind CSS 4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

This project is configured for Vercel deployment:

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── agriculture/        # Agriculture & Wells section
│   ├── aquifer/           # Aquifer characterization
│   ├── conservation/      # Conservation planning
│   ├── groundwater/       # Groundwater levels
│   ├── hydrology/         # Hydrology analysis
│   ├── mi-tanks/          # MI Tanks & HNSS
│   ├── overview/          # Regional overview
│   └── water-balance/     # Water balance analysis
├── components/
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
└── styles/                # Global CSS
```

## 📊 Data Sources

- Ground Water Levels from Piezometer Stations
- SRTM 30m DEM for Hydrology Analysis
- MI Tank Storage Status
- Well Inventory Data

## 👥 Government of Andhra Pradesh

**Koundinya Area Development Authority (KADA)**
Chittoor District, Andhra Pradesh, India

---

Built with ❤️ for sustainable groundwater management
