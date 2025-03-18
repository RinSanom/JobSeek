import React from "react";
import { FaTelegram, FaGithub } from "react-icons/fa";
import daraImg from "../../assets/imgAboutUs/dara.jpg";
import sanomImg from "../../assets/imgAboutUs/sanom.jpg";
import chimImg from "../../assets/imgAboutUs/theara.jpg";
import daronImg from "../../assets/imgAboutUs/daron.png";
import marinetImg from "../../assets/imgAboutUs/marinet.jpg";
import meyLingImg from "../../assets/imgAboutUs/meyLingjpg.jpg";
import taingAnImg from "../../assets/imgAboutUs/taingAnn.jpg";


const OurTeam = () => {
  const employees = [
    {
      name: "Kong Sisovandara",
      position: "Lead Web",
      color: "blue",
      image: daraImg,
      telegram: "https://t.me/keoKAY",
      github: "https://github.com/keoKAY",
    },
    {
      name: "Rin Sanom",
      position: "Lead Web",
      color: "yellow",
      image: sanomImg,
      telegram: "https://t.me/proeungchiso",
      github: "https://github.com/proeungchiso",
    },
    {
      name: "Chim Theara",
      position: "Lead Java",
      color: "blue",
      image: chimImg,
      telegram: "https://t.me/keoKAY",
      github: "https://github.com/keoKAY",
    },
    {
      name: "Kea Daron",
      position: "Lead Java",
      color: "yellow",
      image: daronImg,
      telegram: "https://t.me/proeungchiso",
      github: "https://github.com/proeungchiso",
    },
    {
      name: "Chhun Meyling",
      position: "Lead Java",
      color: "blue",
      image: meyLingImg, 
      telegram: "https://t.me/keoKAY",
      github: "https://github.com/keoKAY",
    },
    {
      name: "Sorn Sophamarinet",
      position: "Mentor",
      color: "yellow",
      image: marinetImg,
      telegram: "https://t.me/proeungchiso",
      github: "https://github.com/proeungchiso",
    },
    {
      name: "Korm TaingAn",
      position: "Mentor",
      color: "blue",
      image: taingAnImg,
      telegram: "https://t.me/keoKAY",
      github: "https://github.com/keoKAY",
    },
  ];

  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "yellow":
        return "bg-yellow-500";
      case "green":
        return "bg-green-500";
      case "pink":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  // Split employees into two groups: first 3 and last 4
  const firstRow = employees.slice(0, 3);
  const secondRow = employees.slice(3);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* First Row: 3 cards */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mb-10 justify-center">
        {firstRow.map((employee, index) => (
          <div
            key={index}
            className="w-64 rounded shadow-md overflow-hidden relative mx-auto"
          >
            <div className="relative">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500">{employee.position}</p>
              <p className="text-lg font-bold mt-2">{employee.name}</p>

              {/* Social media links */}
              <div className="flex mt-3 space-x-3">
                <a
                  href={employee.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaTelegram size={22} />
                </a>
                <a
                  href={employee.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  <FaGithub size={22} />
                </a>
              </div>
            </div>
            <div
              className={`absolute bottom-0 right-0 w-8 h-8 ${getColorClass(
                employee.color
              )} transform rotate-45 translate-x-4 translate-y-4`}
            ></div>
          </div>
        ))}
      </div>

      {/* Second Row: 4 cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-10 justify-center">
        {secondRow.map((employee, index) => (
          <div
            key={index + 3}
            className="w-64 rounded shadow-md overflow-hidden relative mx-auto"
          >
            <div className="relative">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500">{employee.position}</p>
              <p className="text-lg font-bold mt-2">{employee.name}</p>

              {/* Social media links */}
              <div className="flex mt-3 space-x-3">
                <a
                  href={employee.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaTelegram size={22} />
                </a>
                <a
                  href={employee.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  <FaGithub size={22} />
                </a>
              </div>
            </div>
            <div
              className={`absolute bottom-0 right-0 w-8 h-8 ${getColorClass(
                employee.color
              )} transform rotate-45 translate-x-4 translate-y-4`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;