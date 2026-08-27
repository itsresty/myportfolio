"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useState } from "react";

const years = [2025, 2026];

export default function GithubActivity() {
  const [year, setYear] = useState(2025);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            GitHub
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
            Activity
          </h2>
        </div>

        <a
          href="https://github.com/itsresty"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
        >
          Visit GitHub →
        </a>
      </div>

      {/* Calendar */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
        {/* Calendar Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 sm:px-6">
          <p className="text-sm font-medium text-neutral-700">
            Contributions
          </p>

          <select
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            aria-label="Select GitHub contribution year"
            className="
              cursor-pointer
              rounded-lg
              border
              border-neutral-300
              bg-white
              px-3
              py-1.5
              text-xs
              font-medium
              text-neutral-700
              outline-none
              transition-colors
              hover:border-neutral-400
              focus:border-black
            "
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Scrollable Calendar */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[760px] px-5 py-8 sm:min-w-[800px] sm:px-7">
            <GitHubCalendar
              username="itsresty"
              year={year}
              blockSize={12}
              blockMargin={3}
              fontSize={11}
              showWeekdayLabels
              labels={{
                totalCount: "{{count}} contributions in {{year}}",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
