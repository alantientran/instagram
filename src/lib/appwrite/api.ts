import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) {
      throw new Error("Account not created");
    }

    const avatarURL = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountID: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageURL: avatarURL,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountID: string;
  email: string;
  name: string;
  imageURL: URL;
  username: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseID,
      appwriteConfig.userCollectionID,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("No account found");
    }

    // retrieve current account
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.userCollectionID,
      [Query.equal("accountID", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error("No user found");
    }

    // return the first document, which is the user
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
