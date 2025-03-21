import React, { useState, useEffect } from "react";
import {
  useCreateServiceMutation,
  useGetAllCategoriesQuery,
} from "../../feature/service/serviceSlde";
import { useUploadImageMutation } from "../../feature/fileUplord/fileUplordSlide";
import { FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const CreateServicePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadImage, { isLoading: isUploading, error: uploadError }] =
    useUploadImageMutation();
  const [createService, { isLoading: isCreating, error: createError }] =
    useCreateServiceMutation();
  const {
    data: categoryData,
    isLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();
  const categories = categoryData?.data || [];

  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      setToken(accessToken || "");
    } catch (error) {
      console.error("Error retrieving token:", error);
      setToken("");
    }
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await uploadImage(formData).unwrap();

        if (uploadResponse && uploadResponse.uri) {
          uploadedUrls.push(uploadResponse.uri);
        }
      }

      setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again."); // Replace alert with toast
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Authentication token missing. Please log in."); // Replace alert with toast
      return;
    }

    try {
      const serviceData = {
        title,
        description,
        categoryId: String(categoryId),
        status: "ACTIVE",
        imageUrls,
      };

      const result = await createService(serviceData).unwrap();
      toast.success("Service created successfully!"); // Replace alert with toast.success

      setTitle("");
      setDescription("");
      setCategoryId("");
      setImageUrls([]);
    } catch (error) {
      console.error("Create service error:", error);
      let errorMessage =
        error.data?.message || error.message || "Unknown error occurred";
      toast.error(`Failed to create service: ${errorMessage}`); // Replace alert with toast.error
    }
  };

  if (categoriesError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-500 mb-4">
            Error Loading Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Something went wrong while fetching categories. Please refresh the
            page or try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-6 sm:py-12">
      <div className="w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
          Create a New Service
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4 sm:mb-8">
          Fill in the details below to add a new service.
        </p>

        {createError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 rounded-r-md">
            <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium">
              Error:{" "}
              {createError.data?.message ||
                createError.message ||
                "Something went wrong"}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter service title"
                  className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
                />
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe your service"
                  className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
                  rows="3 sm:rows-4"
                />
              </div>

              {/* Category Select */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                {isLoading ? (
                  <div className="w-full p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 italic text-sm sm:text-base">
                    Loading categories...
                  </div>
                ) : (
                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {Array.isArray(categories) && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </select>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 sm:h-56 md:h-64 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:border-gray-500 transition-all duration-200"
              >
                {imageUrls.length > 0 ? (
                  <div className="grid gap-2 w-full h-full overflow-y-auto p-2">
                    {imageUrls.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img
                          src={imageUrl}
                          alt={`Uploaded ${index}`}
                          className="w-full h-40 sm:h-48 md:h-57 object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrls(
                              imageUrls.filter((_, i) => i !== index)
                            );
                          }}
                          className="absolute top-1 right-1 bg-red-500 dark:bg-red-600 text-white rounded-full p-1 hover:bg-red-600 dark:hover:bg-red-700"
                        >
                          <FaTimes className="w-3 sm:w-4 h-3 sm:h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-4 sm:pt-5 pb-5 sm:pb-6">
                    <svg
                      className="w-6 sm:w-8 h-6 sm:h-8 mb-3 sm:mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  multiple
                  accept=".jpg,.jpeg,.png,.gif"
                />
              </label>
              <button
                type="submit"
                disabled={isLoading || isCreating || isUploading}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-3 sm:mt-4 bg-primary  text-white font-semibold rounded-md hover:bg-primary-hover dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:bg-indigo-300 dark:disabled:bg-indigo-500 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
              >
                {isLoading || isCreating ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 0 8-8v8H4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Create Service"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServicePage;