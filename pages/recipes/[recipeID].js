import React, { useEffect, useState } from "react";
import { HeartIcon as EmptyHeartIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as FullHeartIcon,
  MinusSmallIcon,
  PlusSmallIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import UserLayout from "../../components/layout/UserLayout";
import { convertTime } from "../../utils/helpers";
import { useRecipes } from "../../context/RecipeContext";
import { useUserAuth } from "../../context/UserAuthContext";
import _ from "lodash";
import Tag from "../../components/recipes/Tag";
import Router from "next/router";
import { USER_ADD_RECIPE_PATH } from "../../utils/constants";
import Notification from "../../components/utility/Notification";
import LoadingIcon from "../../components/utility/LoadingIcon";

export default function SingleRecipePage({ recipeID }) {
  const [recipe, setRecipe] = useState({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);

  const [serving, setServing] = useState(1);
  const [favourited, setFavourited] = useState(false);

  const [defaultTags, setDefaultTags] = useState([]);
  const [userDefTags, setUserDefTags] = useState([]);

  const [error, setError] = useState({});
  const [errorNotifIsOpen, setErrorNotifIsOpen] = useState(false);

  const [found, setFound] = useState(false);

  const { user } = useUserAuth();
  const { recipes, favouriteRecipe, filters, getRecipe, getRecipes } =
    useRecipes();

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
      setDefaultTags(
        filters
          .flatMap(({ options }) => options)
          .filter((tag) => recipe?.defaultTags.includes(tag.id))
      );
      setUserDefTags(
        filters
          .flatMap(({ options }) => options)
          .filter((tag) => recipe?.userAddedTags.includes(tag.id))
      );
      setIsLoadingRecipe(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

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
    setFavourited(!favourited);
  };

  return (
    <>
      <Notification
        error={error}
        open={errorNotifIsOpen}
        setOpen={setErrorNotifIsOpen}
      />
      {!_.isEmpty(recipe) ? (
        <div className="pt-12 max-w-6xl lg:grid lg:grid-cols-2 lg:gap-x-8 space-y-8 divide-y divide-gray-200 lg:space-y-0 lg:divide-y-0">
          <div className="max-w-lg space-y-8 divide-y divide-gray-200">
            <div className="flex w-full flex-col divide-y">
              <div>
                <div className="flex flex-row items-center justify-between">
                  <h1 className="font-patrick font-bold text-chestnut tracking-wider text-3xl">
                    {recipe?.title}
                  </h1>
                  <button onClick={() => handleFavourite(recipe?.id)}>
                    {favourited ? (
                      <FullHeartIcon className="text-red-400 flex-shrink-0 h-8 w-8" />
                    ) : (
                      <EmptyHeartIcon className="text-gray-300 flex-shrink-0 h-8 w-8" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div className="flex space-x-4 divide-x-2">
                    <div className="flex items-baseline space-x-1">
                      <p className="font-nunito font-bold text-hazelnut">
                        {convertTime(recipe.prepTime)}
                      </p>
                      <p className="input-font">Prep</p>
                    </div>
                    <div className="flex items-baseline space-x-1 pl-4">
                      <p className="font-nunito font-bold text-hazelnut">
                        {convertTime(recipe.cookTime)}
                      </p>
                      <p className="input-font">Cook</p>
                    </div>
                    <div className="flex items-baseline space-x-1 pl-4">
                      <p className="font-nunito font-bold text-hazelnut">
                        {convertTime(recipe.prepTime + recipe.cookTime)}
                      </p>
                      <p className="input-font">Total</p>
                    </div>
                  </div>
                  <button
                    className="bg-atomic-tangerine hover:bg-orange-500 text-white text-base font-patrick font-extrabold tracking-wider px-4 py-1 rounded-lg"
                    onClick={() =>
                      Router.push(`${USER_ADD_RECIPE_PATH}/${recipe?.id}`)
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="pt-4 pb-2">
                <h2 className="text-xl font-patrick font-extrabold text-chestnut">
                  Tags
                </h2>
                {recipe?.allTags?.length !== 0 && (
                  <div className="py-2">
                    <div className="flex flex-row flex-wrap">
                      {defaultTags?.map((tag, idx) => {
                        return (
                          <Tag
                            tag={tag}
                            key={idx}
                            id={idx}
                            readOnly={true}
                            isDefault={true}
                          />
                        );
                      })}
                      {userDefTags?.map((tag, idx) => {
                        return (
                          <Tag tag={tag} key={idx} id={idx} readOnly={true} />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="py-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-patrick font-extrabold text-chestnut pb-2">
                    Ingredients
                  </h2>
                  <div className="flex space-x-2 pb-2 items-center align-middle">
                    <UserIcon className="flex-shrink-0 h-4 w-4 text-gray-500" />
                    <button
                      disabled={serving == 1 ? true : false}
                      onClick={() => setServing(serving - 1)}
                      className="group cursor-pointer disabled:cursor-default"
                    >
                      <MinusSmallIcon className="flex-shrink-0 h-3 w-3 group-disabled:text-gray-400 text-gray-700" />
                    </button>
                    <p className="texl-xl font-patrick font-bold">{serving}</p>
                    <button
                      onClick={() => setServing(serving + 1)}
                      className="cursor-pointer"
                    >
                      <PlusSmallIcon className="flex-shrink-0 h-3 w-3 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="font-nunito text-gray-800">
                  {recipe?.ingredients.map((ingredient, i) => (
                    <div className="flex items-center" key={i}>
                      <input
                        id={i}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 rounded-full border-gray-300 focus:ring-0 focus:ring-offset-0 text-atomic-tangerine"
                      />
                      <label htmlFor={i} className="ml-4 w-full">
                        {ingredient.quantity * serving}
                        {ingredient.unit} {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-8">
                <h2 className="text-xl font-patrick font-extrabold text-chestnut pb-2">
                  Instructions
                </h2>
                <ol style={{ listStyleType: "decimal" }} className="pl-6">
                  {recipe?.instructions.map((instruction, i) => (
                    <li key={i} className="pl-2 font-nunito text-gray-800">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="max-w-lg">
            <picture>
              <img
                src={recipe.coverImage.url}
                alt="Recipe Cover Photo"
                className="aspect-w-3 aspect-h-4 rounded-lg object-cover shadow-lg"
              />
            </picture>
          </div>
        </div>
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
    </>
  );
}

SingleRecipePage.getLayout = (page) => {
  return (
    <UserLayout activePageTitle="Your Recipe" activePageHeading="RE-cipe">
      {page}
    </UserLayout>
  );
};

export async function getServerSideProps(context) {
  const { recipeID } = context.params;
  return { props: { recipeID } };
}
