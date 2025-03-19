import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  useGetAllServicesQuery,
  useGetAllUsersQuery,
} from "../../feature/service/serviceSlde";
import { useTranslation } from "react-i18next"; // Already included
import "../../i18n"; // Already included

export default function ServiceDetail() {
  const { t } = useTranslation(); // Already included
  const { id } = useParams();
  const { data: serviceData, isLoading, isError } = useGetAllServicesQuery(1);
  const { data: userData } = useGetAllUsersQuery();

  const users = userData?.data?.content || [];
  const services = serviceData?.content || [];
  const service = services.find((item) => String(item.id) === String(id));
  const user = users.find(
    (item) => String(item.id) === String(service?.userId)
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const relatedServices = services.filter((s) => s.id !== service?.id);
  const slidesToShow = { base: 1, sm: 2, md: 3, lg: 4 }; // Responsive slides
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
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

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-12 sm:pt-16 pb-10 sm:pb-20">
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-6 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Left Column: Image Section */}
            <div className="relative">
              <img
                src={
                  service.jobImages[0] ||
                  "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                }
                className="w-full h-64 sm:h-80 md:h-[350px] object-cover"
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span
                className={`absolute top-4 sm:top-6 left-4 sm:left-6 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-white shadow-md ${
                  service.status === "active"
                    ? "bg-green-500"
                    : service.status === "disable"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              >
                {t(service.status)}
              </span>
            </div>

            {/* Right Column: Details Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {service.category.name}
                  </p>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {service.title}
                  </h1>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>

              {user ? (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg mb-4 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-4">
                    {t("serviceProvider")}
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <p>
                      <strong className="font-medium">{t("name")}:</strong> {user.fullName}
                    </p>
                    <p>
                      <strong className="font-medium">{t("email")}:</strong> {user.email}
                    </p>
                    <p>
                      <strong className="font-medium">{t("phone")}:</strong> {user.phone}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 dark:text-red-400 text-sm sm:text-base mb-4 sm:mb-8">
                  {t("providerInfoUnavailable")}
                </p>
              )}
              <button className="w-full bg-indigo-600 dark:bg-indigo-700 text-white font-semibold py-2 sm:py-3 md:py-4 rounded-lg transition-all duration-300 shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-800 hover:shadow-lg text-sm sm:text-base">
                {t("applyNow")}
              </button>
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t("jobDescription")}
            </h2>
            <p className="mt-1 sm:mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {t("jobDescriptionText")}
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t("jobRequirements")}
            </h2>
            <ul className="mt-1 sm:mt-2 list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              <li>{t("req1")}</li>
              <li>{t("req2")}</li>
              <li>{t("req3")}</li>
              <li>{t("req4")}</li>
              <li>{t("req5")}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t("jobResponsibilities")}
            </h2>
            <ul className="mt-1 sm:mt-2 list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              <li>{t("resp1")}</li>
              <li>{t("resp2")}</li>
              <li>{t("resp3")}</li>
              <li>{t("resp4")}</li>
              <li>{t("resp5")}</li>
            </ul>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mt-6 sm:mt-12 mb-6 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t("contactUs")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
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
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {t("phone")}
                </h4>
                <p>{t("phoneNumber")}</p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {t("email")}
                </h4>
                <p>{t("emailAddress")}</p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {t("workingHours")}
                </h4>
                <p>{t("mondayFriday")}</p>
                <p>{t("saturday")}</p>
                <p>{t("sunday")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Carousel */}
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
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="flex min-w-full gap-4 sm:gap-6">
                      {relatedServices
                        .slice(
                          slideIndex * slidesToShow.lg,
                          (slideIndex + 1) * slidesToShow.lg
                        )
                        .map((related) => (
                          <NavLink
                            key={related.id}
                            to={`/freelancer-page/${related.id}`}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                          >
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
                    className="absolute left-0 sm:left-[-40px] md:left-[-50px] top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 bg-opacity-70 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all text-2xl sm:text-6xl"
                  >
                    ‹
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-0 sm:right-[-40px] md:right-[-50px] top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 bg-opacity-70 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all text-2xl sm:text-6xl"
                  >
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