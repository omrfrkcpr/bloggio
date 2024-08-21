import React from "react";

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  setModal,
  hidden,
  modal,
}) => {
  return (
    <>
      <div
        onClick={() => setModal(false)}
        className={`bg-white/50 fixed inset-0 z-10 ${hidden}
      ${
        modal ? "visible opacity-100" : "invisible opacity-0"
      } transition-all duration-500`}
      />
      {children}
    </>
  );
};

export default CustomModal;
