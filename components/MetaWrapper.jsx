// components/MetaWrapper.jsx
import Head from 'next/head';
import { metadata } from '@/app/metadata';

const MetaWrapper = ({ children, currentMetadata }) => {
  return (
    <>
      <Head>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <meta name="google-site-verification" content="3ALtvfxggHMZnzSc0SxSJckfW37K21cWZFF8Mf-O-TA" />
        <link rel="canonical" href={currentMetadata.url} />
        <meta property="og:title" content={currentMetadata.title} />
        <meta property="og:description" content={currentMetadata.description} />
        <meta property="og:image" content={currentMetadata.image} />
        <meta property="og:url" content={currentMetadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMetadata.title} />
        <meta name="twitter:description" content={currentMetadata.description} />
        <meta name="twitter:image" content={currentMetadata.image} />
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
            }),
          }}
        />
      </Head>
      {children}
    </>
  );
};

export default MetaWrapper;
