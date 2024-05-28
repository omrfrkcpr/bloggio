import React from "react";

const CustomButton: React.FC<CustomButtonProps> = ({ click, icon, title }) => {
  return (
    <div
      onClick={click}
      className="p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left
      flex items-center gap-2 cursor-pointer text-gray-500"
    >
      {icon && <span className="text-[1.2rem]">{icon}</span>}
      {title}
    </div>
  );
};

export default CustomButton;
