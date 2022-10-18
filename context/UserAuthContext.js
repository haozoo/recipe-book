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
    } catch (err) {
      switch (err?.code) {
        case "auth/invalid-email":
          return "Invalid email";
        case "auth/wrong-password":
          return "Wrong password";
        default:
          return "Error logging in.";
      }
    }
    return "SUCCESS";
  }

  async function signUp(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Router.push(USER_ALL_RECIPE_PATH);
    } catch (err) {
      switch (err?.code) {
        case "auth/email-already-in-use":
          return "Email already in use";
        default:
          return "Error signing up.";
      }
    }
    return "SUCCESS";
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
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
