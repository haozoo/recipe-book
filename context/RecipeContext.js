import { createContext, useContext, useState } from "react";

import { getAllFilters, getAllRecipes } from "../services/database";

const recipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState([]);

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
      value={{ recipes, filters, getRecipe, getRecipes, getFilters }}
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
