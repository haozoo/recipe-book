import { AuthErrorCodes, deleteUser, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword } from "firebase/auth";
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


onAuthStateChanged(auth, (userStatus) => {
  console.log("user status changed:", userStatus)
});

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    console.log(displayName);
    console.log(email);

    return { name: displayName, email: email }

  } else {
    console.error("Please Login!")
  }
}

// Delete User Account registered with email/password
export const deleteUserAccount = async (password) => {
  try {
    const check = await checkPassword(password)
    await deleteUser(check.user)
    console.log("Account deleted successfully")
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

// Change password
export const changePassword = async (password, newPassword, confirmPassword) => {

  if (newPassword == confirmPassword) {
    try {
      const check = await checkPassword(password)
      await updatePassword(check.user, newPassword)
      console.log("Password successfully updated")

    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  } else {
    console.log("Your password and confirmation password must match")
  }

}

// Change email address
export const changeEmailAddress = async (newEmail, password) => {
  try {
    const check = await checkPassword(password)
    await updateEmail(check.user, newEmail)
    console.log("Email successfully Updated")

  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }

}

// Reauthentication
const checkPassword = async (password) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, password)
    const check = await reauthenticateWithCredential(user, credential)
    console.log("Reauthentication completed")
    return check
}

// Delete google user account - no reauthentication
export const deleteGoogleUserAccount = async () => {
  const user = await auth.currentUser
  await deleteUser(user)
  console.log("Account deleted successfully")
}