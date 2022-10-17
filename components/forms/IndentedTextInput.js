export const IndentedTextInput = ({
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
