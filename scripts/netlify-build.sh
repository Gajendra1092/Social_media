#!/bin/bash

echo "🚀 Starting Netlify build process..."

# Check if environment variables are set
echo "🔧 Checking environment variables..."
if [ -z "$VITE_APPWRITE_URL" ]; then
  echo "❌ VITE_APPWRITE_URL is not set"
  exit 1
fi

if [ -z "$VITE_APPWRITE_PROJECT_ID" ]; then
  echo "❌ VITE_APPWRITE_PROJECT_ID is not set"
  exit 1
fi

echo "✅ Environment variables check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build completed successfully!"
  echo "📁 Build output is in the 'dist' directory"
else
  echo "❌ Build failed!"
  exit 1
fi

echo "🎉 Netlify build process completed!"
