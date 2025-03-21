import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router";
import { useLoginMutation } from "../../feature/auth/authSlide";
import Ta1 from "../../assets/Ta_Images/LoginJoinUs.png";
import Ta2 from "../../assets/Ta_Images/Logo.png";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next"; // Added for i18n
import "../../i18n"; // Ensure i18n is imported

const LoginPage = () => {
  const { t } = useTranslation(); // Hook for translations
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const validationSchema = Yup.object({
    email: Yup.string().required(t("emailOrUsernameRequired")),
    password: Yup.string().required(t("passwordRequired")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();

        if (response?.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);

          if (response?.refreshToken) {
            localStorage.setItem("refreshToken", response.refreshToken);
          }

          toast.success(t("loginSuccess"), {
            position: "bottom-right",
          });

          if (response.role === "FREELANCER") {
            localStorage.setItem("userRole", response.role);

            navigate("/");
          } else if (response.role === "BUSINESS_OWNER") {
            localStorage.setItem("userRole", response.role);

            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          toast.error(t("noTokenReceived"));
        }
      } catch (err) {
        toast.error(err.data?.message || t("invalidCredentials"));
      }
    },
  });

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 md:flex-row min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br justify-center p-4 text-white w-full from-blue-900 hidden items-center md:flex md:p-8 md:w-1/2 sm:p-6 to-blue-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold lg:text-5xl mb-2 md:text-4xl sm:text-3xl tracking-tight">
            {t("welcomeTo")}
          </h1>
          <h1 className="text-2xl font-extrabold lg:text-5xl md:text-4xl sm:text-3xl">JobSeek</h1>
          <img
            src={Ta1}
            alt={t("welcomeGraphic")}
            className="w-full max-w-xs md:max-w-md md:mt-10 mt-6 mx-auto sm:max-w-sm sm:mt-8 sm:w-3/4"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center p-4 w-full items-center md:p-8 md:w-1/2 sm:p-6">
        <div className="w-full max-w-md sm:space-y-8 space-y-6">
          <div className="flex gap-3 items-center">
            <NavLink to="/">
            <img src={Ta2} alt={t("logoAlt")} className="h-10 w-10 sm:h-12 sm:w-12" />
            </NavLink>
            <h1 className="text-2xl text-blue-900 dark:text-blue-300 font-bold sm:text-3xl">JobSeek</h1>
          </div>

          <div>
            <h2 className="text-gray-800 text-xl dark:text-gray-200 font-semibold sm:text-2xl">
              {t("welcomeBack")}
            </h2>
            <p className="text-gray-600 text-xs dark:text-gray-400 mt-1 sm:text-sm">
              {t("loginPrompt")}
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="sm:space-y-6 space-y-4">
            {/* Email/Username */}
            <div>
              <input
                placeholder={t("emailPlaceholder")}
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-white border border-gray-300 rounded-lg text-gray-900 w-full dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-100 focus:border-transparent focus:ring-2 focus:ring-blue-500 px-3 py-2 sm:px-4 sm:py-3 transition"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs dark:text-red-400 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="bg-white border border-gray-300 rounded-lg text-gray-900 w-full dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:text-gray-100 focus:border-transparent focus:ring-2 focus:ring-blue-500 px-3 py-2 sm:px-4 sm:py-3 transition"
                  placeholder={t("passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-blue-900 -translate-y-1/2 absolute dark:text-blue-300 right-3 top-1/2"
                >
                  {passwordVisible ? (
                    <i className="fa-eye-slash fas"></i>
                  ) : (
                    <i className="fa-eye fas"></i>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs dark:text-red-400 mt-1">
                  {formik.errors.password}
                </p>
              )}
              <div className="text-right mt-1 sm:mt-2">
                <span
                  className="text-blue-900 text-xs cursor-pointer dark:text-blue-300 hover:underline sm:text-sm"
                  onClick={() => navigate("/forgot-password")}
                >
                  {t("forgotPassword")}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-center text-red-500 text-xs dark:text-red-400 sm:text-sm">
                {error?.data?.message || t("invalidCredentials")}
              </p>
            )}

            {/* Submit Button */}
            <button
              className="bg-blue-900 rounded-lg text-white w-full dark:bg-blue-800 dark:hover:bg-blue-700 disabled:opacity-50 font-medium hover:bg-blue-800 py-2 sm:py-3 transition"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t("loggingIn") : t("login")}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs dark:text-gray-400 sm:text-sm">
            {t("noAccount")}{" "}
            <span
              className="text-blue-900 cursor-pointer dark:text-blue-300 font-medium hover:underline"
              onClick={() => navigate("/register-freelancer")}
            >
              {t("signUp")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;