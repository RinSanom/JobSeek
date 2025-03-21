import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetServicePosterQuery,
  useGetUserByIdQuery,
} from "../../feature/service/serviceSlde";
import { MdWork, MdError } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

export default function UserSeeFreelancerPro() {
  const { id } = useParams();
  const { data: userData, isLoading, isError } = useGetUserByIdQuery(id);
  const {
    data: jobposter,
    isLoading: isJobPosterLoading,
    isError: isJobPosterError,
  } = useGetServicePosterQuery(id);
  console.log("Job Poster Data:", jobposter);

  const [showAllServices, setShowAllServices] = useState(false);



  if (isLoading || isJobPosterLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (isError || isJobPosterError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <MdError className="text-5xl mb-4 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Unable to Load Profile
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Please try again later.
        </p>
      </div>
    );
  }

  const user = userData?.data || {};
  const services = jobposter?.content || [];
  console.log("Services:", services);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white bg-[url(https://onlinecs.baylor.edu/sites/default/files/field/image/Future%20of%20Software_Engineering%20%281%29.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-8 md:mb-0 md:mr-10">
              <div className="w-40 h-40 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 text-5xl font-bold">
                      {user.fullName?.charAt(0) || "F"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">
                {user.fullName}
              </h1>
              <p className="text-xl mt-2 opacity-90">Freelancer</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start">
                <div className="flex items-center bg-opacity-20 px-4 py-2 rounded-full">
                  <MdWork className="mr-2" />
                  <span>{user.experienceYears || 0} Years Experience</span>
                </div>
                <div className="flex items-center bg-opacity-20 px-4 py-2 rounded-full">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{user.address || "Location not specified"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - About & Contact */}
          <div className="md:col-span-1 space-y-6">
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                About {user.fullName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {user.bio ||
                  "No bio information available. Tell clients about yourself, your experience, and what makes you unique."}
              </p>
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Skills
              </h2>
              {user.skills && user.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
                    No skills added yet. Add skills to help clients find you.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                {user.email && (
                  <div className="flex items-center">
                    <div className="bg-primary  p-3 rounded-full mr-4">
                      <FaEnvelope className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email 
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                {user.phone && (
                  <div className="flex items-center">
                    <div className="bg-primary  p-3 rounded-full mr-4">
                      <FaPhone className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                )}

                {user.createdAt && (
                  <div className="flex items-center">
                    <div className="bg-primary  p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Member Since
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Services */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {user.fullName}'s Services
                </h2>
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="text-primary hover:underline font-medium">
                  {showAllServices ? "Show Less" : "View All"}
                </button>
              </div>

              {services.length === 0 ? (
                <div className="py-10 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      No services added yet.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {services
                    .slice(0, showAllServices ? services.length : 3)
                    .map((service) => (
                      <div
                        key={service.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <img
                              src={
                                service.jobImages?.[0] ||
                                "https://via.placeholder.com/300x200"
                              }
                              alt={service.title}
                              className="h-48 md:h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-2/3">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                              {service.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {service.description ||
                                "No description available."}
                            </p>
                            <div className="flex items-center justify-between">
                              <Link
                                to={`/service/${service.id}`}
                                className="text-teal-600 hover:underline font-medium">
                                View Details
                              </Link>
                              {service.budget && (
                                <span className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100 px-3 py-1 rounded-lg font-medium">
                                  ${service.budget}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
