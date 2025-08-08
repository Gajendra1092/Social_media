# 🚀 Netlify Deployment Guide for Snapgram

## Quick Deploy to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Go to [netlify.com](https://netlify.com)** and sign in
2. **Click "New site from Git"**
3. **Choose GitHub** and authorize Netlify
4. **Select your repository**: `Gajendra1092/Social_media`
5. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (in Environment variables)

### Method 2: Manual Deploy

1. **Build locally**:
   ```bash
   npm run build
   ```
2. **Go to [netlify.com](https://netlify.com)**
3. **Drag and drop the `dist` folder** to Netlify

## 🔧 Environment Variables Setup

**CRITICAL**: Add these environment variables in Netlify Dashboard:

1. **Go to**: Site settings → Environment variables
2. **Add each variable** (NO SPACES after equals signs):

```
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=67668cfa003a8eab508b
VITE_APPWRITE_DATABASE_ID=677eced2000c0a9dcd69
VITE_APPWRITE_STORAGE_ID=677ece55001db0463d14
VITE_APPWRITE_USER_COLLECTION_ID=67a8b976003d77b5a81a
VITE_APPWRITE_POST_COLLECTION_ID=67a8b9670020763a6002
VITE_APPWRITE_SAVES_COLLECTION_ID=677ed0b4003233757dc1
VITE_APPWRITE_FOLLOWS_COLLECTION_ID=67a8b9a0001234567890
NODE_VERSION=18
```

## 🌐 Domain Configuration

After deployment, you need to configure Appwrite for your Netlify domain:

1. **Copy your Netlify URL** (e.g., `https://amazing-app-123.netlify.app`)
2. **Go to Appwrite Console** → Your Project → Settings → Platforms
3. **Add Web Platform**:
   - **Name**: Netlify Production
   - **Hostname**: `amazing-app-123.netlify.app` (without https://)
4. **Save changes**

## 🔍 Debugging Login Issues

### Step 1: Check Build Logs
1. **Go to Netlify Dashboard** → Deploys
2. **Click on latest deploy** → View build logs
3. **Look for any build errors**

### Step 2: Use Debug Page
1. **Visit**: `https://your-netlify-url.netlify.app/debug`
2. **Click "Test Connection"**
3. **Check results for errors**

### Step 3: Check Browser Console
1. **Open your deployed site**
2. **Press F12** → Console tab
3. **Look for configuration logs and errors**

## 🛠️ Common Netlify Issues & Fixes

### Issue 1: Environment Variables Not Working
**Symptoms**: Configuration shows `undefined`
**Fix**: 
- Ensure NO SPACES after `=` in environment variables
- Redeploy after adding variables
- Check variable names are exactly: `VITE_APPWRITE_...`

### Issue 2: 404 on Page Refresh
**Symptoms**: Direct URLs return 404
**Fix**: Already handled by `netlify.toml` redirects

### Issue 3: Build Fails
**Symptoms**: Deploy fails during build
**Fix**: 
- Check build logs in Netlify dashboard
- Ensure Node version is set to 18
- Verify all dependencies are in package.json

### Issue 4: CORS Errors
**Symptoms**: Network errors, CORS policy violations
**Fix**: 
- Add your Netlify domain to Appwrite Console
- Include both `www` and non-`www` versions if applicable

## 📋 Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Netlify site created and connected to GitHub
- [ ] Environment variables added (with correct format)
- [ ] Build completed successfully
- [ ] Netlify domain added to Appwrite Console
- [ ] Login tested on deployed site
- [ ] Debug page tested (`/debug`)

## 🎯 Expected Results

After successful deployment:
- ✅ Site loads at your Netlify URL
- ✅ Sign up/sign in works
- ✅ Images display correctly
- ✅ All features work as in development

## 🆘 If Login Still Doesn't Work

1. **Check debug page**: `https://your-site.netlify.app/debug`
2. **Verify environment variables** in Netlify dashboard
3. **Check Appwrite Console** for domain configuration
4. **Look at browser console** for specific error messages
5. **Check Netlify function logs** if using serverless functions

Your app should work perfectly on Netlify with these configurations!
