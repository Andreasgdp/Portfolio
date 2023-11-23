import { FC, ReactNode } from 'react';
import { Icon } from './Icon';

export const Callout: React.FC<{
  children: ReactNode;
  className?: string | '';
}> = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-900/50 dark:bg-zinc-900/20 ${className}`}
    >
      <div className="flex space-x-4 p-6 py-4 text-zinc-600 dark:text-zinc-300">
        <div className="mt-1 w-5 shrink-0 text-zinc-500 dark:text-zinc-400">
          <Icon name="exclamation" />
        </div>
        <div className="prose-a:font-semibold">{children}</div>
      </div>
    </div>
  );
};
