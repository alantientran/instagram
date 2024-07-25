import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  /* We never want to share our API keys publicly so we declare them as environment variables
     which we stored in a .env file (/.env.local), which also stores the URL 
     URL is the endpoint of the Appwrite server and the projectID is the ID of the project we created in Appwrite.

     .env will error and say "env does not exist on import type meta"
     We just have to let TS know we're using vite in src\vite-env.d.ts
  */
  projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
};

export const client = new Client();
// set the project ID and the endpoint for the client
client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
