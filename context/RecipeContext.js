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

  const [activeFilters, setActiveFilters] = useState([]);

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
    if (uid) {
      const newFilters = await getAllFilters(uid);
      const newActiveFilters = newFilters
        .flatMap((obj) => obj.options)
        .map((obj) => ({ ...obj, active: false }));
      setFilters(newFilters);
      setActiveFilters(newActiveFilters);
    }
  };

  const toggleFilter = (isActive, id) => {
    const newFilters = activeFilters.map((filter) => {
      return filter.id !== id ? filter : { ...filter, active: isActive };
    });
    setActiveFilters(newFilters);
  };

  const resetActiveFilters = () => {
    const newActiveFilters = filters
      .flatMap((obj) => obj.options)
      .map((obj) => ({ ...obj, active: false }));
    setActiveFilters(newActiveFilters);
  };

  return (
    <recipeContext.Provider
      value={{
        recipes,
        filters,
        activeFilters,
        deleteRecipe,
        favouriteRecipe,
        getRecipe,
        getRecipes,
        getFilters,
        toggleFilter,
        resetActiveFilters,
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
