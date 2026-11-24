export const profile = {
  name: "Govind",
  role: "Full-stack developer",
  location: "Noida, India",
  email: "gtech.tech12@gmail.com",
  socials: {
    github: "https://github.com/Govind01",
    linkedin: "https://www.linkedin.com/in/your-username",
  },
  availability: "Available for select projects",
  intro: "I turn complex ideas into clear, useful digital experiences.",
  bio: "I’m a software and web developer who likes the space where thoughtful design meets dependable engineering. I build end-to-end products with the MERN stack, from the first interaction to the last database query.",
  portrait: new URL("../Images/portrait_1_4k.jpg", import.meta.url)
    .href,
  projects: [
    {
      name: "Northstar Finance",
      kind: "Product design · Fintech",
      description:
        "A calmer way for independent teams to understand cash flow, plan ahead, and make confident decisions.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      alt: "Analytics dashboard on a laptop screen",
      tags: ["React", "Node.js", "MongoDB"],
      category: "Full-stack",
    },
    {
      name: "Common Ground",
      kind: "Community · Marketplace",
      description:
        "A neighborhood marketplace that makes borrowing, sharing, and meeting the people next door feel natural.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
      alt: "Friends gathered together in a city park",
      tags: ["Express", "React", "REST API"],
      category: "Full-stack",
    },
    {
      name: "Form & Field",
      kind: "Commerce · Creative tools",
      description:
        "A considered storefront for a small-batch homeware studio, designed to make every object feel tactile.",
      image:
        "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85",
      alt: "Minimal home interior with sculptural furniture",
      tags: ["React", "Responsive UI", "Stripe"],
      category: "Frontend",
    },
    {
      name: "Daybreak",
      kind: "Productivity · Personal planning",
      description:
        "A focused daily planner that helps people turn big goals into small, achievable steps without adding more noise.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85",
      alt: "Notebook and workspace prepared for daily planning",
      tags: ["React", "Node.js", "MongoDB"],
      category: "Full-stack",
    },
  ],
  skills: [
    {
      title: "Frontend",
      items: [
        "React",
        "JavaScript",
        "HTML & CSS",
        "Accessibility",
        "Responsive design",
      ],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "REST APIs", "Authentication", "Testing"],
    },
    {
      title: "Data & tools",
      items: ["MongoDB", "Git & GitHub", "Figma", "Postman", "Vercel"],
    },
  ],
  experience: [
    {
      period: "2023 — now",
      role: "Independent developer",
      company: "Working with good people",
      detail:
        "Designing and shipping full-stack products for early-stage teams and independent businesses.",
    },
    {
      period: "2021 — 2023",
      role: "Frontend developer",
      company: "Studio / Company",
      detail:
        "Built accessible, high-performance interfaces alongside a small product design team.",
    },
  ],
};
