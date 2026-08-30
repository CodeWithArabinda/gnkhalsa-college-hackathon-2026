"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@portfolio1/lib/utils";
import { Button } from "../ui/button";
import { usePortfolio } from "@portfolio1/contexts/PortfolioContext";
import OnlineUsers from "../realtime/online-users";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const { config } = usePortfolio();
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[1000]"
      )}
      style={{
        background: isActive
          ? "rgba(9, 10, 15, 0.95)"
          : "linear-gradient(180deg, rgba(7, 9, 14, 0.9) 0%, rgba(7, 9, 14, 0) 100%)",
        backdropFilter: "blur(12px)",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <Link to="/" className="flex items-center justify-center">
          <Button variant={"link"} className="text-md font-bold tracking-wider font-display bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent p-0 hover:no-underline">
            {config.author}
          </Button>
        </Link>

        {isHome && typeof process !== "undefined" && process?.env?.NEXT_PUBLIC_WS_URL && <OnlineUsers />}
        <Button
          variant={"ghost"}
          onClick={() => setIsActive(!isActive)}
          aria-label={isActive ? "Close menu" : "Open menu"}
          aria-expanded={isActive}
          className={cn(
            styles.el,
            "m-0 p-0 h-6 bg-transparent flex items-center justify-center"
          )}
        >
          <div className="relative hidden md:flex items-center">
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ""
              }`}
          ></div>
        </Button>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        onClick={() => setIsActive(false)}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
