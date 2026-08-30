const config = {
  title: "NILESH GUPTA | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Nilesh Gupta, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Let's build something amazing together!",
    short:
      "Discover the portfolio of Nilesh Gupta, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Nilesh Gupta",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "NILESH GUPTA",
  email: "nilesh.gupta@example.com",
  site: "https://nareshkhatri.dev",

  // for github stars button
  githubUsername: "naresh-khatri",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/nothotchaddi",
    linkedin: "https://www.linkedin.com/in/naresh-khatri/",
    instagram: "https://www.instagram.com/hotchaddi",
    facebook: "https://www.facebook.com/HotChaddi/",
    github: "https://github.com/Naresh-Khatri",
  },
};
export { config };
