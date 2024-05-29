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

const BlogShare = () => {
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

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        onClick={() => setShowDrop(!showDrop)}
        className="grid place-items-center"
      >
        <CiShare1
          className="text-[0.8rem] md:text-[0.9rem] cursor-pointer text-[#a1a1a1] hover:text-black hover:scale-125"
          size={24}
        />
      </button>
      <DropDown
        showDrop={showDrop}
        setShowDrop={setShowDrop}
        size="w-[12rem]"
        ref={dropDownRef}
      >
        <CustomButton click={copyLink} title="Copy Link" icon={<BiLink />} />
        <TwitterShareButton url={path}>
          <CustomButton
            click={() => {}}
            title="Share On Twitter"
            icon={<BiLogoTwitter />}
          />
        </TwitterShareButton>
        <FacebookShareButton url={path}>
          <CustomButton
            click={() => {}}
            title="Share On Facebook"
            icon={<BiLogoFacebookCircle />}
          />
        </FacebookShareButton>
        <LinkedinShareButton url={path}>
          <CustomButton
            click={() => {}}
            title="Share On LinkedIn"
            icon={<BiLogoLinkedinSquare />}
          />
        </LinkedinShareButton>
      </DropDown>
    </div>
  );
};

export default BlogShare;
