/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, forwardRef } from "react";

const DropDown: React.FC<DropDownProps> = forwardRef<any, DropDownProps>(
  ({ children, size, showDrop, setShowDrop }, ref) => {
    useEffect(() => {
      const clickOutside = (e: MouseEvent) => {
        if (
          showDrop &&
          ref &&
          (ref as React.RefObject<HTMLElement>).current &&
          !(ref as React.RefObject<HTMLElement>).current!.contains(
            e.target as Node
          )
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
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`shadows flex flex-col absolute right-0 top-[1.6rem] z-50 bg-white ${size} max-h-[125px] overflow-scroll custom-scrollbar`}
          >
            {children}
          </div>
        )}
      </>
    );
  }
);

export default DropDown;
