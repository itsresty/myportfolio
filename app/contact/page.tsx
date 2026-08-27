import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MessageSquare,
  Check,
} from "lucide-react";

const contactOptions = [
  {
    icon: CalendarDays,
    title: "Schedule a call",
    description:
      "Pick a convenient time and let's talk about your project, goals, and how I can help.",
    href: "#schedule",
    action: "View availability",
  },
  {
    icon: Mail,
    title: "Send an email",
    description:
      "Have a question or prefer email? Send me a message directly and I'll get back to you.",
    href: "mailto:hello@example.com",
    action: "Email me",
  },
];

const expectations = [
  "Tell me a little about your project",
  "Share your goals and what you need help with",
  "Let me know your preferred timeline",
  "I'll review your request and get back to you",
];

export default function ContactPage() {
  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="mb-20 md:mb-28">

          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Get in touch
          </p>

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Let&apos;s create something great together.
            </h1>

            <p className="max-w-md text-base leading-7 text-neutral-500 md:text-right">
              Have a project, idea, or opportunity in mind? Tell me about it
              and let&apos;s see how we can work together.
            </p>

          </div>

        </header>


        {/* =====================================================
            CONTACT OPTIONS
        ====================================================== */}
        <section className="mb-28 md:mb-36">

          <div className="mb-10 border-b border-neutral-200 pb-5">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Start a conversation
            </p>
          </div>


          <div className="grid gap-6 md:grid-cols-2">

            {contactOptions.map((option) => {
              const Icon = option.icon;

              return (
                <Link
                  key={option.title}
                  href={option.href}
                  className="group rounded-2xl border border-neutral-200 p-7 transition-all duration-300 hover:border-neutral-400 hover:shadow-sm md:p-10"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                      <Icon
                        size={20}
                        strokeWidth={1.7}
                      />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />

                  </div>


                  <h2 className="mt-10 text-2xl font-semibold tracking-tight">
                    {option.title}
                  </h2>

                  <p className="mt-3 max-w-md leading-7 text-neutral-500">
                    {option.description}
                  </p>

                  <div className="mt-8 text-sm font-medium">
                    {option.action} →
                  </div>

                </Link>
              );
            })}

          </div>

        </section>


        {/* =====================================================
            SCHEDULE A CALL
        ====================================================== */}
        <section
          id="schedule"
          className="mb-28 scroll-mt-28 md:mb-36"
        >

          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-neutral-200 pb-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                Schedule a call
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                Find a time that works for you.
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Clock3 size={16} />
              <span>30 minute call</span>
            </div>

          </div>


          {/* Calendar Area */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">

            {/* Temporary Calendar Placeholder */}
            <div className="grid min-h-[500px] place-items-center p-8">

              <div className="max-w-md text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <CalendarDays
                    size={24}
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  Choose a time
                </h3>

                <p className="mt-3 leading-7 text-neutral-500">
                  Select a date and time that works for you. Once connected
                  to your scheduling service, your real-time availability
                  will appear here.
                </p>

                <button
                  type="button"
                  className="mt-7 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  View available times
                </button>

              </div>

            </div>

          </div>

          <p className="mt-4 text-xs text-neutral-400">
            Calls are scheduled based on my current availability and
            confirmed automatically.
          </p>

        </section>


        {/* =====================================================
            PROJECT INQUIRY
        ====================================================== */}
        <section className="mb-28 md:mb-36">

          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">

            {/* Left */}
            <div>

              <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                Project inquiry
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                Tell me about your project.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-neutral-500">
                The more details you provide, the easier it is for me to
                understand what you&apos;re looking for.
              </p>

            </div>


            {/* Form */}
            <form className="space-y-8">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                />
              </div>


              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                />
              </div>


              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium"
                >
                  What do you need help with?
                </label>

                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none focus:border-black"
                >
                  <option value="" disabled>
                    Select a service
                  </option>

                  <option value="web-development">
                    Web Development
                  </option>

                  <option value="video-editing">
                    Video Editing
                  </option>

                  <option value="virtual-assistant">
                    Virtual Assistant
                  </option>

                  <option value="ui-design">
                    UI & Web Design
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>


              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium"
                >
                  Estimated budget
                </label>

                <select
                  id="budget"
                  name="budget"
                  defaultValue=""
                  className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none focus:border-black"
                >
                  <option value="" disabled>
                    Select a range
                  </option>

                  <option value="under-500">
                    Under €500
                  </option>

                  <option value="500-1000">
                    €500 – €1,000
                  </option>

                  <option value="1000-2500">
                    €1,000 – €2,500
                  </option>

                  <option value="2500-plus">
                    €2,500+
                  </option>

                  <option value="not-sure">
                    Not sure yet
                  </option>
                </select>
              </div>


              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Tell me about your project
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you looking to build or accomplish?"
                  className="w-full resize-none border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
              >
                Send inquiry

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

            </form>

          </div>

        </section>


        {/* =====================================================
            WHAT HAPPENS NEXT
        ====================================================== */}
        <section className="border-t border-neutral-200 py-24 md:py-32">

          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                What happens next
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                A simple process.
              </h2>
            </div>


            <div className="space-y-8">

              {expectations.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-5 border-t border-neutral-200 pt-6"
                >

                  <span className="text-sm text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-start gap-3">

                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />

                    <p className="text-base leading-7 text-neutral-600">
                      {item}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="border-t border-neutral-200 pt-20 md:pt-28">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Prefer email?
              </p>

              <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                hello@example.com
              </h2>

            </div>

            <a
              href="mailto:hello@example.com"
              className="group inline-flex items-center gap-3 text-sm font-medium"
            >
              Send an email

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

          </div>

        </section>

      </div>
    </main>
  );
}