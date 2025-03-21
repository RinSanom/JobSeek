import React from "react";
import { IoMdTime } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import {
  useGetAllServicesQuery,
  useGetFreelancerServiceQuery,
} from "../../../feature/service/serviceSlde";
import { NavLink } from "react-router-dom";
import dataMuck from "../../../data/mockData";
import { MdError } from "react-icons/md";
import { useCreateBookmarkMutation } from "../../../feature/bookmark/bookmarkSlide";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function CardServices({ page }) {
  const { data, isLoading, isError } = useGetAllServicesQuery(page);
  const { data: freelancerSevicePost } = useGetFreelancerServiceQuery();
  const [createBookmark, { isLoading: isBookmarking }] =
    useCreateBookmarkMutation();
 
  const services = data?.content || [];
  const users = freelancerSevicePost?.data?.content || [];
  const servicesWithPoster = services.map((service) => {
    const jobPoster = users.find((user) => user.id === service.userId);
    return {
      ...service,
      poster: jobPoster || null,
    };
  });
  
  const handleAddToFavorite = async (serviceId) => {
    try {
      const response = await createBookmark(serviceId).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to add service to favorites");
      console.error("Failed to add service to favorites:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <img
          className="items-center text-9xl"
          src="src/assets/animation/louding/Animation - 1741739020308 (1).gif"
          alt="Loading animation"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <MdError className="text-5xl mb-4 mx-auto text-red-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Unable to Load Data
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We couldn't load the required information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicesWithPoster.map((service) => (
        <motion.div
          key={service.id}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg">
          {/* Image Section with Bookmark Button */}
          <div className="relative">
            <NavLink to={`/freelancer-page/${service.id}`}>
              <img
                src={
                  service.jobImages?.length > 0
                    ? service.jobImages[0] || dataMuck.imageUrl
                    : "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                }
                className="w-full h-52 object-cover bg-gray-200 dark:bg-gray-700"
                alt="service banner"
              />
            </NavLink>

            {/* Bookmark Button */}
            <button
              onClick={() => handleAddToFavorite(service.id)}
              disabled={isBookmarking || !service.poster}
              className={`absolute top-3 right-3 rounded-full p-2.5 backdrop-blur-md
                ${
                  !service.poster
                    ? "bg-gray-400/60 text-gray-100 cursor-not-allowed"
                    : "bg-blue-600/70 text-white hover:bg-blue-700/90"
                } 
                transition-all shadow-md hover:shadow-lg ${
                  isBookmarking ? "animate-pulse" : ""
                }`}
              title={
                !service.poster ? "No poster available" : "Add to favorites"
              }>
              <FaBookmark className="text-lg" />
            </button>
          </div>

          <div className="p-5">
            {/* Freelancer Information */}
            {service.poster ? (
              <NavLink to={`/freelancer-profile/${service.poster.id}`}>
                <div className="flex items-center gap-3 mb-4">
                  {service.poster.profileImageUrl ? (
                    <img
                      src={service.poster.profileImageUrl}
                      alt={service.poster.fullName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
                      {service.poster.fullName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {service.poster.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {service.poster.userType}
                    </p>
                  </div>
                </div>
              </NavLink>
            ) : (
              <div className="flex items-center gap-3 mb-4 opacity-70">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 text-lg">
                    ?
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Unknown Provider
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                    FREELANCER
                  </p>
                </div>
              </div>
            )}

            {/* Service Title and Description */}
            <NavLink to={`/freelancer-page/${service.id}`}>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2 line-clamp-1">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                {service.description}
              </p>
            </NavLink>

            {/* Bottom Row - Date and Price */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <IoMdTime />
                <span className="text-xs">
                  {new Date(service.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Price Badge */}
            
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
