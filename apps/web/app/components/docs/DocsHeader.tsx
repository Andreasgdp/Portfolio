'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, Fragment, useEffect, useState } from 'react';
import { TreeNode } from 'types/TreeNode';
import { Icon } from '../common/Icon';
import { DocsNavigation } from './DocsNavigation';
import { CopyUrlBtn } from './DocsShareBtn';

export const DocsHeader: FC<{
  tree: TreeNode[];
  breadcrumbs: any[];
  title: string;
  globalId: string;
}> = ({ tree, breadcrumbs, title, globalId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY <= 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [usePathname]);

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/docs/${globalId}`
      : '';

  return (
    <>
      <header className="relative w-full">
        <div className="mx-auto w-full max-w-3xl space-y-2 px-4 py-8 md:px-8 lg:max-w-full lg:px-16">
          <ul className="-mx-1 flex flex-wrap items-center text-sm">
            {breadcrumbs.map(({ path, title }, index) => (
              <Fragment key={index}>
                {index < breadcrumbs.length - 1 && (
                  <li className="mx-1 flex items-center space-x-2">
                    <Link
                      href={path}
                      className="inline whitespace-nowrap hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {title}
                    </Link>
                    <span className="inline-block w-1.5 fill-current text-slate-400 dark:text-slate-500">
                      <Icon name="chevron-right" />
                    </span>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <div className="sr-only relative flex items-center lg:not-sr-only">
            <h1 className="sr-only text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:not-sr-only lg:text-4xl">
              {title}
            </h1>
            <CopyUrlBtn url={url} />
          </div>
          <div className="relative flex items-center lg:hidden">
            <button
              aria-label="Show docs navigation"
              onClick={() => setOpen(true)}
              className="flex space-x-2 text-left text-2xl font-semibold text-slate-800 dark:text-slate-200 md:space-x-3 md:text-3xl lg:text-4xl"
            >
              <span className="mt-1.5 inline-block w-4 flex-shrink-0 fill-current md:w-5">
                <Icon name="chevron-down" />
              </span>
              <span className="inline-block flex-shrink">{title}</span>
            </button>
            <CopyUrlBtn url={url} />
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 h-screen bg-black/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-black/50">
          <div className="absolute left-0 h-full divide-y divide-zinc-200 overflow-y-scroll border-l border-zinc-200 bg-white p-4 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-black">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Documentation
              </h2>
              <button
                type="button"
                aria-label="Close docs navigation"
                onClick={() => setOpen(!open)}
                className="flex h-8 w-8 items-center justify-end text-slate-600 dark:text-slate-300"
              >
                <span className="inline-block w-4 fill-current">
                  <Icon name="close" />
                </span>
              </button>
            </div>
            <div className="pt-4">
              <DocsNavigation tree={tree} />
            </div>
          </div>
        </div>
      )}
      <div
        className={`fixed top-16 z-10 hidden h-16 w-full border-b border-zinc-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter transition-opacity duration-200 dark:border-zinc-800 dark:bg-black lg:block ${
          top ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ul className="flex h-full items-center space-x-2 px-16 text-sm">
          {breadcrumbs.map(({ path, title }, index) => (
            <Fragment key={index}>
              {index < breadcrumbs.length - 1 && (
                <li className="flex items-center space-x-2">
                  <Link
                    href={path}
                    className="inline whitespace-nowrap hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {title}
                  </Link>
                  <span className="inline-block w-1.5 fill-current text-slate-400 dark:text-slate-500">
                    <Icon name="chevron-right" />
                  </span>
                </li>
              )}
            </Fragment>
          ))}
          <li className="hidden text-slate-800 dark:text-slate-200 lg:block">
            {title}
          </li>
        </ul>
      </div>
    </>
  );
};
