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

/*
// Automatically signout for now
signOut(auth)
  .then(() => {
    console.log("logged out");
    navigate("/");
  })
  .catch((error) => {
    console.log(error);
  });
  */


onAuthStateChanged(auth, (userStatus) => {
  console.log("user status changed:", userStatus)
});

// Delete User Account email + password
export const deleteUserAccount = async () => {
  const password = passwordDetail.value
  try {
    const check = await checkPassword(password)
    await deleteUser(check.user)
    console.log("User account deleted successfully")
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

// Change password
export const changePassword = async () => {
  const password = currentPasswordData.value
  const newPassword = newPasswordData.value
  const confirmPassword = confirmPasswordData.value

  if (newPassword == confirmPassword) {
    try {
      const check = await checkPassword(password)
      await updatePassword(check.user, newPassword)
      console.log("Password changed")
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  } else {
    console.log("Password and confirmation password must match")
  }

}

// Change email
export const changeEmailAddress = async () => {
  const newEmail = newEmailData.value
  const password = passwordData.value;

  try {
    const check = await checkPassword(password)
    await updateEmail(check.user, newEmail)
    console.log("Email Updated")
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
   // displayAuthError(error)
  }

}

// Delete google user account
export const deleteGoogleUserAccount = async () => {
  const user = await auth.currentUser
  await deleteUser(user)
  console.log("Google user account deleted successfully")
}

// Reauthenticate before any modification
const checkPassword = async (password) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, password)
    const check = await reauthenticateWithCredential(user, credential)
    return check
}

/*
const displayAuthError = async (error) => {
  const errorMessage = document.getElementById('emailErrorMessage')

  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    errorMessage.innerHTML = 'Wrong password'
  } else if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
    errorMessage.innerHTML = "Email exists"
  } else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
    errorMessage.innerHTML == "Invalid email address"
  }
}
*/
