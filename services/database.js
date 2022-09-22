import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import _ from "lodash";

const recipesRef = collection(db, "newRecipes");

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
    const data = JSON.parse(JSON.stringify(snapshot.data()));
    console.log(data.defaultTags);
    console.log(data.userAddedTags);
    data.defaultTags = await Promise.all(data.defaultTags.map(async (tagId) => {
      return await getOneDefaultTag(tagId);
    }));
    data.userAddedTags = await Promise.all(data.userAddedTags.map(async (tagId) => {
      return await getOneUserAddedTag(tagId);
    }));
    return data;
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

const defaultTagsRef = collection(db, "newDefaultTags");
const userAddedTagsRef = collection(db, "newUserAddedTags");

export const addNewUserAddedTag = async (name) => {
  try {
    await addDoc(userAddedTagsRef, {
      name: name,
      // createdBy: user.uid,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
  }
}

export const getOneDefaultTag = async (docId) => {
  const docRef = doc(defaultTagsRef, docId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    return { id: docId, name: data.name, type: data.type };
  } else {
    console.error("No such document!");
  }
}

export const getOneUserAddedTag = async (docId) => {
  const docRef = doc(userAddedTagsRef, docId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    return { id: docId, name: data.name, type: "My Tags" };
  } else {
    console.error("No such document!");
  }
}

const getAllDefaultTags = async () => {
  const defaultQuery = query(
    defaultTagsRef,
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(defaultQuery);
  const tags = snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, name: data.name, type: data.type };
  });
  return tags;
}

const getAllUserAddedTags = async () => {
  const userQuery = query(
    userAddedTagsRef,
    // where("createdBy", "==", user.uid),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(userQuery);
  const tags = snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, name: data.name, type: "My Tags" };
  });
  return tags;
}

export const getAllFilters = async () => {
  const defaultTags = await getAllDefaultTags();
  const userAddedTags = await getAllUserAddedTags();
  // group tags by their type
  const allTags = defaultTags.concat(userAddedTags);
  var filters = _.groupBy(allTags, tag => tag.type);
  filters = Object.keys(filters).map((key) =>
    ({ name: key, options: filters[key] })
  );
  return filters;
}
