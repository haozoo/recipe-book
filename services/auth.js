import {
  AuthErrorCodes,
  deleteUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
  getAdditionalUserInfo,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { showLoginError } from "../utils/constants";
import Router from "next/router";
import { addDefaultRecipes } from "./database";
import { deleteUserData } from "./database";

export const handleGoogleLogin = async () => {
  provider.setCustomParameters({ prompt: "select_account" });

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user; // redux action? --> dispatch({ type: SET_USER, user });
      // add sample recipes for new user
      if (getAdditionalUserInfo(result).isNewUser) {
        await addDefaultRecipes();
      }
      Router.push("/recipes");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const handleEmailLogin = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    Router.push("/recipes");
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Create new account using email/password
export const createAccount = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // add sample recipes for new user
    await addDefaultRecipes();
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// // Automatically signout for now
// signOut(auth)
//   .then(() => {
//     console.log("logged out");
//     navigate("/");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// onAuthStateChanged(auth, (userStatus) => {
//   console.log("user status changed:", userStatus)
// });

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    console.log(displayName);
    console.log(email);

    return { name: displayName, email: email };
  } else {
    console.error("Please Login!");
  }
};

export const updateUserProfile = async (newusername) => {
  try {
    await updateProfile(auth.currentUser, { displayName: newusername });
  } catch (err) {
    console.log(err);
    return "Update profile failed.";
  }
  return "SUCCESS";
};

// Delete User Account registered with email/password
export const deleteUserAccount = async (password) => {
  try {
    const check = await checkPassword(password);
    const userId = check.user.uid;
    await deleteUserData(userId);
    await deleteUser(check.user);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    return "Failed to delete user account.";
  }
  return "SUCCESS";
};

// Change password
export const changePassword = async (
  password,
  newPassword,
  confirmPassword
) => {
  if (newPassword !== confirmPassword) return "FAILURE";

  try {
    const check = await checkPassword(password);
    await updatePassword(check.user, newPassword);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    return "Failed to update password.";
  }
  return "SUCCESS";
};

// Change email address
export const changeEmailAddress = async (newEmail, password) => {
  try {
    const check = await checkPassword(password);
    await updateEmail(check.user, newEmail);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    return "Failed to update email.";
  }
  return "SUCCESS";
};

// Reauthentication
const checkPassword = async (password) => {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
    const check = await reauthenticateWithCredential(user, credential);
    return check;
  } catch (err) {
    console.log(err);
  }
};

// Delete google user account - no reauthentication
export const deleteGoogleUserAccount = async () => {
  try {
    const user = await auth.currentUser;
    await deleteUser(user);
  } catch (err) {
    console.log(err);
    return "Failed to delete user account.";
  }
  return "SUCCESS";
};
