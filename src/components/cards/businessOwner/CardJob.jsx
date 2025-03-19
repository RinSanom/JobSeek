import React from "react";
import { IoMdTime } from "react-icons/io";
import { NavLink } from "react-router"; // Make sure this is imported correctly
import { useGetAllJobsQuery } from "../../../feature/job/jobSlide";
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";
export default function CardJob({ page }) {
  const { data, isLoading, isError } = useGetAllJobsQuery(page);
  console.log("Job Business Owner: ", data);

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
            Unable to Load Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We couldn't load your profile information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const services = data?.content || [];
  const uniqueServices = services.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uniqueServices.map((service) => (
        <NavLink key={service.id} to={`/job-detail/${service.id}`}>
          <div className="rounded-lg bg-white dark:bg-black p-4 shadow-lg">
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
              {/* <p
                  className={`text-sm px-2 py-1 rounded text-white w-fit ${
                    service.status === "active"
                      ? "bg-yellow-300 blur-sm"
                      : service.status === "disable"
                      ? "bg-red-500"
                      : "bg-blue-700"
                  }`}>
                  {service.status}
                </p> */}

              <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-1">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Service Creation Date */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-md text-primary dark:text-gray-400">
                  {service.budget}$ /M
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
