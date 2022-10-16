import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/layout/UserLayout";
import RecipeList from "../../../components/recipes/RecipeList";
import LoadingIcon from "../../../components/utility/LoadingIcon";
import Notification from "../../../components/utility/Notification";
import { useRecipes } from "../../../context/RecipeContext";
import { useUserAuth } from "../../../context/UserAuthContext";

export default function FavouriteRecipesPage() {
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  const [error, setError] = useState({});
  const [errorNotifIsOpen, setErrorNotifIsOpen] = useState(false);

  const { user } = useUserAuth();
  const { recipes, favouriteRecipe, getRecipes } = useRecipes();

  // 1. Set loading on page mount.
  useEffect(() => {
    setIsLoadingRecipes(true);
  }, []);

  // 2. Wait until user is defined to fetch recipes w/ uid.
  useEffect(
    () => {
      if (user && recipes?.length === 0) {
        getRecipes(user.uid);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  useEffect(
    () => {
      if (recipes?.length !== 0) {
        const favourited = recipes.filter((recipe) => {
          return recipe?.favourited === true;
        });
        setFavouriteRecipes(favourited);
        setIsLoadingRecipes(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipes]
  );

  const handleFavourite = async (rid) => {
    setErrorNotifIsOpen(false);
    const status = await favouriteRecipe(rid);
    if (status !== "SUCCESS") {
      setError({
        title: "Favourite Recipe Failed",
        text: `Unfortunately your recipe could not be favourited at this time, please try again later.`,
        errors: [status],
      });
      setErrorNotifIsOpen(true);
    }
  };

  const handleDelete = async (rid) => {
    setErrorNotifIsOpen(false);
    const status = await deleteRecipe(rid);
    if (status !== "SUCCESS") {
      setError({
        title: "Delete Recipe Failed",
        text: `Unfortunately your recipe could not be deleted at this time, please try again later.`,
        errors: [status],
      });
      setErrorNotifIsOpen(true);
    }
  };

  return (
    <div>
      <Notification
        error={error}
        open={errorNotifIsOpen}
        setOpen={setErrorNotifIsOpen}
      />
      <div className="content-start mt-12 mb-32">
        {isLoadingRecipes || favouriteRecipes?.length === 0 ? (
          <div className="pt-36">
            <LoadingIcon
              message={
                favouriteRecipes?.length === 0
                  ? "You don't have any favourite recipes!"
                  : "Serving up your favourites..."
              }
            />
          </div>
        ) : (
          favouriteRecipes && (
            <RecipeList
              recipes={favouriteRecipes}
              deleteRecipe={handleDelete}
              favouriteRecipe={handleFavourite}
            />
          )
        )}
      </div>
    </div>
  );
}

FavouriteRecipesPage.getLayout = function getLayout(page) {
  return (
    <UserLayout
      activePageTitle="Favourite Recipes"
      activePageHeading="Your favourite recipes"
    >
      {page}
    </UserLayout>
  );
};
