import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadRecipeImage = async (recipeRef, image) => {
  const imagePath = `recipe-imgs/${recipeRef}-${image.name}`;
  const imageRef = ref(storage, imagePath);
  let upload = await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(imageRef);
  return { path: imagePath, url: imageUrl };
} 

export const deleteRecipeImage = async (imagePath) => {
  const imageRef = ref(storage, imagePath);
  await deleteObject(imageRef);
}

export const deleteImage = async (recipeRef) => {
  try {
    const storage = getStorage();
    const recipe = await getDoc(recipeRef);
    const imagePath = recipe.data().coverImage.path;
    
    if (!imagePath.includes("sample-recipe-imgs/")) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log("Image deleted successfully")
    }

  } catch (error) {
    console.error(error);
    return "Failed to delete image";
  }
  return "SUCCESS";
}