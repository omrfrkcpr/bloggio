import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import React from "react";

const currentYear = new Date().getFullYear();

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="relative w-full" style={{ backgroundColor: "#b9d0f0" }}>
      <div className="mx-auto w-full px-6">
        <div className="flex w-full flex-col items-center justify-center py-3 md:flex-row md:justify-between">
          <div className="flex flex-col md:flex-row md:gap-2 items-center justify-center">
            <Logo
              sx={{
                margin: "auto",
                mt: 1,
                cursor: "pointer",
              }}
              width="40px"
            />
            <span>
              <a href="https://github.com/omrfrkcpr/bloggio">
                &copy; {currentYear} Bloggio. All Rights Reserved.
              </a>
            </span>
          </div>

          <SocialMedia />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
