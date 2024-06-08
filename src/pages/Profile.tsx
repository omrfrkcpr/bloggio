/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ProfileAbout from "../components/ProfileActivities/ProfileAbout";
import { useEffect, useMemo, useState } from "react";
import CustomModal from "../utils/CustomModal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import { Avatar } from "@mui/material";
import EditProfile from "../components/ProfileActivities/EditProfile";
import Loading from "../components/global/Loading";
import SavedBlogs from "../components/ProfileActivities/SavedBlogs";
import useBlogCalls from "../hooks/useBlogCalls";
import PersonalBlogs from "../components/ProfileActivities/PersonalBlogs";
import CustomImage from "../utils/CustomImage";
import { Link, useLocation } from "react-router-dom";
import CustomButton from "../utils/CustomButton";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import EditAccount from "../components/ProfileActivities/EditAccount";
import { dateFormatter } from "../helper/functions";

const Profile = () => {
  const { currentUser, loading } = useSelector((state: any) => state.auth);
  const { getBlogData } = useBlogCalls();
  const location: any = useLocation();
  const { search } = useLocation();

  // console.log(search)

  const basePath = useMemo(
    () =>
      !location?.pathname.includes(currentUser?._id)
        ? currentUser?._id
        : `/profile/${currentUser?._id}`,
    [location, currentUser]
  );

  const activities = useMemo(
    () => [
      {
        title: "My Blogs",
        comp: (props: any) => <PersonalBlogs {...props} blogType="myBlogs" />,
        path: `${basePath}?my-blogs`,
      },
      {
        title: "Drafts",
        comp: (props: any) => <PersonalBlogs {...props} blogType="drafts" />,
        path: `${basePath}?drafts`,
      },
      {
        title: "Saved",
        comp: (props: any) => <SavedBlogs {...props} />,
        path: `${basePath}?saved`,
      },
      {
        title: "About",
        comp: (props: any) => <ProfileAbout {...props} />,
        path: `${basePath}?about`,
      },
    ],
    [basePath]
  );
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [editAccountModal, setEditAccountModal] = useState<boolean>(false);

  useEffect(() => {
    if (search.includes("my-blogs")) {
      setCurrentActive(activities[0]);
    } else if (search.includes("drafts")) {
      setCurrentActive(activities[1]);
    } else if (search.includes("saved")) {
      setCurrentActive(activities[2]);
    } else if (search.includes("about")) {
      setCurrentActive(activities[3]);
    }
  }, [search, activities]);

  useEffect(() => {
    getBlogData("blogs", `?author=${currentUser?._id}`);
    getBlogData("categories");
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="flex gap-[1rem] relative mx-[2rem] min-h-[88.8vh] h-auto">
          {/* users activities */}
          <div className=" mb-6 flex-[2] pt-[4rem] ">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold capitalize mb-4">
                {`${currentUser?.firstName} ${currentUser?.lastName}`}
              </h2>
            </div>
            <div className="flex items-center mb-[2rem] border-b border-gray-300 ">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className={`py-[0.5rem] ${
                    activity.title === currentActive.title
                      ? "border-b border-gray-500"
                      : ""
                  }`}
                >
                  <Link to={activity.path}>
                    <CustomButton
                      className="w-[75px] text-center"
                      title={activity.title}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <currentActive.comp setEditModal={setEditProfileModal} />
          </div>
          {/* button to open side bar */}
          <CustomButton
            click={() => setModal(true)}
            className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black hover:bg-black/70 text-white grid place-items-center lg:hidden"
            icon={<IoSettingsSharp />}
          />
          {/* users details */}
          <CustomModal modal={modal} hidden="" setModal={setModal}>
            <div
              className={`flex-[1] max-w-[400px] border-l border-gray-300 p-[2rem] z-10
        fixed -right-4 bottom-0 top-14 mb-[76px] md:mb-0 w-[18rem] h-[100vh] lg:h-[88.6vh] bg-white lg:sticky
        ${modal ? "translate-x-0" : "translate-x-[100%] lg:translate-x-0"}
        transition-all duration-500`}
            >
              {/* icons to close out modal */}
              <div className="pb-4 text-right">
                <CustomButton
                  click={() => setModal(false)}
                  className="inline-block lg:hidden"
                  icon={<LiaTimesSolid />}
                />
              </div>
              {/* profile details */}
              <div className="sticky top-7 flex flex-col justify-between">
                {currentUser?.image ? (
                  <CustomImage src={currentUser?.image} alt="user-image" />
                ) : (
                  <Avatar sx={{ width: "3.5rem", height: "3.5rem" }} />
                )}
                <h2 className="py-2 font-bold mt-4">
                  @{currentUser?.username}
                </h2>
                <p className="text-gray-500 first-letter:uppercase text-sm">
                  {currentUser?.bio}
                </p>
                <CustomButton
                  click={() => setEditProfileModal(true)}
                  className="text-green-700 pt-6 text-sm w-fit hover:underline flex justify-center items-center gap-1"
                  title="Edit Profile"
                  icon={<FaRegUser size={17} />}
                  alt="edit-profile"
                />
                <CustomButton
                  click={() => setEditAccountModal(true)}
                  className="text-green-700 pt-2 text-sm w-fit hover:underline flex justify-center items-center gap-1"
                  title="Account"
                  icon={<IoSettingsOutline />}
                  alt="edit-account"
                />
                <p className="text-gray-500 first-letter:uppercase text-sm pt-[5rem]">
                  {`Joined on ${dateFormatter(currentUser?.createdAt)}`}
                </p>
              </div>
            </div>
          </CustomModal>
          {editProfileModal && (
            <EditProfile
              editModal={editProfileModal}
              setEditModal={setEditProfileModal}
            />
          )}
          {editAccountModal && (
            <EditAccount
              editModal={editAccountModal}
              setEditModal={setEditAccountModal}
              setEditProfileModal={setEditProfileModal}
            />
          )}
        </section>
      )}
    </>
  );
};

export default Profile;
