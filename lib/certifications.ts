export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  image: string;
  pdf: string;
};

export const certifications: Certification[] = [
  {
    id: "certificate-01",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: 2026,
    image: "/certifications/responsive-web-design.png",
    pdf: "/certifications/responsive-web-design.pdf",
  },

  {
    id: "certificate-02",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: 2026,
    image: "/certifications/javascript.png",
    pdf: "/certifications/javascript.pdf",
  },

  {
    id: "certificate-03",
    title: "TypeScript Development",
    issuer: "Your Certification Provider",
    year: 2026,
    image: "/certifications/typescript.png",
    pdf: "/certifications/typescript.pdf",
  },
];