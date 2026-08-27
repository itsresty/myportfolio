import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Film,
  Headphones,
  Layers3,
  MapPin,
  Palette,
  Settings2,
  Sparkles,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "I build modern websites and web applications with an emphasis on clean interfaces, responsive layouts, usability, performance, and maintainable code.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "Git",
      "GitHub",
    ],
  },
  {
    number: "02",
    icon: Film,
    title: "Video Editing",
    description:
      "I transform raw footage into engaging content for YouTube and social platforms, focusing on pacing, structure, sound, captions, and visual consistency.",
    skills: [
      "Video Editing",
      "YouTube",
      "YouTube Shorts",
      "TikTok",
      "Instagram Reels",
      "Talking Head",
      "B-Roll",
      "Captions",
      "Subtitles",
      "Sound Design",
      "Transitions",
      "Basic Color Correction",
    ],
  },
  {
    number: "03",
    icon: Headphones,
    title: "Virtual Assistance",
    description:
      "I provide practical digital support that helps keep projects organized, information accessible, and everyday online tasks moving efficiently.",
    skills: [
      "Web Research",
      "Data Entry",
      "Content Uploading",
      "File Organization",
      "Spreadsheets",
      "Data Organization",
      "Administrative Tasks",
      "Online Support",
    ],
  },
];

const principles = [
  {
    number: "01",
    title: "Keep it clear",
    description:
      "Good digital work should be easy to understand. Whether it is a website, video, or workflow, clarity comes before unnecessary complexity.",
  },
  {
    number: "02",
    title: "Design with purpose",
    description:
      "Visual decisions should support the goal. I care about hierarchy, spacing, typography, interaction, and how everything works together.",
  },
  {
    number: "03",
    title: "Pay attention to details",
    description:
      "Small details can change how professional something feels. I take time to refine both the things users notice and the things they might never consciously notice.",
  },
  {
    number: "04",
    title: "Keep learning",
    description:
      "Technology and digital tools constantly evolve. I enjoy learning new techniques, experimenting with ideas, and improving my workflow.",
  },
];

const developmentTools = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Node.js",
  "REST APIs",
  "Git",
  "GitHub",
];

const designSkills = [
  "UI Design",
  "UX Fundamentals",
  "Responsive Design",
  "Design Systems",
  "Typography",
  "Layout",
  "Visual Hierarchy",
  "Wireframing",
  "Landing Pages",
  "Portfolio Design",
];

const videoSkills = [
  "Video Editing",
  "YouTube",
  "YouTube Shorts",
  "TikTok",
  "Instagram Reels",
  "Talking Head",
  "B-Roll",
  "Captions",
  "Subtitles",
  "Sound Design",
  "Transitions",
  "Basic Color Correction",
];

const supportSkills = [
  "Virtual Assistance",
  "Web Research",
  "Data Entry",
  "Data Organization",
  "File Management",
  "Spreadsheet Management",
  "Content Uploading",
  "Website Management",
  "Email Assistance",
  "Administrative Support",
];

const workflowSkills = [
  "Project Organization",
  "Task Management",
  "File Organization",
  "Content Management",
  "Documentation",
  "Version Control",
  "Research",
  "Planning",
  "Digital Organization",
];

const learningSkills = [
  "Advanced React",
  "Next.js",
  "TypeScript",
  "Web Performance",
  "Accessibility",
  "SEO",
  "UI/UX",
  "Motion Design",
  "Creative Development",
];

const interests = [
  "Web Development",
  "UI Design",
  "Video Editing",
  "Digital Products",
  "Creative Technology",
  "Content Creation",
];

