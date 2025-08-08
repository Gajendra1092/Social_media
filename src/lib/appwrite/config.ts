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

// Debug: Log configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 Appwrite Configuration:', {
    url: appwriteConfig.url,
    projectId: appwriteConfig.projectId,
    databaseId: appwriteConfig.databaseId,
    storageId: appwriteConfig.storageId,
    userCollectionId: appwriteConfig.userCollectionId,
    postCollectionId: appwriteConfig.postCollectionId,
    savesCollectionId: appwriteConfig.savesCollectionId,
    followsCollectionId: appwriteConfig.followsCollectionId,
  });
}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
