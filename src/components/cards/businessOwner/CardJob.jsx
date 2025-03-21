import React from "react";
import { IoMdTime } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";
import { useGetAllUsersQuery } from "../../../feature/service/serviceSlde";
import { useGetAllJobsQuery } from "../../../feature/job/jobSlide";

export default function CardJob() {
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetAllJobsQuery();
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetAllUsersQuery();

  console.log("job data: ", jobsData);
  console.log("users data: ", usersData); // Add this to debug users data

  const uniqueServices = jobsData?.content || [];
  const users = usersData?.data?.content || [];

  if (isJobsLoading || isUsersLoading) {
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

  if (isJobsError || isUsersError) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uniqueServices.map((service) => {
        // Find the job poster's information
        const jobPoster = users.find((user) => user.id === service.userId);
        console.log(
          `Service ID: ${service.id}, User ID: ${service.userId}, Found Job Poster:`,
          jobPoster
        );
        return (
          <JobCard key={service.id} service={service} jobPoster={jobPoster} />
        );
      })}
    </div>
  );
}

function JobCard({ service, jobPoster }) {
  return (
    <div className="rounded-lg dark:border dark:border-white bg-white dark:bg-black p-4 shadow-lg">
      {/* Job Poster Information */}
      <div className="flex items-center gap-2 mb-4">
        {jobPoster ? (
          <NavLink to={`/business-owner-profile/${jobPoster.id}`}>
            <div className="flex items-center gap-2 w-full">
              {jobPoster.profileImageUrl ? (
                <img
                  src={jobPoster.profileImageUrl}
                  alt={jobPoster.fullName}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                  <span className="text-blue-800 dark:text-blue-300 text-2xl font-bold">
                    {jobPoster.fullName?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <div>
                <p className="text-xl font-bold text-black dark:text-white">
                  {jobPoster.fullName}
                </p>
                <p className="text-md text-gray-500 dark:text-gray-400">
                  {jobPoster.companyName || "Job Poster"}
                </p>
              </div>
            </div>
          </NavLink>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
              <span className="text-blue-800 dark:text-blue-300 text-2xl font-bold">
                U
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-black dark:text-white">
                Unknown User
              </p>
              <p className="text-md text-gray-500 dark:text-gray-400">
                Job Poster
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Job Details */}
      <NavLink to={`/job-detail/${service.id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-lg">
          <img
            src={
              service.jobImages && service.jobImages.length > 0
                ? service.jobImages[0]
                : "https://media.tenor.com/JlQS7xvck0MAAAAe/image-placeholder.png"
            }
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src =
                "https://media.tenor.com/JlQS7xvck0MAAAAe/image-placeholder.png";
            }}
            className="mb-4 object-cover aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700"
            alt="service banner"
          />
        </motion.div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-1">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {service.description}
          </p>
        </div>
      </NavLink>

      {/* Job Budget and Creation Date */}
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
  );
}
