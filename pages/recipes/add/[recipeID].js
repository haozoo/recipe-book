import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/layout/UserLayout";
import _ from "lodash";
import AddRecipePage from ".";
import { useRecipes } from "../../../context/RecipeContext";
import { useUserAuth } from "../../../context/UserAuthContext";

export default function SingleRecipePage({ recipeID }) {
  const [recipe, setRecipe] = useState({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);

  const { user } = useUserAuth();
  const { recipes, getRecipe, getRecipes } = useRecipes();

  const getRecipeFromContext = async () => {
    const newRecipe = await getRecipe(recipeID);
    setRecipe(newRecipe);
  };

  useEffect(() => {
    setIsLoadingRecipe(true);
  }, []);

  useEffect(
    () => {
      if (!_.isEmpty(user) && recipes?.length === 0) {
        getRecipes(user.uid);
      }
      getRecipeFromContext();
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
      {!_.isEmpty(recipe) && <AddRecipePage recipe={recipe} editing={true} />}
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
