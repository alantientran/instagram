import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  /* We never want to share our API keys publicly so we declare them as environment variables
     which we stored in a .env file (/.env.local), which also stores the URL 
     URL is the endpoint of the Appwrite server
     
     .env will error and say "env does not exist on import type meta"
     We just have to let TS know we're using vite in src\vite-env.d.ts
  */
  projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();
// set the project ID and the endpoint for the client
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
