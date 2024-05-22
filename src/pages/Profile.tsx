/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ProfileHome from "../components/ProfileActivities/ProfileHome";
import ProfileLists from "../components/ProfileActivities/ProfileLists";
import ProfileAbout from "../components/ProfileActivities/ProfileAbout";
import { useState } from "react";
import CustomModal from "../components/Modals/CustomModal";
import { LiaTimesSolid } from "react-icons/lia";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "List",
      comp: ProfileLists,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(true);
  const hidden = modal
    ? "translate-x-0 opacity-100 transition-all duration-500"
    : "translate-x-[100%] md:translate-0 opacity-0 transition-all duration-500";

  return (
    <section className="flex gap-[4rem] relative mt-[4rem] mx-[4rem] min-h-[83.6vh] h-auto">
      {/* users activities */}
      <div className=" mb-6 flex-[2]">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold capitalize mb-4">
            {`${currentUser.firstName} ${currentUser.lastName}`}
          </h2>
        </div>
        <div className="flex items-center gap-3 mb-[4rem] border-b border-gray-300 ">
          {activities.map((activity) => (
            <div
              className={`py-[0.5rem] ${
                activity.title === currentActive.title
                  ? "border-b border-gray-500"
                  : ""
              }`}
            >
              <button
                onClick={() => setCurrentActive(activity)}
                className="w-[50px]"
              >
                {activity.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp />
      </div>
      {/* users details */}
      <CustomModal hidden={hidden} setModal={setModal}>
        <div className="flex-[1] h-full border-[1.5px] border-gray-300 fixed p-[2rem] z-10 right-0 top-[58px] sm:top-[65px] lg:top-[71px] w-[18rem] ms-auto bg-white md:relative ">
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
            <Avatar sx={{ width: "3.5rem", height: "3.5rem" }} />
            <h2 className="capitalize py-8 font-bold">{`${
              currentUser?.firstName
            } ${currentUser?.lastName.toUpperCase()}`}</h2>
            <button className="text-green-700 pt-6 text-sm w-fit">
              Edit Profile
            </button>
          </div>
        </div>
      </CustomModal>
    </section>
  );
};

export default Profile;
