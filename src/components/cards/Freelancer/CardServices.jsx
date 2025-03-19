import React, { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import both filled and outline bookmark icons
import { useGetAllServicesQuery } from "../../../feature/service/serviceSlde";
import { NavLink } from "react-router-dom";
import dataMuck from "../../../data/mockData";
import { MdError } from "react-icons/md";
import { useCreateBookmarkMutation } from "../../../feature/bookmark/bookmarkSlide";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // For animations

export default function CardServices({ page }) {
  const { data, isLoading, isError } = useGetAllServicesQuery(page);
  const [createBookmark, { isLoading: isBookmarking }] =
    useCreateBookmarkMutation();
  const [bookmarkedServices, setBookmarkedServices] = useState(new Set()); // Track bookmarked services
  console.log("data in card service", data);
  
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <img
          className="items-center text-9xl"
          src="src/assets/animation/louding/Animation - 1741739020308 (1).gif"
          alt="Loading animation"
        />
      </div>
    );

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <MdError className="text-5xl mb-4 mx-auto text-red-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Unable to Load Services
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We couldn't load your services. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const services = data?.content || [];
  const uniqueServices = services.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  const handleAddToFavorite = async (serviceId) => {
    try {
      const response = await createBookmark(serviceId).unwrap();
      toast.success(response.message);

      // Toggle bookmark state
      setBookmarkedServices((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(serviceId)) {
          newSet.delete(serviceId); // Remove if already bookmarked
        } else {
          newSet.add(serviceId); // Add if not bookmarked
        }
        return newSet;
      });
    } catch (error) {
      toast.error("Failed to add service to favorites");
      console.error("Failed to add service to favorites:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {uniqueServices.map((service) => (
        <div
          key={service.id}
          className="rounded-sm bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg">
          <NavLink to={`/freelancer-page/${service.id}`}>
            <div>
              {/* Image with Hover Effect */}
              <motion.div
                whileHover={{ scale: 1.05 }} // Hover effect only on the image
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg">
                <img
                  src={
                    service.jobImages.length > 0
                      ? service.jobImages[0] || dataMuck.imageUrl
                      : "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                  }
                  className="mb-4 object-cover aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700"
                  alt="service banner"
                />
              </motion.div>

              {/* Service Description */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-1">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Service Creation Date */}
            </div>
          </NavLink>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleAddToFavorite(service.id)}
              disabled={isBookmarking}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Add to favorites">
              {bookmarkedServices.has(service.id) ? (
                <FaBookmark className="w-5 h-5 text-blue-600 hover:text-blue-700" /> // Filled icon
              ) : (
                <FaRegBookmark className="w-5 h-5 text-blue-600 hover:text-blue-700" /> // Outline icon
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
