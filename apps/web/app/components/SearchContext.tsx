import { FC, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarAnimator,
  KBarResults,
  useMatches,
  Action,
} from 'kbar';
import { TreeNode } from 'types/TreeNode';
import { Card } from './common/Card';
import { Icon } from './common/Icon';
import { Label } from './common/Label';
import { buildDocsTree } from 'util/build-docs-tree';
// import { allDocs, allPosts, Post } from 'contentlayer/generated';
import { allDocs, allProjects } from 'contentlayer/generated';
import { format } from 'date-fns';

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
        id: '3-github',
        name: 'GitHub Repository',
        keywords: 'Portfolio Github Git Repository Repo Code',
        section: 'External',
        perform: () => window.open('https://github.com/Andreasgdp', '_ blank'),
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
        <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <Card>
              <div className="flex items-center space-x-4 p-4">
                <span className="block w-5">
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
                <div className="block border-t border-gray-100 px-4 pt-6 pb-2 text-xs font-semibold uppercase text-slate-400 dark:border-gray-800 dark:text-slate-500">
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`block cursor-pointer px-4 py-2 text-slate-600 dark:text-slate-300 ${
                  active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
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
      <div className="block border-t border-gray-100 px-4 py-8 text-center text-slate-400 dark:border-gray-800 dark:text-slate-600">
        No results for your search...
      </div>
    );
  }
};
