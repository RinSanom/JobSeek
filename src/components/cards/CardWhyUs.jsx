import {
  FaCheckCircle,
  FaLock,
  FaChartBar,
  FaStar,
  FaRocket,
  FaRobot,
} from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Aos from "aos";
import { useEffect } from "react";

const cardData = [
  {
    id: 1,
    icon: <FaCheckCircle className="h-10 w-10 text-white-text" />,
    titleKey: "allInOneSolution", // Add translation key for title
    descriptionKey: "allInOneDescription", // Add translation key for description
    link: "#",
  },
  {
    id: 2,
    icon: <FaLock className="h-10 w-10 text-white-text" />,
    titleKey: "secureAndTrusted",
    descriptionKey: "secureAndTrustedDescription",
    link: "#",
  },
  {
    id: 3,
    icon: <FaChartBar className="h-10 w-10 text-white-text" />,
    titleKey: "personalizedDashboard",
    descriptionKey: "personalizedDashboardDescription",
    link: "#",
  },
  {
    id: 4,
    icon: <FaStar className="h-10 w-10 text-white-text" />,
    titleKey: "verifiedReviews",
    descriptionKey: "verifiedReviewsDescription",
    link: "#",
  },
  {
    id: 5,
    icon: <FaRocket className="h-10 w-10 text-white-text" />,
    titleKey: "fastHiringProcess",
    descriptionKey: "fastHiringProcessDescription",
    link: "#",
  },
  {
    id: 6,
    icon: <FaRobot className="h-10 w-10 text-white-text" />,
    titleKey: "support24x7",
    descriptionKey: "support24x7Description",
    link: "#",
  },
];

const CardWhyUS = () => {
  const { t } = useTranslation(); // Initialize the t function for translations
  useEffect(() => {
    Aos.init({ duration: 700, once: false });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card) => (
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          key={card.id}
          className="group relative cursor-pointer overflow-hidden bg-white dark:bg-black dark:border-white dark:border px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg sm:px-10 rounded-sm">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-primary-hover">
              {card.icon}
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-black-text dark:text-white-text transition-all duration-300 group-hover:text-white-text">
              <h3 className="text-xl font-semibold">{t(card.titleKey)}</h3>{" "}
              {/* Add translated title */}
              <p>{t(card.descriptionKey)}</p> {/* Add translated description */}
            </div>
            {/* <div className="pt-5 text-base font-semibold leading-7">
              <p>
                <a
                  href={card.link}
                  className="text-secondary transition-all duration-300 group-hover:text-white-text">
                  {t("readDocs")} &rarr;
                </a>
              </p>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardWhyUS;
