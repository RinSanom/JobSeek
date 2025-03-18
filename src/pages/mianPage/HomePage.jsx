import React, { useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import CardHowerEffec from "../../components/cards/CardHowerEffec";
import CardWhyUS from "../../components/cards/CardWhyUs";
import PopularCart from "../../components/cards/PopularCart";
import CardFeedback from "../../components/cards/CardFeedback";
import { FaUserFriends, FaUserTie, FaUsers } from "react-icons/fa";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export default function HomePage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 700, once: false });
  }, []);

  const cardData = [
    {
      id: 1,
      title: t("freelancer"),
      description: t("freelancerDescription"),
      svg: <FaUserFriends />,
    },
    {
      id: 2,
      title: t("businessOwner"),
      description: t("businessOwnerDescription"),
      svg: <FaUserTie />,
    },
    {
      id: 3,
      title: t("jobSeeker"),
      description: t("jobSeekerDescription"),
      svg: <FaUsers />,
    },
  ];

  return (
    <>
      <ScrollIndicator />
      <section>
        <div className="flex justify-center items-center min-h-[50vh] sm:min-h-screen bg-gray-100 dark:bg-gray-900">
          <Carousel />
        </div>
      </section>
      <section className="bg-blue-600 dark:bg-blue-700 container mx-auto gap-5 sm:gap-7 px-4 sm:px-5 md:px-20 xl:px-32 py-10 sm:py-17">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-start text-white dark:text-white">
            {t("forJobSeekService")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white dark:text-white mt-2">
            {t("jobSeekDescription")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {cardData.map((card) => (
            <CardHowerEffec
              key={card.id}
              heading={card.title}
              content={card.description}
              svg={card.svg}
            />
          ))}
        </div>
      </section>
      <section className="container mt-8 sm:mt-12 px-4 sm:px-5 md:px-20 xl:px-32 dark:bg-gray-900">
        <div className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="py-8 sm:py-16"
          >
            <div className="md:col-span-2 justify-center items-center order-1 md:order-none">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white">
                {t("careerSuccess")}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mt-2 text-white dark:text-white">
                {t("careerSuccessDescription")}
              </p>
            </div>
          </div>
          <img
            data-aos="fade-left"
            data-aos-duration="1000"
            alt=""
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2uQRrnlUBwOoqlNbcQSpYr/a4fbb0dbc1a6b5ba696410ff091039a8/GettyImages-2170485830.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000"
            className="h-48 sm:h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[20px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
          />
        </div>
      </section>
      <section className="bg-blue-600 dark:bg-blue-700 container px-4 sm:px-5 py-5 my-10 sm:my-16 md:px-20 xl:px-32">
        <div
          data-aos="fade-up-right"
          data-aos-duration="1000"
          className="flex flex-col justify-center items-start mt-8 sm:mt-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white">
            {t("whyJoinUs")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-white dark:text-white">
            {t("whyJoinUsDescription")}
          </p>
        </div>
        <div className="mt-6 sm:mt-10">
          <CardWhyUS />
        </div>
      </section>
      <section className="px-4 sm:px-5 py-5 md:px-20 xl:px-32 dark:bg-gray-900">
        <div data-aos="fade-up-right" data-aos-duration="1000">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white">
            {t("mostPopularJob")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2 sm:mt-4 text-white dark:text-white">
            {t("discoverJobOpportunities")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10">
          <PopularCart />
        </div>
      </section>
      <section className="bg-blue-600 dark:bg-blue-700  px-4 sm:px-5 py-5 md:px-10 lg:px-20 xl:px-32">
        <div className="text-white flex flex-col md:flex-row justify-between items-center px-2 sm:px-4 py-4 sm:py-6 md:px-8 md:py-8 lg:px-12 lg:py-8 rounded-xl gap-4 sm:gap-6 md:gap-0">
          <div className="max-w-full md:max-w-lg text-center md:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight text-white dark:text-white">
              {t("opportunitiesCurated")}
            </h2>
          </div>
          <div
            ref={ref}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 border-t-2 sm:border-t-0 sm:border-l-2 border-white pt-4 sm:pt-0 px-2 sm:px-4 md:px-8 lg:px-12"
          >
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white dark:text-white">
                {inView && (
                  <CountUp start={0} end={500} duration={5} separator="," />
                )}
                +
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white dark:text-white">
                {t("jobOpenings")}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white dark:text-white">
                {inView && <CountUp start={0} end={328} duration={5} />}+
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white dark:text-white">
                {t("topEmployers")}
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://remitpay.co.in/assets/img/others/fact_img.png"
              alt="People"
              className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
            />
          </div>
        </div>
      </section>
      <section className="container px-4 sm:px-5 py-5 md:px-20 xl:px-32 dark:bg-gray-900">
        <div className="py-8 sm:py-16 text-start">
          <h2
            data-aos="fade-up-right"
            data-aos-duration="1000"
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
          >
            {t("clientsFeedback")}
          </h2>
          <p
            data-aos="fade-up-right"
            data-aos-duration="1000"
            className="text-sm sm:text-base md:text-lg mt-2 sm:mt-4 text-gray-900 dark:text-white mb-8 sm:mb-12"
          >
            {t("whyJoinUsDescription")}
          </p>
          <CardFeedback />
        </div>
      </section>
    </>
  );
}
