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
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-24">
            <div>
              <h1 className="font-architectsDaughter font-bold text-chestnut tracking-wide text-4xl">
                {recipe.title}
              </h1>
              <div className="flex flex-row my-6 space-x-4">
                <div className="flex flex-col">
                  <p>Prep time</p>
                  {recipe.prepTime} mins
                </div>
                <div className="flex flex-col">
                  <p>Cook time</p>
                  {recipe.cookTime} mins
                </div>
                <div className="flex flex-col">
                  <p>Total time</p>
                  {convertTime(recipe.prepTime + recipe.cookTime)}
                </div>
              </div>
              
              <div className="border-y border-solid border-chestnut">
                <p className="pt-2">Tags</p>
                <ul style={{ listStyleType: 'disc' }}>
                  {tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="aspect-[4/3] h-72 flex items-center justify-center overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3 bg-blanched-almond">
              <img src={recipe.imageSrc[0]} alt="" className="h-full"/>
            </div>
          </div>
          <div>
            <div>
              <p className="font-architectsDaughter text-chestnut tracking-wide text-2xl">Ingredients:</p>
              <ol style={{ listStyleType: 'disc' }}>
                {ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-architectsDaughter text-chestnut tracking-wide text-2xl">Instructions:</p>
              <ol style={{ listStyleType: 'decimal' }}>
                {instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
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