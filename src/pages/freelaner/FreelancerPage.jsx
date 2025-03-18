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
        {/* <section className="mb-10">
          <CustomCarousel />
        </section> */}

        {/* Existing Title Section */}
        <section className="border-b-2 py-1">
          <h2 className="text-3xl font-bold">
            Explore The Service Of Freelancer
          </h2>
        </section>

        {/* Existing CardJob Grid Section */}
        <section className="mt-10">
          <CardServices page={currentPage} />
        </section>

        {/* Existing Pagination Section */}
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
