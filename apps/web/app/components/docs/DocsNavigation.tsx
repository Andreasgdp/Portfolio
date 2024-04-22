'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { TreeNode } from 'types/TreeNode';
import { Icon } from '../common/Icon';
import { Label } from '../common/Label';

const NavLink: FC<{
  title: string;
  label?: string;
  url: string;
  level: number;
  activePath: string;
  collapsible: boolean;
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({
  title,
  label,
  url,
  level,
  activePath,
  collapsible,
  collapsed,
  toggleCollapsed,
}) => {
  return (
    <div
      className={classNames(
        'group flex h-8 items-center justify-between space-x-2 whitespace-nowrap rounded-md px-3 text-sm leading-none',
        url == activePath
          ? `${
              level == 0 ? 'font-medium' : 'font-normal'
            } bg-zinc-50 text-zinc-900 dark:bg-zinc-500/20 dark:text-zinc-50`
          : `hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
              level == 0
                ? 'font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200'
                : 'font-normal hover:text-slate-600 dark:hover:text-slate-300'
            }`
      )}
    >
      <Link
        href={url}
        className="flex h-full max-w-full grow items-center space-x-2"
      >
        <span className="overflow-hidden overflow-ellipsis">{title}</span>
        {label && <Label text={label} />}
      </Link>
      {collapsible && (
        <button
          aria-label="Toggle children"
          onClick={toggleCollapsed}
          className="mr-2 shrink-0 px-2 py-1"
        >
          <span
            className={`block w-2.5 fill-current ${
              collapsed ? '-rotate-90 transform' : ''
            }`}
          >
            <Icon name="chevron-down" />
          </span>
        </button>
      )}
    </div>
  );
};

const Node: FC<{ node: TreeNode; level: number; activePath: string }> = ({
  node,
  level,
  activePath,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(node.collapsed ?? false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (
      activePath == node.urlPath ||
      node.children.map((_) => _.urlPath).includes(activePath)
    ) {
      setCollapsed(false);
    }
  }, [activePath, node.children, node.urlPath]);

  return (
    <>
      <NavLink
        title={node.nav_title || node.title}
        label={node.label || undefined}
        url={node.urlPath}
        level={level}
        activePath={activePath}
        collapsible={node.collapsible ?? false}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      {node.children.length > 0 && !collapsed && (
        <Tree tree={node.children} level={level + 1} activePath={activePath} />
      )}
    </>
  );
};

const Tree: FC<{ tree: TreeNode[]; level: number; activePath: string }> = ({
  tree,
  level,
  activePath,
}) => {
  return (
    <div
      className={classNames(
        'ml-3 space-y-2 pl-3',
        level > 0 ? 'border-l border-zinc-200 dark:border-zinc-800' : ''
      )}
    >
      {tree.map((treeNode, index) => (
        <Node
          key={index}
          node={treeNode}
          level={level}
          activePath={activePath}
        />
      ))}
    </div>
  );
};

export const DocsNavigation: FC<{ tree: TreeNode[] }> = ({ tree }) => {
  const pathname = usePathname() ?? '';

  return (
    <aside className="-ml-6 w-80">
      <div>
        <Tree tree={tree} level={0} activePath={pathname} />
      </div>
    </aside>
  );
};