export default function AboutPage() {
  return (
    <main className="mainpage w-full">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

            {/* Main introduction */}

            <div>

              <div className="mb-7 flex items-center gap-3">

                <span className="h-px w-8 bg-black" />

                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  About me
                </p>

              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-[86px]">

                Building things
                <br />

                <span className="text-neutral-400">
                  with purpose.
                </span>

              </h1>

            </div>


            {/* Introduction */}

            <div>

              <div className="mb-5 flex items-center gap-2">

                <MapPin
                  size={15}
                  strokeWidth={1.6}
                  className="text-neutral-500"
                />

                <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                  Madrid, Spain
                </span>

              </div>

              <p className="text-base leading-8 text-neutral-600 md:text-lg">
                I&apos;m Resty Montero — a multidisciplinary digital creator
                focused on web development, video editing, and digital
                support.
              </p>

            </div>

          </div>


          {/* Identity information */}

          <div className="mt-16 grid border-y border-neutral-200 sm:grid-cols-3">

            <div className="border-b border-neutral-200 py-6 sm:border-b-0 sm:border-r sm:pr-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Based in
              </p>

              <p className="mt-2 text-sm font-medium">
                Madrid, Spain
              </p>

            </div>


            <div className="border-b border-neutral-200 py-6 sm:border-b-0 sm:border-r sm:px-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Working across
              </p>

              <p className="mt-2 text-sm font-medium">
                Development · Creative · Support
              </p>

            </div>


            <div className="py-6 sm:pl-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Availability
              </p>

              <p className="mt-2 flex items-center gap-2 text-sm font-medium">

                <span className="h-2 w-2 rounded-full bg-green-500" />

                Available for work

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MY STORY
      ====================================================== */}

      <section>

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                My story
              </p>

              <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                Curious by nature.
                <br />
                Creative by choice.
              </h2>

            </div>


            <div className="max-w-3xl space-y-7 text-sm leading-8 text-neutral-500 md:text-base">

              <p>
                My interest in digital work started with curiosity. I wanted
                to understand how websites were built, how interfaces were
                designed, and how technology could be used to turn an idea
                into something people could interact with.
              </p>

              <p>
                That curiosity gradually grew into a broader interest in
                digital creation. Today, I enjoy working across different
                areas of the digital space — from writing code and building
                responsive websites to editing video and helping organize
                online work.
              </p>

              <p>
                Working across different disciplines has taught me to think
                beyond a single tool or technology. A good result is not only
                about what you use to build it. It is also about understanding
                the person using it, the problem being solved, and the reason
                the project exists in the first place.
              </p>

              <p>
                I&apos;m still learning, experimenting, and developing my own
                style. That is one of the things I enjoy most about digital
                work — there is always something new to discover.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT I DO
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                What I do
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Different skills,
                <br />
                one goal.
              </h2>

            </div>


            <Link
              href="/services"
              className="group flex w-fit items-center gap-2 text-sm font-medium"
            >
              Explore services

              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </Link>

          </div>


          <div className="border-t border-neutral-200">

            {capabilities.map((item) => {

              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[70px_0.8fr_1.2fr] md:py-16"
                >

                  <div className="flex items-start justify-between md:block">

                    <span className="text-xs tracking-[0.15em] text-neutral-400">
                      {item.number}
                    </span>

                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="text-neutral-500 md:mt-8"
                    />

                  </div>


                  <div>

                    <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-neutral-500">
                      {item.description}
                    </p>

                  </div>


                  <div>

                    <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                      Skills & capabilities
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-neutral-200 px-3 py-2 text-xs text-neutral-600 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW I THINK
      ====================================================== */}

      <section className="border-t border-neutral-200 bg-neutral-50">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white">

                <Sparkles
                  size={19}
                  strokeWidth={1.5}
                />

              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                How I think
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                My work is guided by a few simple principles.
              </h2>

            </div>


            <div className="grid border-t border-neutral-200 sm:grid-cols-2">

              {principles.map((item) => (
                <article
                  key={item.number}
                  className="border-b border-neutral-200 py-8 sm:px-8"
                >

                  <span className="text-xs tracking-[0.15em] text-neutral-400">
                    {item.number}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    {item.description}
                  </p>

                </article>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SKILLS & TOOLS
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          {/* Header */}

          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Skills & tools
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                The tools I use to turn ideas into useful digital
                experiences.
              </h2>

            </div>


            <div>

              <p className="max-w-2xl text-sm leading-7 text-neutral-500 md:text-base">
                I work across development, design, content, and digital
                support. Rather than relying on one tool for everything, I
                choose the technologies and workflows that make sense for
                each project.
              </p>

            </div>

          </div>


          {/* Categories */}

          <div className="mt-16 grid border-t border-neutral-200 md:grid-cols-2">


            {/* Development */}

            <SkillCategory
              number="01"
              title="Development"
              icon={<Code2 size={22} strokeWidth={1.5} />}
              description="Building responsive websites and modern web applications with a focus on clean architecture, usability, performance, and maintainable code."
              skills={developmentTools}
              borderRight
            />


            {/* Design */}

            <SkillCategory
              number="02"
              title="UI & Design"
              icon={<Palette size={22} strokeWidth={1.5} />}
              description="Designing clean and consistent interfaces with attention to typography, spacing, hierarchy, accessibility, responsiveness, and overall user experience."
              skills={designSkills}
            />


            {/* Video */}

            <SkillCategory
              number="03"
              title="Video & Content"
              icon={<Film size={22} strokeWidth={1.5} />}
              description="Editing and preparing digital video content for YouTube and social platforms, with an emphasis on pacing, storytelling, captions, sound, and visual consistency."
              skills={videoSkills}
              borderRight
            />


            {/* Digital Support */}

            <SkillCategory
              number="04"
              title="Digital Support"
              icon={<Headphones size={22} strokeWidth={1.5} />}
              description="Supporting businesses and individuals with everyday digital tasks, organization, research, content management, and administrative workflows."
              skills={supportSkills}
            />


            {/* Workflow */}

            <SkillCategory
              number="05"
              title="Workflow & Productivity"
              icon={<Settings2 size={22} strokeWidth={1.5} />}
              description="Organizing projects, managing files, tracking tasks, and maintaining an efficient workflow from the first idea through final delivery."
              skills={workflowSkills}
              borderRight
            />


            {/* Learning */}

            <SkillCategory
              number="06"
              title="Currently Learning"
              icon={<Sparkles size={22} strokeWidth={1.5} />}
              description="I believe staying curious is part of being a good digital creator. I regularly explore new technologies, techniques, and workflows to improve the quality of my work."
              skills={learningSkills}
            />

          </div>


          {/* Bottom statement */}

          <div className="mt-16 grid gap-8 rounded-[2rem] bg-neutral-950 px-7 py-10 text-white md:grid-cols-[1fr_auto] md:items-center md:px-10 md:py-12">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                More than a toolbox
              </p>

              <h3 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                Tools are only useful when they help solve the right
                problem.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
                My goal is not to use the most complicated technology.
                It is to choose the right approach, create something
                useful, and make the final experience feel simple.
              </p>

            </div>


            <Link
              href="/services"
              className="group flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
            >
              Explore my services

              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          CURRENTLY EXPLORING
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Currently exploring
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Always learning something new.
              </h2>

            </div>


            <div>

              <p className="max-w-2xl text-sm leading-7 text-neutral-500 md:text-base">
                I like experimenting with new technologies, improving my
                development workflow, exploring better design approaches,
                and finding new ways to create useful digital products.
              </p>


              <div className="mt-8 grid border-t border-neutral-200 sm:grid-cols-2">

                {interests.map((interest, index) => (
                  <div
                    key={interest}
                    className="flex items-center justify-between border-b border-neutral-200 py-5 sm:px-5"
                  >

                    <span className="text-sm font-medium">
                      {interest}
                    </span>

                    <span className="text-xs text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BEYOND THE SCREEN
      ====================================================== */}

      <section className="border-t border-neutral-200 bg-neutral-50">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="max-w-4xl">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              Beyond the screen
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl">
              I&apos;m interested in more than just technology.
            </h2>

            <div className="mt-8 grid gap-6 text-sm leading-7 text-neutral-500 md:grid-cols-2">

              <p>
                Creativity, culture, travel, design, and everyday
                experiences all influence the way I think about digital
                work. Inspiration does not always come from another
                website or a piece of code.
              </p>

              <p>
                Sometimes stepping away from the screen is what makes it
                easier to return with a clearer perspective and a better
                idea.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          LARGE STATEMENT
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="relative overflow-hidden rounded-[2rem] bg-black px-7 py-16 text-white md:px-14 md:py-24">

            {/* Decorative circles */}

            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -right-10 top-20 h-56 w-56 rounded-full border border-white/10" />


            <div className="relative max-w-4xl">

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                A simple belief
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl">
                Good digital work should feel simple, thoughtful, and
                purposeful.
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
                That is the kind of work I want to keep creating — work
                that solves a problem, communicates clearly, and leaves
                people with a better experience.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Let&apos;s work together
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
                Have an idea?
                <br />
                Let&apos;s build it.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">
                Whether you need a website, video editing, or digital
                support, I&apos;d love to hear what you&apos;re working on.
              </p>

            </div>


            <Link
              href="/contact"
              aria-label="Contact me"
              className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-105"
            >

              <ArrowUpRight
                size={23}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   SKILL CATEGORY COMPONENT
========================================================= */

type SkillCategoryProps = {
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
  borderRight?: boolean;
};

function SkillCategory({
  number,
  title,
  icon,
  description,
  skills,
  borderRight = false,
}: SkillCategoryProps) {
  return (
    <article
      className={`border-b border-neutral-200 py-12 md:px-10 md:py-16 ${
        borderRight ? "md:border-r" : ""
      }`}
    >

      {/* Heading */}

      <div className="flex items-center justify-between">

        <div>

          <span className="text-xs tracking-[0.15em] text-neutral-400">
            {number}
          </span>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
            {title}
          </h3>

        </div>

        <span className="text-neutral-400">
          {icon}
        </span>

      </div>


      {/* Description */}

      <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
        {description}
      </p>


      {/* Skills */}

      <div className="mt-8">

        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Skills & capabilities
        </p>

        <div className="flex flex-wrap gap-2">

          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-neutral-200 px-3.5 py-2 text-xs text-neutral-600 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

    </article>
  );
}