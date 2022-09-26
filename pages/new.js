import { addNewRecipeAndImages, addNewUserAddedTag } from "../services/database";

export default function AddRecipePage() {

  const handleImagesUpload = async () => {
    var coverImage = document.querySelector("#cover-image").files[0];
    var otherImages = Array.from(document.querySelector("#other-images").files);
    var new_tags = []
    for(var x=1; x <= 3; x++){
      var tag = document.querySelector("#tag" + x).value;
      new_tags.push(tag);
    }
    var data = {
      title: "my new recipe 9/20",
      prepTime: 60, cookTime: 120,
      favourited: true,
      ingredients: [],
      instructions: [],
      tags: new_tags,
    };
    await addNewRecipeAndImages(data, coverImage, otherImages);
    await addNewUserAddedTag(new_tags);
  };

  return (
    <main>
      <div>
        <label for="tag1">Tags : </label>
        <input type="text" id="tag1" name="tag1" />
        <input type="text" id="tag2" name="tag2" />
        <input type="text" id="tag3" name="tag3" />
      </div>
      <label for="cover-image">Cover Image: </label>
      <input type="file" id="cover-image" />
      <br></br>
      <label for="other-images">Other Images: </label>
      <input type="file" id="other-images" multiple="multiple" />
      <br></br>
      <button onClick={handleImagesUpload}>Upload Images</button>
    </main>
  );
}
