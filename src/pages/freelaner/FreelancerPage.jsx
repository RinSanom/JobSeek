// pages/FreelancerPage.jsx
import React, { useState } from "react";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import CardServices from "../../components/cards/Freelancer/CardServices";
import ServiceBtn from "../../components/button/ServiceBtn";
import { useGetAllCategoriesQuery } from "../../feature/service/serviceSlde";

export default function FreelancerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Ideally, this should be dynamic from API response

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { data, isLoading } = useGetAllCategoriesQuery();
  const allCategories = data?.data || [];

  return (
    <>
      <ScrollIndicator />
      <main className="p-4 max-w-screen-xl mx-auto">
        <section className="py-4 sm:py-6">
          <h2 className="text-gray-900 text-xl dark:text-white font-bold md:text-3xl sm:text-2xl">
            Find the best services for your business
          </h2>
          <p className="text-gray-600 text-sm dark:text-gray-300 md:text-md mt-2 sm:mt-3 sm:text-base">
            Find the best services for your business. Post a job and get the
            best
          </p>
        </section>

        <section className="border-b-2 border-gray-300 dark:border-gray-700 mt-3 pb-3 sm:mt-4 sm:pb-4">
          <ServiceBtn categories={allCategories} />
        </section>

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
