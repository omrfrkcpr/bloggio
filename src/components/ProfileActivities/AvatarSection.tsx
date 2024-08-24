/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import toastNotify from "../../helpers/toastNotify";

interface AvatarSectionProps {
  filePreview: any;
  avatarSrc: string;
  handleRemoveExistingAvatar: () => void;
  handleFileRemove: () => void;
  setSelectedFile: (file: any) => void;
  setFilePreview: (preview: any) => void;
  selectedFile: File | null;
  setProfileForm: (form: any) => void;
  setRemoveExistingAvatar: (remove: boolean) => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  filePreview,
  avatarSrc,
  handleRemoveExistingAvatar,
  handleFileRemove,
  setSelectedFile,
  setFilePreview,
  selectedFile,
  setProfileForm,
  setRemoveExistingAvatar,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileType = file.type;

    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/jpg"
    ) {
      setSelectedFile(file);
      const objectURL = URL.createObjectURL(file);
      setFilePreview(objectURL);
      setProfileForm((prev: any) => ({ ...prev, avatar: objectURL }));
      setRemoveExistingAvatar(false);
    } else {
      toastNotify("error", "Only JPEG, JPG and PNG formats are allowed.");
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  return (
    <section
      className="flex mt-6 space-x-5 items-center relative"
      id="avatar-section"
    >
      <div className="space-y-2 w-full h-[fit-content] z-50">
        <p className="mb-2">Avatar*</p>
        <div className="flex justify-between">
          <p className="text-xs text-gray-600">
            For best results, upload an image 512x512 or larger
            <br />
            Allowed Formats: JPEG, JPG and PNG. (Max Size: 10MB)
          </p>
          <button
            type="button"
            className="text-[8px] md:text-[11px] flex items-center mt-3 gap-1 text-red-500 hover:text-red-300"
            onClick={handleRemoveExistingAvatar}
          >
            <span>Remove</span>
            <FiTrash2 />
          </button>
        </div>
        <div
          {...getRootProps({ className: "dropzone" })}
          className="w-full h-full rounded-md py-2 flex items-center justify-start bg-white hover:bg-gray-100 cursor-pointer border-dashed border border-gray-300"
        >
          <input {...getInputProps()} />
          <img
            loading="lazy"
            src={filePreview ? filePreview : avatarSrc}
            alt="profile-avatar"
            className="w-20 h-20 md:w-28 md:h-28 border ms-2 md:ms-4 border-gray-400 rounded-full object-cover"
          />
          <div className="absolute grid place-content-center place-items-center w-full z-50 ms-10 md:ms-0">
            {selectedFile ? (
              <div className="flex items-center justify-start space-x-2">
                <span className="text-[10px] md:text-[14px]">
                  {selectedFile.name}
                </span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation(); // To prevent onDrop from being triggered
                    handleFileRemove();
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-1 text-gray-600">
                <FiUpload className="mb-1 md:mb-3 text-[18px] md:text-[24px]" />
                <p className="text-[9px] md:text-[13px]">
                  Drag and drop files here to upload
                </p>
                <p className="text-[9px] md:text-[13px]">
                  Or click to select a file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvatarSection;
