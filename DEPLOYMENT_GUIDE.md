# 🚀 Deploying to Vercel - Complete Guide

## ✅ Pre-Deployment Checklist

- ✅ Code is ready and tested locally
- ✅ All dependencies are in `package.json`
- ✅ Environment variables are documented
- ✅ `.gitignore` is configured

---

## 📋 **Step 1: Push Code to GitHub**

### **1.1 Add All Changes**
```bash
git add .
```

### **1.2 Commit with Message**
```bash
git commit -m "feat: Add Google Sheets integration and real-time updates for groundwater and rainfall sections"
```

### **1.3 Push to GitHub**
```bash
git push origin main
```

If you get an error about remote not set, use:
```bash
git push -u origin main
```

---

## 🌐 **Step 2: Deploy to Vercel**

### **Option A: Vercel CLI (Recommended)**

#### **2.1 Install Vercel CLI**
```bash
npm install -g vercel
```

#### **2.2 Login to Vercel**
```bash
vercel login
```

#### **2.3 Deploy**
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (if new) or Yes (if updating)
- **What's your project's name?** → `kada-dss` (or your preferred name)
- **In which directory is your code located?** → `./`
- **Override settings?** → No

#### **2.4 Deploy to Production**
```bash
vercel --prod
```

---

### **Option B: Vercel Dashboard (Web Interface)**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave as default
   - **Install Command**: `npm install`

5. Add Environment Variables (see Step 3 below)
6. Click "Deploy"

---

## 🔐 **Step 3: Configure Environment Variables on Vercel**

### **CRITICAL**: You MUST add these environment variables in Vercel:

#### **3.1 Access Environment Variables**
- Go to your project in Vercel Dashboard
- Click "Settings" → "Environment Variables"

#### **3.2 Add These Variables:**

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `GOOGLE_SHEETS_CLIENT_EMAIL` | `kada-sheets-reader@student-file-submissions.iam.gserviceaccount.com` | Service account email |
| `GOOGLE_SHEETS_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` | ⚠️ Copy from `.env.local` INCLUDING the quotes and \n characters |
| `GOOGLE_SHEETS_ID_GROUNDWATER` | `1172xPsQ-xqiwwTuZqahStKeD5HaMHmwktv4O6559SoM` | Groundwater spreadsheet |
| `GOOGLE_SHEETS_ID_OVERVIEW` | `19X7aGKuGuDnkTlL0UjNg44lP5RiS0kMbTXJOjHScdWs` | Overview spreadsheet |
| `GOOGLE_SHEETS_ID_AQUIFER` | `1wtGoG052YAzW0uAjVSQKgFbg6otNxEhnzYLKZe3JLPA` | Aquifer spreadsheet |
| `GOOGLE_SHEETS_ID_HYDROLOGY` | `1gHTCgS96OeCebK3B6kENVbFyNzZLT27EDd-GiU463Cc` | Hydrology spreadsheet |

#### **3.3 Important Notes for Private Key:**

When adding `GOOGLE_SHEETS_PRIVATE_KEY`:
1. ✅ Include the entire value WITH quotes
2. ✅ Keep the `\n` characters (they represent newlines)
3. ✅ The value should look like: `"-----BEGIN PRIVATE KEY-----\nMIIEvg...\n-----END PRIVATE KEY-----\n"`

---

## 📦 **Step 4: Verify Dependencies**

Your `package.json` should have all required dependencies. Key ones:

```json
{
  "dependencies": {
    "next": "^16.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "recharts": "^2.15.0",
    "googleapis": "^144.0.0",
    "lucide-react": "^0.344.0",
    "framer-motion": "^11.0.5",
    "clsx": "^2.1.0"
  }
}
```

✅ All dependencies are already in your `package.json` - no changes needed!

---

## 🔄 **Step 5: Redeploy After Changes**

### **If you make code changes:**

```bash
git add .
git commit -m "your commit message"
git push origin main
```

