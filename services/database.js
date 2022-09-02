import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";

// const user = auth.currentUser;
const recipesRef = collection(db, "recipes");

export const addNewRecipe = async (data) => {
  try {
    const docRef = await addDoc(recipesRef, data);
    const docId = docRef.id;
    await updateDoc(docRef, {
      // createdBy: user.uid,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
  }
}

export const getOneRecipe = async (docId) => {
  const docRef = doc(recipesRef, docId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    console.log(docId, ":",snapshot.data());
  } else {
    console.error("No such document!");
  }
}

export const getAllRecipes = async () => {
  if (true) {
    const userQuery = query(recipesRef);
    // where("createdBy", "==", user.uid));
    const snapshot = await getDocs(userQuery);
    snapshot.forEach((doc) => {
      console.log(doc.id, ":", doc.data());
    })
  } else {
    console.error("No user is signed in!");
  }
}
