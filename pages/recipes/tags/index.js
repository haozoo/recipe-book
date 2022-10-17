import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon, TagIcon } from "@heroicons/react/24/solid";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/layout/UserLayout";
import RecipeList from "../../../components/recipes/RecipeList";
import Tag from "../../../components/recipes/Tag";
import TagModal from "../../../components/utility/TagModal";
import LoadingIcon from "../../../components/utility/LoadingIcon";
import Notification from "../../../components/utility/Notification";
import { useRecipes } from "../../../context/RecipeContext";
import { useUserAuth } from "../../../context/UserAuthContext";
import {
  DIETRY_REQUIREMENTS,
  MEAL_TYPES,
  USER_TAGS,
} from "../../../utils/constants";
import {
  addNewUserAddedTag,
  deleteUserAddedTag,
  updateUserAddedTag,
} from "../../../services/database";
import DeleteModal from "../../../components/utility/DeleteModal";

const TagLine = ({ tag, deleteTag, editTag }) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  return (
    <div>
      <DeleteModal
        type="Tag"
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        handleDelete={() => deleteTag(tag?.id)}
      />
      <TagModal
        type="Update"
        placeholder={tag?.name}
        open={updateModalIsOpen}
        setOpen={setUpdateModalIsOpen}
        handleSubmit={(tagName) => editTag(tag?.id, tagName)}
      />
      <div className="group flex justify-between w-full py-2">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-orange-400"
          >
            <path
              fillRule="evenodd"
              d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <p className="pl-2 text-base font-patrick font-medium tracking-wide text-hazelnut">
            {tag?.name}
          </p>
        </div>
        <div className="hidden space-x-2 pr-1 group-hover:flex items-center">
          <button onClick={() => setUpdateModalIsOpen(true)}>
            <PencilIcon className="text-gray-400 flex-shrink-0 h-4 w-4" />
          </button>
          <button onClick={() => setDeleteModalIsOpen(true)}>
            <TrashIcon className="text-gray-400 flex-shrink-0 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TagPage() {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  const [errorNotifIsOpen, setErrorNotifIsOpen] = useState(false);
  const [error, setError] = useState({});

  const [dietryTags, setDietryTags] = useState([]);
  const [mealTypeTags, setMealTypeTags] = useState([]);
  const [userDefTags, setUserDefTags] = useState([]);

  const { user } = useUserAuth();
  const { filters, getFilters, getRecipes } = useRecipes();

  useEffect(() => {
    setIsLoadingTags(true);
  }, []);

  useEffect(
    () => {
      if (user && dietryTags?.length === 0) {
        getFilters(user.uid);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  useEffect(
    () => {
      if (filters?.length !== 0) {
        console.log(filters);
        setDietryTags(
          filters.find((tagList) => tagList?.name === DIETRY_REQUIREMENTS)
            ?.options
        );
        setMealTypeTags(
          filters.find((tagList) => tagList?.name === MEAL_TYPES)?.options
        );
        setUserDefTags(
          filters.find((tagList) => tagList?.name === USER_TAGS)?.options
        );
        setIsLoadingTags(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  const handleCreateTag = async (tagName) => {
    setErrorNotifIsOpen(false);
    const status = await addNewUserAddedTag(tagName);

    if (status === "DUPLICATE") {
      setError({
        title: "Tag Already Exists",
        text: `Your tag that you tried to create already exists!`,
        errors: [status],
      });
      setErrorNotifIsOpen(true);
    } else if (status !== "SUCCESS") {
      setError({
        title: "Add Tag Failed",
        text: `Unfortunately your tag could not be created at this time, please try again later.`,
        errors: [status],
      });
      setErrorNotifIsOpen(true);
    }
    await getFilters(user.uid);
  };

  const handleDeleteTag = async (tid) => {
    setErrorNotifIsOpen(false);
    const status = await deleteUserAddedTag(tid);
    if (status !== "SUCCESS") {
      setError({
        title: "Delete Tag Failed",
        text: `Unfortunately your tag could not be deleted at this time, please try again later.`,
        errors: [status],
      });
      setErrorNotifIsOpen(true);
    }
    await getFilters(user.uid);
    await getRecipes(user.uid);
  };

  const handleUpdateTag = async (tagId, tagName) => {
    setErrorNotifIsOpen(false);
    const status = await updateUserAddedTag(tagId, tagName);

    if (status !== "SUCCESS") {
      setError({
        title: "Update Tag Failed",
        text: `Unfortunately your tag could not be updated at this time, please try again later.`,
        errors: [status],
      });
      setErrorNotifIsOpen(true);
    }
    await getFilters(user.uid);
  };

  return (
    <div>
      <Notification
        error={error}
        open={errorNotifIsOpen}
        setOpen={setErrorNotifIsOpen}
      />
      <TagModal
        type="Create"
        open={isAddingTag}
        setOpen={setIsAddingTag}
        handleSubmit={handleCreateTag}
      />
      <div className="pt-12 max-w-6xl lg:grid lg:grid-cols-2 lg:gap-x-8 space-y-8 divide-y divide-gray-200 lg:space-y-0 lg:divide-y-0">
        <div className="max-w-lg space-y-8 divide-y divide-gray-200">
          <div className="">
            <div className="divide-y divide-gray-200">
              <div className="flex justify-between">
                <h2 className="text-xl pb-2 font-patrick font-extrabold text-chestnut">
                  Your Tags
                </h2>
                <button
                  className="flex items-center"
                  onClick={() => setIsAddingTag(true)}
                >
                  <PlusIcon className="text-gray-400 flex-shrink-0 h-6 w-6" />
                </button>
              </div>
              {userDefTags?.map((tag, idx) => {
                return (
                  <TagLine
                    key={idx}
                    tag={tag}
                    deleteTag={handleDeleteTag}
                    editTag={handleUpdateTag}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="max-w-lg space-y-8 divide-y divide-gray-200">
          <div className="sm:pt-0 pt-12">
            <h2 className="text-xl font-patrick font-extrabold text-chestnut">
              <p className="inline-block px-2 py-1 mr-3 text-sm text-gray-400 font-bold bg-gray-100 rounded-md">
                Default
              </p>
              Dietary Requirements
            </h2>
            <div className="pt-6 flex flex-wrap">
              {dietryTags?.map((tag, idx) => {
                return (
                  <Tag
                    tag={tag}
                    key={idx}
                    id={idx}
                    readOnly={true}
                    isDefault={true}
                  />
                );
              })}
            </div>
          </div>
          <div className="pt-12">
            <h2 className="text-xl font-patrick font-extrabold text-chestnut">
              <p className="inline-block px-2 py-1 mr-3 text-sm text-gray-400 font-bold bg-gray-100 rounded-md">
                Default
              </p>
              Meal Types
            </h2>
            <div className="pt-6 flex flex-wrap">
              {mealTypeTags?.map((tag, idx) => {
                return (
                  <Tag
                    tag={tag}
                    key={idx}
                    id={idx}
                    readOnly={true}
                    isDefault={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TagPage.getLayout = function getLayout(page) {
  return (
    <UserLayout activePageTitle="Tag Editor" activePageHeading="Your tags">
      {page}
    </UserLayout>
  );
};
