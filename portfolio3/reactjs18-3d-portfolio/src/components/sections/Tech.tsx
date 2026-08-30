import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { skillCategories } from "../../constants";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { fadeIn } from "../../utils/motion";

const Tech = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.skills} />

      {/* Categorized Skill Badges Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.category}
            variants={fadeIn("up", "spring", idx * 0.2, 0.75)}
            className="bg-tertiary border border-white/10 rounded-2xl p-6 hover:border-[#915EFF]/40 transition-all shadow-card"
          >
            <h3 className="text-[#915EFF] font-bold text-lg mb-4 tracking-wider">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-primary/90 border border-white/10 text-white hover:border-[#915EFF] px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all cursor-default flex items-center gap-2 group"
                >
                  <span className="h-2 w-2 rounded-full bg-[#915EFF] group-hover:scale-125 transition-transform" />
                  {skill.name}
                  {skill.level && (
                    <span className="text-[10px] text-secondary bg-white/5 px-1.5 py-0.5 rounded">
                      {skill.level}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
