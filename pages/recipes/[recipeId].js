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
  const tags = recipe.tags;
  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;

    return (
      <div className="single-recipe pt-10">
        <div className="flex flex-row justify-between space-x-24">
          <div className="flex w-full flex-col">
            <div>
              <h1 className="font-architectsDaughter font-bold text-chestnut tracking-wide text-4xl">
                {recipe.title}
              </h1>
              <div className="flex flex-row my-6 space-x-4">
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
              
              <div className="py-2 border-y border-solid border-chestnut">
                <p className="text-xs mb-2">Tags</p>
                <div className="flex flex-row space-x-4 text-sm">
                  {tags.map((tag, i) => (
                    <button key={i} className="odd:bg-chrome-yellow even:bg-dirt hover:bg-yellow text-white px-4 py-2 rounded-full">{tag}</button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="font-architectsDaughter text-chestnut tracking-wide text-2xl pt-4">Ingredients</p>
              <ol style={{ listStyleType: 'disc' }}>
                {ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-architectsDaughter text-chestnut tracking-wide text-2xl pt-4">Instructions</p>
              <ol style={{ listStyleType: 'decimal' }}>
                {instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>

          </div>
          <div className="flex w-full flex-col">
            <div className="aspect-square h-72 flex items-center justify-center overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3 bg-blanched-almond">
              <img src={recipe.imageSrc[0]} alt="" className="h-full"/>
            </div>
            <div>
              <p className="font-architectsDaughter text-chestnut tracking-wide text-2xl pt-4">Gallery</p>
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
    console.log(context.params)
    const { recipeId } = context.params;
    const recipe = JSON.parse(JSON.stringify(await getOneRecipe(recipeId)));
    return { props: { recipe } };
  }