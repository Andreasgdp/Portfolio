import { notFound } from 'next/navigation';
import { Doc, allDocs } from 'contentlayer/generated';
import { Mdx } from '@/app/components/mdx';
import { Header } from './header';
import './mdx.css';
import { ReportView } from './view';
import { Redis } from '@upstash/redis';
import { buildDocsTree } from '@/util/build-docs-tree';

export const revalidate = 60;

type Props = {
  params: {
    slug: string[];
  };
};

const redis = Redis.fromEnv();

function getSupportingProps(doc: Doc, params: any) {
  let slugs = params.slug ? ['docs', ...params.slug] : [];
  let path = '';
  let breadcrumbs: any = [];
  for (const slug of slugs) {
    path += `/${slug}`;
    const breadcrumbDoc = allDocs.find(
      (_) => _.url_path === path || _.url_path_without_id === path
    );
    if (!breadcrumbDoc) continue;
    breadcrumbs.push({
      path: breadcrumbDoc.url_path,
      title: breadcrumbDoc?.nav_title || breadcrumbDoc?.title,
    });
  }
  const tree = buildDocsTree(allDocs);
  const childrenTree = buildDocsTree(
    allDocs,
    doc.pathSegments.map((_: PathSegment) => _.pathName)
  );
  return { tree, breadcrumbs, childrenTree };
}

// export async function generateStaticParams(): Promise<Props['params'][]> {
//   return allDocs.map((doc) => ({
//     slug: doc?.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
//   }));
// }

export default async function PostPage({ params }: Props) {
  const pagePath = params.slug?.join('/') ?? '';
  console.log('pagePath', pagePath);
  console.log('pagePath', pagePath === '');
  let doc;
  let project;
  // If on the index page, we don't worry about the global_id
  if (pagePath === '') {
    doc = allDocs.find((_) => _.url_path === '/docs');
    if (!doc) return { notFound: true };
    project = { doc, ...getSupportingProps(doc, params) };
  } else {
    // Identify the global content ID as the last part of the page path following
    // the last slash. It should be an 8-digit number.
    const globalContentId: string = pagePath
      .split('/')
      .filter(Boolean)
      .pop()
      .split('-')
      .pop();
    // If there is a global content ID, find the corresponding document.
    if (globalContentId && globalContentId.length === 8) {
      doc = allDocs.find((_) => _.global_id === globalContentId);
    }
    // If we found the doc by the global content ID, but the URL path isn't the
    // correct one, redirect to the proper URL path.
    const urlPath = doc?.pathSegments
      .map((_: PathSegment) => _.pathName)
      .join('/');
    console.log('urlPath', urlPath);
    if (doc && urlPath !== pagePath) {
      return { redirect: { destination: doc.url_path, permanent: true } };
    }
    // If there is no global content ID, or if we couldn't find the doc by the
    // global content ID, try finding the doc by the page path.
    if (!globalContentId || !doc) {
      doc = allDocs.find((_) => {
        const segments = _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .replace(new RegExp(`\-${_.global_id}$`, 'g'), ''); // Remove global content ID from url
        return segments === pagePath;
      });
      // If doc exists, but global content ID is missing in url, redirect to url
      // with global content ID
      if (doc) {
        return { redirect: { destination: doc.url_path, permanent: true } };
      }
      // Otherwise, throw a 404 error.
      return { notFound: true };
    }
    project = { doc, ...getSupportingProps(doc, params) };
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.doc.body.code} />
      </article>
    </div>
  );
}
