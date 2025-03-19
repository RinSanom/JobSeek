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
        console.log("Login successful:", response);

        if (response?.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);

          if (response?.refreshToken) {
            localStorage.setItem("refreshToken", response.refreshToken);
          }

          toast.success(t("loginSuccess"), {
            position: "bottom-right",
          });

          if (response.role === "FREELANCER") {
            console.log("Freelancer login res : ", response.role);
            localStorage.setItem("userRole", response.role);

            navigate("/");
          } else if (response.role === "BUSINESS_OWNER") {
            console.log("bussiness login res :", response.role);
            localStorage.setItem("userRole", response.role);

            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          toast.error(t("noTokenReceived"));
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error(err.data?.message || t("invalidCredentials"));
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            {t("welcomeTo")}
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">JobSeek</h1>
          <img
            src={Ta1}
            alt={t("welcomeGraphic")}
            className="mt-6 sm:mt-8 md:mt-10 w-full sm:w-3/4 max-w-xs sm:max-w-sm md:max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
                    <NavLink className="text-primary dark:text-white text-lg md:text-2xl underline " to="/">{t("back")}</NavLink>
          <div className="flex items-center gap-3">
            <NavLink to="/">
            <img src={Ta2} alt={t("logoAlt")} className="w-10 h-10 sm:w-12 sm:h-12" />
            </NavLink>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-300">JobSeek</h1>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {t("welcomeBack")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t("loginPrompt")}
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
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
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">
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
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                  placeholder={t("passwordPlaceholder")}
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
              <div className="text-right mt-1 sm:mt-2">
                <span
                  className="text-xs sm:text-sm text-blue-900 dark:text-blue-300 hover:underline cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  {t("forgotPassword")}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm text-center">
                {error?.data?.message || t("invalidCredentials")}
              </p>
            )}

            {/* Submit Button */}
            <button
              className="w-full bg-blue-900 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 transition"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t("loggingIn") : t("login")}
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t("noAccount")}{" "}
            <span
              className="text-blue-900 dark:text-blue-300 hover:underline cursor-pointer font-medium"
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