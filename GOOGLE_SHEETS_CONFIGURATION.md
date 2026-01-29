# Google Sheets API Configuration

## ✅ Configuration Status: ACTIVE

Your Google Sheets API is **fully configured** and operational!

---

## 🔐 Service Account Credentials

### Client Email
```
kada-sheets-reader@student-file-submissions.iam.gserviceaccount.com
```

### Private Key
✅ Configured in `.env.local` (Securely stored)

---

## 📊 Spreadsheet IDs

All category-specific Google Sheets are configured:

| Category | Spreadsheet ID | Status |
|----------|---------------|--------|
| **Groundwater** | `1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM` | ✅ Active |
| **Overview** | `19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs` | ✅ Active |
| **Aquifer** | `1wtGoG052YAzW0uAjVSQKgFbg6otNxEhnzYLKZe3JLPA` | ✅ Active |
| **Hydrology** | `1gHTCgS96OeCebK3B6kENVbFyNzZLT27EDd-GiU463Cc` | ✅ Active |
| MI Tanks | *Not configured* | ⏸️ Pending |
| Water Balance | *Not configured* | ⏸️ Pending |
| Agriculture | *Not configured* | ⏸️ Pending |
| Conservation | *Not configured* | ⏸️ Pending |
| Data Methods | *Not configured* | ⏸️ Pending |
| Resources | *Not configured* | ⏸️ Pending |
| Case Studies | *Not configured* | ⏸️ Pending |

---

## 🌐 API Endpoints & Data Flow

### Base API Route
```
/api/sheets?category={CATEGORY}&table={TABLE_NAME}
```

### Groundwater Section API Calls

#### 1. Annual Trends
```javascript
Endpoint: /api/sheets?category=Groundwater&table=ANNUAL TRENDS
Sheet: Groundwater (1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM)
Tab Name: "ANNUAL TRENDS"
```

#### 2. Current Status
```javascript
// Year-over-Year Data
Endpoint: /api/sheets?category=Groundwater&table=YEAR-OVER-YEAR
Sheet: Groundwater
Tab Name: "YEAR-OVER-YEAR"

// Depth Zone Data
Endpoint: /api/sheets?category=Groundwater&table=DEPTH ZONE
Sheet: Groundwater
Tab Name: "DEPTH ZONE"
```

#### 3. Piezometer Observations
```javascript
Endpoint: /api/sheets?category=Groundwater&table=PIEZOMETER OBSERVATIONS
Sheet: Groundwater
Tab Name: "PIEZOMETER OBSERVATIONS"
```

#### 4. Real-Time Water Levels
```javascript
Endpoint: /api/sheets?category=Groundwater&table=REAL-TIME WATER LEVELS
Sheet: Groundwater
Tab Name: "REAL-TIME WATER LEVELS"
```

#### 5. Seasonal Fluctuation
```javascript
Endpoint: /api/sheets?category=Groundwater&table=SEASONAL FLUCTUATION
Sheet: Groundwater
Tab Name: "SEASONAL FLUCTUATION"
```

#### 6. Seasonal GIS
```javascript
Data Source: Hardcoded data + Images
Images: /images/gwl-charts/image1-4.jpeg
```

#### 7. Spatial Distribution
```javascript
Endpoint: /api/sheets?category=Groundwater&table=SPATIAL DISTRIBUTION
Sheet: Groundwater
Tab Name: "SPATIAL DISTRIBUTION"
```

### Overview Section API Calls

#### Rainfall Data
```javascript
Endpoint: /api/sheets?category=Overview&table=RAINFALL BY MANDAL
Sheet: Overview (19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs)
Tab Name: "RAINFALL BY MANDAL"
```

---

## 📋 Required Google Sheet Structure

### For Each Tab in Groundwater Sheet

Each tab should have specific columns matching the data structure expected by the application.

#### Example: ANNUAL TRENDS Tab
```
Columns:
- month (String): "May", "June", etc.
- CurrentYear (Number): 2025 water level
- PreviousYear (Number): 2024 water level
- DecadalAvg (Number): 10-year average
```

