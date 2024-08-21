import { useEffect, useRef, useState } from "react";
import DropDown from "../../utils/DropDown";
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
import CustomButton from "../../utils/CustomButton";
import { Bookmarks } from "@phosphor-icons/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";
import { RootState } from "../../app/store";
import toastNotify from "../../helpers/toastNotify";

const BlogSettings = ({
  blogId,
  userId,
}: {
  blogId: string | undefined;
  userId: string | undefined;
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [settingButtons, setSettingButtons] = useState<BlogSettingsProps[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { deleteBlogData, postSave } = useBlogCalls();
  const path = window?.location?.href;
  const navigate = useNavigate();
  const dropDownRef = useRef<HTMLDivElement>(null);

  // console.log(blogId);
  const isSaved =
    currentUser && blogId ? currentUser?.saved?.includes(blogId) : false;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        path.includes("/blog/") ? path : path + `blog/${blogId}`
      );
      toastNotify("success", "Link has been copied");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastNotify("error", error?.message);
    } finally {
      setShowDrop(false);
    }
  };

  const handlepostSave = async () => {
    postSave(blogId);
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
        key: "save-blog",
        title: isSaved ? "Remove Blog" : "Save blog",
        icon: <Bookmarks weight={`${isSaved ? "fill" : "thin"}`} />,
        onClick: handlepostSave,
      },
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
    ];

    if (currentUser?._id === userId || currentUser?.isAdmin) {
      initialButtons.unshift(
        {
          key: "edit-blog",
          title: "Edit blog ⭐",
          icon: <FaRegEdit className="text-[#c1713d]" />,
          onClick: () =>
            navigate(`/blog/${blogId}/edit`, { state: { blogId } }),
        },
        {
          key: "delete-blog",
          title: "Delete blog ⭐",
          icon: <RiDeleteBin6Fill className="text-[#c1413d]" />,
          onClick: async () => {
            if (blogId) {
              await deleteBlogData("blogs", blogId);
              setShowDrop(false);
            }
          },
        }
      );
    }

    setSettingButtons(initialButtons);
  }, [currentUser, userId, path]);

  return (
    <div className="relative" ref={dropDownRef}>
      <CustomButton
        click={() => setShowDrop(!showDrop)}
        className="grid place-items-center"
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
        size="w-[8.5rem] md:w-[11rem]"
        // ref={dropDownRef}
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