Vercel will **automatically redeploy** if you have auto-deployment enabled.

### **If you change environment variables:**

1. Update them in Vercel Dashboard → Settings → Environment Variables
2. Click "Redeploy" in the Deployments tab

---

## ✅ **Step 6: Post-Deployment Verification**

### **6.1 Check Build Logs**
- Go to Vercel Dashboard → Deployments
- Click on latest deployment
- Check "Building" and "Deploying" logs for errors

### **6.2 Test Your Live Site**
Once deployed, test these pages:

- Homepage: `https://your-project.vercel.app/`
- Groundwater: `https://your-project.vercel.app/groundwater/annual-trends`
- Rainfall: `https://your-project.vercel.app/overview/rainfall`
- API Test: `https://your-project.vercel.app/api/sheets?category=Groundwater&table=ANNUAL%20TRENDS`

### **6.3 Verify Google Sheets Connection**
- Open any page with Google Sheets data
- Check if data loads (may take a few seconds on first load)
- Edit data in Google Sheets and verify it updates on the site

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: Build Fails**

**Error**: `Module not found` or dependency errors

**Solution**:
```bash
# Locally test the build
npm run build

# If it fails locally, fix dependencies first
npm install
```

---

### **Issue 2: Environment Variables Not Working**

**Error**: `Google Sheets credentials not configured`

**Solutions**:
1. ✅ Check that ALL environment variables are added in Vercel
2. ✅ Verify the private key includes quotes and `\n` characters
3. ✅ Redeploy after adding environment variables

---

### **Issue 3: API Returns Empty Data**

**Error**: API works locally but not on Vercel

**Solutions**:
1. ✅ Ensure Google Sheets are shared with service account email
2. ✅ Check sheets have the correct emoji-based table format
3. ✅ Verify spreadsheet IDs are correct in environment variables

---

### **Issue 4: Page Not Found (404)**

**Error**: Routes not working on Vercel

**Solution**:
- Ensure your `next.config.ts` doesn't have incorrect redirects
- Check that all page files are properly committed to git
- Verify the build output in deployment logs

---

## 🎯 **Performance Optimization**

### **Enable Caching (Optional)**

For better performance, you can modify the API route:

```typescript
export const dynamic = 'force-dynamic'; // Current setting - always fresh
// Change to:
export const revalidate = 60; // Cache for 60 seconds
```

This reduces API calls to Google Sheets.

---

## 📊 **Monitoring**

### **Vercel Analytics**
- Go to your project → Analytics
- Monitor performance, usage, and errors

### **Function Logs**
- Go to your project → Logs
- See real-time server logs including API calls

---

## 🔒 **Security Best Practices**

✅ **Never commit `.env.local` to git** - it's in `.gitignore`  
✅ **Use environment variables in Vercel** - not hardcoded values  
✅ **Share Google Sheets with service account only** - not public  
✅ **Monitor API usage** - Google Sheets has rate limits  

---

## 📝 **Quick Command Reference**

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check Vercel deployments
vercel ls

# View deployment logs
vercel logs
```

---

## 🎉 **Success Checklist**

After deployment, verify:

- [ ] Build completed successfully
- [ ] Site is accessible at Vercel URL
- [ ] All pages load without errors
- [ ] Google Sheets data is displaying
- [ ] Charts and visualizations work
- [ ] Real-time updates are functioning
- [ ] Mobile responsive design works
- [ ] No console errors in browser

---

## 🆘 **Need Help?**

### **Vercel Documentation**
- https://vercel.com/docs
- https://nextjs.org/docs/deployment

### **Common Commands**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

---

## 🚀 **Ready to Deploy!**

Follow the steps in order:
1. ✅ Push to GitHub (Step 1)
2. ✅ Deploy to Vercel (Step 2)
3. ✅ Add Environment Variables (Step 3)
4. ✅ Verify Deployment (Step 6)

**Your KADA DSS application will be live!** 🎉
