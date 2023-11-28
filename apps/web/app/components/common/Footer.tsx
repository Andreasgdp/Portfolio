import Link from 'next/link';
import { FC } from 'react';
import { Logo } from './Logo';
import { Icon } from './Icon';

const isExternalUrl = (link: string): boolean => {
  return !link.startsWith('/');
};

const content = {
  note: (
    <>
      <p>MIT Licenced</p>
      <p className="mt-2">
        Made with 💜 by{' '}
        <Link
          href="https://linkedin.com/in/andreasgdp"
          className="hover:text-slate-700 dark:hover:text-slate-300"
          target="_blank"
          rel="noreferrer"
        >
          @andreasgdp
        </Link>
      </p>
    </>
  ),
  menus: [
    {
      title: 'Docs',
      elements: [
        { label: 'Bio', url: '/docs/bio' },
        { label: 'Education', url: '/docs/education-honor-award/education' },
        { label: 'Experience', url: '/docs/work-experience' },
      ],
    },

    {
      title: 'Community',
      elements: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/andreasgdp' },
        { label: 'Twitter', url: 'https://twitter.com/guldberg_' },
        {
          label: 'GitHub',
          url: 'https://github.com/andreasgdp/portfolio',
        },
      ],
    },
  ],
};

export const Footer: FC = () => {
  return (
    <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto w-full max-w-screen-2xl space-y-8 px-4 py-8 md:p-8 md:pb-12 lg:flex lg:justify-between lg:space-y-0 lg:p-16 lg:pb-20">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white"
          >
            <Logo />
            <span>Guldberg</span>
          </Link>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {content.note}
          </div>
        </div>
        <div className="space-y-8 md:flex md:space-y-0 md:space-x-16">
          {content.menus.map(({ title, elements }, index) => (
            <div key={index}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                {title}
              </h4>
              <ul className="mx-0 mt-4 list-none space-y-2 text-sm">
                {elements.map(({ label, url }, index) => (
                  <li key={index}>
                    <Link
                      href={url}
                      className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                      target={isExternalUrl(url) ? '_blank' : undefined}
                    >
                      <span>{label}</span>
                      {isExternalUrl(url) && (
                        <span className="inline-block w-4">
                          <Icon name="external-link" />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};