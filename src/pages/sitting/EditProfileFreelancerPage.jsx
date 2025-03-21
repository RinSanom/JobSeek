import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaLink,
  FaBriefcase,
  FaInfoCircle,
  FaVenusMars,
  FaImage,
  FaSave,
} from "react-icons/fa";
import { useGetMeQuery } from "../../feature/auth/authSlide";
import { useUploadImageMutation } from "../../feature/fileUplord/fileUplordSlide";
import { useEditeProfileFreelancerMutation } from "../../feature/editProfile/editeProfileSlide";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const EditProfileFreelancerPage = () => {
  // Fetch freelancer data
  const { data: freelancerData, isLoading: isFreelancerLoading } =
    useGetMeQuery();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [editProfileFreelancer, { isLoading: isUpdating }] =
    useEditeProfileFreelancerMutation();
  const { data: userData, refetch } = useGetMeQuery(); // Add refetch

  // Initialize form data
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    address: "",
    username: "",
    profileImageUrl: "",
    phone: "",
    skills: "",
    portfolioUrl: "",
    experienceYears: "",
    bio: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Populate form data when API response is available
  useEffect(() => {
    if (freelancerData?.data) {
      const freelancer = freelancerData.data;
      setFormData({
        fullName: freelancer.fullName || "",
        gender: freelancer.gender || "",
        address: freelancer.address || "",
        username: freelancer.username || "",
        profileImageUrl: freelancer.profileImageUrl || "",
        phone: freelancer.phone || "",
        skills: freelancer.skills ? freelancer.skills.join(", ") : "",
        portfolioUrl: freelancer.portfolioUrl || "",
        experienceYears: freelancer.experienceYears || "",
        bio: freelancer.bio || "",
      });

      // Set preview image if profileImageUrl exists
      if (freelancer.profileImageUrl) {
        setPreviewImage(freelancer.profileImageUrl);
      }
    }
  }, [freelancerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user edits it
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Show image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      if (formErrors.profileImageUrl) {
        setFormErrors((prev) => ({ ...prev, profileImageUrl: null }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.gender) errors.gender = "Please select a gender";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.skills.trim()) errors.skills = "Skills are required";
    if (!formData.experienceYears || isNaN(formData.experienceYears))
      errors.experienceYears = "Experience must be a number";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let profileImageUrl = formData.profileImageUrl;

      // Upload new image if selected
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedFile);

        const uploadResponse = await uploadImage(imageFormData).unwrap();
        if (uploadResponse && uploadResponse.uri) {
          profileImageUrl = uploadResponse.uri;
        }
      }

      // Prepare data for submission
      const updatedData = {
        ...formData,
        profileImageUrl,
        skills: formData.skills.split(",").map((skill) => skill.trim()), // Convert skills back to array
      };

      // Call API to update freelancer profile
      await editProfileFreelancer(updatedData).unwrap();

      // Refetch user data to update the profile page
      await refetch();

      // Success notification
      toast.success("Profile updated successfully!");
      // Replace alert with toast.success
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        error?.data?.message || "Failed to update profile. Please try again."
      ); // Replace alert with toast.error
    }
  };

  // Show loading spinner while data is being fetched
  if (isFreelancerLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r bg-primary text-white p-6">
          <h1 className="text-2xl font-bold">Edit Freelancer Profile</h1>
          <p className="text-gray-200">Update your profile information</p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-blue-500">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <FaUser size={50} />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                <FaImage />
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>
            {isUploading && <p className="text-blue-500">Uploading image...</p>}
            {formErrors.profileImageUrl && (
              <p className="text-red-500 text-sm">
                {formErrors.profileImageUrl}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="flex items-cente  text-gray-700 dark:text-gray-300 mb-2">
              <FaUser className="mr-2" /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.fullName ? "border-red-500" : ""
              }`}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaVenusMars className="mr-2" /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-3 bg-white text-black border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.gender ? "border-red-500" : ""
              }`}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.gender && (
              <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaPhone className="mr-2" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.phone ? "border-red-500" : ""
              }`}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaMapMarkerAlt className="mr-2" /> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaBriefcase className="mr-2" /> Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.skills ? "border-red-500" : ""
              }`}
            />
            {formErrors.skills && (
              <p className="text-red-500 text-sm mt-1">{formErrors.skills}</p>
            )}
          </div>

          {/* Portfolio URL */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaLink className="mr-2" /> Portfolio URL
            </label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaBriefcase className="mr-2" /> Years of Experience
            </label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 bg-white text-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                formErrors.experienceYears ? "border-red-500" : ""
              }`}
            />
            {formErrors.experienceYears && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.experienceYears}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <FaInfoCircle className="mr-2" /> Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 bg-white text-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isUploading || isUpdating}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              <FaSave className="mr-2" />{" "}
              {isUploading || isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileFreelancerPage;
