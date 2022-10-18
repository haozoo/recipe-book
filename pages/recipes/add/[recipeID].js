import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/layout/UserLayout";
import _ from "lodash";
import AddRecipePage from ".";
import { useRecipes } from "../../../context/RecipeContext";
import { useUserAuth } from "../../../context/UserAuthContext";
import LoadingIcon from "../../../components/utility/LoadingIcon";

export default function SingleRecipePage({ recipeID }) {
  const [recipe, setRecipe] = useState({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);

  const [found, setFound] = useState(false);

  const { user } = useUserAuth();
  const { recipes, getRecipe, getRecipes } = useRecipes();

  const getRecipeFromContext = async () => {
    if (recipes?.length === 0) {
      await getRecipes(user.uid);
    }

    const newRecipe = await getRecipe(recipeID);
    setFound(!newRecipe ? false : true);
    setRecipe(newRecipe);
    setIsLoadingRecipe(false);
  };

  useEffect(() => {
    setIsLoadingRecipe(true);
  }, []);

  useEffect(
    () => {
      if (!_.isEmpty(user)) getRecipeFromContext();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, recipes]
  );

  useEffect(() => {
    if (!_.isEmpty(recipe)) {
      setIsLoadingRecipe(false);
    }
  }, [recipe]);

  return (
    <div>
      {!_.isEmpty(recipe) ? (
        <AddRecipePage recipe={recipe} editing={true} />
      ) : (
        <div className="pt-36">
          <LoadingIcon
            message={
              !isLoadingRecipe && !found
                ? "We can't find your recipe!"
                : "Finding up your recipe..."
            }
          />
        </div>
      )}
    </div>
  );
}

SingleRecipePage.getLayout = (page) => {
  return (
    <UserLayout
      activePageTitle="Edit Recipe"
      activePageHeading="Edit your recipe"
    >
      {page}
    </UserLayout>
  );
};

export async function getServerSideProps(context) {
  const { recipeID } = context.params;
  return { props: { recipeID } };
}
