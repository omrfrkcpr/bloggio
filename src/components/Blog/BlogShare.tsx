/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import DropDown from "../commons/DropDown";
import { CiShare1 } from "react-icons/ci";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  BiLink,
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { toastErrorNotify, toastSuccessNotify } from "../../helper/toastNotify";
import CustomButton from "../commons/CustomButton";

const BlogShare: React.FC = () => {
  const [showDrop, setShowDrop] = useState(false);
  const path = window.location.href;
  const dropDownRef = useRef<HTMLDivElement>(null);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toastSuccessNotify("Link has been copied");
      setShowDrop(false);
    } catch (error: any) {
      toastErrorNotify(error?.message);
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

  const shareButtons: ShareButtonProps[] = [
    {
      key: "copy-link",
      title: "Copy Link",
      icon: <BiLink />,
      onClick: copyLink,
    },
    {
      key: "share-twitter",
      title: "Share On Twitter",
      icon: <BiLogoTwitter />,
      onClick: () => {},
      component: TwitterShareButton,
      extraProps: { url: path },
    },
    {
      key: "share-facebook",
      title: "Share On Facebook",
      icon: <BiLogoFacebookCircle />,
      onClick: () => {},
      component: FacebookShareButton,
      extraProps: { url: path },
    },
    {
      key: "share-linkedin",
      title: "Share On LinkedIn",
      icon: <BiLogoLinkedinSquare />,
      onClick: () => {},
      component: LinkedinShareButton,
      extraProps: { url: path },
    },
  ];

  return (
    <div className="relative" ref={dropDownRef}>
      <CustomButton
        click={() => setShowDrop(!showDrop)}
        className="grid place-items-center"
        title=""
        icon={
          <CiShare1
            className="text-[0.8rem] md:text-[0.9rem] cursor-pointer text-[#a1a1a1] hover:text-black hover:scale-125"
            size={24}
          />
        }
      />
      <DropDown
        showDrop={showDrop}
        setShowDrop={setShowDrop}
        size="w-[12rem]"
        ref={dropDownRef}
      >
        {shareButtons.map(
          ({ key, title, icon, onClick, component: Component, extraProps }) => {
            if (Component) {
              return (
                <Component key={key} {...extraProps}>
                  <CustomButton
                    click={onClick}
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

export default BlogShare;
