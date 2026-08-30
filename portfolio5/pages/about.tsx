import React from "react";
import Page from "@/components/utility/Page";

function About() {
  return (
    <Page
      currentPage="About"
      meta={{
        title: "About Me",
        desc: "Get to know more about Nilesh Gupta - Web Developer, Designer, and Creator.",
      }}
    >
      <div className="relative heroElem pt-12 pb-24 text-center max-w-4xl m-auto z-10">


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

        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-white relative inline-block">
          About Me
        </h1>
        <p className="text-fun-gray text-xl max-w-2xl m-auto mb-16">
          A brief look into my background, what I do, and what drives my passion for development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-8 relative">

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

          <div className="bg-bg border border-fun-pink-dark p-8 rounded-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
            <p className="text-fun-gray leading-relaxed mb-4">
              Hello! I'm Nilesh Gupta, a passionate front-end developer and designer based in India. I specialize in building highly interactive, accessible, and performant web applications.
            </p>
            <p className="text-fun-gray leading-relaxed">
              I love bridging the gap between design and technology. My goal is to create products that not only work beautifully under the hood but also provide delightful user experiences.
            </p>
          </div>

          <div className="bg-bg border border-fun-pink-dark p-8 rounded-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
            <ul className="space-y-4 text-fun-gray">
              <li className="flex items-start">
                <span className="text-fun-pink mr-3 text-lg">✔</span>
                <span><strong className="text-white">Front-end Development:</strong> React, Next.js, Vue, Nuxt, and Tailwind CSS.</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-3 text-lg">✔</span>
                <span><strong className="text-white">UI/UX Design:</strong> Designing clean, intuitive interfaces using Figma and Adobe Creative Suite.</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-3 text-lg">✔</span>
                <span><strong className="text-white">Interactive Animations:</strong> Bringing interfaces to life using CSS animations and Framer Motion.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Line break doodle */}
        <img className="w-30 m-auto mt-16 mb-4" src="/static/doodles/lineBreak.svg" alt="" />

        {/* Philosophy section with side doodles */}
        <div className="mt-8 border border-fun-pink-dark p-8 rounded-2xl bg-bg text-left relative overflow-visible">

          <img
            className="sqD absolute -top-10 right-8 w-16 hidden md:block"
            style={{ animationDelay: "0.6s" }}
            src="/static/doodles/hero/nextjs.svg"
            alt=""
          />
          <img
            className="sqD absolute -bottom-10 right-4 w-16 hidden md:block"
            style={{ animationDelay: "0.9s" }}
            src="/static/doodles/hero/js.svg"
            alt=""
          />
          <img
            className="sqD absolute -bottom-12 left-8 w-20 hidden md:block"
            style={{ animationDelay: "1s" }}
            src="/static/doodles/skills/star-outline.svg"
            alt=""
          />

          <h3 className="text-2xl font-bold text-white mb-6">Professional Philosophy</h3>
          <p className="text-fun-gray leading-relaxed max-w-3xl">
            I believe that good web development is about more than just writing code. It's about problem-solving, understanding user needs, and constantly striving to learn and adapt in a rapidly evolving ecosystem.
          </p>
        </div>

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

export default About;
