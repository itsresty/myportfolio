export type Project = {
  slug: string
  title: string
  description: string
  longDescription?: string
  image?: string
  category: string
  year: string
  technologies: string[]
  liveUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    slug: "dioness",
    title: "Dioness",
    description:
      "A modern fashion e-commerce website with a clean editorial interface and responsive shopping experience.",
    longDescription:
      "Dioness is a fashion e-commerce project focused on creating a clean, modern, and intuitive shopping experience. The interface combines editorial-inspired design with responsive layouts to make browsing products simple across different screen sizes.",
    image: "/projects/dioness.jpg",
    category: "Web Development",
    year: "2026",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
    ],
    liveUrl: "#",
    featured: true,
  },

  {
    slug: "invoice-maker",
    title: "Invoice Maker",
    description:
      "A simple invoice management application for creating and managing professional invoices.",
    longDescription:
      "Invoice Maker is a web application designed to make creating professional invoices simple and efficient. The project focuses on a straightforward interface, reusable invoice templates, and an easy workflow for managing invoice information.",
    image: "/projects/invoice-maker.jpg",
    category: "Web App",
    year: "2026",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    liveUrl: "#",
  },

  {
    slug: "smart-agriculture",
    title: "Smart Agriculture",
    description:
      "An IoT-based agricultural monitoring system designed to monitor environmental conditions.",
    longDescription:
      "Smart Agriculture is an IoT-based monitoring project designed to collect environmental data and help improve agricultural monitoring. The system uses sensors to gather information that can be used to better understand growing conditions.",
    image: "/projects/smart-agriculture.jpg",
    category: "IoT",
    year: "2025",
    technologies: [
      "Arduino",
      "IoT",
      "Sensors",
    ],
    liveUrl: "#",
  },

  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "A personal portfolio website focused on clean typography, responsive layouts, and showcasing creative work.",
    longDescription:
      "This portfolio is designed to showcase my projects, experience, and writing in a clean and minimal interface. The website uses a responsive design system with reusable components and a content-driven architecture.",
    image: "/projects/portfolio.jpg",
    category: "Web Development",
    year: "2026",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MDX",
    ],
    liveUrl: "#",
  },
]

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  return projects
}

/**
 * Get the most recent projects
 *
 * Currently sorted by array order.
 * Later, this can be changed to sort by createdAt
 * when projects are stored in a database.
 */
export async function getRecentProjects(
  limit: number = 3
): Promise<Project[]> {
  return projects.slice(0, limit)
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return projects.find(
    (project) => project.slug === slug
  )
}