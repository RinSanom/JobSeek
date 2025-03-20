import React, { useState } from "react";
import {
  FaUserAlt,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import { useGetMeQuery } from "../../feature/auth/authSlide";
import { MdError, MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetMyOwnJobsQuery } from "../../feature/job/jobSlide";
import {
  useDeleteBookmarkMutation,
  useGetMyBookmarkQuery,
} from "../../feature/bookmark/bookmarkSlide";
import { useTranslation } from "react-i18next";
import "../../i18n";

const BusinessProfile = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetMeQuery();
  const {
    data: myServices,
    isLoading: servicesLoading,
    error: servicesError,
  } = useGetMyOwnJobsQuery();
  const {
    data: wishlistData,
    isLoading: wishlistLoading,
    error: wishlistError,
  } = useGetMyBookmarkQuery();
  console.log("My Wish List", wishlistData);

  const wishlistItems = wishlistData || [];
  const service = myServices?.content || [];

  console.log("Me As Business owner: ", data);
  console.log("My Services: ", myServices);
  console.log("Wishlist Items: ", wishlistItems);

  const [deleteService, { isLoading: deleteBookmarkLoading }] =
    useDeleteBookmarkMutation();
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllWishlist, setShowAllWishlist] = useState(false);

  const userData = data?.data || {};

  const handleDeleteWishlist = async (bookmarkId) => {
    if (confirm(t("confirmDeleteWishlist"))) {
      try {
        await deleteService(bookmarkId);
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <MdError className="text-4xl sm:text-5xl mb-3 sm:mb-4 mx-auto text-red-500 dark:text-red-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t("unableToLoadProfile")}</h1>
          <p className="mt-1 sm:mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("profileLoadError")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-6 sm:pb-10">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
            <div className="relative">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                {userData.profileImageUrl ? (
                  <img
                    src={userData.profileImageUrl}
                    alt={userData.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                    <span className="text-blue-800 dark:text-blue-300 text-2xl sm:text-4xl font-bold">
                      {userData.fullName?.charAt(0) || "B"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{userData.fullName}</h1>
              <p className="text-blue-100 dark:text-blue-200 text-base sm:text-lg mt-1">
                {userData.userType === "BUSINESS_OWNER" ? t("businessOwner") : userData.userType}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mt-2 sm:mt-3">
                {userData.companyName && (
                  <div className="flex items-center">
                    <FaBuilding className="mr-1 sm:mr-2 text-sm sm:text-base" />
                    <span className="text-sm sm:text-base">{userData.companyName}</span>
                  </div>
                )}
                {userData.industry && (
                  <div className="flex items-center">
                    <FaUserAlt className="mr-1 sm:mr-2 text-sm sm:text-base" />
                    <span className="text-sm sm:text-base">{userData.industry}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Uncomment if needed */}
            {/* <div className="md:ml-auto flex gap-2 sm:gap-3">
              <Link
                to="/create-job"
                className="bg-indigo-600 dark:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition flex items-center text-sm sm:text-base"
              >
                <MdAdd className="mr-1" />
                {t("addService")}
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Contact Info */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6 border-b pb-2 sm:pb-3">{t("contactInformation")}</h2>
              <div className="space-y-4 sm:space-y-5">
                {userData.email && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                      <FaEnvelope className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("email")}</p>
                      <p className="text-gray-800 dark:text-white text-sm sm:text-base">{userData.email}</p>
                    </div>
                  </div>
                )}
                {userData.phone && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                      <FaPhone className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("phone")}</p>
                      <p className="text-gray-800 dark:text-white text-sm sm:text-base">{userData.phone}</p>
                    </div>
                  </div>
                )}
                {userData.companyWebsite && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                      <FaGlobe className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("website")}</p>
                      <a
                        href={userData.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm sm:text-base"
                      >
                        {userData.companyWebsite}
                      </a>
                    </div>
                  </div>
                )}
                {userData.createdAt && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                      <FaCalendarAlt className="text-indigo-600 dark:text-blue-300 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("joinedAt")}</p>
                      <p className="text-gray-800 dark:text-white text-sm sm:text-base">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Services and Wishlist */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8">
            {/* My Services Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("myServices")}</h2>
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-sm sm:text-base"
                >
                  {showAllServices ? t("showLess") : t("viewAll")}
                </button>
              </div>

              {servicesLoading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
                  <p className="ml-2 sm:ml-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("loading")}</p>
                </div>
              )}

              {servicesError && (
                <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <MdError className="text-4xl sm:text-5xl mb-3 sm:mb-4 mx-auto text-red-500 dark:text-red-400" />
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t("unableToLoadServices")}</h1>
                  <p className="mt-1 sm:mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("servicesLoadError")}</p>
                  <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition text-sm sm:text-base">
                    {t("retry")}
                  </button>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {service
                  .slice(0, showAllServices ? service.length : 2)
                  .map((serviceItem) => (
                    <div
                      key={serviceItem.id}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col sm:flex-row"
                    >
                      <div className="relative w-full sm:w-48 md:w-[300px] h-40 sm:h-36 md:h-[200px] flex-shrink-0">
                        <img
                          src={
                            serviceItem.jobImages && serviceItem.jobImages.length > 0
                              ? serviceItem.jobImages[0]
                              : "https://via.placeholder.com/300"
                          }
                          alt={serviceItem.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3 sm:p-4 flex-1">
                        <div className="border-b pb-2 sm:pb-3">
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {new Date(serviceItem.createdAt).toLocaleDateString()}
                          </span>
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mt-1 sm:mt-2 line-clamp-1">
                            {serviceItem.title}
                          </h3>
                        </div>
                        <p className="mt-2 sm:mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-2">
                          {serviceItem.description}
                        </p>
                        <div className="flex justify-between items-center mt-3 sm:mt-4">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm sm:text-base">
                            ${serviceItem.budget}/{t("perMonth")}
                          </span>
                          <Link
                            to={`/freelancer-page/${serviceItem.id}`}
                            className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm sm:text-base"
                          >
                            {t("viewDetails")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* My Wishlist Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6 border-b-2 pb-2 sm:pb-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("myWishlist")}</h2>
                <button
                  onClick={() => setShowAllWishlist(!showAllWishlist)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-sm sm:text-base"
                >
                  {showAllWishlist ? t("showLess") : t("viewAll")}
                </button>
              </div>

              {wishlistLoading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
                  <p className="ml-2 sm:ml-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("loading")}</p>
                </div>
              )}

              {wishlistError && (
                <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <MdError className="text-4xl sm:text-5xl mb-3 sm:mb-4 mx-auto text-red-500 dark:text-red-400" />
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t("unableToLoadWishlist")}</h1>
                  <p className="mt-1 sm:mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("wishlistLoadError")}</p>
                  <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition text-sm sm:text-base">
                    {t("retry")}
                  </button>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {(showAllWishlist ? wishlistItems : wishlistItems.slice(0, 2)).map((wishlistItem) => (
                  <div
                    key={wishlistItem.id}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col sm:flex-row"
                  >
                    <div className="relative w-full sm:w-48 md:w-[300px] h-40 sm:h-36 md:h-[200px] flex-shrink-0">
                      <img
                        src={
                          wishlistItem.service.jobImages && wishlistItem.service.jobImages.length > 0
                            ? wishlistItem.service.jobImages[0]
                            : "https://via.placeholder.com/300"
                        }
                        alt={wishlistItem.service.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3 sm:p-4 flex-1">
                      <div className="border-b pb-2 sm:pb-3">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {t("addedOn")} {new Date(wishlistItem.service.createdAt).toLocaleDateString()}
                        </span>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mt-1 sm:mt-2 line-clamp-1">
                          {wishlistItem.service.title}
                        </h3>
                      </div>
                      <p className="mt-2 sm:mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-2">
                        {wishlistItem.service.description}
                      </p>
                      <div className="flex items-center mt-3 sm:mt-4 gap-3 sm:gap-4">
                        <Link
                          to={`/freelancer-page/${wishlistItem.id}`}
                          className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm sm:text-base"
                        >
                          {t("viewDetails")}
                        </Link>
                        <button
                          onClick={() => handleDeleteWishlist(wishlistItem.id)}
                          disabled={deleteBookmarkLoading}
                          className="text-red-600 dark:text-red-400 hover:underline text-sm sm:text-base"
                        >
                          {deleteBookmarkLoading ? t("deleting") : t("deleteBookmark")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;