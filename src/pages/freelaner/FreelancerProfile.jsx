import React, { useState } from "react";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { useGetMeQuery } from "../../feature/auth/authSlide";
import {
  useDeleteServiceMutation,
  useGetMyOwnServiceQuery,
} from "../../feature/service/serviceSlde";
import { MdError, MdWork } from "react-icons/md";
import { Link } from "react-router-dom";

const FreelancerProfile = () => {
  const { data, isLoading, error } = useGetMeQuery();
  const {
    data: myServices,
    isLoading: servicesLoading,
    error: servicesError,
  } = useGetMyOwnServiceQuery();
  console.log("my serviece : ", myServices);
  console.log("Me  : ", data);

  const [deleteService, { isLoading: deleteLoading }] =
    useDeleteServiceMutation();
  const [showAllServices, setShowAllServices] = useState(false);

  const userData = data?.data || {};
  const skills = userData.skills || [];

  const handleDeleteService = async (serviceId) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(serviceId);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
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
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white  bg-[url(https://onlinecs.baylor.edu/sites/default/files/field/image/Future%20of%20Software_Engineering%20%281%29.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-8 md:mb-0 md:mr-10">
              <div className="w-40 h-40 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden">
                {userData.profileImageUrl ? (
                  <img
                    src={userData.profileImageUrl}
                    alt={userData.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 text-5xl font-bold">
                      {userData.fullName?.charAt(0) || "F"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">
                {userData.fullName}
              </h1>
              <p className="text-xl mt-2 opacity-90">Freelancer</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start ">
                <div className="flex items-center  bg-opacity-20 px-4 py-2 rounded-full">
                  <MdWork className="mr-2" />
                  <span>{userData.experienceYears || 0} Years Experience</span>
                </div>
                <div className="flex items-center  bg-opacity-20 px-4 py-2 rounded-full">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{userData.address || "Location not specified"}</span>
                </div>
              </div>
              <div className="mt-6">
                {/* <button className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-teal-700 transition">
                  <FaPlus className="inline mr-2" />
                  Add Service
                </button> */}
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
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {userData.bio ||
                  "No bio information available. Tell clients about yourself, your experience, and what makes you unique."}
              </p>
              <Link
                to="/edit-profile"
                className="text-primary hover:underline text-sm font-medium">
                {userData.bio ? "Edit Bio" : "Add Bio"}
              </Link>
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Skills
                </h2>
                <Link
                  to="/edit-skills"
                  className="text-primary hover:underline text-sm font-medium">
                  {skills.length > 0 ? "Edit Skills" : "Add Skills"}
                </Link>
              </div>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100 px-3 py-1 rounded-full text-sm">
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
                {userData.email && (
                  <div className="flex items-center">
                    <div className="bg-teal-100 dark:bg-teal-800 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-teal-600 dark:text-teal-200" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                )}

                {userData.phone && (
                  <div className="flex items-center">
                    <div className="bg-teal-100 dark:bg-teal-800 p-3 rounded-full mr-4">
                      <FaPhone className="text-teal-600 dark:text-teal-200" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                )}
            
                {userData.createdAt && (
                  <div className="flex items-center">
                    <div className="bg-teal-100 dark:bg-teal-800 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-teal-600 dark:text-teal-200" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Member Since
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        {new Date(userData.createdAt).toLocaleDateString()}
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
                  My Services
                </h2>
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="text-primary hover:underline font-medium">
                  {showAllServices ? "Show Less" : "View All"}
                </button>
              </div>

              {servicesLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              ) : servicesError ? (
                <div className="text-center py-10">
                  <MdError className="text-4xl mb-2 mx-auto text-red-500" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Unable to load services
                  </p>
                </div>
              ) : myServices && myServices.length > 0 ? (
                <div className="space-y-6">
                  {myServices

                    .slice(0, showAllServices ? myServices.length : 3)
                    .map((service) => (
                      <div
                        key={service.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <img
                              src={
                                service.imageUrls?.[0] ||
                                "https://via.placeholder.com/300x200"
                              }
                              alt={service.title}
                              className="h-48 md:h-full w-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex space-x-2">
                              <Link
                                to={`/edit-service/${service.id}`}
                                className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition">
                                <FaEdit size={14} />
                              </Link>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                disabled={deleteLoading}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
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
                              {service.price && (
                                <span className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100 px-3 py-1 rounded-lg font-medium">
                                  {typeof service.price === "number"
                                    ? `$${service.price}`
                                    : service.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
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
                      No services added yet. Start by adding a new service.
                    </p>
                    <Link
                      to="/create-service"
                      className="mt-4 inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                      <FaPlus className="mr-2" />
                      Add Service
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
