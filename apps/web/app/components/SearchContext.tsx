// import { allDocs, allPosts, Post } from 'contentlayer/generated';
import { allDocs, allProjects } from 'contentlayer/generated';
import { format } from 'date-fns';
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useMemo } from 'react';
import { TreeNode } from 'types/TreeNode';
import { buildDocsTree } from 'util/build-docs-tree';
import { Card } from './common/Card';
import { Icon } from './common/Icon';
import { Label } from './common/Label';

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const docsTree = buildDocsTree(allDocs);
  const actions = useMemo(() => {
    let actions: Action[] = [
      {
        id: '0-homepage',
        name: 'Homepage',
        keywords: 'Portfolio Home Start Index Overview Features Intro',
        section: 'Home',
        perform: () => router.push('/'),
      },
      {
        id: '0-contact',
        name: 'Contact',
        keywords: 'Contact Email Social',
        section: 'Home',
        perform: () => router.push('/contact'),
      },
      {
        id: '3-linkedin',
        name: 'LinkedIn',
        keywords: 'LinkedIn profile',
        section: 'External',
        perform: () =>
          window.open('https://linkedin.com/in/Andreasgdp', '_ blank'),
      },
    ];
    let id = 1;
    const mapDocs = (tree: TreeNode[], parent: string) => {
      for (const element of tree) {
        actions.push({
          id: ('1-bldocsog-' + id).toString(),
          name: element.label
            ? `${element.title} (${element.label})`
            : element.title,
          keywords: element?.excerpt || '',
          section: 'Documentation',
          subtitle: parent,
          perform: () => router.push(element.urlPath),
        });
        id++;
        if (element.children.length)
          mapDocs(element.children, parent + ' / ' + element.title);
      }
    };
    const mapProjects = (projects: any[], parent: string) => {
      for (const project of projects) {
        actions.push({
          id: ('2-projects-' + id).toString(),
          name: project.title,
          keywords: project?.excerpt || '',
          section: 'Projects',
          subtitle: parent,
          perform: () => router.push(project.path),
        });
        id++;
      }
    };
    mapDocs(docsTree, 'Docs');
    mapProjects(allProjects, 'Projects');
    return actions;
  }, [docsTree, router]);

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-50 bg-zinc-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <Card>
              <div className="flex items-center space-x-4 p-4">
                <span className="block w-5 fill-current">
                  <Icon name="search" />
                </span>
                <KBarSearch className="h-8 w-full bg-transparent text-slate-600 placeholder-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder-slate-500" />
                <Label text="ESC" />
              </div>
              <RenderResults />
            </Card>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

const RenderResults = () => {
  const { results } = useMatches();

  if (results.length) {
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div>
            {typeof item === 'string' ? (
              <div className="pt-3">
                <div className="block border-t border-zinc-100 px-4 pb-2 pt-6 text-xs font-semibold uppercase text-slate-400 dark:border-zinc-800 dark:text-slate-500">
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`block cursor-pointer px-4 py-2 text-slate-600 dark:text-slate-300 ${
                  active ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-transparent'
                }`}
              >
                {item.subtitle && (
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    {item.subtitle}
                  </div>
                )}
                <div>{item.name}</div>
              </div>
            )}
          </div>
        )}
      />
    );
  } else {
    return (
      <div className="block border-t border-zinc-100 px-4 py-8 text-center text-slate-400 dark:border-zinc-800 dark:text-slate-600">
        No results for your search...
      </div>
    );
  }
};
