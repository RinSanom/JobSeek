import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import logo from "../../assets/Footer/Logo3.png";
import istad from "../../assets/Footer/istad.webp";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary dark:bg-primary min-w-xs">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <NavLink to="/" className="flex items-center">
              <img
                src={logo}
                className="h-8 me-3"
                alt="JobSeek Logo"
              />
            </NavLink>
            <h2 className="dark:text-white mt-15">
              {t('footer.createdBy')}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-md font-semibold text-white uppercase dark:text-white">
                {t('footer.quickLine')}
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <a href="https://github.com/kea-daron" className="hover:underline">
                    {t('footer.findJobs')}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/kea-daron" className="hover:underline">
                    {t('footer.findFreelancers')}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/kea-daron" className="hover:underline">
                    {t('footer.postJob')}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/kea-daron" className="hover:underline">
                    {t('footer.dashboard')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-semibold text-white uppercase dark:text-white">
                {t('footer.supportLegal')}
              </h2>
              <ul className="text-white-text dark:text-white font-medium">
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline">
                    {t('footer.chatBotHelp')}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline">
                    {t('footer.faqs')}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline">
                    {t('footer.policyPrivacy')}
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline">
                    {t('footer.termsOfService')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-md font-semibold text-white uppercase dark:text-white">
                {t('footer.ourSponsors')}
              </h2>
              <ul>
                <li className="h-[100px] w-[200px]">
                  <a href="#" className="hover:underline">
                    <img
                      src={istad}
                      alt={t('footer.istadLogo')}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:text-white lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white dark:text-white">
            {t('footer.privacyPolicy')}<br />
            {t('footer.rightsReserved')}
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {/* Social Icons */}
            <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white">
              {/* SVG icon */}
            </a>
            {/* Other social icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
