import {
  ClockIcon,
  EllipsisVerticalIcon,
  HeartIcon as EmptyHeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

import Link from "next/link";
import { convertTime } from "../../utils/helpers";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Router from "next/router";
import { USER_ADD_RECIPE_PATH } from "../../utils/constants";
import DeleteModal from "../utility/DeleteModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RecipeCard({ recipe, deleteRecipe, favouriteRecipe }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  return (
    <div className="group">
      <DeleteModal
        type="Recipe"
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        handleDelete={() => deleteRecipe(recipe?.id)}
      />
      <div className="relative">
        <Link href={"/" + recipe.href}>
          <a>
            <div className="aspect-w-1 aspect-h-1 h-72 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
              <picture>
                <img
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  src={recipe.coverImage.url}
                  alt="Recipe cover photo"
                />
              </picture>
            </div>
          </a>
        </Link>
        <button className="" onClick={() => favouriteRecipe(recipe?.id)}>
          <FullHeartIcon
            className={`absolute top-2 right-2 flex-shrink-0 h-8 w-8 ${
              recipe?.favourited ? "text-red-400" : "text-white"
            }`}
          />
          {!recipe?.favourited && (
            <EmptyHeartIcon className="absolute top-2 right-2 flex-shrink-0 h-8 w-8 text-gray-200" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ClockIcon className="text-chestnut flex-shrink-0 h-4 w-4" />
          <p className="ml-2 font-nunito font-bold text-xs text-chestnut">
            {convertTime(recipe?.prepTime + recipe?.cookTime)}
          </p>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center rounded-full text-gray-700 hover:text-gray-600">
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "w-full bg-gray-100 text-gray-900"
                          : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm font-nunito font-semibold"
                      )}
                      onClick={() =>
                        Router.push(`/${USER_ADD_RECIPE_PATH}/${recipe?.id}`)
                      }
                    >
                      <PencilSquareIcon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "w-full bg-gray-100 text-gray-900"
                          : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm font-nunito font-semibold"
                      )}
                      onClick={() => setDeleteModalIsOpen(true)}
                    >
                      <TrashIcon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="mt-1 font-nunito text-md text-chestnut truncate">
        {recipe?.sample && (
          <p className="inline-block px-2 py-1 mr-3 text-sm text-gray-400 font-bold bg-gray-100 rounded-md">
            Sample
          </p>
        )}
        {recipe?.title}
      </div>
    </div>
  );
}
