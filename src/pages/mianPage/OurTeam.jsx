import React from "react";
import { FaTelegram, FaGithub } from "react-icons/fa"; // Import icons
import daraImg from "../../assets/imgAboutUs/dara.jpg";
import sanomImg from "../../assets/imgAboutUs/sanom.jpg";
import chimImg from "../../assets/imgAboutUs/theara.jpg";
import daronImg from "../../assets/imgAboutUs/daron.png";
import marinetImg from "../../assets/imgAboutUs/marinet.jpg";
import tainganImg from "../../assets/imgAboutUs/TaingAn.jpg";


const OurTeam = () => {
  const employees = [
    {
      name: "Kong Sisovandara",
      position: "Lead Web",
      color: "blue",
      image: daraImg,
      telegram: "https://t.me/keoKAY", // Add your actual Telegram links
      github: "https://github.com/keoKAY", // Add your actual GitHub links
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
      telegram: "https://t.me/keoKAY", // Add your actual Telegram links
      github: "https://github.com/keoKAY", // Add your actual GitHub links
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
      image: daronImg,
      telegram: "https://t.me/keoKAY", // Add your actual Telegram links
      github: "https://github.com/keoKAY", // Add your actual GitHub links
    },
    {
      name: "Sorn Sophamarinet",
      position: "Mentor ",
      color: "yellow",
      image: marinetImg,
      telegram: "https://t.me/proeungchiso",
      github: "https://github.com/proeungchiso",
    },
    {
      name: "Korm TaingAn",
      position: "Mentor ",
      color: "blue",
      image: tainganImg,
      telegram: "https://t.me/keoKAY", // Add your actual Telegram links
      github: "https://github.com/keoKAY", // Add your actual GitHub links
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

  return (
    <div className="flex flex-wrap justify-center gap-10 p-6 ">
      {employees.map((employee, index) => (
        <div
          key={index}
          className="w-64 rounded shadow-md overflow-hidden relative">
          <div className="relative">
            <img
              src={employee.image}
              alt={employee.name}
              className="w-full h-64 object-cover z-50"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-2">{employee.company}</p>
            <p className="text-xs text-gray-500 whitespace-pre-line">
              {employee.position}
            </p>
            <p className="text-lg font-bold mt-4">{employee.name}</p>

            {/* Social media links */}
            <div className="flex mt-3 space-x-3">
              <a
                href={employee.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors">
                <FaTelegram size={22} />
              </a>
              <a
                href={employee.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-black transition-colors">
                <FaGithub size={22} />
              </a>
            </div>
          </div>
          <div
            className={`absolute bottom-0 right-0 w-8 h-8 ${getColorClass(
              employee.color
            )} transform rotate-45 translate-x-4 translate-y-4`}></div>
        </div>
      ))}
    </div>
  );
};

export default OurTeam;
