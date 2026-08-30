import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { currentlyData } from "../../constants";
import { fadeIn } from "../../utils/motion";

const Currently = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.currently} />

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="bg-tertiary shadow-card mt-12 rounded-2xl p-6 sm:p-10 border border-white/5 relative overflow-hidden"
      >
        {/* Glow background accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-8">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
          </span>
          <h3 className="text-white text-lg font-bold tracking-wide uppercase">
            Live Status & Current Focus — 2026
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary/60 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔵</span>
              <h4 className="text-white font-semibold text-[16px]">
                Currently Building
              </h4>
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              {currentlyData.building}
            </p>
          </div>

          <div className="bg-primary/60 border border-white/10 rounded-xl p-5 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📚</span>
              <h4 className="text-white font-semibold text-[16px]">
                Currently Learning
              </h4>
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              {currentlyData.learning}
            </p>
          </div>

          <div className="bg-primary/60 border border-white/10 rounded-xl p-5 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎯</span>
              <h4 className="text-white font-semibold text-[16px]">
                Currently Open To
              </h4>
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              {currentlyData.openTo}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Currently, "currently");
