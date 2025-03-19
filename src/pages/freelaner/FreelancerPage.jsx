// pages/FreelancerPage.jsx
import React, { useState } from "react";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import CustomCarousel from "../../components/carousel/CustomCarousel"; // Adjust path as needed
import CardServices from "../../components/cards/Freelancer/CardServices";

export default function FreelancerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Ideally, this should be dynamic from API response

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <ScrollIndicator />
      <main className="max-w-screen-xl mx-auto p-4">
        <section className="py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            What The Business Owner Needs.
          </h2>
          <p className="text-sm sm:text-base md:text-md mt-2 sm:mt-3 text-gray-600 dark:text-gray-300">
            Find the best Job for your business. Post a job and get the best
            candidates to work for you
          </p>
        </section>

        {/* Dropdown for category filtering */}
        {/* <section className="border-b-2 border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row mt-3 sm:mt-4 justify-between items-start sm:items-center gap-3 sm:gap-0 pb-3 sm:pb-4">
          <div className="w-full sm:w-auto">
            <Dropdown
              className="dark:text-white"
              options={dropdownOptions}
              onChange={handleCategoryChange}
              placeholder="Select a category"
            />
          </div>
        </section> */}
        <section className="mt-10">
          <CardServices page={currentPage} />
        </section>
        <section>
          <ol className="flex justify-center gap-2 mt-4">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-500 hover:text-white"
                }`}>
                Prev
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}>
                    {page}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 border rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-500 hover:text-white"
                }`}>
                Next
              </button>
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
