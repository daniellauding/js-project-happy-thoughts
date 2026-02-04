import React, { useState, useEffect } from "react";
import { ThoughtFormProps } from "../types/Thought";

const ThoughtForm = ({ onSubmitThought, isLoggedIn, onLoginRequired }: ThoughtFormProps) => {
  const [message, setMessage] = useState<string>("");
  const [category, setCategory] = useState<string>("general");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [useCustom, setUseCustom] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://js-project-api-4eaw.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    if (message.trim()) {
      const finalCategory = useCustom && customCategory.trim()
        ? customCategory.trim().toLowerCase()
        : category;
      onSubmitThought(message, finalCategory);
      setMessage("");
      setCategory("general");
      setCustomCategory("");
      setUseCustom(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setUseCustom(true);
    } else {
      setUseCustom(false);
      setCategory(value);
    }
  };

  return (
    <div className="thought-form-container lg:max-w-lg lg:w-full lg:mx-auto p-4 border border-black dark:border-white bg-gray-100 dark:bg-black shadow-pop transition-colors">
      <form
        onSubmit={handleSubmit}
        className="thought-form flex flex-col align-start w-full gap-4"
      >
        <label
          htmlFor="message"
          className="text-sm text-gray-900 dark:text-white"
        >
          What's making you happy right now?
        </label>
        <textarea
          id="message"
          placeholder="Type your happy thought here..."
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
          }}
          required
          className="w-full p-2 text-sm border border-gray-400 dark:border-white bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:border-gray-900 dark:focus:border-white outline-none resize-none transition-colors"
        />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm text-gray-900 dark:text-white"
          >
            Category
          </label>
          <div className="flex gap-2">
            <select
              id="category"
              value={useCustom ? "custom" : category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="flex-1 p-2 text-sm border border-gray-400 dark:border-white bg-white dark:bg-black text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
              <option value="custom">+ Custom...</option>
            </select>
            {useCustom && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Your category"
                className="flex-1 p-2 text-sm border border-gray-400 dark:border-white bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 focus:border-gray-900 dark:focus:border-white outline-none transition-colors"
                maxLength={20}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!message.trim()}
            className="py-3 px-5 rounded-full w-fit text-sm bg-red-300 dark:bg-red-300 hover:bg-red-300 dark:hover:bg-red-500 text-gray-900 dark:text-black transition duration-150 ease-in-out disabled:opacity-50 cursor-not-allowed focus:outline-none focus-ring focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Send happy thought"
          >
            <span aria-hidden="true">❤️</span> Send happy thought{" "}
            <span aria-hidden="true">❤️</span>
          </button>
          <p
            className={`text-sm ${
              message.length === 0
                ? "text-gray-500"
                : message.length < 5
                ? "text-red-500"
                : message.length > 140
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {message.length} / 140
          </p>
        </div>
      </form>
    </div>
  );
};

export default ThoughtForm;
