import Link from 'next/link';
import { FC } from 'react';
import { Icon } from './Icon';

const isExternalUrl = (link: string): boolean => !link.startsWith('/');

export const ChevronLink: FC<{ label: string; url: string }> = ({
  label,
  url,
}) => {
  if (isExternalUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center space-x-1.5 text-zinc-600 no-underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
      >
        <span className="font-semibold">{label}</span>
        <span className="block w-2 fill-current">
          <Icon name="chevron-right" />
        </span>
      </a>
    );
  } else {
    return (
      <Link
        href={url}
        className="inline-flex items-center space-x-1.5 text-zinc-600 no-underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
      >
        <span className="font-semibold">{label}</span>
        <span className="block w-2 fill-current">
          <Icon name="chevron-right" />
        </span>
      </Link>
    );
  }
};
