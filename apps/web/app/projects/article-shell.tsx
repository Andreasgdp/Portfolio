import type { Project } from '@/.contentlayer/generated';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { ViewLoader } from './views';

type Props = {
  project: Project;
};

export const ArticleShell: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <span className="drop-shadow-orange text-xs text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:text-white">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                  new Date(project.date)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          <span className="flex items-center  gap-1 text-xs text-zinc-500">
            <Eye className="h-4 w-4" /> <ViewLoader></ViewLoader>
          </span>
        </div>
        <h2 className="font-display z-20 text-xl font-medium text-zinc-200 duration-1000 group-hover:text-white lg:text-3xl">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm  text-zinc-400 duration-1000 group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
