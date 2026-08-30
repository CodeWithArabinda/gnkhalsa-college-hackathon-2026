import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services, stats } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <Tilt
    glareEnable
    tiltEnable
    tiltMaxAngleX={25}
    tiltMaxAngleY={25}
    glareColor="#aaa6c3"
    className="w-full xs:w-[250px]"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
    >
      <div className="bg-tertiary flex min-h-[260px] flex-col items-center justify-evenly rounded-[20px] px-8 py-5">
        <img
          src={icon}
          alt={title}
          className="h-16 w-16 object-contain"
        />

        <h3 className="text-center text-[18px] font-bold text-white">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-4xl text-[17px] leading-[30px]"
      >
        {config.sections.about.content}
      </motion.p>

      {/* Stat Cards Row */}
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 0.75)}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {stats.map((stat, idx) => (
          <div
            key={`stat-${idx}`}
            className="bg-tertiary border border-white/10 rounded-2xl p-6 text-center hover:border-[#915EFF]/50 transition-all duration-300 shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#915EFF]">
              {stat.value}
            </h3>
            <p className="text-secondary text-sm font-semibold mt-1 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Domain / Role Expertise Cards */}
      <div className="mt-14">
        <h4 className="text-white text-xl font-bold mb-6">Core Specializations</h4>
        <div className="flex flex-wrap gap-8 max-sm:justify-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
