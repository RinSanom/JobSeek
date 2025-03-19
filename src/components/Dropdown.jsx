import React, { useState } from "react";

export default function Dropdown({
  options = [],
  onChange,
  placeholder = "Select an option",
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative text-gray-900 dark:text-white">
      {/* Dropdown Button */}
      <button
        onClick={handleDropdown}
        id="dropdownDefaultButton"
        className="w-full sm:w-auto text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 font-medium text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 text-center inline-flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        type="button"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className="w-2 sm:w-2.5 h-2 sm:h-2.5 ms-2 sm:ms-3 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-lg shadow-sm w-full sm:w-44 absolute mt-1 max-h-48 sm:max-h-60 overflow-y-auto`}
      >
        <ul
          className="py-1 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {options.map((option, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(option);
                }}
                className="block px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}