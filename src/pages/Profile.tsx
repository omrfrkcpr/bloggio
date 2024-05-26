/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ProfileAbout from "../components/ProfileActivities/ProfileAbout";
import { useEffect, useState } from "react";
import CustomModal from "../components/Modals/CustomModal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import { Avatar } from "@mui/material";
import EditProfile from "../components/ProfileActivities/EditProfile";
import Loading from "../components/commons/Loading";
import SavedBlogs from "../components/ProfileActivities/SavedBlogs";
import useBlogCalls from "../hooks/useBlogCalls";
import PersonalBlogs from "../components/ProfileActivities/PersonalBlogs";

const Profile = () => {
  const { currentUser, loading } = useSelector((state: any) => state.auth);
  const { getBlogData } = useBlogCalls();
  const activities = [
    {
      title: "My Blogs",
      comp: (props: any) => <PersonalBlogs {...props} blogType="myBlogs" />,
    },
    {
      title: "Drafts",
      comp: (props: any) => <PersonalBlogs {...props} blogType="drafts" />,
    },
    {
      title: "Saved",
      comp: (props: any) => <SavedBlogs {...props} />,
    },
    {
      title: "About",
      comp: (props: any) => <ProfileAbout {...props} />,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    getBlogData("blogs");
    getBlogData("categories");
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="flex gap-[4rem] relative mx-[4rem] min-h-[88.6vh] h-auto">
          {/* users activities */}
          <div className=" mb-6 flex-[2] pt-[4rem] ">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold capitalize mb-4">
                {`${currentUser?.firstName} ${currentUser?.lastName}`}
              </h2>
            </div>
            <div className="flex items-center mb-[4rem] border-b border-gray-300 ">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className={`py-[0.5rem] ${
                    activity.title === currentActive.title
                      ? "border-b border-gray-500"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentActive(activity)}
                    className="w-[75px]"
                  >
                    {activity.title}
                  </button>
                </div>
              ))}
            </div>
            <currentActive.comp setEditModal={setEditModal} />
          </div>
          {/* button to open side bar */}
          <button
            onClick={() => setModal(true)}
            className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
          >
            <IoSettingsSharp />
          </button>
          {/* users details */}
          <CustomModal modal={modal} hidden="" setModal={setModal}>
            <div
              className={`flex-[1] max-w-[400px] border-l border-gray-300 p-[2rem] z-10
        fixed -right-4 bottom-0 top-14 w-[18rem] bg-white md:sticky
        ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}
        transition-all duration-500`}
            >
              {/* icons to close out modal */}
              <div className="pb-4 text-right">
                <button
                  onClick={() => setModal(false)}
                  className="inline-block md:hidden"
                >
                  <LiaTimesSolid />
                </button>
              </div>
              {/* profile details */}
              <div className="sticky top-7 flex flex-col justify-between">
                {currentUser?.image ? (
                  <img src={currentUser?.image} alt="user-image" />
                ) : (
                  <Avatar sx={{ width: "3.5rem", height: "3.5rem" }} />
                )}
                <h2 className="py-2 font-bold mt-4">
                  @{currentUser?.username}
                </h2>
                <p className="text-gray-500 first-letter:uppercase text-sm">
                  {currentUser?.bio}
                </p>
                <button
                  onClick={() => setEditModal(true)}
                  className="text-green-700 pt-6 text-sm w-fit hover:underline"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </CustomModal>
          {editModal && (
            <EditProfile editModal={editModal} setEditModal={setEditModal} />
          )}
        </section>
      )}
    </>
  );
};

export default Profile;
