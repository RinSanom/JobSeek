import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useRegisterBusinessOwnerMutation } from "../../feature/auth/authSlide";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Ta1 from "../../assets/Ta_Images/LoginJoinUs.png";
import Ta2 from "../../assets/Ta_Images/Logo.png";
import { NavLink, useNavigate } from "react-router-dom"; // Fixed import
import toast from "react-hot-toast";
import "../../i18n";

const validationSchema = Yup.object({
  fullName: Yup.string().required("FullNameRequired"),
  gender: Yup.string().required("GenderRequired"),

  email: Yup.string().email("InvalidEmail").required("EmailRequired"),
  phone: Yup.string().required("PhoneRequired"),
  userType: Yup.string().required("UserTypeRequired"),
  companyName: Yup.string().required("CompanyNameRequired"),
  companyWebsite: Yup.string()
    .url("InvalidUrl")
    .required("CompanyWebsiteRequired"),
  industry: Yup.string().required("IndustryRequired"),
  password: Yup.string()
    .min(6, "PasswordMinLength")
    .required("PasswordRequired")
    .matches(
      /^(?=.*[A-Z])/,
      "PasswordUppercaseRequired"
    ),
});

const RegisterBusinessOwner = () => {
  const { t } = useTranslation();
  const [registerBusinessOwner, { isLoading }] = useRegisterBusinessOwnerMutation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handlePhoneNumberChange = (value, setFieldValue) => {
    setPhoneNumber(value);
    setFieldValue("phone", value);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await registerBusinessOwner(values).unwrap();
      console.log(response)
      toast.success(t("registrationSuccess"), {
        position: "top-right",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.data?.message || t("registrationFailed"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white flex items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            {t("welcomeTo")}
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            JobSeek
          </h1>
          <img
            src={Ta1}
            alt={t("joinUs")}
            className="mt-4 sm:mt-8 w-full sm:w-3/4 mx-auto max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-full sm:max-w-md space-y-4 sm:space-y-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3 mt-3">
            <NavLink to="/">
              <img
                src={Ta2}
                alt={t("logoAlt")}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </NavLink>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-300">
              JobSeek
            </h1>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {t("joinAsBusinessOwner")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t("createAccountPrompt")}
            </p>
          </div>
          <Formik
            initialValues={{
              fullName: "",
              gender: "",
              profileImageUrl: "",
              email: "",
              phone: "",
              userType: "BUSINESS_OWNER",
              companyName: "",
              companyWebsite: "",
              industry: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name */}
                  <div>
                    <Field
                      name="fullName"
                      type="text"
                      placeholder={t("fullNamePlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="p"
                      className="text-red-500 dark:text-red-400 text-xs mt-1"
                      render={(msg) => t(msg)}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <Field
                      as="select"
                      name="gender"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    >
                      <option value="">{t("selectGender")}</option>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                      <option value="other">{t("other")}</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="p"
                      className="text-red-500 dark:text-red-400 text-xs mt-1"
                      render={(msg) => t(msg)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Email */}
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 dark:text-red-400 text-xs mt-1"
                      render={(msg) => t(msg)}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <PhoneInput
                      country={"kh"}
                      value={phoneNumber}
                      onChange={(value) =>
                        handlePhoneNumberChange(value, setFieldValue)
                      }
                      inputStyle={{
                        width: "100%",
                        height: "42px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        paddingLeft: "48px",
                      }}
                      buttonStyle={{
                        border: "none",
                        background: "transparent",
                      }}
                      containerStyle={{ position: "relative" }}
                      dropdownStyle={{ zIndex: 999 }}
                      specialLabel=""
                      className="dark:[&_.form-]:bg-black dark:[&_.form-control]:border-gray-600 dark:[&_.form-control]:text-black"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                        {t(errors.phone)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Company Name */}
                  <div>
                    <Field
                      name="companyName"
                      type="text"
                      placeholder={t("companyNamePlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="p"
                      className="text-red-500 dark:text-red-400 text-xs mt-1"
                      render={(msg) => t(msg)}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <Field
                      name="industry"
                      type="text"
                      placeholder={t("industryPlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    />
                    <ErrorMessage
                      name="industry"
                      component="p"
                      className="text-red-500 dark:text-red-400 text-xs mt-1"
                      render={(msg) => t(msg)}
                    />
                  </div>
                </div>

                {/* Company Website */}
                <div>
                  <Field
                    name="companyWebsite"
                    type="url"
                    placeholder={t("companyWebsitePlaceholder")}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                  />
                  <ErrorMessage
                    name="companyWebsite"
                    component="p"
                    className="text-red-500 dark:text-red-400 text-xs mt-1"
                    render={(msg) => t(msg)}
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <Field
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900 dark:text-blue-300"
                    >
                      {passwordVisible ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 dark:text-red-400 text-xs mt-1"
                    render={(msg) => t(msg)}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-900 dark:bg-blue-800 text-white py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 hover:bg-blue-800 dark:hover:bg-blue-700 transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">{t("creatingAccount")}</span>
                      <i className="fas fa-spinner fa-spin"></i>
                    </div>
                  ) : (
                    t("createAccount")
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t("alreadyHaveAccount")}{" "}
              <span
                className="text-blue-900 dark:text-blue-300 hover:underline cursor-pointer font-medium"
                onClick={() => navigate("/login")}
              >
                {t("loginNow")}
              </span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {t("or")}
              </span>
              <span className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusinessOwner;