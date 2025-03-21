// pages/JobPost.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Added for i18n
import "../../i18n"; // Ensure i18n is imported (adjust path as needed)
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import CardJob from "../../components/cards/businessOwner/CardJob";
import { useGetAllJobsQuery } from "../../feature/job/jobSlide";
import Dropdown from "../../components/Dropdown";
import { useGetAllCategoriesQuery } from "../../feature/service/serviceSlde";

export default function JobPost() {
  const { t } = useTranslation(); // Hook for translations
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetAllJobsQuery();
  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoriesQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 10; // Number of jobs to display per page

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  console.log("Job Business Owner: ", jobsData);
  console.log("Category Business Owner: ", categoryData);

  const allCategories = categoryData?.data || [];
  const dropdownOptions = allCategories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const filteredJobs = selectedCategory
    ? jobsData?.data.filter((job) => job.category === selectedCategory)
    : jobsData?.data;

  // Calculate total pages dynamically
  const totalPages = Math.ceil((filteredJobs?.length || 0) / itemsPerPage);

  // Slice the jobs for the current page
  const paginatedJobs = filteredJobs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  // Loading state
  if (isJobsLoading || isCategoriesLoading) {
    return <div className="text-center py-8">{t("loading")}</div>;
  }

  // Error state
  if (isJobsError || isCategoriesError) {
    return (
      <div className="text-center py-8 text-red-500">
        {t("errorLoadingData")}
      </div>
    );
  }

  // No jobs found state
  if (filteredJobs?.length === 0) {
    return (
      <div className="text-center py-8">
        {t("noJobsFound")}
      </div>
    );
  }

  return (
    <>
      <ScrollIndicator />
      <main className="max-w-full sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <section className="py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t("businessOwnerNeedsTitle")}
          </h2>
          <p className="text-sm sm:text-base md:text-md mt-2 sm:mt-3 text-gray-600 dark:text-gray-300">
            {t("businessOwnerNeedsDesc")}
          </p>
        </section>

        {/* Dropdown for category filtering */}
        <section className="border-b-2 border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row mt-3 sm:mt-4 justify-between items-start sm:items-center gap-3 sm:gap-0 pb-3 sm:pb-4">
          <div className="w-full sm:w-auto">
            <Dropdown
              className="dark:text-white"
              options={dropdownOptions}
              onChange={handleCategoryChange}
              placeholder={t("selectCategory")}
            />
          </div>
        </section>
        {/* Job List */}
        <section className="mt-4 sm:mt-7">
          <CardJob jobs={paginatedJobs} />
        </section>

        {/* Pagination */}
        <section>
          <ol className="flex justify-center gap-2 mt-4">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label={t("prevPageAria")}
                className={`px-3 py-2 border rounded transition-colors duration-200 ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {t("prev")}
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    aria-label={t("pageAria", { page })}
                    className={`px-3 py-2 border rounded transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
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
                aria-label={t("nextPageAria")}
                className={`px-3 py-2 border rounded transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {t("next")}
              </button>
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}