"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { usePortfolio } from "@portfolio1/contexts/PortfolioContext";
import { Link } from "react-router-dom";

const SocialMediaButtons = () => {
  const { config } = usePortfolio();
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });

  const BUTTONS = [
    {
      name: "Github",
      href: config.social.github,
      icon: <SiGithub size={"24"} color={"#fff"} />,
    },
    {
      name: "LinkedIn",
      href: config.social.linkedin,
      icon: <FaLinkedin size={"24"} color={"#fff"} />,
    },
    {
      name: "Twitter",
      href: config.social.twitter,
      icon: <SiX size={"24"} color={"#fff"} />,
    },
    {
      name: "Instagram",
      href: config.social.instagram,
      icon: <SiInstagram size={"24"} color={"#fff"} />,
    },
  ];

  return (
    <div ref={ref} className="z-10">
      {show &&
        BUTTONS.map((button) => (
          <a href={button.href} key={button.name} target="_blank" rel="noreferrer">
            <Button variant={"ghost"}>{button.icon}</Button>
          </a>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
