import React from "react";
import {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
} from "../../feature/job/jobSlide";
import { NavLink, useParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../../feature/service/serviceSlde";
import { useTranslation } from "react-i18next";
import "../../i18n";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaUser,
} from "react-icons/fa";

export default function JobDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: jobs, isLoading, isError, error } = useGetJobByIdQuery(id);
  const { data: userData } = useGetAllUsersQuery();

  const jobData = jobs?.content?.find((job) => job.id === id);
  console.log("Job Data", jobData);

  const users = userData?.data?.content || [];
  const jobPoster = users.find((user) => user.id === jobData?.userId);
  console.log("Job Poster", jobPoster);

  if (isLoading) {
    return (
      <div className="flex bg-gray-50 justify-center dark:bg-gray-900 items-center min-h-screen">
        <div className="flex gap-2 items-center sm:gap-4">
          <div className="border-b-2 border-blue-500 border-t-2 h-8 rounded-full w-8 animate-spin dark:border-blue-400 sm:h-12 sm:w-12"></div>
          <p className="text-gray-600 text-sm dark:text-gray-300 sm:text-base">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex bg-gray-50 justify-center dark:bg-gray-900 items-center min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center dark:bg-gray-800 sm:p-6">
          <h1 className="text-red-500 text-xl dark:text-red-400 font-bold sm:text-2xl">
            {t("error")}
          </h1>
          <p className="text-gray-600 text-sm dark:text-gray-400 mt-1 sm:mt-2 sm:text-base">
            {error?.data?.message || t("failedToLoadJob")}
          </p>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex bg-gray-50 justify-center dark:bg-gray-900 items-center min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center dark:bg-gray-800 sm:p-6">
          <h1 className="text-gray-800 text-xl dark:text-white font-bold sm:text-2xl">
            {t("jobNotFound")}
          </h1>
          <p className="text-gray-600 text-sm dark:text-gray-400 mt-1 sm:mt-2 sm:text-base">
            {t("jobNotExist")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 sm:py-10">
      <div className="lg:max-w-6xl lg:px-8 max-w-full md:max-w-5xl mx-auto px-4 sm:max-w-3xl sm:px-6 xl:max-w-7xl">
        <div className="grid grid-cols-1 border-b border-indigo-500 dark:border-indigo-400 gap-4 md:gap-8 md:grid-cols-2 pb-6 sm:gap-6 sm:pb-8">
          <div className="sm:space-y-6 space-y-4">
            <div className="sm:space-y-4 space-y-3">
              {jobData.jobImages?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={t("jobImageAlt", { index: index + 1 })}
                  className="h-48 rounded-lg w-full md:h-64 object-cover sm:h-56"
                />
              ))}
            </div>
          </div>
          <div className="sm:space-y-6 space-y-4">
            {jobPoster && (
              <>
                <NavLink to={`/bussiness-owner-profile/${jobPoster.id}`}>
                  <div className="flex sm:space-y-6 space-y-4">
                    {jobPoster && (
                      <>
                        {jobPoster.profileImageUrl ? (
                          <img
                            src={jobPoster.profileImageUrl}
                            alt={`${jobPoster.fullName}'s profile`}
                            className="border-4 border-indigo-100 h-24 rounded-full w-24 dark:border-indigo-900 object-cover"
                          />
                        ) : (
                          <div className="flex bg-indigo-100 h-24 justify-center rounded-full w-24 dark:bg-indigo-900 items-center">
                            <span className="text-2xl text-indigo-500 dark:text-indigo-300 font-bold">
                              {jobPoster.fullName
                                ? jobPoster.fullName.charAt(0).toUpperCase()
                                : "U"}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    <div className="ml-4 space-y-1">
                      <h3 className="text-gray-800 text-lg dark:text-white font-bold mt-2">
                        {jobPoster.fullName}
                      </h3>
                      <p className="text-indigo-600 text-sm dark:text-indigo-400">
                        {jobPoster.userType || t("employer")}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </>
            )}
            <div className="sm:space-y-2 space-y-2">
              <h1 className="text-gray-800 text-xl dark:text-white font-bold md:text-3xl sm:text-2xl">
                {jobData.title}
              </h1>
              <p className="text-gray-600 text-sm dark:text-gray-300 sm:text-base">
                {jobData.description}
              </p>{" "}
              <div className="flex items-center">
                <span className="text-gray-700 text-sm w-24 dark:text-gray-300 font-semibold sm:text-base sm:w-32">
                  {t("budget")}:
                </span>
                <span className="text-gray-600 text-sm dark:text-gray-400 sm:text-base">
                  ${jobData.budget}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Job Poster and Images */}
        </div>
        <section className="grid grid-cols-1 border-gray-300 border-t-2 dark:border-gray-700 gap-6 lg:grid-cols-3 mb-6 md:grid-cols-2 py-6 sm:gap-8 sm:mb-8 sm:py-8">
          {jobPoster && (
            <>
              {/* Contact Section */}
              <div className="  ">
                <h3 className="text-gray-900 text-lg dark:text-white font-semibold mb-4 sm:mb-6 sm:text-2xl">
                  {t("Contact")} {jobPoster.fullName}
                </h3>
                <div className="sm:space-y-5 space-y-4">
                  {jobPoster.email && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                        <FaEnvelope className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("email")}
                        </p>
                        <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                          {jobPoster.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.phone && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                        <FaPhone className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("phone")}
                        </p>
                        <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                          {jobPoster.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.companyWebsite && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                        <FaGlobe className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("address")}
                        </p>
                        <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                          {jobPoster.companyWebsite}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Information Section */}
              <div className="">
                <h3 className="text-gray-900 text-lg dark:text-white font-semibold mb-4 sm:mb-6 sm:text-2xl">
                  {t("Information")} {jobPoster.fullName}
                </h3>
                <div className="sm:space-y-5 space-y-4">
                  {jobPoster.fullName && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                        <FaUser className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("Full Name")}
                        </p>
                        <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                          {jobPoster.fullName}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.companyName && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                        <FaCode className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("companyName")}
                        </p>
                        <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                          {jobPoster.companyName}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.industry && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                        <FaBriefcase className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("industry")}
                        </p>
                        <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                          {jobPoster.industry}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
        {/* Contact Section */}
        <div className="grid grid-cols-1 border-indigo-500 border-t dark:border-indigo-400 gap-4 md:gap-8 md:grid-cols-2 mt-8 pb-6 pt-6 sm:gap-6 sm:mt-12 sm:pb-8 sm:pt-8">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.631404683705!2d104.89921187452715!3d11.578259843893385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1skm!2skh!4v1741927447451!5m2!1skm!2skh"
              width="100%"
              height="200 sm:250 md:300"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              title={t("locationMap")}
              className="h-48 w-full md:h-[300px] sm:h-64"></iframe>
          </div>
          <div className="text-gray-700 text-sm dark:text-gray-300 sm:space-y-6 sm:text-base space-y-4">
            <div>
              <h4 className="text-base text-gray-900 dark:text-white font-semibold mb-1 sm:mb-2 sm:text-lg">
                {t("phone")}
              </h4>
              <p>{t("phoneNumber")}</p>
            </div>
            <div>
              <h4 className="text-base text-gray-900 dark:text-white font-semibold mb-1 sm:mb-2 sm:text-lg">
                {t("email")}
              </h4>
              <p>{t("emailAddress")}</p>
            </div>
            <div>
              <h4 className="text-base text-gray-900 dark:text-white font-semibold mb-1 sm:mb-2 sm:text-lg">
                {t("workingHours")}
              </h4>
              <p>{t("mondayFriday")}</p>
              <p>{t("saturday")}</p>
              <p>{t("sunday")}</p>
            </div>
          </div>
        </div>

        {/* Employee Benefits */}
        <div className="pt-6 sm:pt-8">
          <h2 className="text-gray-800 text-lg dark:text-white font-semibold sm:text-xl">
            {t("employeeBenefits")}
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm dark:text-gray-300 mt-1 sm:mt-2 sm:space-y-2 sm:text-base space-y-1">
            <li>{t("benefit1")}</li>
            <li>{t("benefit2")}</li>
            <li>{t("benefit3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
