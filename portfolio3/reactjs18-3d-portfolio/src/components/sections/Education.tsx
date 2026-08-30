import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { educationList } from "../../constants";
import { fadeIn } from "../../utils/motion";

const Education = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.education} />

      <div className="mt-12 flex flex-col gap-6">
        {educationList.map((edu, index) => (
          <motion.div
            key={`edu-${index}`}
            variants={fadeIn("up", "spring", index * 0.3, 0.75)}
            className="bg-tertiary shadow-card relative flex flex-col gap-3 rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#915EFF]/30 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                <div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-[#915EFF] font-semibold text-[16px]">
                    {edu.institution}
                  </p>
                </div>
              </div>
              <span className="bg-primary/80 border border-white/10 text-secondary text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full">
                {edu.date}
              </span>
            </div>

            <p className="text-secondary mt-2 text-[15px] leading-[24px]">
              {edu.details}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
