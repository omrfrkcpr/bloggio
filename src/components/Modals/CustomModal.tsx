/* eslint-disable @typescript-eslint/no-unused-vars */

const CustomModal = ({
  children,
  setModal,
  hidden,
  modal,
}: {
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: string;
  modal: boolean;
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
