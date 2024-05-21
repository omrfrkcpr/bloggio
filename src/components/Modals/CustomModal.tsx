/* eslint-disable @typescript-eslint/no-unused-vars */

const CustomModal = ({
  children,
  setModal,
  hidden,
}: {
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: string;
}) => {
  return (
    <div
      onClick={() => setModal(false)}
      className={`bg-white/50 fixed inset-0 z-50 ${hidden} transition-all duration-500`}
    >
      <div onClick={(e) => e.stopPropagation()}> {children}</div>
    </div>
  );
};

export default CustomModal;
