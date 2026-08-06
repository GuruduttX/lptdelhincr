import { createFileRoute } from "@tanstack/react-router";
import { BRAND, DOMAIN } from "@/config/site";
import { Canonical } from "@/components/seo/Canonical";

import { Hero } from "@/components/lpt/Hero";
import { Categories } from "@/components/lpt/Categories";
import { ExploreStrip } from "@/components/lpt/ExploreStrip";
import { Results } from "@/components/lpt/Results";
import { WhyLPT } from "@/components/lpt/WhyLPT";
import { TrackRecord } from "@/components/lpt/TrackRecord";
import { MockAndMaterial } from "@/components/lpt/MockAndMaterial";
import { Scholarship } from "@/components/lpt/Scholarship";
import { VideoTestimonials } from "@/components/lpt/VideoTestimonials";
import { Reviews } from "@/components/lpt/Reviews";
import { CounsellingCTA } from "@/components/lpt/CounsellingCTA";
import { Mentors } from "@/components/lpt/Mentors";
import { Blog } from "@/components/lpt/Blog";
import { SupportYoutubeTelegram } from "@/components/lpt/SupportYoutubeTelegram";
import { useBooking } from "@/components/lpt/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND} — CUET & IPMAT Coaching` },
      {
        name: "description",
        content:
          "CUET & IPMAT coaching in Delhi-NCR across 4 centres — Noida, Hauz Khas, GTB Nagar and Gurugram. Offline, online and hybrid batches. Book a free demo.",
      },
      { property: "og:title", content: `${BRAND} — CUET & IPMAT Coaching` },
      { property: "og:url", content: DOMAIN },
    ],
  }),
  component: Index,
});

function Index() {
  const { openEnquiry } = useBooking();

  return (
    <>
      <Canonical path="/" />
      <Hero onBook={openEnquiry} />
      <Categories />
      <ExploreStrip />
      <Results />
      <WhyLPT />
      <TrackRecord onBook={openEnquiry} />
      <MockAndMaterial />
      <Scholarship />
      <VideoTestimonials />
      <Reviews />
      <CounsellingCTA onBook={openEnquiry} />
      <Mentors />
      <Blog />
      <SupportYoutubeTelegram />
    </>
  );
}
