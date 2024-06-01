import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { ImMail } from "react-icons/im";

const SocialMedia = () => {
  const socialMedia = [
    {
      icon: <FaLinkedin size={24} />,
      path: "https://www.linkedin.com/in/omrfrkcpr/",
      id: 1,
    },
    {
      icon: <FaGithubSquare size={24} />,
      path: "https://github.com/omrfrkcpr/bloggio",
      id: 2,
    },
    {
      icon: <ImMail size={22} style={{ margin: "1px" }} />,
      path: "omerrfarukcapur@gmail.com",
      id: 3,
    },
    {
      icon: <FaMedium size={24} className="" />,
      path: "https://medium.com/@omrfrkcpr",
      id: 4,
    },
  ];

  return (
    <div className="flex space-x-4 sm:justify-center items-center">
      {socialMedia.map(({ icon, path, id }, index) => (
        <div className="hover:bg-white" key={id}>
          <a href={index === 2 ? `mailto:${path}` : path} target="_blank">
            {icon}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
