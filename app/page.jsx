"use client";

import Header from "@/components/header";
import Hero from "@/components/hero";
import Featured from "@/components/featured";
import NewestAlbums from "@/components/newest-albums";
import UpcomingShows from "@/components/upcoming-shows";
import FeaturedGrid from "@/components/featured-grid";
import FeaturedAlbums from "@/components/featured-albums";
import Members from "@/components/members";
import Testimonials from "@/components/testimonials";
import LatestBlogs from "@/components/latest-blogs";
import Footer from "@/components/footer";
import { useSearchParams } from 'next/navigation';

const HomePage = () => {
  const searchParams = useSearchParams();

  return (
    <main className="bg-bg-dark text-white text-base">
      <Header />
      <Hero />
      <Featured />
      <NewestAlbums />
      <UpcomingShows />
      <FeaturedGrid />
      <FeaturedAlbums />
      <Members />
      <Testimonials />
      <LatestBlogs />
      <Footer />
    </main>
  );
};

export default HomePage;
