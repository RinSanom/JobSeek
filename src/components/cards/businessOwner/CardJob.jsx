import React from "react";
import { IoMdTime } from "react-icons/io";
import { NavLink } from "react-router"; // Make sure this is imported correctly
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";
import { useGetAllUsersQuery } from "../../../feature/service/serviceSlde";
import { useGetAllJobsQuery } from "../../../feature/job/jobSlide";

export default function CardJob({ page }) {
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetAllJobsQuery(page);
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetAllUsersQuery();

  // Log data for debugging
  console.log("Jobs Data:", jobsData);
  console.log("Users Data:", usersData);

  const uniqueServices = jobsData?.content || [];
  const users = usersData?.data?.content || [];

  if (isJobsLoading || isUsersLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <img
          className="items-center text-9xl"
          src="src/assets/animation/louding/Animation - 1741739020308 (1).gif"
          alt="Loading animation"
        />
      </div>
    );

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

        // Log the service and jobPoster for debugging
        console.log("Service:", service);
        console.log("Job Poster:", jobPoster);

        return (
          <JobCard key={service.id} service={service} jobPoster={jobPoster} />
        );
      })}
    </div>
  );
}

// Separate component for each job card
function JobCard({ service, jobPoster }) {
  return (
    <NavLink to={`/job-detail/${service.id}`}>
      <div className="rounded-lg dark:border dark:border-white bg-white dark:bg-black p-4 shadow-lg">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-lg">
          <img
            src={
              service.jobImages.length > 0
                ? service.jobImages[0] || "https://via.placeholder.com/150"
                : "https://media.tenor.com/JlQS7xvck0MAAAAe/image-placeholder.png"
            }
            className="mb-4 object-cover aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700"
            alt="service banner"
          />
        </motion.div>
        {/* Job Poster Information */}
        <NavLink to={`/bussiness-owner-profile/${jobPoster.id}`}>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={
                jobPoster?.profileImageUrl || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-bold text-black dark:text-white">
                {jobPoster?.fullName || "Unknown User"}
              </p>
              <p className="text-md text-gray-500 dark:text-gray-400">
                {jobPoster?.companyName || "Job Poster"}
              </p>
            </div>
          </div>
        </NavLink>
        {/* Service Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-1">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Service Creation Date and Budget */}
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
  );
}
