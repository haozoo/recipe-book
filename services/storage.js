import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const storageRef = ref(storage, "recipe-imgs");
const metadata = { contentType: "image/jpeg" };

export const addNewRecipeImage = async (file) => {
  const imageRef = ref(storageRef, file.name);
  const uploadTask = uploadBytesResumable(imageRef, file, metadata);
  uploadTask.on("state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        // https://firebase.google.com/docs/storage/web/handle-errors
        case "storage/unauthorized":
          console.error("No permission to access the object");
          break;
        case "storage/canceled":
          console.error("Upload canceled");
          break;
        default:
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          const imageURL = downloadURL;
          console.log(imageRef);
          console.log(imageURL);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  )
} 