#### Example: PIEZOMETER OBSERVATIONS Tab
```
Columns:
- id (Number): Station ID
- name (String): Station name
- mandal (String): Mandal name
- may (Number): Pre-monsoon level
- nov (Number): Post-monsoon level
- status (String): "Safe", "Moderate", or "Critical"
```

#### Example: YEAR-OVER-YEAR Tab
```
Columns:
- name (String): Period name
- rise (Number): Water level rise in meters
- preMonsoon (Number): Pre-monsoon level
- postMonsoon (Number): Post-monsoon level
- color (String): Hex color code for chart
```

---

## 🔄 Data Refresh Intervals

Different pages use different refresh intervals for live data:

| Page | Refresh Interval | Type |
|------|-----------------|------|
| Annual Trends | 30 seconds | Balanced |
| Current Status | 30 seconds | Balanced |
| Piezometer Obs | 1 second | Real-time |
| Real-Time Levels | 30 seconds | Standard |
| Seasonal Fluctuation | 5 seconds | Frequent |
| Spatial Distribution | 1 second | Real-time |

---

## 🛠️ How to Add Data to Google Sheets

### Step 1: Open Your Google Sheet
```
https://docs.google.com/spreadsheets/d/1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM/edit
```

### Step 2: Create or Update Tabs
Make sure each tab name matches exactly:
- `ANNUAL TRENDS`
- `YEAR-OVER-YEAR`
- `DEPTH ZONE`
- `PIEZOMETER OBSERVATIONS`
- `REAL-TIME WATER LEVELS`
- `SEASONAL FLUCTUATION`
- `SPATIAL DISTRIBUTION`

### Step 3: Add Headers
First row should contain column names matching the expected structure.

### Step 4: Add Data
Fill in subsequent rows with your data.

### Step 5: Share with Service Account
Share the sheet with:
```
kada-sheets-reader@student-file-submissions.iam.gserviceaccount.com
```
Permission: **Viewer** access

---

## ✅ Verification

### Check if API is Working:

1. **Open your browser** and navigate to:
   ```
   http://localhost:3012/api/sheets?category=Groundwater&table=ANNUAL%20TRENDS
   ```

2. **Expected Response** (if working):
   ```json
   {
     "success": true,
     "data": [
       {
         "month": "May",
         "CurrentYear": 20.30,
         "PreviousYear": 19.67,
         "DecadalAvg": 18.31
       },
       ...
     ]
   }
   ```

3. **If you see an error**, check:
   - Sheet is shared with service account
   - Tab names match exactly (case-sensitive)
   - Column names are correct
   - Sheet ID is correct in `.env.local`

---

## 🚨 Troubleshooting

### Issue: "Sheet not found" error
**Solution**: Make sure the tab name in Google Sheets matches exactly (case-sensitive)

### Issue: "Permission denied" error
**Solution**: Share the sheet with `kada-sheets-reader@student-file-submissions.iam.gserviceaccount.com`

### Issue: "No data returned"
**Solution**: Check that your sheet has headers in row 1 and data in subsequent rows

### Issue: Data not updating
**Solution**: Clear browser cache or wait for the refresh interval to complete

---

## 📝 Notes

- **Fallback Data**: All pages have hardcoded fallback data that displays if the API fails
- **Error Handling**: The app gracefully handles API errors and continues to function
- **Security**: Your private key is securely stored in `.env.local` (never commit to Git!)
- **Performance**: API calls are cached and refresh intervals prevent excessive requests

---

## 🎯 Current Status

✅ **Google Sheets API**: Configured and Active  
✅ **Service Account**: Valid credentials  
✅ **Groundwater Sheet**: Connected  
✅ **Overview Sheet**: Connected  
✅ **Aquifer Sheet**: Connected  
✅ **Hydrology Sheet**: Connected  
✅ **Application**: Running on port 3012  
✅ **Real-time Updates**: Operational  

**Everything is ready to go!** 🚀
