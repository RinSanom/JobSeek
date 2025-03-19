import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Added navigation CSS
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Aos from "aos";
import daraImg from "../../assets/imgAboutUs/dara.jpg";
import nomImg from "../../assets/imgAboutUs/sanom.jpg";
import thearaImg from "./../../assets/imgAboutUs/theara.jpg";

const testimonials = [
  {
    nameKey: "KongSisovandara",
    roleKey: "leadFrontend",
    image: daraImg,
    feedbackKey: "kongSisovandaraFeedback",
  },
  {
    nameKey: "ChimTheara",
    roleKey: "leadDesigner",
    image: nomImg,
    feedbackKey: "chimThearaFeedback",
  },
  {
    nameKey: "RinSanom",
    roleKey: "webDeveloper",
    image: thearaImg,
    feedbackKey: "rinSanomFeedback",
  },
  {
    nameKey: "KongSisovandara",
    roleKey: "leadFrontend",
    image: daraImg,
    feedbackKey: "kongSisovandaraFeedback",
  },
  {
    nameKey: "ChimTheara",
    roleKey: "leadDesigner",
    image: nomImg,
    feedbackKey: "chimThearaFeedback",
  },
  {
    nameKey: "RinSanom",
    roleKey: "webDeveloper",
    image: thearaImg,
    feedbackKey: "rinSanomFeedback",
  },
];

const CardFeedback = () => {
  useEffect(() => {
    Aos.init({ duration: 700, once: false });
  }, []);
  const { t } = useTranslation();

  return (
    <div className="w-full mx-auto  cursor-pointer">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 }, // Phones
          768: { slidesPerView: 2, spaceBetween: 15 }, // iPads
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Laptops
        }}
        className="rounded-lg shadow-lg">
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <blockquote
              data-aos="fade-up"
              data-aos-duration="1000"
              className="rounded-lg bg-gray-50 p-4 sm:p-6 lg:p-8 shadow-lg dark:bg-black dark:border-white dark:border">
              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  alt={t(testimonial.nameKey)}
                  src={testimonial.image}
                  className="size-12 sm:size-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {t(testimonial.nameKey)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {t(testimonial.roleKey)}
                  </p>
                  <div className="flex gap-0.5 text-yellow-500">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 sm:size-5"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 text-start line-clamp-6">
                {t(testimonial.feedbackKey)}
              </p>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardFeedback;
