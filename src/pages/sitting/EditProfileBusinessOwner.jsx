import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBuilding,
  FaGlobe,
  FaIndustry,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaVenusMars,
  FaImage,
} from "react-icons/fa";
import { useUploadImageMutation } from "../../feature/fileUplord/fileUplordSlide";
import { useGetMeQuery } from "../../feature/auth/authSlide";
import { useEditeProfileBusinessOwnerMutation } from "../../feature/editProfile/editeProfileSlide";
import { useTranslation } from "react-i18next"; // Added for i18n
import "../../i18n"; // Ensure i18n is imported

const EditProfileBusinessOwner = () => {
  const { t } = useTranslation(); // Hook for translations
  const { data: userData, isLoading: userLoading } = useGetMeQuery();
  const [editeProfileBusinessOwner, { isLoading: updating }] =
    useEditeProfileBusinessOwnerMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    profileImageUrl: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
  });
  const [previewImage, setPreviewImage] = useState(formData.profileImageUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [formErrors, setFormErrors] = useState({});

  // Load user data when available
  useEffect(() => {
    if (userData?.data) {
      // Only update fields that are empty or if we want to override with backend data
      const user = userData.data;
      setFormData((prevData) => ({
        fullName: prevData.fullName || user.fullName || "",
        gender: prevData.gender || user.gender || "",
        profileImageUrl: prevData.profileImageUrl || user.profileImageUrl || "",
        email: prevData.email || user.email || "",
        phone: prevData.phone || user.phone || "",
        address: prevData.address || user.address || "",
        companyName: prevData.companyName || user.companyName || "",
        companyWebsite: prevData.companyWebsite || user.companyWebsite || "",
        industry: prevData.industry || user.industry || "",
      }));

      if (user.profileImageUrl && !previewImage) {
        setPreviewImage(user.profileImageUrl);
      }
    }
  }, [userData]);

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

      // Clear any file-related errors
      if (formErrors.profileImageUrl) {
        setFormErrors((prev) => ({ ...prev, profileImageUrl: null }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = t("fullNameRequired");
    if (!formData.gender) errors.gender = t("genderRequired");
    if (!formData.email) errors.email = t("emailRequired");
    if (!formData.phone) errors.phone = t("phoneRequired");
    if (!formData.companyName) errors.companyName = t("companyNameRequired");

    // Website validation (optional but must be valid if provided)
    if (
      formData.companyWebsite &&
      !formData.companyWebsite.match(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/
      )
    ) {
      errors.companyWebsite = t("invalidWebsite");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let profileImageUrl = formData.profileImageUrl;

      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedFile);

        const uploadResponse = await uploadImage(imageFormData).unwrap();
        if (uploadResponse && uploadResponse.uri) {
          profileImageUrl = uploadResponse.uri;
        }
      }

      const token = localStorage.getItem("accessToken");
      // Prepare the data exactly as API expects it
      const profileData = {
        fullName: formData.fullName,
        gender: formData.gender,
        profileImageUrl: profileImageUrl,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        industry: formData.industry,
      };

      const result = await editeProfileBusinessOwner({
        body: profileData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).unwrap();

      // Success notification
      alert(t("profileUpdatedSuccess"));
      console.log("Profile update response:", result);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // More detailed error handling
      if (error.data?.message) {
        alert(`${t("profileUpdateFailed")}: ${error.data.message}`);
      } else {
        alert(t("profileUpdateFailedTryAgain"));
      }
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-4 text-gray-600">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-white p-6">
          <h2 className="text-2xl font-bold">{t("editBusinessProfile")}</h2>
          <p className="text-gray-100">{t("updateBusinessInfo")}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <div className="md:col-span-2 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-primary">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={t("profilePreview")}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <FaUser size={50} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer">
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
              {isUploading && (
                <p className="text-primary">{t("uploadingImage")}</p>
              )}
              {formErrors.profileImageUrl && (
                <p className="text-red-500 text-sm">
                  {formErrors.profileImageUrl}
                </p>
              )}
            </div>
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                {t("personalInformation")}
              </h3>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaUser className="mr-2" /> {t("fullName")}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t("enterFullName")}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition ${
                      formErrors.fullName ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaVenusMars className="mr-2" /> {t("gender")}
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition ${
                      formErrors.gender ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">{t("selectGender")}</option>
                    <option value="female">{t("female")}</option>
                    <option value="male">{t("male")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.gender}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaEnvelope className="mr-2" /> {t("emailAddress")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("enterEmail")}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition ${
                      formErrors.email ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaPhone className="mr-2" /> {t("phoneNumber")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("enterPhone")}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition ${
                      formErrors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                {t("businessInformation")}
              </h3>
              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaBuilding className="mr-2" /> {t("companyName")}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder={t("enterCompanyName")}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition ${
                      formErrors.companyName ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.companyName}
                    </p>
                  )}
                </div>

                {/* Company Website */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaGlobe className="mr-2" /> {t("companyWebsite")}
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder={t("enterWebsite")}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition ${
                      formErrors.companyWebsite ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.companyWebsite && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.companyWebsite}
                    </p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaIndustry className="mr-2" /> {t("industry")}
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder={t("enterIndustry")}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                    <FaMapMarkerAlt className="mr-2" /> {t("address")}
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t("enterAddress")}
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={updating || isUploading}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating || isUploading ? t("updating") : t("updateProfile")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileBusinessOwner;