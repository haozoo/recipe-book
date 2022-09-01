import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, favouriteRecipe }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 lg:py-0 lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-y-10 gap-x-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 xl:gap-x-20">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              favouriteRecipe={favouriteRecipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
