import Page from "components/utility/Page";

import { GetStaticProps, GetStaticPaths } from "next";
import { allKebabTags, allTags } from "@/data/content/projects";

import projects from "@/data/content/projects";

import { kebabCase, kebabArray } from "@/utils/utils";
import Projects from "components/projects/Projects";
import Heading from "components/projects/Heading";
import More from "components/projects/More";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = [];
  projects.forEach((project) =>
    project.tags.forEach((tag) => {
      allTags.push(tag);
    })
  );
  const uniqueAllTags = [...new Set(allTags)];
  const allTagsPaths = uniqueAllTags.map((path) => ({
    params: { tag: `${kebabCase(path)}` },
  }));
  return {
    paths: allTagsPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}: {params: {tag: string}}) => {
  const tag = params.tag;
  const filteredProjects = projects.filter((project) =>
    [...kebabArray(project.tags)].includes(tag)
  );
  return {
    props: JSON.parse(
      JSON.stringify({
        filteredProjects,
        tag: tag,
      })
    ),
  };
};

function PostPage({ filteredProjects, tag }) {
  const capsTag = allTags[allKebabTags.indexOf(tag)];
  return (
    <Page
      currentPage="Projects"
      meta={{
        title: `${capsTag} Projects`,
        desc: `A showcase for all of my ${capsTag} projects.`,
      }}
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

        <Heading tag={capsTag} />
        <Projects overwriteProjects={filteredProjects} />

        <Link href="/projects">
          <div className="mt-8 max-w-sm md:max-w-2xl border border-fun-pink mx-auto text-center w-full whitespace-nowrap px-8 py-3 rounded-full text-fun-pink bg-fun-pink-darkerer hover:bg-fun-pink hover:text-white transition-colors cursor-pointer">
            View All
          </div>
        </Link>
        {/* <More /> */}

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

export default PostPage;
