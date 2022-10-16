import { deleteObject, getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { storage } from "./firebase";
import { getDoc } from "firebase/firestore";


export const uploadRecipeImage = async (recipeId, image) => {
  const imagePath = `recipe-imgs/${recipeId}-${image.name}`;
  const imageRef = ref(storage, imagePath);
  await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(imageRef);
  return { path: imagePath, url: imageUrl };
} 

export const deleteRecipeImages = async (imagePaths) => {
  try {
    await Promise.all(imagePaths.map(async (imagePath) => {
      // skip over sample recipe images
      if (imagePath.indexOf("sample-recipe-imgs/") !== 0) {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      }
    }));
  } catch (error){
    console.error(error);
    return "Failed to delete image";
  }
  return "SUCCESS";

  
  
}
export const deleteImage = async (recipeRef) => {
  try {
    const recipe = await getDoc(recipeRef);
    const imagePath = recipe.data().coverImage.path;
    
    if (imagePath.indexOf("sample-recipe-imgs/") !== 0) {
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