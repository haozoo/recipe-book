import { useRecipes } from "../context/RecipeContext";

export const checkValidUsername = (oldUsername, username) => {
  if (username?.length < 3) {
    return "Your username must be at least 3 characters long.";
  }
  if (!/^[\w ]*$/.test(username)) {
    return "Your username can only contain letters, numbers and spaces.";
  }
  if (oldUsername === username) {
    return "Your new username must be different.";
  }
  return "";
};

export const checkNewValidUsername = (username) => {
  if (username?.length < 3) {
    return "Your username must be at least 3 characters long.";
  }
  if (!/^[\w ]*$/.test(username)) {
    return "Your username can only contain letters, numbers and spaces.";
  }
  return "";
};

export const checkValidEmail = (oldEmail, email) => {
  if (oldEmail === email) {
    return "Your new email must be different.";
  }
  if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return "Not a valid email!";
  }
  return "";
};

export const checkNewValidEmail = (email) => {
  if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return "Not a valid email!";
  }
  return "";
};

export const checkValidNewPassword = (password) => {
  if (password?.length < 8) {
    return "Your password must be at least 8 characters long.";
  }
  if (!/\p{Lu}/u.test(password)) {
    return "Your password must have an uppercase letter in it.";
  }
  if (!/\d/.test(password)) {
    return "Your password must have a number in it.";
  }
  return "";
};

export const checkValidConfirmPassword = (newPassword, confirmPassword) => {
  if (confirmPassword !== newPassword) {
    return "Your passwords must match";
  }
  return "";
};

export const checkValidTag = (tag) => {
  if (tag?.length < 3) {
    return "Your tag must be at least 3 characters long.";
  }
  if (tag?.length > 15) {
    return "Your tag must be at less than 15 characters long.";
  }
  if (!/^[\w ]*$/.test(tag)) {
    return "Your tag can only contain letters, numbers and spaces.";
  }
  return "";
};

export const checkValidRecipe = (recipe, image, imageurl) => {
  const { title, cookTime, prepTime, ingredients, instructions } = recipe;
  const error = {
    title: "Incomplete Recipe",
    text: "Your recipe is still missing a few things! Before you can upload, you need to fix the following errors:",
    errors: [],
  };

  const addErr = (str) => {
    error.errors.push(str);
  };

  if (title?.length === 0) {
    addErr("Missing recipe title");
  }
  if (title?.length > 100) {
    addErr("Title exceeds 100 characters in length");
  }

  if (prepTime?.length === 0 || cookTime?.length === 0) {
    addErr("Missing preparation/cooking time");
  }
  if (!/^\d*$/.test(prepTime) || !/^\d*$/.test(cookTime)) {
    addErr("Preparation/cook time contains non-numeric characters");
  }
  if (prepTime?.length > 6 || cookTime?.length > 6) {
    addErr("Preparation/cook time exceeds 7 digits in length");
  }

  if (ingredients?.length === 0) {
    addErr("Missing ingredients");
  }
  ingredients.forEach((instruction, idx) => {
    const { quantity, unit, item } = instruction;
    if (quantity?.length === 0) {
      addErr(`Ingredient ${idx}. missing quantity`);
    }
    if (quantity?.length > 5) {
      addErr(`Quantity of ingredient ${idx + 1} exceeds 5 digits in length`);
    }
    if (unit?.length > 5) {
      addErr(`Unit of ingredient ${idx + 1} exceeds 5 characters in length`);
    }
    if (item?.length === 0) {
      addErr(`Ingredient ${idx + 1}. missing name`);
    }
    if (item?.length > 50) {
      addErr(`Name of ingredient ${idx + 1} exceeds 50 characters in length`);
    }
    if (!/^\d*$/.test(quantity)) {
      addErr(
        `Quantity of ingredient ${idx + 1} contains non-numeric characters `
      );
    }
  });

  if (instructions?.length === 0) {
    addErr("Missing instructions");
  }
  instructions.forEach((instruction, idx) => {
    if (instruction?.length > 500) {
      addErr(`Step ${idx + 1}. exceeds 250 characters in length`);
    }
  });

  if (!imageurl && !image) {
    addErr("Missing cover image");
  }
  if (!imageurl && image?.size > 5000000) {
    addErr("Cover image exeeds 10MB");
  }
  if (
    !imageurl &&
    image?.type !== "image/jpeg" &&
    image?.type !== "image/png"
  ) {
    addErr("Cover image file is not in png/jpg format");
  }

  return error.errors.length === 0 ? {} : error;
};
