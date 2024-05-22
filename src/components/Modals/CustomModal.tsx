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
      className={`bg-white/50 fixed inset-0 z-50 ${hidden}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-[fit-content]">
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
