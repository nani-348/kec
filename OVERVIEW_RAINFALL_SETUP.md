# 🌧️ Overview Spreadsheet - Rainfall Data Structure

## ✅ **FIXED**: Rainfall Analysis Now Connected to Google Sheets!

The rainfall page now fetches data from your Overview spreadsheet every 1 second.

---

## 📊 **Your Overview Spreadsheet**

**Spreadsheet ID**: `19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs`  
**URL**: https://docs.google.com/spreadsheets/d/19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs/edit

---

## 📋 **Required Table: RAINFALL BY MANDAL**

### **Structure Your Sheet Like This:**

| A | B |
|---|---|
| 🌧️ RAINFALL BY MANDAL | |
| mandal | rainfall |
| Gudi Palle | 856 |
| Kuppam | 865 |
| Rama Kuppam | 773 |
| Santhi Puram | 813 |
| Regional Avg | 827 |
| **(blank row)** | |

### **Column Definitions:**

1. **mandal** (String): Name of the mandal or "Regional Avg"
2. **rainfall** (Number): Annual rainfall in millimeters (mm)

### **Important Notes:**

- ✅ Row 1 MUST start with emoji: `🌧️ RAINFALL BY MANDAL`
- ✅ Row 2 has column headers: `mandal` and `rainfall`
- ✅ Rows 3+ contain your data
- ✅ Any row with "Regional" or "Average" in the name will be highlighted in orange
- ✅ Leave a blank row at the end

---

## 🎯 **What Gets Updated:**

When you add/edit data in your Overview spreadsheet:

### 1. **Mandal-wise Bar Chart**
- Shows rainfall for each mandal
- Regional average highlighted in orange
- Updates every 1 second

### 2. **Key Metrics Cards**
- Annual Average (calculated from your data)
- Highest Rainfall mandal
- Primary Season info

### 3. **Detailed Table**
- Shows all your data in a formatted table
- Auto-updates from Google Sheets

---

## 📝 **Example Data Entry**

### **Step 1: Open Your Sheet**
```
https://docs.google.com/spreadsheets/d/19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs/edit
```

### **Step 2: Add This Data**

In the first tab, copy this structure:

```
Cell A1: 🌧️ RAINFALL BY MANDAL
Cell A2: mandal
Cell B2: rainfall
Cell A3: Gudi Palle
Cell B3: 856
Cell A4: Kuppam
Cell B4: 865
Cell A5: Rama Kuppam
Cell B5: 773
Cell A6: Santhi Puram
Cell B6: 813
Cell A7: Regional Avg
Cell B7: 827
Row 8: (leave blank)
```

### **Step 3: Share the Sheet**
Make sure it's shared with:
```
kada-sheets-reader@student-file-submissions.iam.gserviceaccount.com
```

### **Step 4: Watch It Update!**
Open the rainfall page and see your data appear within 1 second:
```
http://localhost:3012/overview/rainfall
```

---

## 🔄 **Real-Time Updates**

- **Refresh Interval**: 1 second
- **Auto-updates**: Charts, tables, and metrics
- **Live Editing**: Edit the sheet and see changes instantly

---

## 🎨 **Visual Features**

### **Bar Chart Colors:**
- Blue bars: Individual mandals
- Orange bar: Regional Average (auto-detected)

### **Auto-Detection:**
Any mandal name containing these words will be highlighted as average:
- "Regional"
- "Average"
- "Avg"

---

## ✅ **Verification**

### **Test the API:**
Open this URL to see your data:
```
http://localhost:3012/api/sheets?category=Overview&table=RAINFALL%20BY%20MANDAL
```

### **Expected Response:**
```json
{
  "success": true,
  "category": "Overview",
  "table": "RAINFALL BY MANDAL",
  "count": 5,
  "data": [
    {"mandal": "Gudi Palle", "rainfall": 856},
    {"mandal": "Kuppam", "rainfall": 865},
    {"mandal": "Rama Kuppam", "rainfall": 773},
    {"mandal": "Santhi Puram", "rainfall": 813},
    {"mandal": "Regional Avg", "rainfall": 827}
  ]
}
```

---

## 🚨 **Troubleshooting**

### **Issue: Data not showing**
✅ Check that table title starts with `🌧️ RAINFALL BY MANDAL`  
✅ Verify column names are exactly `mandal` and `rainfall`  
✅ Ensure sheet is shared with service account  
✅ Check browser console for errors

### **Issue: Wrong colors**
✅ Make sure "Regional Avg" contains "Avg" or "Average"  
✅ Check spelling matches exactly

### **Issue: API returns empty**
✅ Verify emoji is in cell A1  
✅ Check that there's a blank row after your data  
✅ Ensure spreadsheet ID is correct in `.env.local`

---

## 📚 **Additional Tables (Optional)**

You can add more tables to the same Overview spreadsheet:

### **Seasonal Rainfall** (Future Enhancement)
```
🌧️ SEASONAL RAINFALL
season | rainfall | color
South-West Monsoon | 450 | #3b82f6
North-East Monsoon | 300 | #6366f1
Winter & Summer | 77 | #f59e0b
```

### **Rainfall Trends** (Future Enhancement)
```
📈 RAINFALL TRENDS
metric | value | unit
Annual Average | 827 | mm
Primary Season | SW Monsoon | 
Highest Rainfall | Kuppam (865 mm) | 
```

---

## 🎉 **You're All Set!**

The rainfall analysis page is now:
- ✅ Connected to Google Sheets
- ✅ Updating every 1 second
- ✅ Displaying real-time data
- ✅ Auto-calculating metrics

**Access it here**: http://localhost:3012/overview/rainfall

Happy data monitoring! 🚀
