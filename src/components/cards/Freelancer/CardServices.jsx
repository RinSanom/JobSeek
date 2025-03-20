import React from "react";
import { IoMdTime } from "react-icons/io";
import { useGetAllServicesQuery } from "../../../feature/service/serviceSlde";
import { NavLink } from "react-router-dom";
import dataMuck from "../../../data/mockData";
import { MdError } from "react-icons/md";
import { useCreateBookmarkMutation } from "../../../feature/bookmark/bookmarkSlide";
import { toast } from "react-toastify"; // Import toast
import { motion } from "framer-motion";
export default function CardServices({ page }) {
  const { data, isLoading, isError } = useGetAllServicesQuery(page);
  const [createBookmark, { isLoading: isBookmarking }] =
    useCreateBookmarkMutation();

  console.log("Freelancer service: ", data);

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

  // Remove duplicates based on service ID
  const uniqueServices = services.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  // Handle adding a service to favorites
  const handleAddToFavorite = async (serviceId) => {
    try {
      const response = await createBookmark(serviceId).unwrap();
      toast.success(response.message); // Show success toast
    } catch (error) {
      toast.error("Failed to add service to favorites"); // Show error toast
      console.error("Failed to add service to favorites:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uniqueServices.map((service) => (
        <div
          key={service.id}
          className="rounded-lg bg-white dark:bg-black p-4 shadow-lg">
          <NavLink to={`/freelancer-page/${service.id}`}>
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
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
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Service Creation Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IoMdTime className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </NavLink>

          {/* Add to Favorite Button */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handleAddToFavorite(service.id)}
              disabled={isBookmarking}
              className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
              {isBookmarking ? "Adding..." : "Add To Favorite"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
