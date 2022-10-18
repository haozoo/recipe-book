import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import Router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  LANDING_PAGE_PATH,
  USER_ALL_RECIPE_PATH,
} from "../utils/constants";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function logIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Router.push(USER_ALL_RECIPE_PATH);
    } catch (error) {
      console.log(`There was an error: ${error}`);
      return "ERROR";
    }
    return "SUCCESS";
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
      if (!currentuser) Router.push(LANDING_PAGE_PATH);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(userAuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserContextProvider");
  }
  return context;
}
