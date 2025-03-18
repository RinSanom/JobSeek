import Aos from "aos";
import React, { useEffect } from "react";
import CardOurMentor from "../../components/cards/CardAboutUs/CardOurMentor";
import CardOurTeam from "../../components/cards/CardAboutUs/CardOurTeam";
import CardAchievement from "../../components/cards/CardAboutUs/CardAchievement";
import CardService from "../../components/cards/CardAboutUs/CardService";
import CardContactUs from "../../components/cards/CardAboutUs/CardContactUs";
import HeroSection from "../../components/cards/CardAboutUs/HeroSection";
import MissionSection from "../../components/cards/CardAboutUs/MissionSection";
import VisionSection from "../../components/cards/CardAboutUs/VisionSection";
import { useTranslation } from "react-i18next";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";
import VisionMissionValues from "./VisionMissionValues";
import OurMentor from "./OurMentor";
import OurTeam from "./OurTeam";

export default function AboutUsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ScrollIndicator />
      <HeroSection />
      <div className="max-w-screen-xl mx-auto sm:px-6">
        <VisionMissionValues />
        <section className="mt-20">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-10"
          >
            {t("ourMentor")}
          </h2>
          <OurMentor />
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-10"
          >
            {t("ourTeam")}
          </h2>
        <div>
        <OurTeam />
        </div>
        </section>
        <section className="mt-20">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold text-primary text-center underline underline-offset-8 decoration-secondary mb-10"
          >
            {t("achievement")}
          </h2>
          <CardAchievement />
        </section>
        {/* <section className="mt-20">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold text-primary text-center underline underline-offset-8 decoration-secondary mb-10"
          >
            {t("aboutUs.service")}
          </h2>
          <CardService />
        </section> */}

        {/* How It Works Section */}
        <section className="mt-20">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold text-primary text-center underline underline-offset-8 decoration-secondary mb-12"
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Freelancers Create Profiles
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Freelancers create profiles and post their services to showcase their skills and expertise.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600 dark:text-blue-300">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Business Owners Post Jobs
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Business owners post job listings to find the perfect freelancers for their projects.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600 dark:text-blue-300">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Connect & Collaborate
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Both parties connect, negotiate, and collaborate to bring projects to life successfully.
              </p>
            </div>
          </div>
        </section>




        {/* Contact Us Section */}
        <section className="mt-20">
          <CardContactUs />
        </section>
      </div>
    </main>
  );
}