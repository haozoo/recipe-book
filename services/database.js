import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  arrayRemove,
} from "firebase/firestore";
import { deleteRecipeImages, deleteImage, uploadRecipeImage } from "./storage";
import { auth, db } from "./firebase";
import _ from "lodash";

const recipesRef = collection(db, "newRecipes");

export const addDefaultRecipes = async () => {
  try {
    // get default recipes
    const defaultQuery = query(
      recipesRef,
      where("createdBy", "==", "default"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(defaultQuery);
    const data = snapshot.docs.map((doc) => doc.data());
    const recipes = JSON.parse(JSON.stringify(data));

    // add default recipes for current user
    recipes.forEach(async (recipe) => {
      const recipeRef = doc(recipesRef);
      const recipeId = recipeRef.id;
      recipe.id = recipeId;
      recipe.href = `recipes/${recipeId}`;
      recipe.createdBy = auth.currentUser.uid;
      recipe.createdAt = serverTimestamp();
      await setDoc(recipeRef, recipe);
    });
  } catch (err) {
    console.error(err);
  }
}

export const addNewRecipeAndImages = async (recipeData, coverImage, otherImages) => {
  // generate a new doc ref
  const recipeRef = doc(recipesRef);
  const recipeId = recipeRef.id;
  // set recipe data and images 
  return await updateRecipeAndImages(recipeId, recipeData, coverImage, otherImages);
}

export const editRecipeAndImages = async (recipeId, recipeData, coverImage, otherImages) => {
  // get old recipe data
  const recipeRef = doc(recipesRef, recipeId);
  const snapshot = await getDoc(recipeRef);
  const oldRecipe = JSON.parse(JSON.stringify(snapshot.data()));

  // delete old images from storage
  try {
    const imagePaths = [oldRecipe.coverImage]
      .concat(oldRecipe.otherImages)
      .map(image => image.path);
    await deleteRecipeImages(imagePaths);
  } catch (err) {
    console.log(err);
    return "Failed to delete old images!";
  }
  
  // set recipe data and images 
  return await updateRecipeAndImages(recipeId, recipeData, coverImage, otherImages);
}

export const editRecipe = async (recipeId, recipeData) => {
  try {
    const additionalData = {
      id: recipeId,
      href: `recipes/${recipeId}`,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    };
    const allData = Object.assign({}, recipeData, additionalData);
    const recipeRef = doc(recipesRef, recipeId);
    await setDoc(recipeRef, allData);
  } catch (err) {
    console.log(err);
    return "Failed to upload recipe data";
  }

  return "SUCCESS";
};

const updateRecipeAndImages = async (recipeId, recipeData, coverImage, otherImages) => {
  // step1: upload cover image to storage
  let coverImageData;
  try {
    coverImageData = await uploadRecipeImage(recipeId, coverImage);
  } catch (err) {
    console.log(err);
    return "Failed to upload cover image";
  }

  // step2: upload other images to storage
  let otherImagesData = [];
  try {
    await Promise.all(
      otherImages.map(async (image) => {
        const otherImageData = await uploadRecipeImage(recipeId, image);
        otherImagesData.push(otherImageData);
      })
    );
  } catch (err) {
    // delete uploaded images from storage
    const imagePaths = [coverImageData].concat(otherImagesData)
      .map(image => image.path);
    await deleteRecipeImages(imagePaths);
    console.log(err);
    return "Failed to upload gallery images!";
  }

  // step3: upload recipe data  to firestore
  try {
    const additionalData = {
      id: recipeId,
      href: `recipes/${recipeId}`,
      coverImage: coverImageData,
      otherImages: otherImagesData,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    };
    const allData = Object.assign({}, recipeData, additionalData);
    const recipeRef = doc(recipesRef, recipeId);
    await setDoc(recipeRef, allData);
  } catch (err) {
    // delete uploaded images from storage
    const imagePaths = [coverImageData].concat(otherImagesData)
      .map(image => image.path);
    await deleteRecipeImages(imagePaths);
    console.log(err);
    return "Failed to upload recipe data";
  }

  return "SUCCESS";
}

export const getOneRecipe = async (docId) => {
  const docRef = doc(recipesRef, docId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const data = JSON.parse(JSON.stringify(snapshot.data()));
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

export const getAllRecipes = async (uid) => {
  try {
    const userQuery = query(
      recipesRef,
      where("createdBy", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(userQuery);
    const data = snapshot.docs.map((doc) => doc.data());
    const recipes = JSON.parse(JSON.stringify(data));

    // flatten tags
    const flattenedFilterRecipes = recipes.map((recipe) => {
      const { defaultTags, userAddedTags, ...recipeInfo } = recipe;
      return {
        ...recipeInfo,
        allTags: [].concat(defaultTags).concat(userAddedTags),
      };
    });
    return flattenedFilterRecipes;
  } catch (err) {
    console.error(err);
  }
};

const defaultTagsRef = collection(db, "newDefaultTags");
const userAddedTagsRef = collection(db, "newUserAddedTags");

export const addNewUserAddedTag = async (tagName) => {
  var exists = false;
  const tagQuery = query(
    userAddedTagsRef,
    where("createdBy", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(tagQuery);
  querySnapshot.forEach((doc) => {
    if (doc.data().name == tagName) {
      exists = true;
    }
  });
  if (exists) return "DUPLICATE";
  if (!exists) {
    try {
      await addDoc(userAddedTagsRef, {
        name: tagName,
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
      return "Failed to create tag";
    }
   } 
  return "SUCCESS";
};

export const deleteUserAddedTag = async (tagId) => {
  try {
    const recipeQuery = query(
      recipesRef,
      where("createdBy", "==", auth.currentUser.uid),
      where("userAddedTags", "array-contains", tagId)
    );

    const batch = writeBatch(db);
    const querySnapshot = await getDocs(recipeQuery);
    querySnapshot.forEach(async (recipeDoc) => {
      batch.update(recipeDoc.ref, {
        userAddedTags: arrayRemove(tagId),
      });
    });
    await batch.commit();

    const tagRef = doc(userAddedTagsRef, tagId);
    await deleteDoc(tagRef);
  } catch (err) {
    console.log(err);
    return "Failed to delete tag";
  }
  return "SUCCESS";
};

export const updateUserAddedTag = async (tagId, tagName) => {
  try {
    const tagRef = doc(userAddedTagsRef, tagId);
    await updateDoc(tagRef, {
      name: tagName
    });
  } catch (error) {
    console.error(error);
    return "Failed to update tag"
  }
  return "SUCCESS"
};


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
  const defaultQuery = query(defaultTagsRef, orderBy("order", "asc"));
  const snapshot = await getDocs(defaultQuery);
  const tags = snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, name: data.name, type: data.type };
  });
  return tags;
}

const getAllUserAddedTags = async (uid) => {
  const userQuery = query(
    userAddedTagsRef,
    where("createdBy", "==", uid)
    // orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(userQuery);
  const tags = snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, name: data.name, type: "My Tags" };
  });
  return tags;
}

export const getAllFilters = async (uid) => {
  const defaultTags = await getAllDefaultTags();
  const userAddedTags = await getAllUserAddedTags(uid);
  // group tags by their type
  const allTags = defaultTags.concat(userAddedTags);
  var filters = _.groupBy(allTags, tag => tag.type);
  filters = Object.keys(filters).map((key) =>
    ({ name: key, options: filters[key] })
  );
  return filters;
}

export const deleteRecipe = async (recipeId) => {
  try {
    const recipeRef = doc(db, "newRecipes", recipeId);
    await deleteImage(recipeRef);
    await deleteDoc(recipeRef);
  } catch (error) {
    console.error(error);
    return "Failed to delete recipe";
  }
  return "SUCCESS";
};

export const deleteTag = async (tagId) => {
  try {
    const tagRef = doc(userAddedTagsRef, tagId);
    await deleteDoc(tagRef);
  } catch (error) {
    console.error(error);
  }
};

export const clickHeart = async (recipeId) => {
  try {
    const recipeRef = doc(db, "newRecipes", recipeId);
    const docSnap = await getDoc(recipeRef);
    await updateDoc(recipeRef, {
      favourited: !docSnap.data().favourited,
    });
  } catch (error) {
    console.error(error);
    return "Failed to favourite recipe";
  }
  return "SUCCESS";
};
export const deleteUserData = async (userId) => {
  try {
    const batch = writeBatch(db);
    const myRecipes = query(collection(db, "newRecipes"), where("createdBy", "==", userId));
    const recipesSnap = await getDocs(myRecipes);
    recipesSnap.forEach((doc) => {
      deleteImage(doc.ref);
      batch.delete(doc.ref);
    });
    const myTags = query(collection(db, "newRecipes"), where("createdBy", "==", userId));
    const tagsSnap = await getDocs(myTags);
    tagsSnap.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error(error);
    return "Failed to delete user data";
  }
  return "SUCCESS";
}