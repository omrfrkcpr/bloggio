import React, { useState } from "react";

interface TagInputProps {
  setPreview: React.Dispatch<React.SetStateAction<PrevState>>;
  tags: string[];
}

const MAX_TAGS = 3;

const BlogTagInput: React.FC<TagInputProps> = ({ tags, setPreview }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [warning, setWarning] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Comma") {
      event.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < MAX_TAGS) {
      setPreview((prev) => ({ ...prev, tags: [...tags, tag] }));
      setInputValue("");
    } else if (tags.length == MAX_TAGS) {
      setWarning(true);
      setTimeout(() => setWarning(false), 5000); // Hide warning after 3 seconds
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, tagIndex) => tagIndex !== index);
    setPreview((prev) => ({ ...prev, tags: newTags }));
    setWarning(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="text-gray-500 text-sm mb-2">
        Tags help categorize your blog post and make it easier for readers to
        find related content.
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag"
        className="border border-gray-300 py-1 px-3 rounded-md outline-none focus:border-blue-500"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
          >
            <span className="mr-2">{tag}</span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Warning Message with Fade Animation */}
      <div
        className={`transition-opacity duration-500 ${
          warning ? "opacity-100" : "opacity-0"
        } mt-1`}
      >
        <p className="text-red-500 text-sm">
          You can only add up to {MAX_TAGS} tags.
        </p>
      </div>
    </div>
  );
};

export default BlogTagInput;
