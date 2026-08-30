import React from "react";
import { motion } from "framer-motion";

import { usePortfolio } from "../../contexts/PortfolioContext";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { Header } from "../atoms/Header";

const About = () => {
  const { config, stats } = usePortfolio();
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
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
