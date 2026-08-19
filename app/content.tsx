"use client";

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

export default function Index() {
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
