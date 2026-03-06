import authorImage from "@/assets/author.webp";

export const AUTHOR = {
  name: "Rens Vis",
  role: "Senior Frontend Engineer",
  bio: "Senior frontend engineer from the Netherlands. Architecture, micro frontends, UX — and why things that look clean in Figma get messy in production.",
  expertise: [
    "Design Systems",
    "Micro Frontends",
    "Frontend Architecture",
    "UX Engineering",
    "Governance",
  ],
  avatar: authorImage,
  links: {
    github: "https://github.com/rensvis",
    linkedin: "https://www.linkedin.com/in/rens-vis-9218a9174/",
  },
} as const;
