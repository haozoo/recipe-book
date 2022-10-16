import { createContext, useContext, useState } from "react";

import {
  getAllFilters,
  getAllRecipes,
  deleteRecipe as deleteRecipeFromDB,
  clickHeart as favouriteRecipeInDB,
} from "../services/database";

const recipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState([]);

  const deleteRecipe = async (rid) => {
    if (rid) {
      const status = await deleteRecipeFromDB(rid);

      if (status === "SUCCESS") {
        const newRecipes = recipes.filter((recipe) => recipe?.id !== rid);
        setRecipes(newRecipes);
      }

      return status;
    }
  };

  const favouriteRecipe = async (rid) => {
    if (rid) {
      const status = await favouriteRecipeInDB(rid);

      if (status === "SUCCESS") {
        const newRecipes = recipes.map((recipe) =>
          recipe?.id === rid
            ? { ...recipe, favourited: !recipe?.favourited }
            : recipe
        );
        setRecipes(newRecipes);
      }

      return status;
    }
  };

  const getRecipes = async (uid) => {
    if (uid) {
      const newRecipes = await getAllRecipes(uid);
      setRecipes(newRecipes);
    }
  };

  const getRecipe = async (rid) => {
    const recipe = recipes.find((recipe) => recipe.id === rid);
    return recipe;
  };

  const getFilters = async (uid) => {
    if (filters?.length > 0) return filters;
    if (uid) {
      const newFilters = await getAllFilters(uid);
      setFilters(newFilters);
      return newFilters;
    }
  };

  return (
    <recipeContext.Provider
      value={{
        recipes,
        filters,
        deleteRecipe,
        favouriteRecipe,
        getRecipe,
        getRecipes,
        getFilters,
      }}
    >
      {children}
    </recipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(recipeContext);
  if (context === undefined) {
    throw new Error("useRecipe must be used within a RecipeContextProvider");
  }
  return context;
}
