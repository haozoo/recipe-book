import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import _ from "lodash";

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
    const data = snapshot.docs.map((doc) => doc.data());
    const recipes = JSON.parse(JSON.stringify(data));
    return recipes;
  } else {
    console.error("No user is signed in!");
  }
}

const defaultTagsRef = collection(db, "defaultTags");
const userAddedTagsRef = collection(db, "userAddedTags");

export const getAllFilters = async () => {
  // get default tags
  const defaultQuery = query(
    defaultTagsRef,
    orderBy("order", "asc")
  )
  const defaultSnapshot = await getDocs(defaultQuery);
  const defaultData = defaultSnapshot.docs.map((doc) => doc.data());
  const defaultTags = JSON.parse(JSON.stringify(defaultData));

  // get user-added tags
  const userQuery = query(
    userAddedTagsRef,
    // where("createdBy", "==", auth.currentUser.uid),
    orderBy("createdAt", "desc")
  );
  const userSnapsot = await getDocs(userQuery);
  const userData = userSnapsot.docs.map((doc) => doc.data());
  const userTags = JSON.parse(JSON.stringify(userData));

  // group tags by section
  const allTags = defaultTags.concat(userTags);
  const filters = _.groupBy(allTags, tag => tag.section);
  
  return filters;
}

export const addNewTag = async (tagId, tagName) => {
  try {
    await addDoc(userAddedTagsRef, {
      id: `user-added/${tagId}`,
      name: tagName,
      section: "My Tags",
      // createdBy: user.uid,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
  }
}