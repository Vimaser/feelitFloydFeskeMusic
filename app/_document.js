import { Html, Head, Main, NextScript } from "next/document";
import Head from 'next/head';

export default function Document() {
  return (
    <Html lang="en">
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

        {/* Test Meta Data */}
        <title>Test Meta Title - Floyd Feske Music</title>
        <meta name="description" content="This is a test meta description for Floyd Feske Music." />

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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
