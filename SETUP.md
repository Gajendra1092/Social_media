# Social Media App Setup Guide

## Environment Configuration

This application requires several environment variables to connect to Appwrite services. Follow these steps to configure your environment:

### 1. Environment Files Created

The following environment files have been created for you:

- `.env.example` - Template with all required variables and descriptions
- `.env` - Main environment file (populate with your values)
- `.env.local` - Local development environment file
- `.env.production` - Production environment file

### 2. Required Environment Variables

You need to configure the following Appwrite-related variables:

#### `VITE_APPWRITE_URL`
- **Description**: Your Appwrite server endpoint URL
- **Appwrite Cloud**: `https://cloud.appwrite.io/v1`
- **Self-hosted**: `http://localhost/v1` (or your server URL)

#### `VITE_APPWRITE_PROJECT_ID`
- **Description**: Your Appwrite project ID
- **How to get**: Go to Appwrite Console → Settings → General → Project ID

#### `VITE_APPWRITE_DATABASE_ID`
- **Description**: Database ID where your collections are stored
- **How to get**: Create a database in Appwrite Console → Databases → Copy the Database ID

#### `VITE_APPWRITE_STORAGE_ID`
- **Description**: Storage bucket ID for file uploads (images, media)
- **How to get**: Create a storage bucket in Appwrite Console → Storage → Copy the Bucket ID

#### `VITE_APPWRITE_USER_COLLECTION_ID`
- **Description**: Collection ID for user profiles
- **How to get**: Create a "users" collection in your database → Copy the Collection ID

#### `VITE_APPWRITE_POST_COLLECTION_ID`
- **Description**: Collection ID for posts
- **How to get**: Create a "posts" collection in your database → Copy the Collection ID

#### `VITE_APPWRITE_SAVES_COLLECTION_ID`
- **Description**: Collection ID for saved posts
- **How to get**: Create a "saves" collection in your database → Copy the Collection ID

### 3. Appwrite Setup Requirements

Before running the application, you need to set up the following in your Appwrite project:

#### Database Collections

Create these collections in your Appwrite database:

1. **Users Collection** (`users`)
   - Attributes: accountId, email, name, imageUrl, username

2. **Posts Collection** (`posts`)
   - Attributes: creator, caption, imageUrl, imageId, location, tags

3. **Saves Collection** (`saves`)
   - Attributes: user, post

#### Storage Bucket

Create a storage bucket for media uploads with appropriate permissions.

### 4. Dependencies Status

✅ All dependencies are properly installed:
- appwrite@13.0.0
- react@18.2.0
- vite@4.4.11
- All other dependencies from package.json

### 5. How to Start the Application

Once you've configured your environment variables:

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### 6. Development Workflow

1. Copy values from `.env.example` to `.env`
2. Fill in your actual Appwrite configuration values
3. Set up your Appwrite project with required collections and storage
4. Run `npm run dev` to start development server
5. Access the app at `http://localhost:5173` (default Vite port)

### 7. Production Deployment

For production deployment:

1. Use `.env.production` for production-specific variables
2. Ensure all environment variables are set in your hosting platform
3. Run `npm run build` to create production build
4. Deploy the `dist` folder to your hosting service

### 8. Troubleshooting

- Ensure all Appwrite collections have proper read/write permissions
- Verify your Appwrite project settings and API keys
- Check browser console for any configuration errors
- Make sure your Appwrite endpoint is accessible from your domain
