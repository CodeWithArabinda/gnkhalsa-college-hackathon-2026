import React from "react";
import { config } from "../../constants/config";
import { socialLinks } from "../../constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary border-t border-white/10 py-8 px-6 text-center text-secondary relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-white font-bold text-lg">{config.html.fullName}</p>
          <p className="text-xs text-secondary mt-1">
            © {new Date().getFullYear()} {config.html.fullName}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-[#915EFF] transition-colors text-sm font-medium"
            >
              {social.name}
            </a>
          ))}
        </div>

        <p className="text-xs text-secondary">
          Built with ❤️ using React 18, Three.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
