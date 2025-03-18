import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoSun, GoMoon } from "react-icons/go";
import { RiRobot3Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "../../i18n";
import { useGetMeQuery } from "../../feature/auth/authSlide";
import toast from "react-hot-toast";
import logo from "../../assets/images/Logo3.png";
import englishImage from "../../assets/images/England.png";
import khmerImage from "../../assets/images/Cambodia.png";
import { CiMenuBurger } from "react-icons/ci";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDarkMode } = useTheme();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const { data, isLoading, error } = useGetMeQuery();
  const userData = data?.data || {};

  useEffect(() => {
    if (userData?.role) {
      localStorage.setItem("userRole", userData.role);
      setUserRole(userData.role);
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    setUserRole(null);
    toast.success("Logged out successfully!", {
      position: "bottom-right",
    });
    setProfileDropdown(false);
    navigate("/");
  };

  return (
    <nav className="bg-primary w-full shadow-md dark:bg-primary sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            className="h-4 sm:h-6 md:h-6 lg:h8"
            alt="JobSeek Logo"
          />
        </NavLink>

        {/* Navigation Links */}
        <div
          className={`w-full lg:flex lg:w-auto lg:items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col lg:items-center lg:flex-row lg:space-y-0 md:space-y-5 space-y-3 md:space-x-4 lg:space-x-12 bg-primary md:bg-transparent p-4 lg:p-0 text-base sm:text-lg md:text-lg">
            {/* Links based on user role */}
            <div className="lg:flex lg:space-x-4 md:space-x-2">
              {userRole === "FREELANCER" && (
                <>
                  <li>
                    <NavLink
                      to="/job-post"
                      className="text-white hover:text-secondary"
                    >
                      {t("Jobs")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/freelancer-page"
                      className="text-white hover:text-secondary"
                    >
                      {t("Services")}
                    </NavLink>
                  </li>
                </>
              )}

              {userRole === "BUSINESS_OWNER" && (
                <>
                  <li>
                    <NavLink
                      to="/post-job"
                      className="text-white hover:text-secondary"
                    >
                      {t("Post Job")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/freelancer-service"
                      className="text-white hover:text-secondary"
                    >
                      {t("Freelancers Services")}
                    </NavLink>
                  </li>
                </>
              )}

              {!userRole && (
                <>
                  <li>
                    <NavLink
                      to="/job-post"
                      className="text-white hover:text-secondary"
                    >
                      {t("job")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/freelancer-page"
                      className="text-white hover:text-secondary"
                    >
                      {t("services")}
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/about-us"
                  className="text-white hover:text-secondary"
                >
                  {t("aboutUs")}
                </NavLink>
              </li>
            </div>

            {/* Language Flags */}
            <div>
              <li className="flex items-center space-x-4 sm:space-x-4 mt-2 lg:mt-0">
                <img
                  onClick={() => changeLanguage("en")}
                  src={englishImage}
                  alt="English"
                  className="w-8 h-4 sm:w-8 sm:h-4 md:w-12 md:h-6 lg:w-[40px] lg:h-[20px] cursor-pointer"
                />
                <img
                  onClick={() => changeLanguage("km")}
                  src={khmerImage}
                  alt="Khmer"
                  className="w-8 h-4 sm:w-8 sm:h-4 md:w-12 md:h-6 lg:w-[40px] lg:h-[20px] cursor-pointer"
                />
              </li>
            </div>
            <div className="flex space-x-3 lg:space-x-4 items-center">
              {/* Theme Toggle */}
              <button onClick={toggleDarkMode} className="focus:outline-none">
                {isDark ? (
                  <GoMoon className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-[24px] cursor-pointer" />
                ) : (
                  <GoSun className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-[24px] cursor-pointer" />
                )}
              </button>

              {/* Chat Bot */}
              <NavLink to="/chat-bot">
                <RiRobot3Line className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-[24px] cursor-pointer" />
              </NavLink>
            </div>
          </ul>
        </div>

        {/* Theme, Chat Bot, and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-4">
          {/* Join as Business Button */}
          {(!userRole || userRole !== "BUSINESS_OWNER") && (
            <div>
              <li className="lg:mt-0 md:mt-4 text-primary">
                <NavLink to="/register-businessowner">
                  <button className="text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 md:px-3 md:py-2 border-2 border-secondary rounded-md whitespace-nowrap">
                    {t("joinASBusiness")}
                  </button>
                </NavLink>
              </li>
            </div>
          )}

          {/* Profile or Sign Up */}
          {accessToken || refreshToken ? (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <span className="sr-only">Open user menu</span>
                {userData?.profileImageUrl ? (
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover"
                    src={userData.profileImageUrl}
                    alt="user photo"
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
                      {userData?.fullName?.charAt(0) || "S"}
                    </span>
                  </div>
                )}
              </button>
              {profileDropdown && (
                <div className="absolute items-center right-0 mt-2 w-36 sm:w-40 md:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm">
                  <ul className="py-2 text-gray-700 dark:text-white">
                    {userRole === "FREELANCER" && (
                      <>
                        <li>
                          <NavLink
                            to="/freelancer-profile"
                            className="block px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {t("My Profile")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/create-service"
                            className="block px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {t("Create Service")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/edit-profile-freelanecer"
                            className="block px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {t("Edit Profile")}
                          </NavLink>
                        </li>
                      </>
                    )}

                    {userRole === "BUSINESS_OWNER" && (
                      <>
                        <li>
                          <NavLink
                            to="/profile"
                            className="block px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {t("My Profile")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/create-job"
                            className="block px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {t("Create Job")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/edit-profile-business-owner"
                            className="block px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {t("Edit Profile")}
                          </NavLink>
                        </li>
                      </>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t("Logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/register-freelancer"
              className="text-white text-xs md:mt-4 lg:mt-0 sm:text-sm px-2 py-1 sm:px-3 sm:py-2 md:px-3 md:py-2 bg-secondary border-2 border-secondary rounded-md cursor-pointer whitespace-nowrap"
            >
              {t("signUp")}
            </NavLink>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden items-end p-2 text-white rounded-lg focus:outline-none dark:text-gray-200"
        >
          <CiMenuBurger className="text-xl sm:text-2xl md:text-2xl lg:text-[24px] cursor-pointer" />
        </button>
      </div>
    </nav>
  );
}
