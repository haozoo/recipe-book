import {
  ClockIcon,
  HeartIcon as EmptyHeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function RecipeList({ recipes }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 lg:py-0 lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-y-10 gap-x-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 xl:gap-x-20">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group">
              <Link href={recipe.href}>
                <a>
                  <div className="aspect-w-1 aspect-h-1 h-72 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                    <img
                      src={recipe.imageSrc}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                </a>
              </Link>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <ClockIcon className="text-chestnut flex-shrink-0 h-4 w-4" />
                  <p className="ml-2 font-nunito font-bold text-xs text-chestnut">
                    {recipe.time}
                  </p>
                </div>
                <button>
                  {recipe.favourited ? (
                    <FullHeartIcon className="text-red-400 flex-shrink-0 h-6 w-6" />
                  ) : (
                    <EmptyHeartIcon className="text-chestnut flex-shrink-0 h-6 w-6" />
                  )}
                </button>
              </div>
              <p className="mt-1 font-nunito text-md text-chestnut">
                {recipe.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
