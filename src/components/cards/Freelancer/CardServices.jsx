import React from "react";
import { IoMdTime } from "react-icons/io";
import { NavLink } from "react-router-dom"; // Fixed import
import { MdError } from "react-icons/md";
import { motion } from "framer-motion"; // Added missing import

export default function CardJob({ jobs, page }) {
  // Now we handle loading and errors based on the data passed from parent
  const isLoading = !jobs && page > 0;
  const isError = jobs === undefined;
  
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
            Unable to Load Jobs
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We couldn't load the job information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Handle case when jobs is null or empty
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No Jobs Found</h2>
          <p className="text-gray-500">Try a different category or check back later</p>
        </div>
      </div>
    );
  }

  // Filter out duplicates
  const uniqueJobs = jobs.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uniqueJobs.map((job) => (
        <NavLink key={job.id} to={`/job-detail/${job.id}`}>
          <div className="rounded-lg bg-white dark:bg-black p-4 shadow-lg">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg">
              <img
                src={
                  job.jobImages && job.jobImages.length > 0
                    ? job.jobImages[0]
                    : "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                }
                className="mb-4 object-cover aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700"
                alt="job banner"
              />
            </motion.div>

            {/* Job Description */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-1">
                {job.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {job.description}
              </p>
            </div>

            {/* Job Details */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-md text-primary dark:text-gray-400">
                  {job.budget}$ /M
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}