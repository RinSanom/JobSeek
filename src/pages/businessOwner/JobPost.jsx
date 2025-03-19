import React, { useState } from "react";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import CardJob from "../../components/cards/businessOwner/CardJob";
import { useGetAllJobsQuery } from "../../feature/job/jobSlide";
import Dropdown from "../../components/Dropdown";
import { useGetAllCategoriesQuery } from "../../feature/service/serviceSlde";

export default function JobPost() {
  const { data: jobsData } = useGetAllJobsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { data: categoryData, isLoading, isError } = useGetAllCategoriesQuery();
  const allCategories = categoryData?.data || [];

  const dropdownOptions = allCategories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const filteredJobs = selectedCategory
    ? jobsData?.data.filter((job) => job.category === selectedCategory)
    : jobsData?.data;

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  return (
    <>
      <ScrollIndicator />
      <main className="max-w-full sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <section className="py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            What The Business Owner Needs.
          </h2>
          <p className="text-sm sm:text-base md:text-md mt-2 sm:mt-3 text-gray-600 dark:text-gray-300">
            Find the best Job for your business. Post a job and get the best candidates to work for you
          </p>
        </section>

        {/* Dropdown for category filtering */}
        <section className="border-b-2 border-gray-300  dark:border-gray-700 flex flex-col sm:flex-row mt-3 sm:mt-4 justify-between items-start sm:items-center gap-3 sm:gap-0 pb-3 sm:pb-4">
          <div className="w-full sm:w-auto">
            <Dropdown
            className="dark:text-white"
              options={dropdownOptions}
              onChange={handleCategoryChange}
              placeholder="Select a category"
            />
          </div>
          {/* Uncomment and adjust search bar if needed */}
          {/* <div className="w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 sm:ps-3 text-sm pointer-events-none">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 sm:p-4.5 ps-8 sm:ps-10 text-sm text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
                placeholder="Search for services"
                required
              />
            </div>
          </div> */}
        </section>

        <section className="mt-4 sm:mt-7">
          <CardJob jobs={filteredJobs} page={currentPage} />
        </section>

        <section>
          <ol className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-3 sm:mt-4">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-600 text-sm sm:text-base rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Prev
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-600 text-sm sm:text-base rounded-md ${
                      currentPage === page
                        ? "bg-indigo-500 dark:bg-indigo-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-gray-600 text-sm sm:text-base rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}