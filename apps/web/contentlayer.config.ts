import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getLastEditedDate, urlFromFilePath } from './util/utils';
import { bundleMDX } from 'mdx-bundler';
import { mdxToMarkdown } from 'mdast-util-mdx';
import { toMarkdown } from 'mdast-util-to-markdown';
import type * as unified from 'unified';

// TODO: Come back and fix type errors for ignored parts.

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  path: {
    type: 'string',
    // @ts-ignore
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slug: {
    type: 'string',
    // @ts-ignore
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: './projects/**/*.mdx',
  contentType: 'mdx',

  fields: {
    published: {
      type: 'boolean',
    },
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
    },
    url: {
      type: 'string',
    },
    repository: {
      type: 'string',
    },
  },
  // @ts-ignore
  computedFields,
}));

export type DocHeading = { level: 1 | 2 | 3; title: string };

const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      for (const element of node.children.filter(
        (_: any) => _.type === 'heading' || _.name === 'OptionsTable'
      )) {
        if (element.type === 'heading') {
          const title = toMarkdown(
            { type: 'paragraph', children: element.children },
            { extensions: [mdxToMarkdown()] }
          )
            .trim()
            .replace(/<.*$/g, '')
            .replace(/\\/g, '')
            .trim();
          headings.push({ level: element.depth, title });
        } else if (element.name === 'OptionsTable') {
          element.children
            .filter((_: any) => _.name === 'OptionTitle')
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((_: any) => _.type === 'heading')
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: 'paragraph', children: heading.children },
                    { extensions: [mdxToMarkdown()] }
                  )
                    .trim()
                    .replace(/<.*$/g, '')
                    .replace(/\\/g, '')
                    .trim();
                  headings.push({ level: heading.depth, title });
                });
            });
        }
      }
    };
  };

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `./docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    global_id: {
      type: 'string',
      description:
        'Random ID to uniquely identify this doc, even after it moves',
      required: true,
    },
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true,
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav',
    },
    label: {
      type: 'string',
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    show_child_cards: {
      type: 'boolean',
      default: false,
    },
    collapsible: {
      type: 'boolean',
      required: false,
      default: false,
    },
    collapsed: {
      type: 'boolean',
      required: false,
      default: false,
    },
    // seo: { type: 'nested', of: SEO },
  },
  computedFields: {
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: (doc) => {
        if (doc._id.startsWith('docs/index.md')) return '/docs';
        return urlFromFilePath(doc);
      },
    },
    url_path_without_id: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: (doc) =>
        urlFromFilePath(doc).replace(new RegExp(`-${doc.global_id}$`), ''),
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) =>
        urlFromFilePath(doc)
          .split('/')
          // skip `/docs` prefix
          .slice(2)
          .map((dirName) => {
            const re = /^((\d+)-)?(.*)$/;
            const [, , orderStr, pathName] = dirName.match(re) ?? [];
            const order = orderStr ? parseInt(orderStr) : 0;
            return { order, pathName };
          }),
    },
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const headings: DocHeading[] = [];

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              tocPlugin(headings),
            ];
            return opts;
          },
        });

        return [{ level: 1, title: doc.title }, ...headings];
      },
    },
    last_edited: { type: 'date', resolve: getLastEditedDate },
  },
  extensions: {},
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  // @ts-ignore
  computedFields,
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Page, Project, Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          // @ts-ignore
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          // @ts-ignore
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          // @ts-ignore
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});
