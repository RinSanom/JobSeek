import React, { useState } from "react";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import CardJob from "../../components/cards/businessOwner/CardJob";
import { useGetAllJobsQuery } from "../../feature/job/jobSlide";
import Dropdown from "../../components/Dropdown";
import { useGetAllCategoriesQuery } from "../../feature/service/serviceSlde";

export default function JobPost() {
  const { data: jobsData } = useGetAllJobsQuery(); // Fetch all jobs
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { data: categoryData, isLoading, isError } = useGetAllCategoriesQuery(); // Fetch all categories
  const allCategories = categoryData?.data || [];

  // Dropdown options for categories
  const dropdownOptions = allCategories.map((category) => ({
    label: category.name,
    value: category._id, // Assuming each category has a unique `_id`
  }));

  // Filter jobs based on the selected category
  const filteredJobs = selectedCategory
    ? jobsData?.data.filter((job) => job.category === selectedCategory)
    : jobsData?.data;

  // Handle category selection from the dropdown
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value); // Update the selected category
  };

  return (
    <>
      <ScrollIndicator />
      <main className="max-w-screen-xl mx-auto p-4">
        <section className="   py-1">
          <h2 className="text-3xl font-bold">What The Business Owner Needs.</h2>
          <p className="text-md mt-3">
            Find the best Job for your business. Post a job and get the best
            candidates to work for you
          </p>
        </section>
        {/* Dropdown for category filtering */}
        <section className="border-b-2 flex mt-4 justify-between items-center">
         <div>
         <Dropdown
            options={dropdownOptions}
            onChange={handleCategoryChange}
            placeholder="Select a category"
          />
         </div>
          <div>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 text-sm pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4.5 ps-10 text-sm text-gray-900 border-2 border-gray-300  bg-gray-50 "
                  placeholder="Search for services"
                  required
                />

              </div>
          </div>
        </section>
        <section className="mt-7">
          {/* Pass filtered jobs to CardJob component */}
          <CardJob jobs={filteredJobs} page={currentPage} />
        </section>
        <section>
          <ol className="flex justify-center gap-2 mt-4">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 border ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                    className={`px-3 py-2 border ${
                      currentPage === page ? "bg-blue-500 text-white" : ""
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
                className={`px-3 py-2 border ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
