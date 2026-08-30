import { motion } from "framer-motion";
import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";
import { socialLinks } from "../../constants";

const Hero = () => {
  return (
    <section id="home" className={`relative mx-auto min-h-screen w-full flex flex-col justify-between overflow-hidden pb-8 pt-[90px] sm:pt-[110px]`}>
      <div
        className={`mx-auto max-w-7xl w-full ${styles.paddingX} flex flex-col lg:flex-row items-center justify-between gap-8 z-10 my-auto`}
      >
        {/* Left: Text Content */}
        <div className="flex flex-row items-start gap-4 max-w-xl w-full">
          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            <div className="h-5 w-5 rounded-full bg-[#915EFF] shadow-[0_0_15px_#915EFF]" />
            <div className="violet-gradient h-48 sm:h-64 w-1" />
          </div>

          <div>
            <p className="text-[#915EFF] font-bold text-[14px] sm:text-[16px] tracking-widest uppercase mb-1">
              HELLO, I'M
            </p>
            <h1 className={`${styles.heroHeadText} text-white font-extrabold`}>
              <span className="text-[#915EFF]">{config.hero.name}</span>
            </h1>
            <p className="text-white text-[18px] sm:text-[22px] font-semibold mt-1 text-slate-200">
              {config.hero.role}
            </p>
            <p className="text-secondary text-[14px] sm:text-[16px] leading-[26px] mt-3 max-w-xl">
              {config.hero.p[0]} {config.hero.p[1]}
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="bg-tertiary/80 hover:bg-tertiary text-white font-semibold px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3 text-sm flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/80 hover:bg-[#915EFF]/20 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#915EFF]/40 transition-all font-medium text-xs flex items-center gap-1.5"
                >
                  <span>🔗</span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 3D Computer Canvas */}
        <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[520px]">
          <ComputersCanvas />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex w-full items-center justify-center z-10 pointer-events-auto mt-4">
        <a href="#about">
          <div className="border-secondary/50 hover:border-[#915EFF] flex h-[54px] w-[30px] items-start justify-center rounded-3xl border-2 p-2 transition-colors">
            <motion.div
              animate={{
                y: [0, 18, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-2.5 w-2.5 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
