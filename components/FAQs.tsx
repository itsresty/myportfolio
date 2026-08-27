import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I offer web development, video editing, virtual assistance, UI and digital design, digital content support, and website maintenance. I can also work on custom projects that combine multiple services depending on what you need.",
  },
  {
    question: "Can I hire you for a custom project?",
    answer:
      "Yes. Not every project fits into a predefined service. If you have a specific idea, task, or combination of services in mind, send me the details and we can discuss the best way to approach it.",
  },
  {
    question: "Can you work on an existing website?",
    answer:
      "Yes. I can work with an existing website to make updates, fix issues, improve responsive layouts, add new sections or functionality, update content, improve performance, or make general design improvements.",
  },
  {
    question: "What technologies do you use for web development?",
    answer:
      "I primarily work with modern web technologies such as Next.js, React, TypeScript, JavaScript, Tailwind CSS, responsive design techniques, and API integrations. The technology used depends on the requirements of the project.",
  },
  {
    question: "What type of videos can you edit?",
    answer:
      "I can help with YouTube videos, Shorts, TikTok and Instagram Reels, talking-head videos, social media content, captions and subtitles, B-roll, transitions, sound design, basic color correction, and other content-focused editing needs.",
  },
  {
    question: "Can you edit videos for YouTube and social media?",
    answer:
      "Yes. I can format and edit content specifically for platforms such as YouTube, TikTok, Instagram Reels, and YouTube Shorts. The editing approach can be adapted to the platform, audience, and style of your content.",
  },
  {
    question: "What can you help me with as a virtual assistant?",
    answer:
      "I can assist with tasks such as data entry, web research, spreadsheet management, file organization, content uploading, website management, administrative tasks, and other recurring digital tasks that can be handled remotely.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "The timeline depends on the type and complexity of the project. A small website update or simple editing task may take less time than a complete website or larger content project. After reviewing your requirements, I can give you a more realistic estimated timeline.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes. Feedback and revisions are part of the process. The number of revisions can depend on the scope of the project, so the revision process and expectations will be discussed before work begins.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on the scope, complexity, timeline, and requirements of the project. I prefer to understand what you need first so I can provide a more appropriate quote instead of using a one-size-fits-all price.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I can work remotely with clients from different countries. Communication, project updates, files, and deliverables can all be handled online.",
  },
  {
    question: "How do we communicate during a project?",
    answer:
      "Communication can be handled through email, messaging platforms, or scheduled calls depending on the project. I can provide updates throughout the process and discuss important decisions with you before moving forward.",
  },
  {
    question: "Can we schedule a call before starting?",
    answer:
      "Yes. If your project would be easier to explain through a conversation, you can schedule a call through the contact page. We can use the call to discuss your goals, requirements, timeline, and any questions you may have.",
  },
  {
    question: "What do you need from me before starting?",
    answer:
      "Depending on the project, I may need your content, brand assets, references, existing website information, video footage, access to relevant tools, or a clear description of your requirements. I will let you know exactly what is needed before the project begins.",
  },
  {
    question: "Can you sign an NDA or keep my project confidential?",
    answer:
      "If your project requires confidentiality, you can let me know before we begin. We can discuss the appropriate arrangements for keeping your project information, files, and materials private.",
  },
  {
    question: "What happens after I contact you?",
    answer:
      "I'll review your message and project requirements, then we can discuss the scope, goals, timeline, and next steps. If the project is a good fit, we can agree on the details and begin the work.",
  },
];

export default function FAQ() {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">

          {/* Left */}

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              Frequently Asked Questions
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Questions before we get started?
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
              Here are some of the most common questions about my services,
              process, communication, pricing, and projects.
            </p>

          </div>


          {/* Right */}

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">

            {faqs.map((faq, index) => (

              <details
                key={faq.question}
                className="group"
              >

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-medium">

                  <div className="flex items-start gap-5">

                    <span className="pt-0.5 text-xs font-medium tracking-[0.12em] text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm leading-6 md:text-base">
                      {faq.question}
                    </span>

                  </div>


                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all duration-300 group-open:rotate-45 group-open:bg-black group-open:text-white">

                    <Plus
                      size={15}
                      strokeWidth={1.7}
                    />

                  </span>

                </summary>


                <div className="pb-7 pl-10 pr-12">

                  <p className="max-w-2xl text-sm leading-7 text-neutral-500">
                    {faq.answer}
                  </p>

                </div>

              </details>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}