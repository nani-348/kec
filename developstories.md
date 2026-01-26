# KADA Water Management System - Development Stories

## Epic 1: Foundation & Setup

### US-1.1: Project Initialization
**As a** developer  
**I want** to set up the Next.js 15 project with TypeScript  
**So that** I have a modern, type-safe foundation for development

**Acceptance Criteria:**
- [ ] Next.js 15 with App Router initialized
- [ ] TypeScript configured with strict mode
- [ ] Tailwind CSS + shadcn/ui installed
- [ ] ESLint + Prettier configured
- [ ] `npm run dev` starts successfully

---

### US-1.2: Database Schema
**As a** backend developer  
**I want** to create the PostgreSQL schema with Prisma  
**So that** all water resource data can be stored properly

**Acceptance Criteria:**
- [ ] Prisma schema with Mandal, Village, WaterLevel, MITank, Well, Conservation models
- [ ] Relations properly defined (1:N, M:N)
- [ ] Migrations run successfully
- [ ] Seed script loads 555 tanks, 209 villages from PDF data

**Data Models:**
```prisma
model Mandal { id, name, area_sqkm, villages[] }
model Village { id, name, mandal_id, water_levels[], tanks[], wells[] }
model WaterLevel { id, village_id, date, depth_m, zone }
model MITank { id, name, village_id, capacity_mcft, current_storage, fill_pct, hnss_linked }
model AgriWell { id, village_id, type, status, index_score }
model ConservationStructure { id, village_id, type, status }
```

---

## Epic 2: Ground Water Module

### US-2.1: Water Level Dashboard
**As a** KADA administrator  
**I want** to view average ground water levels by mandal  
**So that** I can monitor water table health at a glance

**Acceptance Criteria:**
- [ ] Display 4 mandal cards with average water levels
- [ ] Show pre-monsoon vs post-monsoon comparison
- [ ] Color-coded zone indicators (<3m green, 3-8m yellow, 8-20m orange, >20m red)
- [ ] Year-over-year change percentage

---

### US-2.2: Village Water Levels
**As a** field officer  
**I want** to see water levels for each village in my mandal  
**So that** I can identify stressed villages needing intervention

**Acceptance Criteria:**
- [ ] Filter dropdown for mandal selection
- [ ] Table with village name, current level, zone, change
- [ ] Sort by water level depth (worst first)
- [ ] Export to Excel

---

### US-2.3: Water Level Trends
**As an** administrator  
**I want** to view time-series charts of water levels  
**So that** I can analyze seasonal patterns and monsoon impact

**Acceptance Criteria:**
- [ ] Line chart with monthly water levels
- [ ] Toggle between mandals
- [ ] Overlay monsoon period shading
- [ ] Display monsoon rise calculation (May to Nov)

---

## Epic 3: MI Tank Module

### US-3.1: Tank Inventory
**As a** KADA administrator  
**I want** to view all 555 MI tanks with storage data  
**So that** I can monitor irrigation water availability

**Acceptance Criteria:**
- [ ] Paginated table with 555 tanks
- [ ] Columns: Name, Mandal, Capacity, Current Storage, Fill %, HNSS Linked
- [ ] Filter by mandal, fill status
- [ ] Search by tank name

---

### US-3.2: Tank Storage Summary
**As a** viewer  
**I want** to see mandal-wise tank storage summary  
**So that** I can quickly assess water availability by region

**Acceptance Criteria:**
- [ ] 4 summary cards (one per mandal)
- [ ] Total tanks, total capacity, current storage, fill %
- [ ] Bar chart showing fill distribution (Full/75%/50%/25%/0%)

---

### US-3.3: HNSS Linked Tanks
**As an** administrator  
**I want** to view tanks connected to HNSS canal  
**So that** I can track canal-fed irrigation coverage

**Acceptance Criteria:**
- [ ] Filter to show only HNSS-linked tanks (125)
- [ ] Display OT (outlet) connections
- [ ] Show existing vs additional linkages
- [ ] Ayacut (irrigated area) in acres

---

## Epic 4: Analytics & Reports

### US-4.1: Power Saved Calculator
**As a** KADA officer  
**I want** to calculate power saved from water level rise  
**So that** I can report energy conservation achievements

**Acceptance Criteria:**
- [ ] Input: Water level rise (m), period selection
- [ ] Calculate using formula: KWHr = Draft × Time × g × ρ × ΔH / (η_pump × η_motor)
- [ ] Display result in KWHr and Mega Units
- [ ] Compare KADA vs Chittoor district

---

### US-4.2: TMC Resources Calculator
**As a** administrator  
**I want** to calculate ground water resources in TMC  
**So that** I can report utilizable water availability

**Acceptance Criteria:**
- [ ] Calculate: Area × Specific Yield × ΔH × Utilizable Factor × Conversion
- [ ] Display month-wise TMC for each mandal
- [ ] Show increase from previous year

---

### US-4.3: Monthly Report Generation
**As a** administrator  
**I want** to generate monthly water resource reports  
**So that** I can share progress with government officials

**Acceptance Criteria:**
- [ ] Select month and year
- [ ] Generate PDF with: Overview, Water Levels, Tank Storage, Conservation Works
- [ ] Include charts and tables matching PDF format
- [ ] Download as PDF

---

## Epic 5: Conservation & Wells

### US-5.1: Conservation Works Dashboard
**As a** field officer  
**I want** to view water conservation structures in my GP  
**So that** I can track and report completed works

**Acceptance Criteria:**
- [ ] Filter by mandal and GP (Gram Panchayat)
- [ ] Categories: Farm Ponds, MPTs, Check Dams, Recharge Shafts
- [ ] Status: Existing, Proposed, Grounded
- [ ] Show count totals per category

---

### US-5.2: Agricultural Well Status
**As a** administrator  
**I want** to monitor well health across KADA region  
**So that** I can identify areas needing rehabilitation

**Acceptance Criteria:**
- [ ] Display 504 wells with status (Working/Partial/Abandoned)
- [ ] Pie chart showing distribution (80.36% / 13.89% / 5.75%)
- [ ] Filter by mandal and well type (Bore vs Open)
- [ ] Index scores (3-5 scale)

---

## Epic 6: Map & GIS

### US-6.1: KADA Region Map
**As a** viewer  
**I want** to see KADA region on an interactive map  
**So that** I can visualize village locations and water data

**Acceptance Criteria:**
- [ ] Map centered on KADA (Kuppam area, Chittoor)
- [ ] Villages as markers
- [ ] Color by water level zone
- [ ] Click marker to show village details popup

---

### US-6.2: Tank Location Map
**As a** field officer  
**I want** to see MI tank locations on map  
**So that** I can plan field visits efficiently

**Acceptance Criteria:**
- [ ] Tank markers with size proportional to capacity
- [ ] Color by fill percentage
- [ ] Filter by HNSS linkage
- [ ] Cluster markers at low zoom levels

---

## Technical Stories

### TS-1: API Authentication
**As a** developer  
**I want** to implement NextAuth with role-based access  
**So that** users can only access authorized features

---

### TS-2: Data Import Pipeline
**As a** developer  
**I want** to create CSV/Excel import functionality  
**So that** field officers can upload new data

---

### TS-3: Performance Optimization
**As a** developer  
**I want** to implement data pagination and caching  
**So that** the dashboard loads quickly with large datasets

---

## Definition of Done
- [ ] Code reviewed and merged
- [ ] Unit tests passing (80%+ coverage)
- [ ] Manual testing completed
- [ ] Responsive on mobile and desktop
- [ ] No critical linting errors
- [ ] Documentation updated
