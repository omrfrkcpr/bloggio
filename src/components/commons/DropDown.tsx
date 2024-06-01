/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

const DropDown: React.FC<DropDownProps> = ({
  children,
  size,
  showDrop,
  setShowDrop,
  ref,
}) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        showDrop &&
        ref.current &&
        (ref.current as HTMLElement).contains(e.target as Node)
      ) {
        setShowDrop(false);
      }
    };
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, [ref, showDrop, setShowDrop]);

  return (
    <>
      {showDrop && (
        <div
          ref={ref}
          className={`shadows flex flex-col absolute right-0 top-[2rem] z-50 bg-white ${size}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DropDown;
