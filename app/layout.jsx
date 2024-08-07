"use client";

import React, { Suspense, useEffect, useState } from 'react';
import "./globals.css";
import { twMerge } from "tailwind-merge";
import "aos/dist/aos.css";
import { dMSans, kumbhSans, spaceGrotesk, pacifico } from "@/fonts/fonts";
import AnimationProvider from "./AnimationProvider";
import Settings from "@/components/Settings";
import LayoutProvider from "./LayoutProvider";
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import * as gtag from '@/lib/gtag';
import { metadata } from './metadata';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    handleRouteChange(`${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`);

    return () => {};
  }, [pathname, searchParams]);

  const currentMetadata = {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url + `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`,
    image: metadata.image
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
    <html lang="en">
      <Head>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        {/* SEO Meta Tags */}
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <meta name="google-site-verification" content="3ALtvfxggHMZnzSc0SxSJckfW37K21cWZFF8Mf-O-TA" />

        {/* Canonical Tag */}
        <link rel="canonical" href={currentMetadata.url} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={currentMetadata.title} />
        <meta property="og:description" content={currentMetadata.description} />
        <meta property="og:image" content={currentMetadata.image} />
        <meta property="og:url" content={currentMetadata.url} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMetadata.title} />
        <meta name="twitter:description" content={currentMetadata.description} />
        <meta name="twitter:image" content={currentMetadata.image} />

        {/* Structured Data for a Musician */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Floyd Feske",
              "url": "https://www.floydfeske.com",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=100086972757115",
                "https://open.spotify.com/artist/5QQ0CutnlVZTg7xQNMvMqJ",
                "https://www.amazon.com/music/player/artists/B09S8K6WBZ/floyd-feske",
                "https://www.youtube.com/channel/UCkpbrha--IMuWnRN3f81Qvg",
              ],
              "genre": "Singer/Songwriter",
              "member": [
                {
                  "@type": "Person",
                  "name": "Floyd Feske"
                }
              ],
              "album": [
                {
                  "@type": "MusicAlbum",
                  "name": "Not The Man",
                  "datePublished": "2024-03-01",
                  "track": [
                    {
                      "@type": "MusicRecording",
                      "name": "Memory Waltz",
                      "url": "https://www.floydfeske.com"
                    }
                  ]
                }
              ],
              "performer": {
                "@type": "Person",
                "name": "Floyd Feske"
              }
            })
          }}
        />
      </Head>
      <body
        className={twMerge(
          spaceGrotesk.className,
          dMSans.variable,
          kumbhSans.variable,
          pacifico.variable
        )}
      >
        <AnimationProvider>
          <LayoutProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="layout">
                <Settings />
                {children}
              </div>
            </Suspense>
          </LayoutProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}