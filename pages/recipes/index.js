import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import UserLayout from "../../components/layout/UserLayout";
import RecipeList from "../../components/recipes/RecipeList";
import { useUserAuth } from "../../context/UserAuthContext";
import LoadingIcon from "../../components/utility/LoadingIcon";
import { useRecipes } from "../../context/RecipeContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FilterCheckbox = ({ option, toggleFilter }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    toggleFilter(checked, option?.id);
  }, [checked]);

  return (
    <div className="flex items-center">
      <input
        className="h-4 w-4 rounded border-chestnut text-dirt focus:ring-dirt"
        id={option?.id}
        name={option?.name}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label className="ml-3 font-nunito text-sm text-chestnut">
        {option?.name}
      </label>
    </div>
  );
};

export default function AllRecipesPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [isLoadingFilters, setIsLoadingFilters] = useState(true);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const { user } = useUserAuth();
  const {
    recipes,
    deleteRecipe,
    favouriteRecipe,
    getRecipes,
    filters,
    getFilters,
  } = useRecipes();

  // 1. Set loading on page mount.
  useEffect(() => {
    setIsLoadingFilters(true);
    setIsLoadingRecipes(true);
  }, []);

  // 2. Wait until user is defined to fetch recipes w/ uid.
  useEffect(() => {
    if (user && recipes?.length === 0) {
      getRecipes(user.uid);
    }
    if (user && filters?.length === 0) {
      getFilters(user.uid);
    }
  }, [user]);

  // 3. Wait until recipes/filters are defined to stop loading.
  useEffect(() => {
    if (filters?.length !== 0) {
      const newFilters = filters
        .flatMap((obj) => obj.options)
        .map((obj) => ({ ...obj, active: false }));
      setActiveFilters(newFilters);
      setIsLoadingFilters(false);
    }
  }, [filters]);

  useEffect(() => {
    if (recipes?.length !== 0) {
      setFilteredRecipes(recipes);
      setIsLoadingRecipes(false);
    }
  }, [recipes]);

  useEffect(() => {
    const activeTags = activeFilters.reduce(
      (arr, obj) => (obj?.active ? [...arr, obj?.id] : arr),
      []
    );

    if (activeTags.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const newRecipes = recipes.filter((recipe) => {
        return (
          recipe?.allTags.filter((tagId) => activeTags.includes(tagId))
            ?.length !== 0
        );
      });
      setFilteredRecipes(newRecipes);
    }
  }, [activeFilters]);

  const handleToggleFilter = (isActive, id) => {
    const newFilters = activeFilters.map((filter) => {
      return filter.id !== id ? filter : { ...filter, active: isActive };
    });

    setActiveFilters(newFilters);
  };

  return (
    <>
      <div className="relative">
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white pt-8 pb-6 shadow-xl">
                  <div className="flex items-top justify-between px-4">
                    <div className="flex-col">
                      <h2 className="text-lg font-lora font-semibold text-chestnut">
                        Filter Recipes
                      </h2>
                      <p className="w-5/6 pt-2 font-nunito text-pale-silver text-sm">
                        Check multiple boxes below to narrow recipe search
                        results.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-top justify-center px-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4">
                    {filters?.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="border-t border-gray-200 pt-4 pb-4"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                <span className="text-md font-lora font-medium text-chestnut">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                              <div className="space-y-6">
                                {section.options.map((option) => (
                                  <FilterCheckbox
                                    key={option?.id}
                                    option={option}
                                    toggleFilter={handleToggleFilter}
                                  />
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto">
          <div className="pt-12 lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
            <aside className="max-w-xs">
              {isLoadingFilters ? (
                <div className="animate-pulse py-2 px-3 rounded-md bg-platinum bg-opacity-40 inline-flex items-center lg:hidden">
                  <div className="text-base font-patrick font-bold text-gray-400">
                    Cooking up your tags...
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="py-2 px-3 rounded-md bg-platinum bg-opacity-40 inline-flex items-center lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-lora font-bold text-chestnut">
                    Filters Recipes
                  </span>
                  <PlusIcon
                    className="ml-1 h-5 w-5 flex-shrink-0 text-chestnut"
                    aria-hidden="true"
                  />
                </button>
              )}

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-platinum">
                  <div>
                    <div className="flex justify-between">
                      <h2 className="text-lg font-lora font-semibold text-chestnut">
                        Filter Recipes
                      </h2>
                      <div className="flex flex-col justify-center">
                        <AdjustmentsVerticalIcon className="text-platinum flex-shrink-0 h-5 w-5" />
                      </div>
                    </div>
                    <p className="w-5/6 pt-2 font-nunito text-pale-silver text-sm">
                      Check multiple boxes below to narrow recipe search
                      results.
                    </p>
                  </div>
                  {isLoadingFilters ? (
                    <div className="animate-pulse pt-8 text-base text-gray-400 font-patrick font-medium tracking-wider">
                      Cooking up your tags...
                    </div>
                  ) : (
                    <div>
                      {filters?.map((section, sectionIdx) => (
                        <div key={section.name} className="pt-10">
                          <fieldset>
                            <legend className="block text-md font-lora font-medium text-chestnut">
                              {section.name}
                            </legend>
                            <div className="space-y-3 pt-4">
                              {section.options.map((option) => (
                                <FilterCheckbox
                                  key={option?.id}
                                  option={option}
                                  toggleFilter={handleToggleFilter}
                                />
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className="lg:col-span-3 xl:col-span-4 mb-32">
              {isLoadingRecipes ? (
                <div className="pt-36">
                  <LoadingIcon message="Serving up recipes..." />
                </div>
              ) : (
                filteredRecipes && (
                  <RecipeList
                    recipes={filteredRecipes}
                    deleteRecipe={deleteRecipe}
                    favouriteRecipe={favouriteRecipe}
                  />
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

AllRecipesPage.getLayout = (page) => {
  return <UserLayout activePageTitle="Your recipes">{page}</UserLayout>;
};
