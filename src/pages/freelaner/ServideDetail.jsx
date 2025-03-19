import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  useGetAllServicesQuery,
  useGetAllUsersQuery,
} from "../../feature/service/serviceSlde";

export default function ServiceDetail() {
  const { id } = useParams();
  const { data: serviceData, isLoading, isError } = useGetAllServicesQuery(1);
  const { data: userData } = useGetAllUsersQuery();

  const users = userData?.data?.content || [];
  const services = serviceData?.content || [];
  const service = services.find((item) => String(item.id) === String(id));
  const user = users.find(
    (item) => String(item.id) === String(service?.userId)
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const relatedServices = services.filter((s) => s.id !== service?.id);
  const slidesToShow = 4;
  const totalSlides = Math.ceil(relatedServices.length / slidesToShow);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  if (isError || !service) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">
            Oops! Couldn’t load this service
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white dark:bg-gray-800 rounded-xl  overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Image Section */}
            <div className="relative">
              <img
                src={
                  service.jobImages[0] ||
                  "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                }
                className="w-full h-[350px] object-cover"
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span
                className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-sm font-medium text-white shadow-md ${
                  service.status === "active"
                    ? "bg-green-500"
                    : service.status === "disable"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}>
                {service.status.charAt(0).toUpperCase() +
                  service.status.slice(1)}
              </span>
            </div>

            {/* Right Column: Details Section */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {service.category.name}
                  </p>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {service.title}
                  </h1>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {service.description}
              </p>

              {user ? (
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Service Provider
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>
                      <strong className="font-medium">Name:</strong>{" "}
                      {user.fullName}
                    </p>
                    <p>
                      <strong className="font-medium">Email:</strong>{" "}
                      {user.email}
                    </p>
                    <p>
                      <strong className="font-medium">Phone:</strong>{" "}
                      {user.phone}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 mb-8">
                  Provider information unavailable
                </p>
              )}
              <button className="w-full bg-primary  text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                Apply Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Job Description
            </h2>
            <p className="mt-2 text-gray-700">
              As a software development company dedicated to delivering
              high-quality, scalable, and innovative web solutions, we are
              looking for a highly skilled Senior Back-End Developer to join our
              team and help us build and maintain robust server-side
              applications. If you are passionate about coding, problem-solving,
              and working with the latest technologies, we want to hear from
              you!
            </p>
          </div>

          {/* Job Requirement Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Job Requirements
            </h2>
            <ul className="mt-2 list-disc list-inside space-y-2 text-gray-700">
              <li>4+ years of experience in back-end web development.</li>
              <li>
                Proficiency in Node.js, Python (Django/Flask), Java, or PHP
                (Laravel).
              </li>
              <li>
                Strong experience with databases such as PostgreSQL, MySQL, or
                MongoDB.
              </li>
              <li>
                Knowledge of RESTful APIs, and microservices architecture.
              </li>
              <li>
                Familiarity with cloud platforms such as AWS, Google Cloud, or
                Azure.
              </li>
            </ul>
          </div>
          {/* Job Responsibility Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Job Responsibilities
            </h2>
            <ul className="mt-2 list-disc list-inside space-y-2 text-gray-700">
              <li>
                Design, develop, and maintain scalable and secure server-side
                applications.
              </li>
              <li>
                Write clean, efficient, and maintainable code following best
                practices.
              </li>
              <li>
                Build and maintain APIs and microservices for front-end and
                mobile applications.
              </li>
              <li>Optimize database performance and ensure data integrity.</li>
              <li>
                Collaborate with front-end developers, DevOps engineers, and
                other team members.
              </li>
            </ul>
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Google Maps */}
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.631404683705!2d104.89921187452715!3d11.578259843893385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1skm!2skh!4v1741927447451!5m2!1skm!2skh"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"></iframe>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Phone
                </h4>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Email
                </h4>
                <p>support@itsolutions.com</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Working Hours
                </h4>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Carousel */}
        {relatedServices.length > 0 && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Explore Similar Services
              </h3>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="flex min-w-full gap-6">
                      {relatedServices
                        .slice(
                          slideIndex * slidesToShow,
                          (slideIndex + 1) * slidesToShow
                        )
                        .map((related) => (
                          <NavLink
                            key={related.id}
                            to={`/freelancer-page/${related.id}`}
                            className="w-1/4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                              <div className="relative overflow-hidden">
                                <img
                                  src={
                                    related.jobImages[0] ||
                                    "https://i.pinimg.com/originals/4f/7e/ab/4f7eab8b98913e658391c54b57980e68.gif"
                                  }
                                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                  alt={related.title}
                                />
                              </div>
                              <div className="p-4">
                                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                  {related.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {related.description}
                                </p>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {totalSlides > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-[-50px] top-1/2 -translate-y-1/2 text-primary-hover bg-opacity-70  w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
                    <span className="text-6xl">‹</span>
                  </button>
                  <button
                    onClick={goToPrevious}
                    className="absolute right-[-50px] top-1/2 -translate-y-1/2 text-primary-hover bg-opacity-70  w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
                    <span className="text-6xl">›</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
