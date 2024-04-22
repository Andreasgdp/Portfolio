'use client';

import { useKBar } from 'kbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { isExternalUrl } from '../../../util/helpers';
import { ThemeToggle } from '../theme-toggle';
import { Icon, IconName } from './Icon';
import { Label } from './Label';
import { Logo } from './Logo';

const navLinks: Array<{ label: string; url: string }> = [
  { label: 'Projects', url: '/projects' },
  { label: 'Documentation', url: '/docs' },
  { label: 'Contact', url: '/contact' },
  // Removing this temporarily, until it exists
  // { label: 'Blog', url: '/blog' },
];

const iconLinks: Array<{ label: string; icon: IconName; url: string }> = [
  {
    label: 'Github',
    icon: 'github',
    url: 'https://github.com/Andreasgdp',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/andreasgdp',
  },
];

const NavLink: FC<{
  label?: string;
  hideLabel?: boolean;
  icon?: IconName;
  url: string;
}> = ({ label, hideLabel = false, icon, url }) => {
  const pathname = usePathname() ?? '';
  const active = pathname.split('/')[1] == url.replace('/', '');

  return (
    <Link
      href={url}
      className={`group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none ${
        active
          ? 'bg-zinc-50 text-zinc-900 dark:bg-zinc-500/20 dark:text-zinc-50'
          : 'text-slate-600 hover:bg-zinc-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-zinc-900 dark:hover:text-slate-200'
      }`}
      target={isExternalUrl(url) ? '_blank' : undefined}
      rel={isExternalUrl(url) ? 'noreferrer' : undefined}
    >
      {icon && (
        <span className="block w-5 fill-current text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400">
          <Icon name={icon} />
        </span>
      )}
      {label && <span className={hideLabel ? 'sr-only' : ''}>{label}</span>}
    </Link>
  );
};

export const SearchButton: FC<{ showShortcut?: boolean }> = ({
  showShortcut = true,
}) => {
  const { query } = useKBar();

  return (
    <button
      aria-label="Search"
      onClick={query.toggle}
      className="flex h-8 cursor-text items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 text-sm hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    >
      <span className="mr-2 block w-3 fill-current">
        <Icon name="search" />
      </span>
      <span className="mr-8 text-slate-400 dark:text-slate-500">Search...</span>
      {showShortcut && <Label text="⌘K" />}
    </button>
  );
};

export const MainNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full border-b border-zinc-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 md:px-8 lg:px-16">
        <div className="flex items-center space-x-2.5">
          <Link
            href="/"
            className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white"
          >
            <Logo />
            <span className="-mt-0.5">Guldberg</span>
            <Label text="Portfolio" />
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-end text-slate-600 dark:text-slate-300"
          >
            <span className="inline-block w-4 fill-current">
              <Icon name={open ? 'close' : 'bars'} />
            </span>
          </button>
          {open && (
            <div className="fixed inset-0 top-[65px] z-50 h-screen bg-black/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-black/50">
              <nav className="absolute right-0 h-full divide-y divide-zinc-200 border-l border-zinc-200 bg-white p-8 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-black">
                <div className="flex flex-col items-end space-y-2 pb-8">
                  <div className="mb-2">
                    <SearchButton showShortcut={false} />
                  </div>
                  {navLinks.map(({ label, url }, index) => (
                    <NavLink
                      key={index}
                      label={label}
                      url={url}
                      icon={isExternalUrl(url) ? 'external-link' : undefined}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-end space-x-4 pt-8">
                  {iconLinks.map(({ label, icon, url }, index) => (
                    <NavLink
                      key={index}
                      label={label}
                      hideLabel
                      url={url}
                      icon={icon}
                    />
                  ))}
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          )}
        </div>
        <nav className="hidden items-center divide-x divide-zinc-200 dark:divide-zinc-800 lg:flex">
          <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
            {navLinks.map(({ label, url }, index) => (
              <NavLink
                key={index}
                label={label}
                url={url}
                icon={isExternalUrl(url) ? 'external-link' : undefined}
              />
            ))}
            <div className="px-3">
              <SearchButton />
            </div>
          </div>
          <div className="flex items-center pl-2 lg:space-x-2 lg:pl-8">
            {iconLinks.map(({ label, icon, url }, index) => (
              <NavLink
                key={index}
                label={label}
                hideLabel
                url={url}
                icon={icon}
              />
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
