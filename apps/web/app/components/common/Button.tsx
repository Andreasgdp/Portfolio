import { FC } from 'react';
import classnames from 'classnames';
import { Icon, IconName } from './Icon';
import Link from 'next/link';
import { isExternalUrl } from '../../utils/helpers';

const themeClasses = {
  primary:
    'bg-zinc-600 text-zinc-50 border-zinc-800 hover:bg-zinc-500 dark:bg-zinc-600 dark:border-zinc-700 dark:hover:bg-zinc-500 dark:hover:border-zinc-600',
  secondary:
    'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-50 dark:text-zinc-300 dark:border-zinc-500/30 dark:hover:bg-zinc-500/30 dark:bg-zinc-500/20',
};

export const Button: FC<{
  label: string;
  action?: () => void;
  theme?: 'primary' | 'secondary';
  href?: string;
  icon?: IconName;
}> = ({ label, action, href, theme = 'primary', icon }) => {
  const sharedClasses =
    'px-6 py-2 flex justify-center items-center space-x-3 rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-900';

  if (href) {
    return (
      <Link href={href}>
        <a
          className={classnames(sharedClasses, themeClasses[theme])}
          onClick={action}
          aria-label={label}
          target={isExternalUrl(href) ? '_blank' : undefined}
          rel={isExternalUrl(href) ? 'noreferrer' : undefined}
        >
          <span>{label}</span>
          {icon && (
            <span className="w-5">
              <Icon name={icon} />
            </span>
          )}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={classnames(sharedClasses, themeClasses[theme])}
        onClick={action}
        aria-label={label}
      >
        <span>{label}</span>
        {icon && (
          <span className="w-5">
            <Icon name={icon} />
          </span>
        )}
      </button>
    );
  }
};
