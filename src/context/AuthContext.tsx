import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { get } from "http";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// defines how an empty user looks like
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageURL: "",
  bio: "",
};

// initial auth state to know we have a logged in user at all times
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

// Need to store our session in a context, which would be used to store the user's authentication state
// We need to ensure there at all times that we have a logged in user

// wraps the entire app and provides access to AuthContext
// and displays whatever is in AuthContext (the children)

// AuthProvider needs to be called whenever we reload the page
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // <IUser> is a type or context!!!
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      // try to get into account
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageURL: currentAccount.imageURL,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log("checkAuthUser failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if the user is not logged in, redirect to sign-in page
    // (!)localStorage.getItem("cookieFallback")
    if (localStorage.getItem("cookieFallback") === "[]") navigate("/sign-in");

    checkAuthUser();
  }, []);
  // the ,[] is a dependency array and will only be called when app reloads

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// allows us to easuly access the AuthContext
export const useUserContext = () => useContext(AuthContext);
