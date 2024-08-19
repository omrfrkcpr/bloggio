import React from "react";
import CustomImage from "../utils/CustomImage";
import setups from "../helper/setup";

const About: React.FC = () => {
  return (
    <div className="page-height py-8 bg-[#e5effd] px-4 sm:px-6 lg:px-8 grid md:place-content-center md:place-items-center">
      <main className="flex flex-col items-center justify-start w-full flex-1 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 flex items-center gap-3">
          <CustomImage
            src={`${setups.AWS_S3_BASE_URL}about.png`}
            alt="about-bloggio"
            className="w-[300px] md:w-[400px]"
          />
        </h1>
        <p className="mt-3 text-lg sm:text-xl md:text-2xl text-gray-700">
          Welcome to Bloggio, your new favorite blogging platform!
        </p>
        <section className="mt-5">
          <div className="mt-8 text-left max-w-4xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-base sm:text-md md:text-lg text-gray-600 leading-relaxed">
              At Bloggio, our mission is to provide a user-friendly and engaging
              platform for individuals to share their stories, ideas, and
              insights with the world. Whether you're a seasoned writer or just
              starting out, Bloggio offers the tools and community you need to
              express yourself and connect with others.
            </p>
          </div>

          <div className="mt-8 text-left max-w-4xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside text-base sm:text-md md:text-lg text-gray-600 leading-relaxed">
              <li>Create and publish your own blogs with ease</li>
              <li>Save your favorite blogs for later reading</li>
              <li>Like and comment on blogs to engage with the community</li>
            </ul>
          </div>

          <div className="mt-8 text-left max-w-4xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Join Us
            </h2>
            <p className="text-base sm:text-md md:text-lg text-gray-600 leading-relaxed">
              Ready to start your blogging journey with Bloggio? Sign up today
              and join a community of passionate writers and readers. We can't
              wait to see what you'll create!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
