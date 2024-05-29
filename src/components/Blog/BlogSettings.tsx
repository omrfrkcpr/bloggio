/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import DropDown from "../commons/DropDown";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  BiLink,
  BiLogoFacebookCircle,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { toastErrorNotify, toastSuccessNotify } from "../../helper/toastNotify";
import CustomButton from "../commons/CustomButton";
import { Bookmarks } from "@phosphor-icons/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

interface BlogSettingsProps {
  key: string;
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
  component?: React.ComponentType<any>;
  extraProps?: Record<string, any>;
}

const BlogSettings = ({
  blogId,
  userId,
}: {
  blogId: string | undefined;
  userId: string | undefined;
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [settingButtons, setSettingButtons] = useState<BlogSettingsProps[]>([]);
  const { currentUser } = useSelector((state: any) => state.auth);
  const path = window?.location?.href;
  const dropDownRef = useRef<HTMLDivElement>(null);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        path.includes("/blog/") ? path : path + `blog/${blogId}`
      );
      toastSuccessNotify("Link has been copied");
    } catch (error: any) {
      toastErrorNotify(error?.message);
    } finally {
      setShowDrop(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  useEffect(() => {
    const initialButtons: BlogSettingsProps[] = [
      {
        key: "copy-link",
        title: "Copy Link",
        icon: <BiLink />,
        onClick: copyLink,
      },
      {
        key: "share-twitter",
        title: "Share On X",
        icon: <FaSquareXTwitter className="text-black" />,
        component: TwitterShareButton,
        extraProps: { url: path },
      },
      {
        key: "share-facebook",
        title: "Share On Facebook",
        icon: <BiLogoFacebookCircle className="text-[#365899]" />,
        component: FacebookShareButton,
        extraProps: { url: path },
      },
      {
        key: "share-linkedin",
        title: "Share On LinkedIn",
        icon: <BiLogoLinkedinSquare className="text-[#0A66C2]" />,
        component: LinkedinShareButton,
        extraProps: { url: path },
      },
      {
        key: "save-blog",
        title: "Save blog",
        icon: <Bookmarks weight="thin" />,
      },
    ];

    if (currentUser?._id === userId) {
      initialButtons.push(
        {
          key: "edit-blog",
          title: "Edit blog ⭐",
          icon: <FaRegEdit className="text-[#c1713d]" />,
        },
        {
          key: "delete-blog",
          title: "Delete blog ⭐",
          icon: <RiDeleteBin6Fill className="text-[#c1413d]" />,
        }
      );
    }

    setSettingButtons(initialButtons);
  }, [currentUser, userId]);

  return (
    <div className="relative" ref={dropDownRef}>
      <CustomButton
        click={() => setShowDrop(!showDrop)}
        className="grid place-items-center"
        title=""
        icon={
          <BsThreeDotsVertical
            className="cursor-pointer text-[#a1a1a1] hover:text-black"
            size={18}
          />
        }
      />
      <DropDown
        showDrop={showDrop}
        setShowDrop={setShowDrop}
        size="w-[11rem]"
        ref={dropDownRef}
      >
        {settingButtons.map(
          ({ key, title, icon, onClick, component: Component, extraProps }) => {
            if (Component) {
              return (
                <Component key={key} {...extraProps}>
                  <CustomButton
                    title={title}
                    icon={icon}
                    className="share-button"
                  />
                </Component>
              );
            } else {
              return (
                <CustomButton
                  key={key}
                  click={onClick}
                  title={title}
                  icon={icon}
                  className="share-button"
                />
              );
            }
          }
        )}
      </DropDown>
    </div>
  );
};

export default BlogSettings;
