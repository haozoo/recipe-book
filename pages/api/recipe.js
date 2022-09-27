// export default function handler(req, res) {
//   if (req.method === "POST") {
//     console.log(req.body);
//     res.status(200).send({ message: "Nice Post :O" });
//     return;
//   }

//   res.status(405).send({ message: "Only POST requests allowed" });
// }

import formidable from "formidable";
import multiparty from "multiparty";
import { addNewRecipeAndImages } from "../../services/database";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new multiparty.Form();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });
  const recipeData = JSON.parse(data.fields.recipeInfo);
  const coverPhotoFile = data.files.recipeCoverPhoto;

  console.log(data);
  await addNewRecipeAndImages(recipeData, coverPhotoFile);
  res.status(200).json({ success: true });
};
