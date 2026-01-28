# Image Placement Guide for Water Balance & Energy Section

## Overview
You've successfully created a new "Water Balance & Energy" section that combines MI Tank storage data with energy conservation analysis. The page is ready, but you need to place three high-quality images.

## Required Actions

### Step 1: Save Your Uploaded Images

You uploaded 3 images that need to be saved in the correct location:

1. **KADA Region Map** (the map with boundaries)
   - Save as: `public/images/water-balance/kada-region-map.jpg`
   - This is the first image you uploaded showing the KADA region with mandal boundaries

2. **MI Tanks Storage Chart** (bar chart with blue and orange bars)
   - Save as: `public/images/water-balance/mi-tanks-storage.jpg`
   - This is the second image showing capacity vs current storage

3. **Filling Status Chart** (bar chart showing tank filling distribution)
   - Save as: `public/images/water-balance/filling-status.jpg`
   - This is the third image showing 100%, 75%, 50%, 25%, 0% filled tanks

### Step 2: Image Quality Requirements

For the best magnification experience:
- **Resolution**: 4K (3840x2160) or higher recommended
- **Format**: JPEG with 90-95% quality
- **File Size**: 500KB - 2MB per image (optimized for web)
- **Color Space**: sRGB

### Step 3: Verify the Images

After placing the images, visit the new page at:
```
http://localhost:3000/water-balance/mi-tanks-energy
```

Test the magnification features:
- Click on any image to open fullscreen view
- Use the magnifier tool (search icon) to zoom into details
- Scroll to zoom in/out
- Drag to pan when zoomed in

## What's Been Created

### New Page
- **Location**: `src/app/water-balance/mi-tanks-energy/page.tsx`
- **Route**: `/water-balance/mi-tanks-energy`
- **Navigation**: Added to "Water Balance & Energy" menu

### Features Included

1. **Key Metrics Dashboard**
   - Total Tanks: 555
   - Storage Capacity: 1,196.38 mcft
   - Current Storage: 500.64 mcft
   - Fill Rate: 41.85%
   - Power Saved: 1,015 MU

2. **Interactive Charts**
   - Storage comparison by region (bar chart)
   - Filling status distribution (pie chart)
   - Energy conservation impact (area chart)

3. **Detailed Data Table**
   - Complete breakdown by region
   - Storage capacity and current storage
   - Fill percentages with visual indicators
   - Tank count by filling status (Full, 75%, 50%, 25%, 0%)

4. **Visual Analysis Section**
   - Three high-quality images with magnification
   - Click to expand fullscreen
   - Hover magnifier for detailed inspection
   - Zoom and pan controls

5. **Key Insights**
   - Storage utilization analysis
   - Regional variation highlights
   - Energy conservation impact
   - Critical status alerts

## Navigation

The new page has been added to the main navigation menu:

**Water Balance & Energy** → **MI Tanks Storage & Energy**

## Data Included

All the data you provided has been integrated:

### Regional Data
- GUDI PALLE: 182 tanks, 232.61 mcft capacity, 122.95 mcft current
- KUPPAM: 129 tanks, 336.66 mcft capacity, 121.08 mcft current
- RAMA KUPPAM: 133 tanks, 325.95 mcft capacity, 88.26 mcft current
- SANTHI PURAM: 111 tanks, 301.16 mcft capacity, 168.36 mcft current

### Filling Status Distribution
- 100% Full: 95 tanks
- 75% Filled: 63 tanks
- 50% Filled: 93 tanks
- 25% Filled: 112 tanks
- 0% Empty: 192 tanks

## Next Steps

1. Place the three images in `public/images/water-balance/` directory
2. Run the development server: `npm run dev`
3. Visit: `http://localhost:3000/water-balance/mi-tanks-energy`
4. Test all interactive features
5. Verify image quality and magnification

## Troubleshooting

If images don't appear:
- Check file names match exactly (case-sensitive)
- Verify images are in the correct directory
- Clear browser cache and refresh
- Check browser console for errors

If you need to update the images later:
- Simply replace the files in `public/images/water-balance/`
- No code changes needed
- Refresh the page to see updates
