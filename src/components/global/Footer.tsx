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
            <div className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center">
              <Logo
                sx={{
                  margin: "auto",
                }}
                width="40px"
              />
              <span className="mb-2">
                <a href="https://github.com/omrfrkcpr/bloggio">
                  &copy; {currentYear} Bloggio. All Rights Reserved.
                </a>
              </span>
            </div>

            <SocialMedia />
          </div>
        </div>
      </footer>
    </section>
  );
});

export default Footer;
