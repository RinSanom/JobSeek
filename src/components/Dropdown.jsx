import React, { useState } from "react";

export default function Dropdown({
  options = [],
  onChange,
  placeholder = "Select an option",
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
    onChange(option); // Notify the parent component about the selection
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative dark:text-white">
      {/* Dropdown Button */}
      <button
        onClick={handleDropdown}
        id="dropdownDefaultButton"
        className="text-black  border-gray-300 border-2 font-medium  text-sm px-5 py-4.5 text-center inline-flex items-center"
        type="button">
        {selectedOption ? selectedOption.label : placeholder}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6">
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
        } bg-white divide-y divide-black rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute max-h-60 overflow-y-auto`}>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton">
          {options.map((option, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleOptionClick(option); // Handle option selection
                }}
                className="block px-4 py-2 hover:bg-secondary-hover dark:hover:bg-gray-600 dark:hover:text-white">
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
