import '../global.css';
import { Metadata } from 'next';
import { Analytics } from './components/analytics';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: {
    default: 'guldberg.dev',
    template: '%s | guldberg.dev',
  },
  description: 'Co-founder of unkey.dev and founder of planetfall.io',
  openGraph: {
    title: 'guldberg.dev',
    description: 'Co-founder of unkey.dev and founder of planetfall.io',
    url: 'https://guldberg.dev',
    siteName: 'guldberg.dev',
    images: [
      {
        url: 'https://guldberg.dev/og.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'guldberg',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
