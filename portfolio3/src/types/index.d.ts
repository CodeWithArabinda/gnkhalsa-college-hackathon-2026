export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
} & Required<Omit<TCommonProps, "name">>;

export type TEducation = {
  degree: string;
  institution: string;
  date: string;
  details: string;
  iconBg?: string;
};

export type TAchievement = {
  title: string;
  category: "award" | "certificate" | "achievement";
  organization: string;
  description: string;
  date?: string;
  link?: string;
};

export type TCurrently = {
  building: string;
  learning: string;
  openTo: string;
};

export type TStat = {
  value: string;
  label: string;
};

export type TSocial = {
  name: string;
  url: string;
  icon: string;
};

export type TTestimonial = {
  testimonial: string;
  designation: string;
  company: string;
  image: string;
} & Required<Pick<TCommonProps, "name">>;

export type TProject = {
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  sourceCodeLink: string;
  liveLink?: string;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = Required<Omit<TCommonProps, "title">>;

export type TSkillCategory = {
  category: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
};

export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, "title">>;

export type TService = Required<Omit<TCommonProps, "name">>;

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};

