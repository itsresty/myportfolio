const process = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We discuss your goals, requirements, audience, and what you need help with.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "I organize the requirements into a clear plan and determine the best approach.",
  },
  {
    number: "03",
    title: "Creation",
    description:
      "I work on the website, video, content, or other requested deliverables.",
  },
  {
    number: "04",
    title: "Review",
    description:
      "You review the work and provide feedback for adjustments and refinements.",
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "The completed work is delivered and prepared for you to use.",
  },
];

export default function HowIWork() {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

        <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">

          {/* Introduction */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              How I work
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              A simple process from idea to delivery.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500">
              I keep the process straightforward, transparent, and focused
              on creating work that solves the problem.
            </p>
          </div>

          {/* Process */}
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">

            {process.map((step) => (
              <div
                key={step.number}
                className="grid gap-4 py-7 sm:grid-cols-[60px_180px_1fr]"
              >
                <span className="text-xs tracking-[0.15em] text-neutral-400">
                  {step.number}
                </span>

                <h3 className="font-medium">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-neutral-500">
                  {step.description}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}