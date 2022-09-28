import { addDoc, deleteDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { deleteRecipeImage, uploadRecipeImage} from "./storage";
import { auth, db } from "./firebase";
import _ from "lodash";

const recipesRef = collection(db, "newRecipes");

export const addNewRecipeAndImages = async (recipeData, coverImage, otherImages) => {
  // step1: generate a new doc ref
  const recipeRef = doc(recipesRef);
  const recipeId = recipeRef.id;

  // step2: upload cover image to storage
  let coverImageData;
  try {
    coverImageData = await uploadRecipeImage(recipeId, coverImage);
  } catch (error) {
    alert("cover image upload failed!");
    console.error(error);
    return;
  }

  // step3: upload other images to storage
  let otherImagesData = [];
  try {
    await Promise.all(otherImages.map(async (image) => {
      const otherImageData = await uploadRecipeImage(recipeId, image);
      otherImagesData.push(otherImageData);
    }));
    alert("all image uploaded!");
  } catch (error) {
    // delete uploaded images from storage
    const uploadedImages = [coverImageData].concat(otherImagesData);
    await deleteUploadedImages(uploadedImages);
    alert("other image upload failed!");
    console.error(error);
    return;
  }
  
  try {
    // step4: combine recipe data with additional data
    const additionalData = {
      id: recipeId,
      href: `recipes/${recipeId}`,
      coverImage: coverImageData,
      otherImages: otherImagesData,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp()
    };
    const allData = Object.assign({}, recipeData, additionalData);
    // step5: add data to the doc
    await setDoc(recipeRef, allData);
    alert("recipe uploaded!");
  } catch (error) {
    // delete uploaded images from storage
    const uploadedImages = [coverImageData].concat(otherImagesData);
    await deleteUploadedImages(uploadedImages);
    alert("recipe upload failed!");
    console.error(error);
    return;
  }
}

const deleteUploadedImages = async (images) => {
  await Promise.all(images.map(async (imageData) => {
    await deleteRecipeImage(imageData.path);
  }));
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

export const getAllRecipes = async (uid) => {
  try {
    const userQuery = query(
      recipesRef,
      where("createdBy", "==", auth.currentUser.uid)
      // orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(userQuery);
    const data = snapshot.docs.map((doc) => doc.data());
    const recipes = JSON.parse(JSON.stringify(data));
    return recipes;
  } catch (err) {
    console.error(err);
  }
};

const defaultTagsRef = collection(db, "newDefaultTags");
const userAddedTagsRef = collection(db, "newUserAddedTags");

export const addNewUserAddedTag = async (tagsName) => {
  for(var tagname in tagsName){
    var exists = false;
    const querySnapshot = await getDocs(userAddedTagsRef);
    querySnapshot.forEach((doc) => {
      if(doc.data().name == tagsName[tagname]){
        exists = true;
      }
    });
    if(!exists){
      try {
        await addDoc(userAddedTagsRef, {
         name: tagsName[tagname],
         createdBy: auth.currentUser.uid,
         createdAt: serverTimestamp()
       });
     } catch (error) {
        console.error(error);
     }
   } 
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
  const defaultQuery = query(defaultTagsRef, orderBy("order", "asc"));
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
