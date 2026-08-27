import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type AvailabilityProps = {
  available?: boolean;
};

export default function Availability({
  available = true,
}: AvailabilityProps) {
  return (
    <Link
      href={available ? "/contact" : "#"}
      className="group inline-flex items-center gap-3 rounded-full border border-black px-3 py-2 transition-all duration-300 hover:bg-black"
    >
      {/* Status Dot */}
      <span className="relative flex h-2.5 w-2.5">
        {available && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
        )}

        <span
          className={`relative h-2.5 w-2.5 rounded-full ${
            available ? "bg-green-500" : "bg-neutral-400"
          }`}
        />
      </span>

      {/* Status */}
      <span
        className={`text-xs font-medium transition-colors duration-300 ${
          available
            ? "text-black group-hover:text-white"
            : "text-neutral-500 group-hover:text-white"
        }`}
      >
        {available ? "Available for work" : "Currently unavailable"}
      </span>

      {/* Arrow */}
      {available && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.8}
          className="text-black transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      )}
    </Link>
  );
}