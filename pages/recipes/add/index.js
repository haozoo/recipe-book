import { PencilIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useRef, useState } from 'react';
import UserLayout from '../../../components/layout/UserLayout';
import { addNewRecipeAndImages } from "../../../services/database";
import { Combobox } from "@headlessui/react";
import Tag from "../../../components/recipes/Tag";
import { useRecipes } from "../../../context/RecipeContext";
import { useUserAuth } from "../../../context/UserAuthContext";
import { checkValidRecipe } from "../../../utils/constraints";
import FormErrorModal from "../../../components/utility/FormErrorModal";
import _ from "lodash";
import FormSuccessModal from "../../../components/utility/FormSuccessModal";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const SectionTitle = ({
  title,
  isEditing = undefined,
  handleEdit = undefined,
}) => {
  return (
    <div className="pb-4 flex justify-between">
      <h2 className="text-xl font-patrick font-extrabold text-chestnut">
        {title}
      </h2>
      {handleEdit && (
        <button
          className="flex flex-col justify-center"
          type="button"
          onClick={handleEdit}
        >
          {isEditing ? (
            <XCircleIcon className="text-gray-400 flex-shrink-0 h-4 w-4" />
          ) : (
            <PencilIcon className="text-gray-400 flex-shrink-0 h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
};

const IndentedTextInput = ({
  label,
  type = "text",
  placeholder,
  value,
  handleEdit,
}) => {
  return (
    <div className="relative rounded-md border border-gray-300 px-4 py-1 input-focus">
      <label
        className="absolute -top-3 left-1 -mt-px inline-block bg-white px-1 text-sm font-patrick font-extrabold text-chestnut"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        className="block w-full border-0 p-0 input-font focus:ring-0 appearance-none"
        type={type}
        value={value}
        onChange={(e) => handleEdit(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

const TagComboBox = ({ allTags, selectedTags, handleSelect }) => {
  const [tagQuery, setTagQuery] = useState("");

  const filteredTags =
    tagQuery === ""
      ? allTags
      : allTags.filter((tag) => {
          return tag.name.toLowerCase().includes(tagQuery.toLowerCase());
        });

  return (
    <Combobox
      className="h-8 rounded-md border border-gray-200 bg-gray-100 focus-within:bg-white focus-within:border-rajah focus-within:ring-1 focus-within:ring-rajah"
      as="div"
      value={selectedTags}
      onChange={handleSelect}
      multiple
    >
      <div className="relative py-1">
        <Combobox.Input
          className="block w-28 border-0 px-4 py-0 bg-transparent input-font focus:ring-0"
          onChange={(e) => setTagQuery(e.target.value)}
          placeholder="Add a tag!"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredTags && filteredTags.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-300  py-1 text-sm shadow-lg">
            {filteredTags.map((tag) => (
              <Combobox.Option
                key={tag.id}
                value={tag}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-1 pl-3 pr-9",
                    active ? "bg-orange-100 text-hazelnut" : "text-hazelnut"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate font-patrick font-medium tracking-wider",
                        selected && "font-semibold"
                      )}
                    >
                      {tag.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-2",
                          active ? "text-rajah" : "text-sajah"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

const Instruction = ({
  instruction,
  id,
  isEditing,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="flex w-full">
      <div className="pt-1 pl-2 w-5 text-chestnut flex items-center justify-center font-patrick font-bold">
        {isEditing ? (
          <DeleteButton onDelete={() => handleDelete(id)} />
        ) : (
          `${id + 1}.`
        )}
      </div>
      <div className="mt-1 w-full flex">
        <input
          className={`block w-full min-w-0 rounded-md px-2 py-1 ml-3 input-font input-focus ${
            isEditing ? "border-1 border-gray-300" : "border-0"
          }`}
          type="text"
          id={id}
          value={instruction.text}
          disabled={!isEditing}
          onChange={handleEdit(id)}
          placeholder={"You missed a step!"}
        />
      </div>
    </div>
  );
};

const Ingredient = ({
  ingredient,
  id,
  isEditing,
  handleEditName,
  handleEditUnit,
  handleEditQuantity,
  handleDelete,
}) => {
  return (
    <div className="flex w-full">
      <div className="pl-2 w-5 flex items-center justify-center text-hazelnut text-3xl font-patrick font-bold">
        {isEditing ? <DeleteButton onDelete={() => handleDelete(id)} /> : "•"}
      </div>

      <div className="w-full pl-2 mt-1 flex rounded-md">
        {isEditing ? (
          <>
            <input
              className="block w-20 min-w-0 rounded-none rounded-l-md px-3 py-1 input-font border-1 border-r-transparent border-gray-300 input-focus"
              type="text"
              id="ingredient-quantity"
              value={ingredient.quantity}
              placeholder="500"
              onChange={handleEditQuantity(id)}
            />
            <input
              className="block w-16 min-w-0 rounded-none px-3 py-1 input-font border-1 border-gray-300 input-focus"
              type="text"
              id="ingredient-quantity"
              value={ingredient?.unit}
              placeholder="ml"
              onChange={handleEditUnit(id)}
            />
            <input
              className="block w-full min-w-0 rounded-none rounded-r-md border border-l-transparent px-3 py-1 input-font border-1 border-gray-300 input-focus"
              type="text"
              id="ingredient-name"
              value={ingredient.item}
              placeholder="Condensed Milk"
              onChange={handleEditName(id)}
            />
          </>
        ) : (
          <>
            <span className="flex items-center pl-1 input-font">
              {`${ingredient.quantity}${ingredient.unit}`}
            </span>
            <span className="flex items-center pl-2 input-font">
              {ingredient.item}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const AddButton = ({ handleAdd }) => {
  return (
    <button
      className="pt-1 pl-2 w-5 text-gray-400 flex items-center justify-center font-patrick font-bold"
      type="button"
      onClick={handleAdd}
    >
      <svg
        className="text-gray-400 flex-shrink-0 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
      </svg>
    </button>
  );
};

const DeleteButton = ({ onDelete }) => {
  return (
    <button type="button" onClick={onDelete}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-red-500 flex-shrink-0 h-5 w-5"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  );
};

export default function AddRecipePage({ recipe = {} }) {
  const [title, setTitle] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [favourited, setFavourited] = useState(false);

  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEditingSelectedTags, setIsEditingSelectedTags] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientUnit, setNewIngredientUnit] = useState("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
  const [isEditingIngredients, setIsEditingIngredients] = useState(false);

  const [coverPhotoFile, setCoverPhotoFile] = useState();

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const { user } = useUserAuth();
  const { filters, getFilters, getRecipes } = useRecipes();

  const addIngredientRef = useRef(null);

  // 1. Set loading on page mount.
  useEffect(() => {
    setIsLoadingTags(true);
    if (!_.isEmpty(recipe)) {
      setTitle(recipe?.title);
      setPrepTime(recipe?.prepTime);
      setCookTime(recipe?.cookTime);
      setFavourited(recipe?.favourited);
      // setSelectedTags(recipe?.allTags);
      setInstructions(
        recipe?.instructions.map((instruction) => {
          return {
            text: instruction,
          };
        })
      );
      setIngredients(recipe?.ingredients);
      // setCoverPhotoFile(undefined);
    }
  }, []);

  // 2. Wait until user is defined to fetch recipes w/ uid.
  useEffect(() => {
    if (user && allTags?.length === 0) {
      getFilters(user.uid);
    }
  }, [user]);

  // 3. Wait until recipes/filters are defined to stop loading.
  useEffect(() => {
    if (filters?.length !== 0) {
      const flattenedTags = filters.flatMap(({ options }) => options);
      setAllTags(flattenedTags);
      setIsLoadingTags(false);
    }
  }, [filters]);

  const handleDeleteSelectedTag = (id) => {
    setSelectedTags(selectedTags.filter((i, idx) => id !== idx));
  };

  const handleEditInstruction = (id) => (e) => {
    const newInstructions = instructions.map((instruction, idx) => {
      return id !== idx
        ? instruction
        : { ...instruction, text: e.target.value };
    });
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    if (newInstruction && newInstruction !== "") {
      setInstructions(instructions.concat([{ text: newInstruction }]));
      setNewInstruction("");
    }
  };

  const handleDeleteInstruction = (id) => {
    setInstructions(instructions.filter((i, idx) => id !== idx));
  };

  const handleEditIngredientName = (id) => (e) => {
    const newIngredients = ingredients.map((ingredient, idx) => {
      return id !== idx ? ingredient : { ...ingredient, item: e.target.value };
    });
    setIngredients(newIngredients);
  };

  const handleEditIngredientUnit = (id) => (e) => {
    const newIngredients = ingredients.map((ingredient, idx) => {
      return id !== idx ? ingredient : { ...ingredient, unit: e.target.value };
    });
    setIngredients(newIngredients);
  };

  const handleEditIngredientQuantity = (id) => (e) => {
    const newIngredients = ingredients.map((ingredient, idx) => {
      return id !== idx
        ? ingredient
        : { ...ingredient, quantity: e.target.value };
    });
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    if (
      newIngredientName &&
      newIngredientName !== "" &&
      newIngredientQuantity &&
      newIngredientQuantity !== ""
    ) {
      setIngredients(
        ingredients.concat([
          {
            item: newIngredientName,
            unit: newIngredientUnit,
            quantity: newIngredientQuantity,
          },
        ])
      );
      setNewIngredientName("");
      setNewIngredientUnit("");
      setNewIngredientQuantity("");

      addIngredientRef.current.focus();
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((i, idx) => id !== idx));
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    setIsUploading(true);

    const defaultTags = selectedTags
      .filter((t) => t.type !== "My Tags")
      .map((t) => t.id);
    const userAddedTags = selectedTags
      .filter((t) => t.type === "My Tags")
      .map((t) => t.id);

    const rawRecipeData = {
      title,
      cookTime,
      prepTime,
      ingredients,
      instructions: instructions.map((instruction) => instruction.text),
      defaultTags,
      userAddedTags,
      favourited,
    };

    const newError = checkValidRecipe(rawRecipeData, coverPhotoFile);

    if (!_.isEmpty(newError)) {
      setError(newError);
      setErrorModalIsOpen(true);
    } else {
      const parsedRecipeData = {
        ...rawRecipeData,
        cookTime: parseInt(cookTime),
        prepTime: parseInt(prepTime),
        ingredients: ingredients.map((ingr) => {
          return { ...ingr, quantity: parseInt(ingr.quantity) };
        }),
      };

      const status = await addNewRecipeAndImages(
        parsedRecipeData,
        coverPhotoFile,
        []
      );

      if (status === "SUCCESS") {
        setSuccessModalIsOpen(true);
        resetForm();
        getRecipes(user?.uid);
      } else {
        setError({
          title: "Recipe Upload Failed!",
          text: "Unfortunately recipe could not be uploaded at this time, please try again later.",
          errors: [status],
        });
        setErrorModalIsOpen(true);
      }
    }

    setIsUploading(false);
  };

  const resetForm = () => {
    setTitle("");

    setPrepTime("");
    setCookTime("");

    setAllTags([]);
    setSelectedTags([]);
    setIsEditingSelectedTags(false);

    setInstructions([]);
    setNewInstruction("");
    setIsEditingInstructions(false);

    setIngredients([]);
    setNewIngredientName("");
    setNewIngredientUnit("");
    setNewIngredientQuantity("");
    setIsEditingIngredients(false);

    setCoverPhotoFile(undefined);

    setError({});
  };

  return (
    <main className="mx-auto">
      <FormSuccessModal
        open={successModalIsOpen}
        setOpen={setSuccessModalIsOpen}
      />
      <FormErrorModal
        error={error}
        open={errorModalIsOpen}
        setOpen={setErrorModalIsOpen}
      />
      <form className="" autoComplete="off">
        <div className="pt-12 max-w-6xl lg:grid lg:grid-cols-2 lg:gap-x-8 space-y-8 divide-y divide-gray-200 lg:space-y-0 lg:divide-y-0">
          <div className="max-w-lg space-y-8 divide-y divide-gray-200">
            <div className="">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut">
                Recipe Info
              </h2>
              <div className="space-y-6 pt-6 grid grid-cols-2 gap-x-4 sm:space-y-0 sm:grid-cols-3">
                <div className="col-span-2 sm:col-span-3 sm:pb-6">
                  <IndentedTextInput
                    label="Title"
                    placeholder="Yummy Cookies!"
                    value={title}
                    handleEdit={setTitle}
                  />
                </div>
                <IndentedTextInput
                  label="Prep. Time"
                  placeholder="10 mins"
                  value={prepTime}
                  handleEdit={setPrepTime}
                />
                <IndentedTextInput
                  label="Cooking Time"
                  placeholder="5 mins"
                  value={cookTime}
                  handleEdit={setCookTime}
                />
              </div>
            </div>
            <div className="pt-12">
              <SectionTitle
                title={"Tags"}
                isEditing={isEditingSelectedTags}
                handleEdit={() =>
                  setIsEditingSelectedTags(!isEditingSelectedTags)
                }
              />
              {isLoadingTags ? (
                <div className="animate-pulse text-base text-gray-400 font-patrick font-medium tracking-wider">
                  Cooking up your tags...
                </div>
              ) : (
                <div className="flex flex-wrap">
                  {selectedTags.map((tag, idx) => {
                    return (
                      <Tag
                        tag={tag}
                        key={idx}
                        id={idx}
                        readOnly={!isEditingSelectedTags}
                        handleDelete={handleDeleteSelectedTag}
                      />
                    );
                  })}
                  {!isEditingSelectedTags && (
                    <TagComboBox
                      allTags={allTags}
                      selectedTags={selectedTags}
                      handleSelect={setSelectedTags}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="pt-12">
              <SectionTitle
                title="Ingredients"
                isEditing={isEditingIngredients}
                handleEdit={() =>
                  setIsEditingIngredients(!isEditingIngredients)
                }
              />
              <div className="">
                {ingredients.map((ingredient, idx) => {
                  return (
                    <Ingredient
                      key={idx}
                      id={idx}
                      ingredient={ingredient}
                      isEditing={isEditingIngredients}
                      handleEditName={handleEditIngredientName}
                      handleEditUnit={handleEditIngredientUnit}
                      handleEditQuantity={handleEditIngredientQuantity}
                      handleDelete={handleDeleteIngredient}
                    />
                  );
                })}
                {!isEditingIngredients && (
                  <div className="flex w-full">
                    <AddButton handleAdd={handleAddIngredient} />
                    <div className="w-full pl-2 mt-1 flex rounded-md">
                      <input
                        ref={addIngredientRef}
                        className="block w-20 min-w-0 rounded-none rounded-l-md border border-r-transparent border-gray-300 px-3 py-1 input-font input-focus focus:border-1"
                        type="text"
                        id="ingredient-quantity"
                        value={newIngredientQuantity}
                        placeholder="500"
                        onChange={(e) =>
                          setNewIngredientQuantity(e.target.value)
                        }
                      />
                      <input
                        className="block w-16 min-w-0 rounded-none border border-gray-300 px-3 py-1 input-font input-focus"
                        type="text"
                        id="ingredient-quantity"
                        value={newIngredientUnit}
                        placeholder="ml"
                        onChange={(e) => setNewIngredientUnit(e.target.value)}
                      />
                      <input
                        className="block w-full min-w-0 rounded-none rounded-r-md border border-l-transparent border-gray-300 px-3 py-1 input-font input-focus focus:border-l-1"
                        type="text"
                        id="ingredient-name"
                        value={newIngredientName}
                        placeholder="Condensed Milk"
                        onChange={(e) => setNewIngredientName(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddIngredient()
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-12">
              <SectionTitle
                title="Instructions"
                isEditing={isEditingInstructions}
                handleEdit={() =>
                  setIsEditingInstructions(!isEditingInstructions)
                }
              />
              <div>
                {instructions.map((instruction, idx) => {
                  return (
                    <Instruction
                      key={idx}
                      id={idx}
                      instruction={instruction}
                      isEditing={isEditingInstructions}
                      handleEdit={handleEditInstruction}
                      handleDelete={handleDeleteInstruction}
                    />
                  );
                })}
                {!isEditingInstructions && (
                  <div className="flex w-full">
                    <div className="mt-1 w-full flex rounded-md">
                      <AddButton handleAdd={handleAddInstruction} />
                      <input
                        className="block w-full min-w-0 rounded-md border-1 border-gray-300 px-2 py-1 ml-3 input-font input-focus"
                        type="text"
                        id="instruction-input"
                        value={newInstruction}
                        onChange={(e) => setNewInstruction(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddInstruction()
                        }
                        placeholder={
                          instructions.length === 0
                            ? "What's the first step?"
                            : "What's next?"
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="max-w-lg border-0 border-t-1 border-gray-200 lg:col-span-1">
            <div className="pt-12 lg:pt-0">
              <SectionTitle title="Images" />
              {coverPhotoFile ? (
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="rounded-lg object-cover shadow-lg"
                    src={URL.createObjectURL(coverPhotoFile)}
                    alt="Your cover photo."
                  />
                </div>
              ) : (
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
                    <div className="flex flex-col sm:flex-row text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600"
                      >
                        <span>Upload a cover image</span>
                        <input
                          className="sr-only"
                          accept="image/jpeg, image/png"
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={handleCoverChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 w-full lg:w-1/2">
          <div className="lg:mr-4 border-0 border-t border-gray-200">
            <button
              className="mt-12 py-1 px-4 bg-sajah rounded-lg text-white text-base font-patrick tracking-wider font-extrabold disabled:opacity-30"
              type="button"
              disabled={isUploading}
              onClick={handleSubmit}
            >
              {isUploading ? (
                <div className="flex items-center">
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-sajah animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Uploading...
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

AddRecipePage.getLayout = function getLayout(page) {
  return <UserLayout activePageTitle="Add a new recipe!">{page}</UserLayout>;
};
