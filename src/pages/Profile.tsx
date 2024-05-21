/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ProfileHome from "../components/ProfileActivities/ProfileHome";
import ProfileLists from "../components/ProfileActivities/ProfileLists";
import ProfileAbout from "../components/ProfileActivities/ProfileAbout";
import { useState } from "react";

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

  return (
    <section className="flex gap-[4rem] relative mt-[4rem] mx-[4rem]">
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
      <div className="flex-[1]">Profile Details</div>
    </section>
  );
};

export default Profile;
