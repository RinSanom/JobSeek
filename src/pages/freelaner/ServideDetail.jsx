import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  useGetAllServicesQuery,
  useGetAllUsersQuery,
  useGetFreelancerServiceQuery,
} from "../../feature/service/serviceSlde";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { useCreateBookmarkMutation } from "../../feature/bookmark/bookmarkSlide";
import { FaCalendarAlt, FaEnvelope, FaGlobe, FaPhone, FaUser, FaBriefcase, FaCode } from "react-icons/fa";

export default function ServiceDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: serviceData } = useGetAllServicesQuery(1);
  const { data: userData } = useGetAllUsersQuery();
  const { data, isLoading, isError } = useGetAllServicesQuery();
  const { data: freelancerSevicePost } = useGetFreelancerServiceQuery();

  const servicess = data?.content || [];
  const userss = freelancerSevicePost?.data?.content || [];
  const servicesWithPoster = servicess.map((service) => {
    const jobPoster = userss.find((user) => user.id === service.userId);
    return {
      ...service,
      poster: jobPoster || null,
    };
  });

  const users = userData?.data?.content || [];
  const services = serviceData?.content || [];
  const service = services.find((item) => String(item.id) === String(id));
  const user = users.find(
    (item) => String(item.id) === String(service?.userId)
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const relatedServices = services.filter((s) => s.id !== service?.id);
  const slidesToShow = { base: 1, sm: 2, md: 3, lg: 4 };
  const totalSlides = Math.ceil(relatedServices.length / slidesToShow.lg);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
          <p className="text-red-600 dark:text-red-400 text-base sm:text-lg font-medium">
            {t("errorLoadingService")}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
            {t("tryAgainLater")}
          </p>
        </div>
      </div>
    );
  }

  const jobPoster = servicesWithPoster.find(
    (item) => String(item.id) === String(id)
  )?.poster;

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen pt-12 sm:pt-16 pb-10 sm:pb-20">
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-6 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Left Column: Image Section */}
            <div className="relative">
              <img
                src={
                  service.jobImages[0] ||
                  "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                }
                className="w-full h-64 sm:h-80 md:h-[350px] object-cover transform transition-transform duration-500 hover:scale-105"
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span
                className={`absolute top-4 sm:top-6 left-4 sm:left-6 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-white shadow-lg ${
                  service.status === "active"
                    ? "bg-green-500"
                    : service.status === "disable"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}>
                {t(service.status)}
              </span>
            </div>
            {/* Right Column: Details Section */}
            {jobPoster && (
              <div className="p-4 sm:p-6 md:p-8">
                <NavLink to={`/freelancer-profile/${jobPoster.id}`}>
                  <div className="flex items-center gap-4 mb-4 hover:opacity-80 transition-opacity">
                    <img
                      src={
                        jobPoster.profileImageUrl ||
                        "https://via.placeholder.com/150"
                      }
                      alt={jobPoster.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {jobPoster.fullName}
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {jobPoster.userType}
                      </p>
                    </div>
                  </div>
                </NavLink>
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h1>
                  <p className="text-xs sm:text-sm mt-2 text-gray-600 dark:text-gray-400">
                    {service.category.name}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact and Information Section */}
        <section className="border-t-2 border-gray-300 dark:border-gray-700 py-6 sm:py-8 mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {jobPoster && (
            <>
              {/* Contact Section */}
              <div className="  ">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t("Contact")} {jobPoster.fullName}
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  {jobPoster.email && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <FaEnvelope className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("email")}
                        </p>
                        <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                          {jobPoster.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.phone && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <FaPhone className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("phone")}
                        </p>
                        <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                          {jobPoster.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.address && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <FaGlobe className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("address")}
                        </p>
                        <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                          {jobPoster.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Information Section */}
              <div className="">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t("Information")} {jobPoster.fullName}
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  {jobPoster.fullName && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <FaUser className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("Full Name")}
                        </p>
                        <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                          {jobPoster.fullName}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.experienceYears && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <FaBriefcase className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("Experience")}
                        </p>
                        <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                          {jobPoster.experienceYears} {t("years")}
                        </p>
                      </div>
                    </div>
                  )}
                  {jobPoster.skills && (
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <FaCode className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("Skills")}
                        </p>
                        <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                          {jobPoster.skills}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {t("exploreSimilarServices")}
              </h3>
              <div className="w-16 sm:w-24 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-1 sm:mt-2"></div>
            </div>
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="flex min-w-full gap-4 sm:gap-6">
                      {relatedServices
                        .slice(
                          slideIndex * slidesToShow.lg,
                          (slideIndex + 1) * slidesToShow.lg
                        )
                        .map((related) => (
                          <NavLink
                            key={related.id}
                            to={`/freelancer-page/${related.id}`}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                              <div className="relative overflow-hidden">
                                <img
                                  src={
                                    related.jobImages[0] ||
                                    "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                                  }
                                  className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                  alt={related.title}
                                />
                              </div>
                              <div className="p-3 sm:p-4">
                                <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                  {related.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {related.description}
                                </p>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {totalSlides > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-0 sm:left-[-40px] md:left-[-50px] top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 bg-opacity-70 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all text-2xl sm:text-6xl">
                    ‹
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-0 sm:right-[-40px] md:right-[-50px] top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 bg-opacity-70 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all text-2xl sm:text-6xl">
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}