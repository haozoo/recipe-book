import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const UserInput = ({
  label,
  type,
  value,
  checkValue,
  placeholder,
  handleEdit,
  handleError,
  fullSize = false,
  required = true,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    () => {
      if (value && checkValue) {
        setErrorMessage(checkValue(value));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  useEffect(
    () => {
      errorMessage?.length !== 0 ? handleError(true) : handleError(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errorMessage]
  );

  return (
    <div className={`pt-2 ${fullSize ? "w-full" : "sm:w-1/2"}`}>
      <label
        className="bg-white text-base font-patrick font-extrabold tracking-wide text-chestnut"
        id={type}
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          className={`block w-full pr-10 rounded-md border-2 border-gray-300 input-font input-focus ${
            errorMessage &&
            "border-red-300  text-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500"
          }`}
          type={type}
          id={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleEdit(e.target.value)}
          required={required}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {errorMessage && (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <p
        className={`h-4 text-sm text-red-400 font-patrick font-extrabold tracking-wide ${
          !errorMessage && "invisible"
        }`}
      >
        {errorMessage}
      </p>
    </div>
  );
};
