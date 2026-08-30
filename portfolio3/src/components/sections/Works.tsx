import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { usePortfolio } from "../../contexts/PortfolioContext";
import { github } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  name,
  description,
  tags,
  image,
  sourceCodeLink,
  liveLink,
}) => {
  return (
    <div className="bg-tertiary w-full rounded-2xl p-5 sm:w-[350px] border border-white/5 hover:border-[#915EFF]/40 transition-all shadow-card">
      <div className="relative h-[220px] w-full overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="card-img_hover absolute inset-0 m-3 flex justify-end gap-2">
          {liveLink && (
            <div
              onClick={() => window.open(liveLink, "_blank")}
              title="Live Demo"
              className="black-gradient flex h-9 w-9 cursor-pointer items-center justify-center rounded-full"
            >
              <span className="text-white text-xs font-bold">🚀</span>
            </div>
          )}
          <div
            onClick={() => window.open(sourceCodeLink, "_blank")}
            title="GitHub Repository"
            className="black-gradient flex h-9 w-9 cursor-pointer items-center justify-center rounded-full"
          >
            <img
              src={github}
              alt="github"
              className="h-1/2 w-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-[22px] font-bold text-white leading-tight">{name}</h3>
        <p className="text-secondary mt-2 text-[14px] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className={`text-[12px] font-medium px-2.5 py-1 rounded-md bg-primary/80 border border-white/10 ${tag.color}`}
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium">
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#915EFF] hover:underline font-semibold"
          >
            Live Demo →
          </a>
        )}
        <a
          href={sourceCodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-white"
        >
          Source Code ↗
        </a>
      </div>
    </div>
  );
};

const Works = () => {
  const { config, projects } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-12 flex flex-wrap gap-7 max-sm:justify-center">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-tertiary hover:bg-[#915EFF] text-white font-bold px-8 py-3.5 rounded-xl border border-white/10 hover:border-[#915EFF] transition-all shadow-lg text-sm"
        >
          {showAll ? "Show Featured Only" : "View All Projects ⭐"}
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
