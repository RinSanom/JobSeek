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
          className="relative block rounded-tr-3xl border border-gray-100 dark:border-gray-700"
        >
          {/* Date Badge */}
          <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-4 py-2 sm:px-6 sm:py-4 font-medium uppercase tracking-widest text-white">
            {jobData.publishedDate}
          </span>

          {/* Image */}
          <img
            src={jobData.imageUrl}
            alt={jobData.companyName}
            className="h-48 sm:h-64 md:h-80 w-full rounded-tr-3xl object-cover"
          />

          {/* Content */}
          <div className="p-3 sm:p-4 text-start">
            <strong className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100">
              {t(jobData.companyType)}
            </strong>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-pretty text-white dark:text-gray-300 line-clamp-2">
              {t(jobData.role)}
            </p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-pretty text-white dark:text-gray-300 line-clamp-2">
              {t(jobData.companyDescription)} {t(jobData.companyDescriptionKey)}
            </p>

            {/* Learn More Button */}
            <span className="mt-3 sm:mt-4 block text-center rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900 dark:border-indigo-500 dark:bg-indigo-500 dark:hover:bg-gray-800 dark:hover:text-indigo-300">
              {t("learnMore")}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}