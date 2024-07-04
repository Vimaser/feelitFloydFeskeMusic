"use client";

import "./globals.css";
import { twMerge } from "tailwind-merge";
import "aos/dist/aos.css";
import { dMSans, kumbhSans, spaceGrotesk, pacifico } from "@/fonts/fonts";
import AnimationProvider from "./AnimationProvider";
import Settings from "@/components/Settings";
import LayoutProvider from "./LayoutProvider";
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';
import { metadata } from './metadata';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    handleRouteChange(`${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`);

    return () => {};
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <Head>
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
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
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
