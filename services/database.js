import { addDoc, deleteDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";

// const user = auth.currentUser;
const recipesRef = collection(db, "recipes");

export const addNewRecipe = async (data) => {
  try {
    const docRef = await addDoc(recipesRef, data);
    await updateDoc(docRef, {
      id: docRef.id,
      href: `recipes/${docRef.id}`,
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
    return snapshot.data();
  } else {
    console.error("No such document!");
  }
}

export const getAllRecipes = async () => {
  if (true) {
    const userQuery = query(
      recipesRef,
      // where("createdBy", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(userQuery);
    return snapshot.docs.map((doc) => doc.data());
  } else {
    console.error("No user is signed in!");
  }
}

const defaultTagsRef = collection(db, "oldDefaultTags");

export const getAllDefaultTags = async () => {
  const snapshot = await getDocs(defaultTagsRef);
  return snapshot.docs.map((doc) => doc.data());
}

const userAddedTagsRef = collection(db, "userAddedTags");

export const getAllUserAddedTags = async () => {
  const userQuery = query(
    userAddedTagsRef,
    // where("createdBy", "==", user.uid)
  );
  const snapshot = await getDocs(userQuery);
  return snapshot.docs.map((doc) => doc.data().name);
}

export const addNewTag = async (tag) => {
  try {
    await addDoc(userAddedTagsRef, {
      name: tag,
      // createdBy: user.uid,
    });
  } catch (error) {
    console.error(error);
  }
}

export const deleteRecipe = async (recipeId) => {
  try {
    const recipeRef = doc(db, "recipes", recipeId);
    await deletcDoc(recipeRef);
  } catch (error) {
    console.error(error);
  }
}

export const deleteTag = async (tagId) => {
  try {
    const tagRef = doc(db, "userAddedTags", tagId);
    await deleteDoc(tagRef);
  } catch (error) {
    console.error(error);
  }
}

export const clickHeart = async (recipeId) => {
  try {
    const recipeRef = doc(db, "recipes", recipeId);
    const docSnap = await getDoc(recipeRef)

    await updateDoc(recipeRef, { 
      favourited : !docSnap.data().favourited
    })
  } catch (error) {
    console.error(error)
  }
}
