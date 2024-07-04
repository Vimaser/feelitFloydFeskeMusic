import React, { Suspense } from 'react';
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

const Home2 = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="text-base h-[200vh] text-white">
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
      </div>
    </Suspense>
  );
};

export default Home2;
