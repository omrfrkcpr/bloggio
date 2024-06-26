import { Typography } from "@material-tailwind/react";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import React from "react";

const currentYear = new Date().getFullYear();

const Footer: React.FC = React.memo(() => {
  return (
    <section className=" w-full p-2" style={{ backgroundColor: "#b9d0f0" }}>
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
});

export default Footer;
