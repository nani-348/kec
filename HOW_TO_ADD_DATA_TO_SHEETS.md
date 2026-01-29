# 📊 How to Add Data to Your Google Sheets

## ✅ **FIXED**: The app now reads from your individual spreadsheets!

I've updated the code to use your category-specific spreadsheet IDs instead of tabs.

---

## 📋 **Your Spreadsheets**

### Groundwater Spreadsheet
**ID**: `1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM`  
**URL**: https://docs.google.com/spreadsheets/d/1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM/edit

### Overview Spreadsheet
**ID**: `19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs`  
**URL**: https://docs.google.com/spreadsheets/d/19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs/edit

### Aquifer Spreadsheet
**ID**: `1wtGoG052YAzW0uAjVSQKgFbg6otNxEhnzYLKZe3JLPA`  
**URL**: https://docs.google.com/spreadsheets/d/1wtGoG052YAzW0uAjVSQKgFbg6otNxEhnzYLKZe3JLPA/edit

### Hydrology Spreadsheet
**ID**: `1gHTCgS96OeCebK3B6kENVbFyNzZLT27EDd-GiU463Cc`  
**URL**: https://docs.google.com/spreadsheets/d/1gHTCgS96OeCebK3B6kENVbFyNzZLT27EDd-GiU463Cc/edit

---

## 📝 **IMPORTANT: How to Structure Your Sheets**

The app expects each table to have this format:

### 1. **Table Title Row** (Required)
Must start with an emoji! This tells the app where a new table begins.

```
📊 ANNUAL TRENDS
```

### 2. **Header Row** (Required)
The next row after the title contains column names:

```
year | preMonsoon | postMonsoon | annualAvg
```

### 3. **Data Rows**
Add your data:

```
2025 | 20.30 | 15.26 | 17.78
2024 | 19.67 | 17.99 | 18.83
```

### 4. **Blank Row** (Required to end table)
Leave a blank row after the last data row to mark the end of the table.

---

## 🎯 **Example: Groundwater Sheet Structure**

Here's how your Groundwater spreadsheet should look:

```
Row 1:  📊 ANNUAL TRENDS
Row 2:  year | preMonsoon | postMonsoon | annualAvg
Row 3:  2018 | 22.5 | 18.2 | 20.35
Row 4:  2019 | 21.8 | 17.5 | 19.65
Row 5:  2020 | 23.1 | 19.0 | 21.05
Row 6:  2021 | 20.9 | 16.8 | 18.85
Row 7:  2022 | 21.5 | 17.2 | 19.35
Row 8:  2023 | 19.8 | 16.5 | 18.15
Row 9:  2024 | 19.67 | 17.99 | 18.83
Row 10: 2025 | 20.30 | 15.26 | 17.78
Row 11: (BLANK ROW)
Row 12: 
Row 13: 📊 YEAR-OVER-YEAR
Row 14: name | rise | preMonsoon | postMonsoon | color
Row 15: Prev Water Year (2024) | 1.68 | 19.67 | 17.99 | #93c5fd
Row 16: Present Water Year (2025) | 5.04 | 20.30 | 15.26 | #3b82f6
Row 17: (BLANK ROW)
Row 18:
Row 19: 💧 DEPTH ZONE
Row 20: period | less3m | range3to8m | range8to20m | more20m
Row 21: Premonsoon / May | 0 | 7.7 | 53.8 | 38.5
Row 22: Post Monsoon / Nov 2024 | 7.7 | 7.7 | 53.8 | 30.8
Row 23: Post Monsoon / Nov 2025 | 7.7 | 15.4 | 53.8 | 23.1
Row 24: (BLANK ROW)
```

---

## ✨ **Available Table Emojis**

Use these emojis to start your table title rows:

- 📊 General data tables
- 🌧️ Rainfall data
- 📋 Lists/inventories
- 📈 Trends/analytics
- 🗺️ Maps/spatial
- 🌊 Water-related
- ⬆️ Increases
- ⬇️ Decreases
- ⚖️ Balance
- 🚰 Infrastructure
- 💧 Groundwater
- 🔬 Analysis
- ⚠️ Alerts
- 🏗️ Construction
- 💡 Insights
- 🌾 Agriculture
- 🔧 Methods
- ⚡ Power/energy
- 🔄 Cycles
- 📍 Locations

---

## 🔍 **Tables Required for Each Section**

### **Groundwater Spreadsheet** Needs:
1. `📊 ANNUAL TRENDS` - Columns: year, preMonsoon, postMonsoon, annualAvg
2. `📊 YEAR-OVER-YEAR` - Columns: name, rise, preMonsoon, postMonsoon, color
3. `💧 DEPTH ZONE` - Columns: period, less3m, range3to8m, range8to20m, more20m
4. `📍 PIEZOMETER OBSERVATIONS` - Columns: id, name, mandal, may, nov, status
5. `🔄 REAL-TIME WATER LEVELS` - Columns: mandal, village, jan1stWeek, jan2ndWeek, jan3rdWeek, jan4thWeek, currentMonth
6. `📈 SEASONAL FLUCTUATION` - Columns: name, PreMonsoon, PostMonsoon, Fluctuation, color, isAverage
7. `🗺️ SPATIAL DISTRIBUTION` - Columns: id, name, mandal, depth, status

### **Overview Spreadsheet** Needs:
1. `🌧️ RAINFALL BY MANDAL` - Columns: mandal, rainfall, year

---

## ⚙️ **Permissions**

Make sure ALL your spreadsheets are shared with:
```
kada-sheets-reader@student-file-submissions.iam.gserviceaccount.com
```

Permission level: **Viewer**

---

## 🧪 **Test Your Data**

After adding data, test the API endpoint:

```
http://localhost:3012/api/sheets?category=Groundwater&table=ANNUAL%20TRENDS
```

You should see your data in JSON format!

---

## 🎨 **Column Name Tips**

1. **Use camelCase**: `preMonsoon` not `Pre Monsoon`
2. **No spaces**: `jan1stWeek` not `jan 1st week`
3. **Match exactly**: Column names are case-sensitive
4. **Be consistent**: Same columns across all rows

---

## 🚀 **Quick Start Example**

1. Open: https://docs.google.com/spreadsheets/d/1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM/edit
2. In Cell A1, type: `📊 ANNUAL TRENDS`
3. In Row 2, add headers: `year`, `preMonsoon`, `postMonsoon`, `annualAvg`
4. In Rows 3+, add your data
5. Leave Row 11 blank
6. Repeat for other tables

**That's it!** The app will automatically pick up your data. 🎉

---

## 💡 **Pro Tips**

- **Refresh Intervals**: Data updates every 1-30 seconds depending on the page
- **Fallback Data**: If API fails, the app shows hardcoded fallback data
- **Error Logging**: Check browser console for any API errors
- **Data Types**: Numbers auto-convert, strings stay as text
- **Missing Data**: Empty cells become `null`
