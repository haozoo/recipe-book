import {
  ClockIcon,
  HeartIcon as EmptyHeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { convertTime } from "../../utils/helpers";

export default function RecipeCard({ recipe, favouriteRecipe }) {
  return (
    <div className="group">
      <div className="relative">
        <Link href={recipe.href}>
          <a>
            <div className="aspect-w-1 aspect-h-1 h-72 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
              <img
                src={recipe.coverImage.url}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
          </a>
        </Link>
        <button
          className="absolute top-2 right-2"
          onClick={() => favouriteRecipe(recipe?.id)}
        >
          <FullHeartIcon
            className={`flex-shrink-0 h-6 w-6 ${
              recipe?.favourited ? "text-red-400" : "text-white"
            }`}
          />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <ClockIcon className="text-chestnut flex-shrink-0 h-4 w-4" />
          <p className="ml-2 font-nunito font-bold text-xs text-chestnut">
            {convertTime(recipe?.prepTime + recipe?.cookTime)}
          </p>
        </div>
      </div>
      <p className="mt-1 font-nunito text-md text-chestnut">{recipe?.title}</p>
    </div>
  );
}
