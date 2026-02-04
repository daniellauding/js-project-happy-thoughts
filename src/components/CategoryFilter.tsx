import React, { useEffect, useState } from "react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onSelectCategory(value === "all" ? null : value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <select
          value={selectedCategory || "all"}
          onChange={handleChange}
          className="appearance-none px-4 py-2 pr-10 text-sm border border-black dark:border-white bg-white dark:bg-black text-gray-900 dark:text-white rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
