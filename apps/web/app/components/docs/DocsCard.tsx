import { Icon, IconName } from '../common/Icon';
import { Label } from '../common/Label';
import { ChevronLink } from '../common/ChevronLink';

export const DocsCard: React.FC<
  React.PropsWithChildren<{
    title: string;
    icon?: IconName | null;
    label?: string | null;
    subtitle?: string | null;
    link?: { url: string; label: string };
  }>
> = ({ title, icon, label, subtitle, children, link }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`grow border border-gray-100 bg-gray-50 p-6 py-4 dark:border-gray-800 dark:bg-gray-900 
        ${link ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'} ${
          icon ? 'mt-6' : 'mt-0'
        }`}
      >
        {icon && (
          <div className="-mt-10 mb-4 block w-12 rounded-full bg-white dark:bg-black">
            <div className="h-12 w-12 rounded-full border border-zinc-200 bg-zinc-100 p-2.5 text-zinc-600 dark:border-zinc-900 dark:bg-zinc-900/50 dark:text-zinc-500">
              <Icon name={icon} />
            </div>
          </div>
        )}
        <h3 className="mt-0">{title}</h3>
        {label && <Label text={label} />}
        {subtitle && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <p>{subtitle}</p>
          </div>
        )}
        {children && <div className="text-sm">{children}</div>}
      </div>
      {link && (
        // TODO: Fix these links. Currently linking to e.g. /docs/getting-started, but should link to /docs/getting-started-cddd76b7
        <div className="rounded-b-2xl border border-zinc-100 bg-zinc-50 p-6 py-4 dark:border-zinc-900/50 dark:bg-zinc-900/20">
          <ChevronLink {...link} />
        </div>
      )}
    </div>
  );
};
