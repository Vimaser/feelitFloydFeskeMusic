"use client";

import Head from 'next/head';
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
import { useSearchParams, usePathname } from 'next/navigation';
import { metadata } from './metadata';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';

const HomePage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [latestBlogPosts, setLatestBlogPosts] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const sortedBlogs = blogsData.sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt));
      setLatestBlogPosts(sortedBlogs.slice(0, 3));
    };

    fetchLatestBlogs();
  }, []);

  const currentMetadata = {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url + `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`,
    image: metadata.image,
  };

  if (latestBlogPosts.length > 0 && pathname.includes('/blogs/')) {
    const currentBlog = latestBlogPosts.find(blog => `/blogs/${blog.id}` === pathname);
    if (currentBlog) {
      currentMetadata.title = `${currentBlog.title} - Floyd Feske Music`;
      currentMetadata.description = currentBlog.description || currentBlog.content.substring(0, 160);
      currentMetadata.image = currentBlog.image || currentMetadata.image;
    }
  }

  return (
    <>
      <Head>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <link rel="canonical" href={currentMetadata.url} />
        <meta property="og:title" content={currentMetadata.title} />
        <meta property="og:description" content={currentMetadata.description} />
        <meta property="og:image" content={currentMetadata.image} />
        <meta property="og:url" content={currentMetadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMetadata.title} />
        <meta name="twitter:description" content={currentMetadata.description} />
        <meta name="twitter:image" content={currentMetadata.image} />
      </Head>
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
    </>
  );
};

export default HomePage;
