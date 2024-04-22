import NextLink from 'next/link';
import { FC, ReactNode } from 'react';
import { Icon } from './Icon';

export const Link: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  const isExternalUrl = !(href.startsWith('/') || href.startsWith('#'));

  return (
    <NextLink
      href={href}
      className="m-0 inline-flex items-center space-x-1"
      target={isExternalUrl ? '_blank' : undefined}
      rel={isExternalUrl ? 'noreferrer' : undefined}
    >
      <span>{children}</span>
      {isExternalUrl && (
        <span className="block w-4 fill-current">
          <Icon name="external-link" />
        </span>
      )}
    </NextLink>
  );
};
