import React from "react";
import CustomButton from "../../utils/CustomButton";

const NewsButtons = ({
  selectedCountry,
  setSelectedCountry,
}: {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const countries = [
    { name: "United States", code: "us" },
    { name: "Germany", code: "de" },
    { name: "Türkiye", code: "tr" },
  ];

  return (
    <div className="flex flex-wrap justify-start items-center mt-2 gap-4">
      {countries.map(({ name, code }) => (
        <CustomButton
          key={code}
          title={name}
          click={() => setSelectedCountry(code)}
          className={`text-[12px] py-1 xl:py-2 px-1 xl:px-3 rounded-full border border-gray-300 ${
            selectedCountry === code && "bg-gray-700/90 text-white"
          } ${selectedCountry !== code && "hover:bg-gray-300"}`}
          alt={`search-news-${code}`}
        />
      ))}
    </div>
  );
};

export default NewsButtons;
