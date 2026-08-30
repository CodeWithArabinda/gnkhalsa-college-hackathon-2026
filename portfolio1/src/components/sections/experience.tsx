import { usePortfolio } from "@/contexts/PortfolioContext";
import { SkillNames } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  const { EXPERIENCE } = usePortfolio();

  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[120vh] py-24"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="My professional engineering journey"
          className="mb-14 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector Line with gradient pulse */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500/50 via-slate-800 to-emerald-500/20 hidden md:block -translate-x-1/2" />

          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative">
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: any;
  index: number;
}) => {
  const { SKILLS } = usePortfolio();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "surface-card text-slate-100 rounded-2xl p-2"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {experience.title}
              </CardTitle>
              <div className="text-base font-medium text-emerald-400/90 font-mono">
                {experience.company}
              </div>
            </div>
            <Badge variant="secondary" className="w-fit font-mono text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
              {experience.startDate} - {experience.endDate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-300/90 leading-relaxed">
            {experience.description.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-emerald-400 mt-1.5 text-xs">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
            {experience.skills.map((skillName: string) => {
              const skill = SKILLS[skillName as SkillNames] || Object.values(SKILLS).find((s: any) => s.name === skillName);
              return (
                <Badge
                  key={skillName}
                  variant="outline"
                  className="gap-2 text-xs font-normal bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-emerald-500/30 transition-all duration-200 px-3 py-1 rounded-lg"
                >
                  {skill?.icon && (
                    <img
                      src={skill.icon}
                      alt={skill?.label || skillName}
                      className="w-3.5 h-3.5 object-contain opacity-90"
                    />
                  )}
                  {skill?.label || skillName}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
