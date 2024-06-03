import React from "react";

const CustomButton: React.FC<CustomButtonProps> = ({
  click,
  icon,
  title,
  className,
  alt,
}) => {
  return (
    <div
      onClick={click}
      className={`${className} cursor-pointer`}
      data-test={alt}
    >
      {icon && <span className="text-[1.2rem]">{icon}</span>}
      {title}
    </div>
  );
};

export default CustomButton;
