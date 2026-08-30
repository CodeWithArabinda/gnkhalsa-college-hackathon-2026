import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { menu, close } from "../../assets";
import { config } from "../../constants/config";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-50 flex w-full items-center py-4 transition-all duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur-md shadow-lg border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 p-[2px]">
            <div className="h-full w-full bg-primary rounded-full flex items-center justify-center">
              <span className="text-[#915EFF] font-black text-lg">AR</span>
            </div>
          </div>
          <p className="cursor-pointer text-[17px] font-bold text-white flex items-center gap-1.5">
            {config.html.fullName}
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-secondary">
              PORTFOLIO
            </span>
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-6 lg:gap-8 lg:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-[#915EFF] font-semibold" : "text-secondary"
              } cursor-pointer text-[15px] font-medium hover:text-white transition-colors`}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end lg:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] cursor-pointer object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } black-gradient absolute right-4 top-16 z-50 min-w-[180px] rounded-xl p-5 border border-white/10 shadow-2xl`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-3">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`cursor-pointer text-[15px] font-medium ${
                    active === nav.id ? "text-[#915EFF]" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
