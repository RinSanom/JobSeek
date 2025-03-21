import React, { useEffect } from "react";
import jobListings from "../../data/mockData";
import { useTranslation } from "react-i18next";
import Aos from "aos";

export default function PopularCart() {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({ duration: 700, once: false });
  }, []);

  return (
    <>
      {jobListings.slice(0, 3).map((jobData, index) => (
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          key={index}
          className="border border-gray-100 rounded-tr-3xl block dark:border-gray-700 relative"
        >
          {/* Date Badge */}
          <span className="bg-rose-600 rounded-bl-3xl rounded-tr-3xl text-black -right-px -top-px absolute dark:text-white font-medium px-4 py-2 sm:px-6 sm:py-4 tracking-widest uppercase">
            {jobData.publishedDate}
          </span>

          {/* Image */}
          <img
            src={jobData.imageUrl}
            alt={jobData.companyName}
            className="h-48 rounded-tr-3xl w-full md:h-80 object-cover sm:h-64"
          />

          {/* Content */}
          <div className="p-3 text-start sm:p-4">
            <strong className="text-gray-900 text-lg dark:text-gray-100 font-medium sm:text-xl">
              {t(jobData.companyType)}
            </strong>
            <p className="text-black text-pretty text-sm dark:text-gray-300 line-clamp-2 mt-1 sm:mt-2 sm:text-base">
              {t(jobData.role)}
            </p>
            <p className="text-black text-pretty text-sm dark:text-gray-300 line-clamp-2 mt-1 sm:mt-2 sm:text-base">
              {t(jobData.companyDescription)} {t(jobData.companyDescriptionKey)}
            </p>

            {/* Learn More Button */}
            <span className="bg-indigo-900 border border-indigo-900 rounded-md text-center text-white text-xs block dark:bg-indigo-500 dark:border-indigo-500 dark:hover:bg-gray-800 dark:hover:text-indigo-300 font-medium hover:bg-white hover:text-indigo-900 mt-3 px-4 py-2 sm:mt-4 sm:px-5 sm:py-3 sm:text-sm tracking-widest transition-colors uppercase">
              {t("learnMore")}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}