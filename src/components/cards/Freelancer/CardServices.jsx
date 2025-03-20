import React from "react";
import { IoMdTime } from "react-icons/io";
import {
  useGetAllServicesQuery,
  useGetFreelancerServiceQuery,
} from "../../../feature/service/serviceSlde";
import { NavLink } from "react-router-dom";
import dataMuck from "../../../data/mockData";
import { MdError } from "react-icons/md";
import { useCreateBookmarkMutation } from "../../../feature/bookmark/bookmarkSlide";
import { toast } from "react-toastify"; // Import toast
import { motion } from "framer-motion";
export default function CardServices({ page }) {
  const { data, isLoading, isError } = useGetAllServicesQuery(page);
  const {
    data: freelancerSevicePost,
  } = useGetFreelancerServiceQuery();
  const [createBookmark, { isLoading: isBookmarking }] =
    useCreateBookmarkMutation();

  console.log("Freelancer : ", freelancerSevicePost);
  console.log("Freelancer service: ", data);
  const services = data?.content || [];
  const users = freelancerSevicePost?.data?.content || [];
  console.log("Servei all:", data);
  const servicesWithPoster = services.map((service) => {
    const jobPoster = users.find((user) => user.id === service.userId);
    console.log("Job Poster sdsd:", jobPoster);
    return {
      ...service,
      poster: jobPoster || null, 
    };
  });
  console.log("Services with Poster:", servicesWithPoster);
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
      {servicesWithPoster.map((service) => (
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
              <div className="mb-4">
                {service.poster && (
                  <NavLink to={`/freelancer-profile/${service.poster.id}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={
                          service.poster.profileImageUrl ||
                          "https://via.placeholder.com/40"
                        }
                        alt={service.poster.fullName}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                          {service.poster.fullName}
                        </p>
                        <p className="text-md text-gray-500 dark:text-gray-400">
                          {service.poster.userType}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                )}
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {service.description}
                </p>
              </div>
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
