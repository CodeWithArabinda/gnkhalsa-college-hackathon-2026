import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { usePortfolio } from "../../contexts/PortfolioContext";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { TExperience } from "../../types";

const ExperienceCard: React.FC<TExperience> = (experience) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      contentArrowStyle={{ borderRight: "7px solid #1d1836" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[22px] font-bold text-white">{experience.title}</h3>
        <p
          className="text-[#915EFF] text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-4 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 pl-1 text-[14px] leading-relaxed tracking-wide"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { config, experiences } = usePortfolio();
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-14 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
