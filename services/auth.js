import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase";

export const handleGoogleLogin = async () => {
  provider.setCustomParameters({ prompt: "select_account" });

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user; // redux action? --> dispatch({ type: SET_USER, user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// Automatically signout for now
signOut(auth)
  .then(() => {
    console.log("logged out");
    navigate("/");
  })
  .catch((error) => {
    console.log(error);
  });
