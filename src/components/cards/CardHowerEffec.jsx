import React, { useEffect } from "react";
import "../../styles/CardHowerEffec.css";
import Aos from "aos";

const CardHowerEffec = ({ heading, content, svg }) => {
  useEffect(() => {
    Aos.init({ duration: 700, once: false });
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="1000" className="card">
      <div className="card-front">
        <div className="card-icon text-gray-700 dark:text-gray-300">{svg}</div>
        <h3 className="font-bold text-lg md:text-sm lg:text-xl text-gray-900 dark:text-white">
          {heading}
        </h3>
      </div>
      <div className="card-content">
        <div className="card-icon hover-icon"></div>
        <h3 className="text-xl sm:text-2xl text-blue-200 font-bold z-10">
          {heading}
        </h3>
        <p className="text-sm sm:text-base text-white z-10">{content}</p>
      </div>
    </div>
  );
};

export default CardHowerEffec;