import { notFound } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { Doc, allDocs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import "./mdx.css";
import { Redis } from "@upstash/redis";
import { buildDocsTree } from "@/util/build-docs-tree";
import { DocsNavigation } from "@/app/components/docs/DocsNavigation";
import { DocsHeader } from "@/app/components/docs/DocsHeader";
import { DocsFooter } from "@/app/components/docs/DocsFooter";
import { DocsChildCard } from "@/app/components/docs/DocsChildCard";
import { Container } from "@/app/components/common/Container";

export const revalidate = 60;

type Props = {
  params: {
    slug: string[];
  };
};

const redis = Redis.fromEnv();

function getSupportingProps(doc: Doc, params: any) {
  let slugs = params.slug ? ["docs", ...params.slug] : [];
  let path = "";
  let breadcrumbs: any = [];
  for (const slug of slugs) {
    path += `/${slug}`;
    const breadcrumbDoc = allDocs.find(
      (_) => _.url_path === path || _.url_path_without_id === path,
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
    doc.pathSegments.map((_: PathSegment) => _.pathName),
  );
  return { tree, breadcrumbs, childrenTree };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  // this is taking the path to the document (the url is based on the path within content/docs)
  // and splitting it into an array of strings (the slug) e.g. /docs/getting-started -> ['docs', 'getting-started']
  const params = allDocs.map((doc) => ({
    slug: doc?.url_path.replace(/^\//, "").split("/"),
  }));

  return params;
}

export default async function PostPage({ params }: Props) {
  const pagePath = params.slug?.join("/") ?? "";
  let doc;
  let project;
  // If on the index page, we don't worry about the global_id
  if (pagePath === "") {
    doc = allDocs.find((_) => _.url_path === "/docs");
    if (!doc) notFound();
    project = { doc, ...getSupportingProps(doc, params) };
  } else if (pagePath !== undefined) {
    // Identify the global content ID as the last part of the page path following
    // the last slash. It should be an 8-digit number.
    const globalContentId = pagePath
      .split("/")
      .filter(Boolean)
      .pop()
      ?.split("-")
      .pop();

    // If there is a global content ID, find the corresponding document.
    if (globalContentId && globalContentId.length === 8) {
      doc = allDocs.find((_) => _.global_id === globalContentId);
    }
    // If we found the doc by the global content ID, but the URL path isn't the
    // correct one, redirect to the proper URL path.
    const urlPath = doc?.pathSegments
      .map((_: PathSegment) => _.pathName)
      .join("/");
    if (doc && urlPath !== pagePath) {
      permanentRedirect(doc.url_path);
    }
    // If there is no global content ID, or if we couldn't find the doc by the
    // global content ID, try finding the doc by the page path.
    if (!globalContentId || !doc) {
      doc = allDocs.find((_) => {
        const segments = _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join("/")
          .replace(new RegExp(`\-${_.global_id}$`, "g"), ""); // Remove global content ID from url
        return segments === pagePath;
      });
      // If doc exists, but global content ID is missing in url, redirect to url
      // with global content ID
      if (doc) {
        if (doc && urlPath !== pagePath) {
          permanentRedirect(doc.url_path);
        }
      }
      // Otherwise, throw a 404 error.
      notFound();
    }
    project = { doc, ...getSupportingProps(doc, params) };
  }

  if (!project) {
    notFound();
  }

  return (
    <Container
      title={project.doc.title + " – Docs"}
      description={project.doc.excerpt}
    >
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <div
          style={{ height: "calc(100vh - 64px)" }}
          className="sticky top-16 hidden shrink-0 border-r border-zinc-200 dark:border-zinc-800 lg:block"
        >
          <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
            <DocsNavigation tree={project.tree} />
          </div>
        </div>
        <div className="relative w-full grow">
          <DocsHeader
            tree={project.tree}
            breadcrumbs={project.breadcrumbs}
            title={project.doc.title}
            globalId={project.doc.global_id}
          />
          <div className="docs prose prose-slate mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-zinc-200 dark:prose-invert dark:prose-a:text-zinc-400 dark:prose-hr:border-zinc-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
            <Mdx code={project.doc.body.code} />
            {project.doc.show_child_cards && (
              <>
                <hr />
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {project.childrenTree.map((card: any, index: number) => (
                    <DocsChildCard key={index} card={card} />
                  ))}
                </div>
              </>
            )}
            <DocsFooter doc={project.doc} />
          </div>
          {/* <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.doc.body.code} />
      </article> */}
        </div>
      </div>
    </Container>
  );
}
