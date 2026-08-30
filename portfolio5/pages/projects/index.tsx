import Heading from "components/projects/Heading";
import More from "components/projects/More";
import Page from "components/utility/Page";
import Projects from "components/projects/Projects";
import React from "react";

function projects() {
  return (
    <Page
      currentPage="Projects"
      meta={{ title: "Projects", desc: "I love coding using tools like React, NextJS, Tailwind, and many more! Here are some of my favorite projects." }}
    >
      <div className="relative heroElem pt-12 pb-24 text-center max-w-4xl m-auto z-10">
        {/* Decorative doodles — top area */}
        <img
          className="sqD absolute top-[-20px] left-[0%] w-20 hidden md:block"
          style={{ animationDelay: "0.3s" }}
          src="/static/doodles/hero/html.svg"
          alt=""
        />
        <img
          className="sqD absolute top-[60px] right-[2%] w-10 hidden md:block"
          style={{ animationDelay: "0.5s" }}
          src="/static/doodles/hero/pop2.svg"
          alt=""
        />
        <img
          className="sqD absolute top-[100px] left-[5%] w-12 hidden md:block"
          style={{ animationDelay: "0.7s" }}
          src="/static/doodles/skills/coding.svg"
          alt=""
        />

        {/* Side doodles */}
        <img
          className="sqD absolute -left-20 top-1/4 w-16 hidden md:block opacity-80"
          style={{ animationDelay: "0.2s" }}
          src="/static/doodles/skills/laptop.svg"
          alt=""
        />
        <img
          className="sqD absolute -right-16 bottom-1/4 w-14 hidden md:block"
          style={{ animationDelay: "0.4s" }}
          src="/static/doodles/hero/code.svg"
          alt=""
        />

        <Heading />
        <Projects />
        <More />

        {/* Bottom decorative doodles */}
        <div className="relative mt-16 h-16">
          <img
            className="sqD absolute left-1/4 w-12 opacity-60"
            style={{ animationDelay: "0.3s" }}
            src="/static/doodles/hero/paintbrush.svg"
            alt=""
          />
          <img
            className="sqD absolute right-1/4 w-12 opacity-60"
            style={{ animationDelay: "0.8s" }}
            src="/static/doodles/testimonials/yay.svg"
            alt=""
          />
        </div>
      </div>
    </Page>
  );
}

export default projects;
