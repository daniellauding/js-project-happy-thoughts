import React, { useState, useEffect } from "react";
import { Thought } from "../types/Thought";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  thought: Thought | null;
  onSave: (id: string, message: string, category: string) => void;
}

const EditModal = ({ isOpen, onClose, thought, onSave }: EditModalProps) => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [customCategory, setCustomCategory] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Update form when thought changes
  useEffect(() => {
    if (thought) {
      setMessage(thought.message);
      const cat = thought.category || "general";
      // Check if it's in the fetched categories
      if (categories.includes(cat)) {
        setCategory(cat);
        setUseCustom(false);
      } else if (categories.length > 0) {
        // If categories loaded but this one isn't in there, treat as custom
        setUseCustom(true);
        setCustomCategory(cat);
      } else {
        // Categories not loaded yet, default to the thought's category
        setCategory(cat);
        setUseCustom(false);
      }
    }
  }, [thought, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thought || !message.trim()) return;

    setIsSubmitting(true);
    const finalCategory = useCustom && customCategory.trim()
      ? customCategory.trim().toLowerCase()
      : category;

    onSave(thought._id, message, finalCategory);
    setIsSubmitting(false);
    onClose();
  };

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setUseCustom(true);
    } else {
      setUseCustom(false);
      setCategory(value);
    }
  };

  if (!isOpen || !thought) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md p-6 border border-black dark:border-white bg-gray-100 dark:bg-black shadow-pop transition-colors">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Edit Thought
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-900 dark:text-white">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 text-sm border border-gray-400 dark:border-white bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 focus:border-gray-900 dark:focus:border-white outline-none resize-none transition-colors"
              rows={3}
              required
              minLength={5}
              maxLength={140}
            />
            <p className={`text-xs ${message.length < 5 || message.length > 140 ? "text-red-500" : "text-gray-500"}`}>
              {message.length} / 140
            </p>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-900 dark:text-white">
              Category
            </label>
            <div className="flex gap-2">
              <select
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

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 text-sm border border-gray-400 dark:border-white text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || message.length < 5 || message.length > 140}
              className="flex-1 py-2 px-4 rounded-full text-sm bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black border border-black dark:border-white transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
