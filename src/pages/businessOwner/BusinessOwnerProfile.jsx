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

  const wishlistItems = wishlistData || [];
  const service = myServices?.content || [];



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
      <div className="flex bg-gray-50 justify-center dark:bg-gray-900 items-center min-h-screen">
        <div className="flex gap-2 items-center sm:gap-4">
          <div className="border-b-2 border-indigo-500 border-t-2 h-8 rounded-full w-8 animate-spin dark:border-indigo-400 sm:h-12 sm:w-12"></div>
          <p className="text-gray-600 text-sm dark:text-gray-300 sm:text-base">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center lg:max-w-7xl lg:px-8 max-w-full md:max-w-5xl min-h-screen mx-auto px-4 sm:max-w-3xl sm:px-6">
        <div className="bg-white p-4 rounded-xl shadow-lg text-center dark:bg-gray-800 sm:p-6">
          <MdError className="text-4xl text-red-500 dark:text-red-400 mb-3 mx-auto sm:mb-4 sm:text-5xl" />
          <h1 className="text-gray-800 text-xl dark:text-white font-bold sm:text-2xl">
            {t("unableToLoadProfile")}
          </h1>
          <p className="text-gray-600 text-sm dark:text-gray-300 mt-1 sm:mt-2 sm:text-base">
            {t("profileLoadError")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-6 sm:pb-10">
      {/* Profile Header */}
      <div className="bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-center bg-cover bg-gradient-to-r bg-no-repeat text-white from-blue-900 to-blue-700">
        <div className="lg:max-w-7xl lg:px-8 max-w-full md:max-w-5xl mx-auto px-4 py-8 sm:max-w-3xl sm:px-6 sm:py-12">
          <div className="flex flex-col items-center lg:space-x-8 md:flex-row md:items-end md:space-x-6 md:space-y-0 space-y-4">
            <div className="relative">
              <div className="bg-white border-4 border-white h-24 rounded-full shadow-xl w-24 overflow-hidden sm:h-32 sm:w-32">
                {userData.profileImageUrl ? (
                  <img
                    src={userData.profileImageUrl}
                    alt={userData.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex bg-blue-100 h-full justify-center w-full dark:bg-blue-900 items-center">
                    <span className="text-2xl text-blue-800 dark:text-blue-300 font-bold sm:text-4xl">
                      {userData.fullName?.charAt(0) || "B"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl font-bold md:text-3xl sm:text-2xl">
                {userData.fullName}
              </h1>
              <p className="text-base text-blue-100 dark:text-blue-200 mt-1 sm:text-lg">
                {userData.userType === "BUSINESS_OWNER"
                  ? t("businessOwner")
                  : userData.userType}
              </p>
              <div className="flex flex-wrap justify-center gap-3 items-center md:justify-start mt-2 sm:gap-4 sm:mt-3">
                {userData.companyName && (
                  <div className="flex items-center">
                    <FaBuilding className="text-sm mr-1 sm:mr-2 sm:text-base" />
                    <span className="text-sm sm:text-base">
                      {userData.companyName}
                    </span>
                  </div>
                )}
                {userData.industry && (
                  <div className="flex items-center">
                    <FaUserAlt className="text-sm mr-1 sm:mr-2 sm:text-base" />
                    <span className="text-sm sm:text-base">
                      {userData.industry}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Uncomment if needed */}
            {/* <div className="flex gap-2 md:ml-auto sm:gap-3">
              <Link
                to="/create-job"
                className="flex bg-indigo-600 rounded-lg shadow-lg text-sm text-white dark:bg-indigo-700 dark:hover:bg-indigo-800 hover:bg-indigo-700 items-center px-3 py-1.5 sm:px-4 sm:py-2 sm:text-base transition"
              >
                <MdAdd className="mr-1" />
                {t("addService")}
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="-mt-6 lg:max-w-7xl lg:px-8 max-w-full md:max-w-5xl mx-auto px-4 sm:-mt-8 sm:max-w-3xl sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3 sm:gap-6">
          {/* Left Column - Contact Info */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-sm dark:bg-gray-800 sm:p-6">
              <h2 className="border-b text-gray-800 text-lg dark:text-white font-semibold mb-4 pb-2 sm:mb-6 sm:pb-3 sm:text-xl">
                {t("contactInformation")}
              </h2>
              <div className="sm:space-y-5 space-y-4">
                {userData.email && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                      <FaEnvelope className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                        {t("email")}
                      </p>
                      <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                )}
                {userData.phone && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                      <FaPhone className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                        {t("phone")}
                      </p>
                      <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                )}
                {userData.companyWebsite && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                      <FaGlobe className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                        {t("website")}
                      </p>
                      <a
                        href={userData.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 text-sm dark:text-indigo-400 hover:underline sm:text-base">
                        {userData.companyWebsite}
                      </a>
                    </div>
                  </div>
                )}
                {userData.createdAt && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900 mr-3 sm:mr-4 sm:p-3">
                      <FaCalendarAlt className="text-indigo-600 text-sm dark:text-blue-300 sm:text-base" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                        {t("joinedAt")}
                      </p>
                      <p className="text-gray-800 text-sm dark:text-white sm:text-base">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Services and Wishlist */}
          <div className="md:col-span-2 sm:space-y-8 space-y-6">
            {/* My Services Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm dark:bg-gray-800 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-gray-800 text-lg dark:text-white font-semibold sm:text-xl">
                  {t("myServices")}
                </h2>
                {service && service.length > 0 && (
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="text-indigo-600 text-sm dark:text-indigo-400 font-semibold hover:underline sm:text-base">
                    {showAllServices ? t("showLess") : t("viewAll")}
                  </button>
                )}
              </div>

              {servicesLoading && (
                <div className="flex justify-center items-center">
                  <div className="border-b-2 border-indigo-500 border-t-2 h-8 rounded-full w-8 animate-spin dark:border-indigo-400 sm:h-12 sm:w-12"></div>
                  <p className="text-gray-600 text-sm dark:text-gray-300 ml-2 sm:ml-4 sm:text-base">
                    {t("loading")}
                  </p>
                </div>
              )}

              {servicesError && (
                <div className="bg-white p-4 rounded-xl shadow-lg text-center dark:bg-gray-800 sm:p-6">
                  <MdError className="text-4xl text-red-500 dark:text-red-400 mb-3 mx-auto sm:mb-4 sm:text-5xl" />
                  <h1 className="text-gray-800 text-xl dark:text-white font-bold sm:text-2xl">
                    {t("unableToLoadServices")}
                  </h1>
                  <p className="text-gray-600 text-sm dark:text-gray-300 mt-1 sm:mt-2 sm:text-base">
                    {t("servicesLoadError")}
                  </p>
                  <button className="bg-indigo-600 rounded-lg text-sm text-white dark:bg-indigo-700 dark:hover:bg-indigo-800 hover:bg-indigo-700 mt-3 px-3 py-1.5 sm:mt-4 sm:px-4 sm:py-2 sm:text-base transition">
                    {t("retry")}
                  </button>
                </div>
              )}

              {!servicesLoading &&
                !servicesError &&
                (!service || service.length === 0) && (
                  <div className="p-8 text-center sm:p-12">
                    <div className="mb-4">
                      <svg
                        className="h-12 text-gray-400 w-12 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-gray-900 text-lg dark:text-white font-medium">
                      {t("No Services Found")}
                    </h3>
                    <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                      {t(" No Services Found Please Create Service")}
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/create-service"
                        className="bg-primary border border-transparent rounded-md shadow-sm text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium hover:bg-indigo-700 inline-flex items-center px-4 py-2">
                        {t("createService")}
                      </Link>
                    </div>
                  </div>
                )}

              {!servicesLoading &&
                !servicesError &&
                service &&
                service.length > 0 && (
                  <div className="sm:space-y-6 space-y-4">
                    {service
                      .slice(0, showAllServices ? service.length : 2)
                      .map((serviceItem) => (
                        <div
                          key={serviceItem.id}
                          className="flex flex-col bg-white rounded-lg shadow-md dark:bg-gray-700 hover:shadow-lg overflow-hidden sm:flex-row transition-shadow">
                          <div className="flex-shrink-0 h-40 w-full md:h-[200px] md:w-[300px] relative sm:h-36 sm:w-48">
                            <img
                              src={
                                serviceItem.jobImages &&
                                serviceItem.jobImages.length > 0
                                  ? serviceItem.jobImages[0]
                                  : "https://via.placeholder.com/300"
                              }
                              alt={serviceItem.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-3 sm:p-4">
                            <div className="border-b pb-2 sm:pb-3">
                              <span className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                                {new Date(
                                  serviceItem.createdAt
                                ).toLocaleDateString()}
                              </span>
                              <h3 className="text-base text-gray-800 dark:text-white font-semibold line-clamp-1 md:text-xl mt-1 sm:mt-2 sm:text-lg">
                                {serviceItem.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-300 line-clamp-2 mt-2 sm:mt-3 sm:text-base">
                              {serviceItem.description}
                            </p>
                            <div className="flex justify-between items-center mt-3 sm:mt-4">
                              <span className="text-indigo-600 text-sm dark:text-indigo-400 font-bold sm:text-base">
                                ${serviceItem.budget}/{t("perMonth")}
                              </span>
                              <Link
                                to={`/freelancer-page/${serviceItem.id}`}
                                className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline sm:text-base">
                                {t("viewDetails")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
            </div>

            {/* My Wishlist Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm dark:bg-gray-800 sm:p-6">
              <div className="flex border-b-2 justify-between items-center mb-4 pb-2 sm:mb-6 sm:pb-3">
                <h2 className="text-gray-800 text-lg dark:text-white font-semibold sm:text-xl">
                  {t("myWishlist")}
                </h2>
                <button
                  onClick={() => setShowAllWishlist(!showAllWishlist)}
                  className="text-indigo-600 text-sm dark:text-indigo-400 font-semibold hover:underline sm:text-base">
                  {showAllWishlist ? t("showLess") : t("viewAll")}
                </button>
              </div>

              {wishlistLoading && (
                <div className="flex justify-center items-center">
                  <div className="border-b-2 border-indigo-500 border-t-2 h-8 rounded-full w-8 animate-spin dark:border-indigo-400 sm:h-12 sm:w-12"></div>
                  <p className="text-gray-600 text-sm dark:text-gray-300 ml-2 sm:ml-4 sm:text-base">
                    {t("loading")}
                  </p>
                </div>
              )}

              {wishlistError && (
                <div className="bg-white p-4 rounded-xl shadow-lg text-center dark:bg-gray-800 sm:p-6">
                  <MdError className="text-4xl text-red-500 dark:text-red-400 mb-3 mx-auto sm:mb-4 sm:text-5xl" />
                  <h1 className="text-gray-800 text-xl dark:text-white font-bold sm:text-2xl">
                    {t("unableToLoadWishlist")}
                  </h1>
                  <p className="text-gray-600 text-sm dark:text-gray-300 mt-1 sm:mt-2 sm:text-base">
                    {t("wishlistLoadError")}
                  </p>
                  <button className="bg-indigo-600 rounded-lg text-sm text-white dark:bg-indigo-700 dark:hover:bg-indigo-800 hover:bg-indigo-700 mt-3 px-3 py-1.5 sm:mt-4 sm:px-4 sm:py-2 sm:text-base transition">
                    {t("retry")}
                  </button>
                </div>
              )}

              <div className="sm:space-y-6 space-y-4">
                {(showAllWishlist
                  ? wishlistItems
                  : wishlistItems.slice(0, 2)
                ).map((wishlistItem) => (
                  <div
                    key={wishlistItem.id}
                    className="flex flex-col bg-white rounded-lg shadow-md dark:bg-gray-700 hover:shadow-lg overflow-hidden sm:flex-row transition-shadow">
                    <div className="flex-shrink-0 h-40 w-full md:h-[200px] md:w-[300px] relative sm:h-36 sm:w-48">
                      <img
                        src={
                          wishlistItem.service.jobImages &&
                          wishlistItem.service.jobImages.length > 0
                            ? wishlistItem.service.jobImages[0]
                            : "https://via.placeholder.com/300"
                        }
                        alt={wishlistItem.service.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3 sm:p-4">
                      <div className="border-b pb-2 sm:pb-3">
                        <span className="text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
                          {t("addedOn")}{" "}
                          {new Date(
                            wishlistItem.service.createdAt
                          ).toLocaleDateString()}
                        </span>
                        <h3 className="text-base text-gray-800 dark:text-white font-semibold line-clamp-1 md:text-xl mt-1 sm:mt-2 sm:text-lg">
                          {wishlistItem.service.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm dark:text-gray-300 line-clamp-2 mt-2 sm:mt-3 sm:text-base">
                        {wishlistItem.service.description}
                      </p>
                      <div className="flex gap-3 items-center mt-3 sm:gap-4 sm:mt-4">
                        <Link
                          to={`/freelancer-page/${wishlistItem.id}`}
                          className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline sm:text-base">
                          {t("viewDetails")}
                        </Link>
                        <button
                          onClick={() => handleDeleteWishlist(wishlistItem.id)}
                          disabled={deleteBookmarkLoading}
                          className="text-red-600 text-sm dark:text-red-400 hover:underline sm:text-base">
                          {deleteBookmarkLoading
                            ? t("deleting")
                            : t("deleteBookmark")}
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
