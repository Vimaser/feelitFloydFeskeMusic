import SuspenseWrapper from './SuspenseWrapper';
import HomePage from './page';
import Head from 'next/head';
import { getPageMetadata } from '@/lib/metadata';

const HomePageWrapper = ({ metadata }) => {
  return (
    <>
      <Head>
        <title>{metadata.meta_title || 'Default Title'}</title>
        <meta name="description" content={metadata.meta_description || 'Default Description'} />
        <link rel="canonical" href={metadata.canonical_url || 'https://www.example.com'} />

        <meta property="og:title" content={metadata.og_title || 'Default OG Title'} />
        <meta property="og:description" content={metadata.og_description || 'Default OG Description'} />
        <meta property="og:image" content={metadata.og_image || '/default-og-image.jpg'} />
        <meta property="og:url" content={metadata.canonical_url || 'https://www.example.com'} />

        <meta name="twitter:title" content={metadata.twitter_title || 'Default Twitter Title'} />
        <meta name="twitter:description" content={metadata.twitter_description || 'Default Twitter Description'} />
        <meta name="twitter:image" content={metadata.twitter_image || '/default-twitter-image.jpg'} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadata.structured_data || {}),
          }}
        />
      </Head>
      <SuspenseWrapper>
        <HomePage />
      </SuspenseWrapper>
    </>
  );
};

export async function getStaticProps() {
  const metadata = getPageMetadata('home'); // Adjust 'home' to your page's slug or filename

  return {
    props: {
      metadata,
    },
  };
}

export default HomePageWrapper;
