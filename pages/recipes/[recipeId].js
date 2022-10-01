import React,{ useState } from "react";
import { useRouter } from "next/router";
import {
    ClockIcon,
    HeartIcon as EmptyHeartIcon,
  } from "@heroicons/react/24/outline";
  import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid";
import UserLayout from "../../components/layout/UserLayout";
import { getOneRecipe } from "../../services/database";
import { convertTime } from "../../utils/helpers";

export default function SingleRecipePage({ recipe }) {
  const defaultTags = recipe.defaultTags;
  const userAddedTags = recipe.userAddedTags;
  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;

  const [favourited, setFavourited] = useState(recipe.favourited);

  const handleFavourite = () => {
    setFavourited(!favourited);
  };

  const [serving, setServing] = useState(1);

  return (
    <div className="single-recipe pt-10">
      <div className="flex flex-row justify-between space-x-24">
        <div className="flex w-full flex-col">
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="font-architectsDaughter font-bold text-chestnut tracking-wide text-4xl">
                {recipe.title}
              </h1>
              <button onClick={handleFavourite}>
                {favourited ? (
                  <FullHeartIcon className="text-red-400 flex-shrink-0 h-10 w-10" />
                ) : (
                  <EmptyHeartIcon className="text-chestnut flex-shrink-0 h-10 w-10" />
                )}
              </button>
            </div>
            <div className="flex flex-row justify-between my-6">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col">
                  <p className="text-xs">Prep time</p>
                  {recipe.prepTime} mins
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">Cook time</p>
                  {recipe.cookTime} mins
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">Total time</p>
                  {convertTime(recipe.prepTime + recipe.cookTime)}
                </div>
              </div>
              <button id="editRecipeBtn" className="bg-atomic-tangerine hover:opacity-75 text-white text-sm px-4 rounded-2xl">Edit Recipe</button>
            </div>
            
            <div className="py-2 border-y border-solid border-chestnut">
              <h2 className="text-xs mb-2">Tags</h2>
              <div className="flex flex-row flex-wrap space-x-4 space-y-2 text-sm">
                {defaultTags.map((tag, i) => (
                  <button key={i} className="odd:bg-chrome-yellow even:bg-dirt hover:opacity-75 text-white px-4 py-2 rounded-full">{tag.name}</button>
                ))}
                {userAddedTags.map((tag, i) => (
                  <button key={i} className="odd:bg-chrome-yellow even:bg-dirt hover:opacity-75 text-white px-4 py-2 rounded-full">{tag.name}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-architectsDaughter text-chestnut tracking-wide text-2xl pt-4 pb-2">Ingredients</h2>
            <div className="flex space-x-2 pb-2 align-middle">
              <p className="text-sm">Servings</p>
              <button disabled={serving==1 ? true : false} onClick={() => setServing(serving - 1)}
              className="outline outline-2 outline-black bg-atomic-tangerine disabled:bg-platinum font-nunito rounded-full h-6 w-6 cursor-pointer disabled:cursor-default">-</button>
              <p>{serving}</p>
              <button onClick={() => setServing(serving + 1)} className="outline outline-2 outline-chestnut bg-atomic-tangerine font-nunito rounded-full h-6 w-6 cursor-pointer">+</button>
            </div>
            <div className="font-nunito">
              {ingredients.map((ingredient, i) => (
                <div class="flex items-center">
                  <input id={i} type="checkbox" value="" class="w-4 h-4 bg-gray-100 rounded-full border-chestnut focus:ring-0 focus:ring-offset-0 text-atomic-tangerine"/>
                  <label for={i} class="ml-4 w-full">{ingredient.quantity*serving}{ingredient.unit} {ingredient.item}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-architectsDaughter text-chestnut tracking-wide text-2xl pt-4 pb-2">Instructions</h2>
            <ol style={{ listStyleType: 'decimal' }} className="pl-6">
              {instructions.map((instruction, i) => (
                <li key={i} className="pl-2 font-nunito">{instruction}</li>
              ))}
            </ol>
          </div>

        </div>
        <div className="flex w-full flex-col">
          <div className="aspect-square h-72 flex items-center justify-center overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3 bg-blanched-almond">
            <img src={recipe.coverImage.url} alt="" className="h-full"/>
          </div>
          <div>
            <h2 className="font-architectsDaughter text-chestnut tracking-wide text-2xl pt-4">Gallery</h2>
            {recipe.otherImages.length > 0 && 
              <div className="h-60 w-72 flex items-center justify-center overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3 bg-blanched-almond">
                {recipe.otherImages.map((image, i) => (<img src={image.url} alt="" className="object-contain"/>))}
              </div>
            }
            {recipe.otherImages.length === 0 &&
             <p>You have not uploaded any other images!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

SingleRecipePage.getLayout = (page) => {
    return <UserLayout pageName="Single Recipe">{page}</UserLayout>;
};

export async function getServerSideProps(context) {
    const { recipeId } = context.params;
    const recipe = JSON.parse(JSON.stringify(await getOneRecipe(recipeId)));
    return { props: { recipe } };
  }