import Link from "next/link";
import React from "react";
import { footer } from "@/data/global";
import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col w-screen px-5 py-10 border-t border-fun-pink-darker z-5 bg-bg">
      <div className="w-full max-w-4xl m-auto flex justify-center items-center text-sm">
        {footer.columns.map((item, index) => {
          return (
            <div key={index} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {item.links.map((linkItem, index) => {
                  return (
                    <div key={index}>
                      {linkItem.leavesWebsite ? (
                        <a
                          href={linkItem.link}
                          target="_blank"
                          className="flex items-center text-fun-gray hover:text-white transition-colors duration-300 font-medium"
                          rel="noreferrer"
                        >
                          {linkItem.icon && (
                            <span className="pr-1.5 -mb-0.5 inline-flex opacity-60 hover:opacity-100 transition-opacity">
                              <Image src={linkItem.icon} width={16} height={16} alt={linkItem.name} />
                            </span>
                          )}
                          {linkItem.name}
                        </a>
                      ) : (
                        <Link href={linkItem.link} passHref>
                          <a className="text-fun-gray hover:text-white transition-colors duration-300 font-medium cursor-pointer">
                            {linkItem.name}
                          </a>
                        </Link>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl w-full m-auto mt-8 pt-8 sm:mt-4 sm:pt-4 text-center text-fun-gray border-t border-fun-pink-dark">
        <p className="flex flex-col items-center justify-center ">
          <div className="inline-flex items-center uppercase text-xs font-bold tracking-widest">
            Made with{" "}
            <div className="space-x-2 inline-flex items-center -mt-1 ml-3">
              <span>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  width="26"
                  title="React"
                />
                <span className="sr-only">React</span>
              </span>
              <span>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg"
                  width="40"
                  className="invert"
                  title="NextJS"
                />
                <span className="sr-only">NextJS</span>
              </span>
              <span>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                  width="26"
                  title="TailwindCSS"
                />
                <span className="sr-only">TailwindCSS</span>
              </span>
            </div>
          </div>
          <div className="mt-2 text-xs ">
            Made by{" "}
            <a
              href="mailto:contact@braydentw.io"
              className="text-fun-gray-light font-medium"
            >
              Nilesh Gupta
            </a>
            . All rights reserved.
          </div>
        </p>
      </div>

    </footer>
  );
}

export default Footer;
