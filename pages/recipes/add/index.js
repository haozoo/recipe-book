import {
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import UserLayout from "../../../components/layout/UserLayout";

const SectionTitle = ({ title, isEditing, handleEdit }) => {
  return (
    <div className="pb-1 flex justify-between">
      <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
        {title}
      </h2>
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
    </div>
  );
};

const IndentedTextInput = ({ label, placeholder, value, handleEdit }) => {
  return (
    <div className="relative rounded-md border border-gray-300 px-4 py-1 focus-within:border-sajah focus-within:ring-1 focus-within:ring-sajah">
      <label
        className="absolute -top-3 left-1 -mt-px inline-block bg-white px-1 text-sm font-patrick font-extrabold text-chestnut"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        className="block w-full border-0 p-0 text-md text-hazelnut font-patrick font-medium tracking-wider truncate placeholder-gray-400 focus:ring-0"
        type="text"
        id="name"
        value={value}
        placeholder={placeholder}
      />
    </div>
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
          className={`block w-full min-w-0 rounded-md px-2 py-1 ml-3 text-md text-hazelnut font-patrick font-medium tracking-wider placeholder-gray-400 focus-within:border-sajah focus-within:ring-1 focus-within:ring-sajah ${
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
              className="block w-20 min-w-0 rounded-none rounded-l-md px-3 py-1 text-md font-patrick font-medium tracking-wider placeholder-gray-400 text-hazelnut border-1 border-gray-300 focus:border-sajah focus:ring-1 focus:ring-sajah"
              type="text"
              id="ingredient-quantity"
              value={ingredient.quantity}
              placeholder="500ml"
              onChange={handleEditQuantity(id)}
            />
            <input
              className="block w-full min-w-0 rounded-none rounded-r-md border border-l-0 px-3 py-1 text-md font-patrick font-medium tracking-wider placeholder-gray-400 text-hazelnut border-1 border-gray-300 focus-within:border-sajah focus-within:ring-1 focus-within:ring-sajah"
              type="text"
              id="ingredient-name"
              value={ingredient.name}
              placeholder="Condensed Milk"
              onChange={handleEditName(id)}
            />
          </>
        ) : (
          <>
            <span className="flex items-center pl-1 text-chestnut text-md font-patrick font-medium tracking-wider">
              {ingredient.quantity}
            </span>
            <span className="flex items-center pl-2 text-hazelnut text-md font-patrick font-medium tracking-wider">
              {ingredient.name}
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

export default function AddRecipePage() {
  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [isEditingIngredients, setIsEditingIngredients] = useState(false);

  const addIngredientRef = useRef(null);

  const [coverPhoto, setCoverPhoto] = useState();

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
      return id !== idx ? ingredient : { ...ingredient, name: e.target.value };
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
      console.log(ingredients);
      setIngredients(
        ingredients.concat([
          { name: newIngredientName, quantity: newIngredientQuantity },
        ])
      );
      setNewIngredientQuantity("");
      setNewIngredientName("");
      addIngredientRef.current.focus();
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(instructions.filter((i, idx) => id !== idx));
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverPhoto(e.target.files[0]);
      console.log(coverPhoto);
    }
  };

  return (
    <main className="mx-auto">
      <form className="">
        <div className="pt-12 max-w-6xl lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="max-w-lg space-y-8 divide-y divide-gray-200">
            <div className="space-y-8">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
                Recipe Info
              </h2>
              <IndentedTextInput label="Title" placeholder="Yummy Cookies!" />

              <span className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-4">
                <IndentedTextInput label="Prep. Time" placeholder="10 mins" />
                <IndentedTextInput label="Cooking Time" placeholder="5 mins" />
              </span>
            </div>
            <div className="pt-8">
              <h2 className="text-xl font-patrick font-extrabold text-chestnut tracking wider">
                Tags
              </h2>
            </div>
            <div className="pt-8">
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
                        className="block w-20 min-w-0 rounded-none rounded-l-md border border-gray-300 px-3 py-1 text-md text-gray-400 font-patrick font-medium tracking-wider placeholder-gray-400 focus-within:border-sajah focus-within:ring-1 focus-within:ring-sajah "
                        type="text"
                        id="ingredient-quantity"
                        value={newIngredientQuantity}
                        placeholder="500ml"
                        onChange={(e) =>
                          setNewIngredientQuantity(e.target.value)
                        }
                      />
                      <input
                        className="block w-full min-w-0 rounded-none rounded-r-md border border-l-0 border-gray-300 px-3 py-1 text-md text-gray-400 font-patrick font-medium tracking-wider placeholder-gray-400 focus-within:border-sajah focus-within:ring-1 focus-within:ring-sajah "
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
            <div className="pt-8">
              <SectionTitle
                title="Instructions"
                isEditing={isEditingInstructions}
                handleEdit={() =>
                  setIsEditingInstructions(!isEditingInstructions)
                }
              />
              <div className="">
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
                        className="block w-full min-w-0 rounded-md border-1 border-gray-300 px-2 py-1 ml-3 text-md text-gray-400 font-patrick font-medium tracking-wider placeholder-gray-400 focus-within:border-sajah focus-within:ring-1 focus-within:ring-sajah "
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
          <div className="lg:col-span-1">
            {coverPhoto ? (
              <div className="aspect-w-3 aspect-h-2">
                <img
                  className="rounded-lg object-cover shadow-lg"
                  src={URL.createObjectURL(coverPhoto)}
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
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600"
                    >
                      <span>Upload a image</span>
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
      </form>
    </main>
  );
}

AddRecipePage.getLayout = function getLayout(page) {
  return <UserLayout activePageTitle="Add a new recipe!">{page}</UserLayout>;
};
