import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { ImMail } from "react-icons/im";

const SocialMedia = () => {
  const socialMedia = [
    {
      icon: <FaLinkedin size={24} />,
      path: "https://www.linkedin.com/in/omrfrkcpr/",
    },
    {
      icon: <FaGithubSquare size={24} />,
      path: "https://github.com/omrfrkcpr/bloggio",
    },
    {
      icon: <ImMail size={23} style={{ margin: "1px" }} />,
      path: "omerrfarukcapur@gmail.com",
    },
    {
      icon: <FaMedium size={24} className="" />,
      path: "https://medium.com/@omrfrkcpr",
    },
  ];

  return (
    <div className="flex space-x-4 sm:justify-center items-center">
      {socialMedia.map(({ icon, path }, index) => (
        <div className="hover:bg-white">
          <a
            href={index === 2 ? `mailto:${path}` : path}
            key={index}
            target="_blank"
          >
            {icon}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
