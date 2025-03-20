import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Aos from "aos";
import "aos/dist/aos.css";
// Importing icons from react-icons
import { FaEye, FaRocket, FaShieldAlt } from "react-icons/fa";

const VisionMissionValues = () => {
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Custom hexagon SVG background for icons
  const HexagonIcon = ({ children }) => (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[120px] h-[120px]"
        viewBox="0 0 24 24"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="0.5"
      >
        <path d="M12 2L21.6 8v8L12 22 2.4 16V8z" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );

  const cards = [
    {
      title: t("ourVision"),
      description: t("visionDescription"),
      icon: (
        <HexagonIcon>
          <FaEye className="w-10 h-10 text-blue-600 dark:text-blue-300" /> {/* Vision icon */}
        </HexagonIcon>
      ),
    },
    {
      title: t("ourMission"),
      description: t("missionDescription"),
      icon: (
        <HexagonIcon>
          <FaRocket className="w-10 h-10 text-blue-600 dark:text-blue-300" /> {/* Mission icon */}
        </HexagonIcon>
      ),
    },
    {
      title: t("coreValues"),
      description: t("valuesDescription"),
      icon: (
        <HexagonIcon>
          <FaShieldAlt className="w-10 h-10 text-blue-600 dark:text-blue-300" /> {/* Values icon */}
        </HexagonIcon>
      ),
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12"
        >
          {t("ourPurpose")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon container */}
              <div className="mb-6 -mt-16">{card.icon}</div>
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionMissionValues;