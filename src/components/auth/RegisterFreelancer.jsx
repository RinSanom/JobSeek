import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Ta1 from "../../assets/Ta_Images/LoginJoinUs.png";
import Ta2 from "../../assets/Ta_Images/Logo.png";
import { useRegisterFreelancerMutation } from "../../feature/auth/authSlide";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom"; // Fixed import
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import "../../i18n";

const RegisterFreelancer = () => {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    formik.setFieldValue("phone", value);
  };

  const [registerFreelancer, { isLoading, error }] =
    useRegisterFreelancerMutation();

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t("fullNameRequired")),
    gender: Yup.string().required(t("genderRequired")),
    address: Yup.string().required(t("addressRequired")),
    username: Yup.string()
      .min(3, t("usernameMinLength"))
      .required(t("usernameRequired")),
    email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
    phone: Yup.string().required(t("phoneRequired")),
    password: Yup.string()
      .min(6, t("passwordMinLength"))
      .required(t("passwordRequired"))
      .matches(
        /^(?=.*[A-Z])/,
        t("passwordUppercaseRequired") // New validation message key
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwordsMustMatch"))
      .required(t("confirmPasswordRequired")),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "",
      address: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedData = {
          fullName: values.fullName,
          gender: values.gender,
          address: values.address,
          username: values.username,
          email: values.email,
          profileImageUrl: "",
          phone: values.phone,
          userType: "FREELANCER",
          skills: [],
          portfolioUrl: " ",
          experienceYears: 0,
          bio: "",
          password: values.password,
        };
        const response = await registerFreelancer(formattedData).unwrap();
        toast.success(t("registrationSuccess"), {
          position: "top-right",
        });
        navigate("/login");
      } catch (err) {
        if (err.status === 409) {
          toast.error(t("accountExistsError"), { position: "top-right" });
        } else {
          toast.error(err.data?.message || t("registrationFailed"), {
            position: "top-right",
          });
        }
      }
    },
  });

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
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
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
              {t("joinAsFreelancer")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t("createAccountPrompt")}
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-3 sm:space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div>
                <input
                  placeholder={t("fullNamePlaceholder")}
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <input
                  placeholder={t("usernamePlaceholder")}
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.username}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Gender */}
              <div>
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                >
                  <option value="">{t("selectGender")}</option>
                  <option value="Male">{t("male")}</option>
                  <option value="Female">{t("female")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.gender}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <input
                  placeholder={t("addressPlaceholder")}
                  id="address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Email */}
              <div>
                <input
                  placeholder={t("emailPlaceholder")}
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <PhoneInput
                  placeholder={t("phonePlaceholder")}
                  country={"kh"}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputStyle={{
                    width: "100%",
                    height: "auto",
                    padding: "0.5rem 0.75rem sm:0.5rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    paddingLeft: "48px",
                    backgroundColor: "#fff",
                  }}
                  buttonStyle={{
                    border: "none",
                    background: "transparent",
                  }}
                  containerStyle={{ position: "relative" }}
                  dropdownStyle={{ zIndex: 999 }}
                  className="dark:[&_.form-control]:bg-gray-700 dark:[&_.form-control]:text-gray-100 dark:[&_.form-control]:border-gray-600"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  placeholder={t("passwordPlaceholder")}
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
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
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  placeholder={t("confirmPasswordPlaceholder")}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="w-full px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900 dark:text-blue-300"
                >
                  {confirmPasswordVisible ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-900 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 transition"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t("creatingAccount") : t("createAccount")}
            </button>
            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm text-center">
                {error.data?.message || t("registrationError")}
              </p>
            )}
          </form>

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
            {/* <div className="flex items-center justify-center gap-2">
                <span className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("or")}</span>
                <span className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></span>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFreelancer;