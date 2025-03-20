import React from "react";
import { useGetAllJobsQuery, useGetJobByIdQuery } from "../../feature/job/jobSlide";
import { useParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../../feature/service/serviceSlde";
import { useTranslation } from "react-i18next";
import "../../i18n";

export default function JobDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: jobs, isLoading, isError, error } = useGetJobByIdQuery(id);
  const { data: userData } = useGetAllUsersQuery();

  const jobData = jobs?.content?.find((job) => job.id === id);
  console.log("Job Data", jobData);

  const users = userData?.data?.content || [];
  const jobPoster = users.find((user) => user.id === jobData?.userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-red-500 dark:text-red-400">{t("error")}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">
            {error?.data?.message || t("failedToLoadJob")}
          </p>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t("jobNotFound")}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">{t("jobNotExist")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-10">
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 border-b border-indigo-500 dark:border-indigo-400 pb-6 sm:pb-8">
          {/* Left Column: Job Details */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{jobData.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{jobData.description}</p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-24 sm:w-32 text-sm sm:text-base">{t("budget")}:</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">${jobData.budget}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-24 sm:w-32 text-sm sm:text-base">{t("status")}:</span>
                <span
                  className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm ${
                    jobData.status === "OPEN"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                  }`}
                >
                  {t(jobData.status.toLowerCase())}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-24 sm:w-32 text-sm sm:text-base">{t("postedOn")}:</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {new Date(jobData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {/* Uncomment Apply Button if needed */}
            {/* <div className="mt-4 sm:mt-6">
              <button className="bg-blue-500 dark:bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300 w-full text-sm sm:text-base">
                {t("applyForJob")}
              </button>
            </div> */}
          </div>

          {/* Right Column: Job Poster and Images */}
          <div className="space-y-4 sm:space-y-6">
            {jobPoster && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-4">{t("postedBy")}:</h2>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {jobPoster.profilePicture && (
                    <img
                      src={jobPoster.profilePicture}
                      alt={`${jobPoster.name}'s profile`}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-gray-800 dark:text-white font-semibold text-sm sm:text-base">{jobPoster.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{jobPoster.email}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3 sm:space-y-4">
              {jobData.jobImages?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={t("jobImageAlt", { index: index + 1 })}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("jobDescription")}</h2>
            <p className="mt-1 sm:mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{t("jobDescriptionText")}</p>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("jobRequirements")}</h2>
            <ul className="mt-1 sm:mt-2 list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              <li>{t("req1")}</li>
              <li>{t("req2")}</li>
              <li>{t("req3")}</li>
              <li>{t("req4")}</li>
              <li>{t("req5")}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("jobResponsibilities")}</h2>
            <ul className="mt-1 sm:mt-2 list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              <li>{t("resp1")}</li>
              <li>{t("resp2")}</li>
              <li>{t("resp3")}</li>
              <li>{t("resp4")}</li>
              <li>{t("resp5")}</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 border-t border-indigo-500 dark:border-indigo-400 pt-6 sm:pt-8 pb-6 sm:pb-8">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.631404683705!2d104.89921187452715!3d11.578259843893385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1skm!2skh!4v1741927447451!5m2!1skm!2skh"
              width="100%"
              height="200 sm:250 md:300"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              title={t("locationMap")}
              className="w-full h-48 sm:h-64 md:h-[300px]"
            ></iframe>
          </div>
          <div className="space-y-4 sm:space-y-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{t("phone")}</h4>
              <p>{t("phoneNumber")}</p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{t("email")}</h4>
              <p>{t("emailAddress")}</p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{t("workingHours")}</h4>
              <p>{t("mondayFriday")}</p>
              <p>{t("saturday")}</p>
              <p>{t("sunday")}</p>
            </div>
          </div>
        </div>

        {/* Employee Benefits */}
        <div className="pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("employeeBenefits")}</h2>
          <ul className="mt-1 sm:mt-2 list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>{t("benefit1")}</li>
            <li>{t("benefit2")}</li>
            <li>{t("benefit3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}