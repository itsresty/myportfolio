import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type LetsTalkProps = {
  mobile?: boolean;
  label?: string;
};

export default function LetsTalk({
  mobile = false,
  label = "Let’s talk",
}: LetsTalkProps) {
  if (mobile) {
    return (
      <Link
        href="/contact"
        className="group flex items-center justify-between rounded-xl bg-black px-4 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        <span>{label}</span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <ArrowUpRight
            size={16}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/contact"
      className="group flex items-center gap-2 rounded-full bg-black py-2.5 pl-5 pr-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
    >
      <span>{label}</span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
        <ArrowUpRight
          size={15}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
