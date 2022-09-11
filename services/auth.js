import { signInWithPopup, signOut, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "./firebase";
import { showLoginError } from "../utils/constants";
import Router from "next/router";

export const handleGoogleLogin = async () => {
  provider.setCustomParameters({ prompt: "select_account" });

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user; // redux action? --> dispatch({ type: SET_USER, user });
      Router.push("/recipes")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const handleEmailLogin = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    Router.push("/recipes")
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  }
  
};

// Create new account using email/password
export const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Automatically signout for now
signOut(auth)
  .then(() => {
    console.log("logged out");
    navigate("/");
  })
  .catch((error) => {
    console.log(error);
  });
