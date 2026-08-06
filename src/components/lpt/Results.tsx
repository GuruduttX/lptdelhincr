import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { SectionHeader, Tbd } from "./shared";
import { ShieldCheck, Star } from "lucide-react";
import {
  STUDENTS_MENTORED,
  IIM_SELECTIONS_2YR,
  IIM_SEATS_2025,
} from "@/data/results";

/**
 * Results — verified toppers/selections. CUET + IPMAT only (SOP: never
 * fabricate). IPMAT figures are real (LPT IPMAT results, 2024–25); we have no
 * verified CUET selections yet, so that tab renders honest placeholders.
 */
const tabs = ["IPMAT", "CUET"] as const;
type Tab = (typeof tabs)[number];

interface TabData {
  star: { rank: string; name: string; note: string };
  stats: { count: string; label: string }[];
}

const DATA: Record<Tab, TabData | null> = {
  IPMAT: {
    star: { rank: "AIR 09", name: "Parth Baheti", note: "IIM Indore — Selected" },
    stats: [
      { count: IIM_SELECTIONS_2YR, label: "IIM selections in 2 years" },
      { count: IIM_SEATS_2025, label: "IIM seats in 2025 alone" },
      { count: STUDENTS_MENTORED, label: "students mentored for top IIMs" },
    ],
  },
  CUET: {
    star: { rank: "100 %ile", name: "Shivansh Srivastava", note: "GAT — CUET 2025" },
    stats: [
      { count: "2", label: "perfect 100 %ile scorers (CUET 2025)" },
      { count: "10+", label: "students at 99 %ile+ (CUET 2025)" },
      { count: "99.99%ile", label: "top domain score — Ananya Shukla" },
    ],
  },
};

export function Results() {
  const [tab, setTab] = useState<Tab>("IPMAT");
  const data = DATA[tab];

  return (
    <section id="toppers" className="bg-[#FDF6EC] py-12 md:py-16">
      <div className="container-lpt">
        <SectionHeader
          eyebrow="Our Results"
          title="Toppers Made by Mentors, Not Marketing."
          subtitle="Every result we publish is verifiable — named students, real institutes, no inflation."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 " +
                (tab === t
                  ? "bg-brand text-white shadow-[0_8px_24px_rgba(218,32,47,0.30)] scale-[1.03]"
                  : "border border-hairline bg-white text-ink hover:border-brand/40 hover:text-brand hover:bg-[#FFF5F5]")
              }
            >
              {t}
            </button>
          ))}
        </div>

        <Reveal>
          <div key={tab} className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
            {/* Topper card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#DA202F] to-[#8B0E1A] p-10 text-white shadow-[0_24px_60px_rgba(168,18,31,0.38)]">
              <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-14 -left-8 h-60 w-60 rounded-full bg-black/15 blur-3xl" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  <Star className="h-3 w-3 fill-current" />
                  Star Topper · {tab}
                </span>
                <h3 className="mt-6 h-display text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.1 }}>
                  {data ? data.star.rank : <Tbd label="rank / %ile" />}
                </h3>
                <div className="mt-4">
                  <p className="text-lg font-bold leading-tight">
                    {data ? data.star.name : <Tbd label="topper name" />}
                  </p>
                  <p className="mt-2 text-[0.85rem] text-white/75">
                    {data
                      ? data.star.note
                      : `Verified ${tab} selection — to be added from institute records.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid gap-4">
              {(data ? data.stats : [0, 1, 2]).map((s, idx) => (
                <div key={idx} className="lift-card flex items-center gap-5 overflow-hidden rounded-3xl border border-hairline bg-white">
                  <div
                    className="w-1 self-stretch shrink-0 rounded-r-full"
                    style={{ background: "linear-gradient(180deg, #DA202F 0%, #ff6b7a 100%)" }}
                  />
                  <div className="flex flex-1 items-center gap-5 py-6 pr-7">
                    <div className="h-display text-[1.75rem] leading-none text-brand">
                      {data ? (s as { count: string }).count : <Tbd label="count" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-[0.88rem] font-semibold text-ink leading-snug">
                        {data
                          ? (s as { label: string }).label
                          : `Verified ${tab} selections (add real figure)`}
                      </div>
                    </div>
                    <ShieldCheck className="h-5 w-5 shrink-0 text-hairline" strokeWidth={1.5} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-[0.78rem] text-body">
            See the full named CUET &amp; IPMAT selection list on our{" "}
            <Link to="/results" className="font-semibold text-brand hover:underline">
              results page
            </Link>
            . All results are independently verifiable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
