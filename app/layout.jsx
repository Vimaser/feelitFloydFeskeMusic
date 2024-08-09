"use client";

import React from 'react';
import "./globals.css";
import { twMerge } from "tailwind-merge";
import "aos/dist/aos.css";
import { dMSans, kumbhSans, spaceGrotesk, pacifico } from "@/fonts/fonts";
import AnimationProvider from "./AnimationProvider";
import Settings from "@/components/Settings";
import LayoutProvider from "./LayoutProvider";
import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        {/* Static Meta Data */}
        <title>Floyd Feske Music - Home</title>
        <meta name="description" content="Welcome to Floyd Feske Music's official website!" />
        <meta property="og:title" content="Floyd Feske Music - Home" />
        <meta property="og:description" content="Explore the latest music, albums, and shows by Floyd Feske." />
        <meta property="og:image" content="/default-og-image.jpg" />
        <meta property="og:url" content="https://www.floydfeske.com" />
        <meta name="twitter:card" content="summary_large_image" />
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
            <div className="layout">
              <Settings />
              {children}
            </div>
          </LayoutProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
