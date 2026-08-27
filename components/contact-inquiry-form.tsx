"use client";

import { ArrowUpRight } from "lucide-react";

const CONTACT_EMAIL = "restymontero0@gmail.com";

export default function ContactInquiryForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const name = value("name");
    const email = value("email");
    const service = value("service") || "General inquiry";
    const budget = value("budget") || "Not specified";
    const message = value("message");
    const subject = `New portfolio inquiry | ${service} | ${name}`;
    const body = [
      "RESTY MONTERO — NEW PORTFOLIO INQUIRY",
      "════════════════════════════════════",
      "",
      "CONTACT DETAILS",
      `Name: ${name}`,
      `Reply to: ${email}`,
      "",
      "PROJECT REQUIREMENTS",
      `Service: ${service}`,
      `Estimated budget: ${budget}`,
      "",
      "PROJECT BRIEF",
      message,
      "",
      "════════════════════════════════════",
      "Submitted through your portfolio contact page.",
      `Reply directly to ${email} to continue the conversation.`,
    ].join("\n");

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div><label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label><input required id="name" name="name" type="text" placeholder="Your name" className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black" /></div>
      <div><label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label><input required id="email" name="email" type="email" placeholder="you@example.com" className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black" /></div>
      <div><label htmlFor="service" className="mb-2 block text-sm font-medium">What do you need help with?</label><select required id="service" name="service" defaultValue="" className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none focus:border-black"><option value="" disabled>Select a service</option><option>Web Development</option><option>Video Editing</option><option>UI & Web Design</option><option>Virtual Assistance</option><option>Other</option></select></div>
      <div><label htmlFor="budget" className="mb-2 block text-sm font-medium">Estimated budget</label><select id="budget" name="budget" defaultValue="" className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none focus:border-black"><option value="" disabled>Select a range</option><option>Under €500</option><option>€500 – €1,000</option><option>€1,000 – €2,500</option><option>€2,500+</option><option>Not sure yet</option></select></div>
      <div><label htmlFor="message" className="mb-2 block text-sm font-medium">Tell me about your project</label><textarea required id="message" name="message" rows={5} placeholder="What are you looking to build or accomplish?" className="w-full resize-none border-b border-neutral-300 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black" /></div>
      <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80">Send inquiry <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
      <p className="text-xs text-neutral-400">Gmail will open with this inquiry already formatted and addressed to me.</p>
    </form>
  );
}
