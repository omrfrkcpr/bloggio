import React from "react";
import about from "../assets/about.png";

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[86.9vh] py-8 bg-white px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col items-center justify-start md:mt-10 w-full flex-1 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 md:mb-6 flex items-center gap-3">
          About <img src={about} alt="" className="w-[150px] md:w-[250px]" />
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
              <li>
                Follow other users and stay updated with their latest posts
              </li>
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
