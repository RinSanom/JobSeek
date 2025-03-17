import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoSun, GoMoon } from "react-icons/go";
import { RiRobot3Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "../../i18n";
import Button from "../button/Button";
import { useGetMeQuery } from "../../feature/auth/authSlide";
import toast from "react-hot-toast";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );
  console.log("userRole in navbar", userRole);

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
    // Remove tokens and role from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");

    // Update state
    setUserRole(null);

    // Show success toast
    toast.success("Logged out successfully!", {
      position: "bottom-right",
    });

    // Close the dropdown
    setProfileDropdown(false);

    // Redirect to home page
    navigate("/");
  };

  return (
    <nav className="bg-primary w-full shadow-md dark:bg-primary sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src="../../assets/images/Logo3.png"
            className="md:h-8 h-4"
            alt="JobSeek Logo"
          />
        </NavLink>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white rounded-lg focus:outline-none dark:text-gray-200">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:w-auto md:items-center ${
            isOpen ? "block" : "hidden"
          }`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 bg-primary md:bg-transparent p-4 md:p-0">
            {/* Common links for all users */}

            {/* Links for freelancers */}
            {userRole === "FREELANCER" && (
              <>
                <li>
                  <NavLink
                    to="/job-post"
                    className="text-white hover:text-secondary">
                    {t("Jobs")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/freelancer-page"
                    className="text-white hover:text-secondary">
                    {t("Services")}
                  </NavLink>
                </li>
              </>
            )}

            {/* Links for business owners */}
            {userRole === "BUSINESS_OWNER" && (
              <>
                <li>
                  <NavLink
                    to="/post-job"
                    className="text-white hover:text-secondary">
                    {t("Post Job")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/freelancer-service"
                    className="text-white hover:text-secondary">
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
                    className="text-white hover:text-secondary">
                    {t("job")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/freelancer-page"
                    className="text-white hover:text-secondary">
                    {t("services")}
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/about-us"
                className="text-white hover:text-secondary">
                {t("aboutUs")}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Theme and Language Switch */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {isDark ? (
              <GoMoon className="text-secondary text-[24px] cursor-pointer" />
            ) : (
              <GoSun className="text-secondary text-[24px] cursor-pointer" />
            )}
          </button>
          <NavLink to="/chat-bot">
            <RiRobot3Line className="text-secondary text-[24px] cursor-pointer" />
          </NavLink>
          <img
            onClick={() => changeLanguage("en")}
            src="src/assets/images/England.png"
            alt="English"
            className="w-[40px] h-[20px] cursor-pointer"
          />
          <img
            onClick={() => changeLanguage("km")}
            src="src/assets/images/Cambodia.png"
            alt="Khmer"
            className="w-[40px] h-[20px] cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* Show "Join as Business" only if not already a business owner */}
          {(!userRole || userRole !== "BUSINESS_OWNER") && (
            <NavLink to="/register-businessowner">
              <button className="text-white px-[17px] py-[9px] border-2 border-secondary rounded-md cursor-pointer">
                Joint As Business
              </button>
            </NavLink>
          )}

          {accessToken || refreshToken ? (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full"
                onClick={() => setProfileDropdown(!profileDropdown)}>
                <span className="sr-only">Open user menu</span>
                {userData?.profileImageUrl ? (
                  <img
                    className="w-14 h-14 rounded-full object-cover"
                    src={userData.profileImageUrl}
                    alt="user photo"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-4xl font-bold">
                      {userData?.fullName?.charAt(0) || "S"}
                    </span>
                  </div>
                )}
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <ul className="py-2 text-gray-700 dark:text-white">
                    {userRole === "FREELANCER" && (
                      <>
                        <li>
                          <NavLink
                            to="/freelancer-profile"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {t("My Profile")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/create-service"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {t("Create Service")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/edit-profile-freelanecer"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {t("My Profile")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/create-job"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {t("Create Job")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/edit-profile-business-owner"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {t("Edit Profile")}
                          </NavLink>
                        </li>
                      </>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {t("Logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/register-freelancer">
              <Button color="bg-secondary cursor-pointer" text={t("signUp")} />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
