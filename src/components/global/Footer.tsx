import { Typography } from "@material-tailwind/react";
import Logo from "../Commons/Logo";
import SocialMedia from "../Commons/SocialMedia";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <section
      className="absolute w-full bottom-0 p-2"
      style={{ backgroundColor: "#ff8991" }}
    >
      <footer className="relative w-full">
        <div className="mx-auto w-full px-6">
          <div className="flex w-full flex-col items-center justify-center py-3 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-5 text-center flex space-x-1 items-center  font-normal text-blue-gray-900 md:mb-0"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Logo
                sx={{
                  margin: "auto",
                }}
                width="40px"
              />
              <span>
                <a href="https://github.com/omrfrkcpr/bloggio">
                  &copy; {currentYear} Bloggio. All Rights Reserved.
                </a>
              </span>
            </Typography>
            <SocialMedia />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
