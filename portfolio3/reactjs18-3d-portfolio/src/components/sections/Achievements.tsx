import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { achievementsList } from "../../constants";
import { fadeIn } from "../../utils/motion";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "award":
      return "🏆";
    case "certificate":
      return "📜";
    case "achievement":
    default:
      return "🥇";
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "award":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "certificate":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "achievement":
    default:
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  }
};

const Achievements = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.achievements} />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementsList.map((item, index) => (
          <motion.div
            key={`achieve-${index}`}
            variants={fadeIn("up", "spring", index * 0.25, 0.75)}
            className="bg-tertiary shadow-card flex flex-col justify-between rounded-2xl p-6 border border-white/5 hover:border-[#915EFF]/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-3xl p-3 bg-primary/60 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {getCategoryIcon(item.category)}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryBadgeClass(
                    item.category
                  )} capitalize`}
                >
                  {item.category}
                </span>
              </div>

              <h3 className="text-white font-bold text-[18px] sm:text-[20px] mb-1">
                {item.title}
              </h3>
              <p className="text-[#915EFF] font-medium text-[14px] mb-3">
                {item.organization} {item.date && `• ${item.date}`}
              </p>
              <p className="text-secondary text-[14px] leading-[22px]">
                {item.description}
              </p>
            </div>

            {item.link && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#915EFF] hover:underline flex items-center gap-1 font-semibold"
                >
                  View Details & Verification →
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Achievements, "achievements");
