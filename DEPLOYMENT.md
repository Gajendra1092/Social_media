# 🚀 Snapgram Deployment Guide

## Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Add Environment Variables** in Vercel Dashboard:
   ```
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=67668cfa003a8eab508b
   VITE_APPWRITE_DATABASE_ID=677eced2000c0a9dcd69
   VITE_APPWRITE_STORAGE_ID=677ece55001db0463d14
   VITE_APPWRITE_USER_COLLECTION_ID=67a8b976003d77b5a81a
   VITE_APPWRITE_POST_COLLECTION_ID=67a8b9670020763a6002
   VITE_APPWRITE_SAVES_COLLECTION_ID=677ed0b4003233757dc1
   VITE_APPWRITE_FOLLOWS_COLLECTION_ID=67a8b9a0001234567890
   ```

4. **Deploy**: Click "Deploy" and your app will be live!

### Option 2: Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repo

3. **Add Environment Variables** in Netlify Dashboard

### Option 3: Manual Deployment

1. **Build**:
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to any static hosting service:
   - GitHub Pages
   - Firebase Hosting
   - Surge.sh
   - Any web server

## 🔧 Environment Variables

Make sure to set these in your hosting platform:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=67668cfa003a8eab508b
VITE_APPWRITE_DATABASE_ID=677eced2000c0a9dcd69
VITE_APPWRITE_STORAGE_ID=677ece55001db0463d14
VITE_APPWRITE_USER_COLLECTION_ID=67a8b976003d77b5a81a
VITE_APPWRITE_POST_COLLECTION_ID=67a8b9670020763a6002
VITE_APPWRITE_SAVES_COLLECTION_ID=677ed0b4003233757dc1
VITE_APPWRITE_FOLLOWS_COLLECTION_ID=67a8b9a0001234567890
```

## 📱 Features Working in Production

✅ User authentication (sign up, sign in, sign out)
✅ Create, edit, delete posts
✅ Image upload and display
✅ Like and save posts
✅ User profiles
✅ Explore posts
✅ Search functionality
✅ Responsive design

⚠️ Follow functionality (requires creating follows collection in Appwrite)

## 🛠️ Post-Deployment Setup

After deployment, you may want to:

1. **Create the follows collection** in Appwrite Console
2. **Update the follows collection ID** in environment variables
3. **Test all functionality** on the live site

## 🌐 Your App Will Be Live!

Once deployed, your social media app will be accessible to anyone with the URL!
