function FormInput({
  labelText,
  inputType,
  placeholder,
  value,
  onChangeFn,
  isRequired = true,
  icon,
}) {
  return (
    <div className="flex flex-col text-gray-300 justify-center items-center">
      <div className="flex flex-row justify-start items-start">
        {icon}
        <label className="self-start">{labelText}</label>
      </div>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFn}
        required={isRequired}
        className="w-2xs px-4 py-2 bg-gray-700 rounded-md"
      />
    </div>
  );
}

export default FormInput;
