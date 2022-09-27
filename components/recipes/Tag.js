import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Tag({ tag, readOnly = true, id, handleDelete }) {
  return (
    <div
      className={`flex items-center mr-2 mb-2 py-1 rounded-md bg-orange-300 ${
        readOnly ? "px-3" : "pl-3"
      }`}
    >
      <div className="text-white font-patrick font-semibold tracking-wider">
        {tag.name}
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
