import React from "react";
import UserLayout from "../../../components/layout/UserLayout";

export default function AddRecipePage() {
  return (
    <main mx-auto>
      <form className="">
        {/* <div className="flex pb-4">
          <h3 className="text-xl text-chestnut font-lora font-bold traking-wide">
            New Recipe
          </h3>

          <div className="flex flex-1 justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-chrome-yellow py-1 px-4 text-sm font-bold text-white hover:bg-dirt"
            >
              Save
            </button>
          </div>
        </div> */}

        <div className="pt-12 max-w-6xl lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="max-w-lg space-y-8 divide-y divide-gray-200">
            <div className="space-y-8">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
                Recipe Info
              </h2>
              <div className="mb-8 sm:mb-0 relative rounded-md border border-gray-300 px-5 py-4 focus-within:border-dirt focus-within:ring-1 focus-within:ring-dirt">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 -mt-px inline-block bg-white px-1 text-md font-patrick font-extrabold text-chestnut"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full border-0 p-0 text-xl text-chestnut font-patrick font-medium tracking-wider placeholder-gray-400 focus:ring-0"
                  placeholder="My yummy cookies!"
                />
              </div>
              <span className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-4">
                <div className="relative rounded-md border border-gray-300 px-5 py-2 focus-within:border-dirt focus-within:ring-1 focus-within:ring-dirt">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 -mt-px inline-block bg-white px-1 text-md font-patrick font-extrabold text-chestnut"
                  >
                    Prep. Time
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-lg text-chestnut font-patrick font-medium tracking-wider placeholder-gray-400 focus:ring-0"
                    placeholder="10 mins"
                  />
                </div>
                <div className="relative rounded-md border border-gray-300 px-5 py-2 focus-within:border-dirt focus-within:ring-1 focus-within:ring-dirt">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 -mt-px inline-block bg-white px-1 text-md font-patrick font-extrabold text-chestnut"
                  >
                    Cooking Time
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-lg text-chestnut font-patrick font-medium tracking-wider placeholder-gray-400 focus:ring-0"
                    placeholder="20 mins"
                  />
                </div>
              </span>
            </div>
            <div className="pt-8">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
                Tags
              </h2>
            </div>
            <div className="pt-8">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
                Ingredients
              </h2>
            </div>
            <div className="pt-8">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
                Instructions
              </h2>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-32 pb-36">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

AddRecipePage.getLayout = function getLayout(page) {
  return <UserLayout pageName="Add a new recipe">{page}</UserLayout>;
};
