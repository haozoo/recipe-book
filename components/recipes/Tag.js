import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useRecipes } from "../../context/RecipeContext";
import { USER_ALL_RECIPE_PATH } from "../../utils/constants";

export default function Tag({
  tag,
  isDefault = false,
  readOnly = true,
  id,
  handleDelete,
}) {
  const { toggleFilter } = useRecipes();

  return (
    <div
      className={`flex items-center mr-2 mb-2 py-1 rounded-md ${
        isDefault ? "bg-sajah" : "bg-yellow-500"
      } ${readOnly ? "px-3" : "pl-3"}`}
    >
      <div className="text-white font-patrick font-extrabold tracking-wider">
        <Link href={USER_ALL_RECIPE_PATH}>
          <a
            onClick={() => {
              toggleFilter(true, tag?.id);
            }}
          >
            {tag.name}
          </a>
        </Link>
      </div>
      {!readOnly && (
        <button
          className="pl-2 pr-1"
          type="button"
          onClick={() => handleDelete(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-white w-5 h-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}
