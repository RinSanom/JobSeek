// components/button/ServiceButtonCarousel.jsx
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ServiceBtn = ({ categories }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative">
      {/* Left scroll button */}
      <button
        onClick={() => scroll("left")}
        className="flex bg-white justify-center p-2 rounded-full shadow-md -translate-y-1/2 absolute dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 items-center left-0 top-1/2 z-10">
        <FaChevronLeft className="text-gray-700 dark:text-gray-300" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto px-8 py-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <button
              key={category.id || index}
              className="flex-shrink-0 bg-gray-100 rounded-full text-black text-sm dark:bg-gray-700 dark:text-white hover:bg-blue-500 hover:text-white px-4 py-2 transition-colors whitespace-nowrap">
              {category.name}
            </button>
          ))
        ) : (
          <button className="bg-gray-100 rounded-full text-sm dark:bg-gray-700 dark:text-white px-4 py-2">
            Loading...
          </button>
        )}
      </div>
      <button
        onClick={() => scroll("right")}
        className="flex bg-white justify-center p-2 rounded-full shadow-md -translate-y-1/2 absolute dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 items-start right-0 top-1/2 z-10">
        <FaChevronRight className="text-gray-700 dark:text-gray-300" />
      </button>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ServiceBtn;
