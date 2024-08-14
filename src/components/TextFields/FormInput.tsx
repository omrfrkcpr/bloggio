import React from "react";

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-2 mt-4 flex-1">
      <input
        type={type}
        placeholder={label}
        name={name}
        autoComplete="off"
        className="w-full rounded-md h-12 px-4 bg-[#f0f1f2] text-sm outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
