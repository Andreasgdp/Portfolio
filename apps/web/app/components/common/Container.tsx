'use client';

import { FC } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { SearchProvider } from '../SearchContext';
import { MainNavigation } from './MainNavigation';
import { Footer } from './Footer';

export const Container: FC<any> = ({ children, ...customMeta }) => {
  const baseUrl = `https://www.contentlayer.dev`;

  const meta = {
    title: 'Contentlayer makes content easy for developers',
    description:
      'Contentlayer is a content SDK that validates and transforms your content into type-safe JSON data you can easily import into your application.',
    url: customMeta.urlPath ? `${baseUrl}${customMeta.urlPath}` : baseUrl,
    name: 'Contentlayer',
    image: customMeta.imagePath
      ? `${baseUrl}${customMeta.imagePath}`
      : `${baseUrl}/images/beta-launch-post-meta.png`,
    type: 'website',
    ...customMeta,
  };
  const jsonLd = {
    '@context': 'http://www.schema.org',
    '@type': 'WebSite',
    name: meta.name,
    url: meta.url,
  };

  return (
    <div className="dark:text-white">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.url}${usePathname()}`} />
        <link rel="canonical" href={`${meta.url}${usePathname()}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <SearchProvider>
        <MainNavigation />
        <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tl from-white via-zinc-100/80 to-white dark:from-black dark:via-zinc-600/20 dark:to-black">
          <main
            className="relative pt-16"
            style={{ scrollPaddingTop: '150px' }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </SearchProvider>
    </div>
  );
};
