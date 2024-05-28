/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";

const DropDown: React.FC<DropDownProps> = ({
  children,
  size,
  showDrop,
  setShowDrop,
}) => {
  const dropRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        showDrop &&
        dropRef.current &&
        (dropRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setShowDrop(false);
      }
    };
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, [dropRef, showDrop]);

  return (
    <>
      {showDrop && (
        <div
          ref={dropRef}
          className={`shadows flex flex-col absolute right-0 top-[2rem] z-50 bg-white ${size}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DropDown;
