import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  followsCollectionId: import.meta.env.VITE_APPWRITE_FOLLOWS_COLLECTION_ID,
};

// Debug: Log configuration (always in production for debugging)
console.log('🔧 Appwrite Configuration:', {
  url: appwriteConfig.url,
  projectId: appwriteConfig.projectId,
  databaseId: appwriteConfig.databaseId,
  storageId: appwriteConfig.storageId,
  userCollectionId: appwriteConfig.userCollectionId,
  postCollectionId: appwriteConfig.postCollectionId,
  savesCollectionId: appwriteConfig.savesCollectionId,
  followsCollectionId: appwriteConfig.followsCollectionId,
  environment: import.meta.env.MODE,
});

// Check for missing environment variables
const requiredEnvVars = [
  'VITE_APPWRITE_URL',
  'VITE_APPWRITE_PROJECT_ID',
  'VITE_APPWRITE_DATABASE_ID',
  'VITE_APPWRITE_STORAGE_ID',
  'VITE_APPWRITE_USER_COLLECTION_ID',
  'VITE_APPWRITE_POST_COLLECTION_ID',
  'VITE_APPWRITE_SAVES_COLLECTION_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars);
}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

// Add additional client configuration for better error handling
console.log('🔌 Appwrite client configured with:', {
  endpoint: appwriteConfig.url,
  project: appwriteConfig.projectId
});

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
