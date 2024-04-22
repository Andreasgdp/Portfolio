import { allProjects } from 'contentlayer/generated';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { Card } from '../components/card';
import { Container } from '../components/common/Container';
import { Article } from './article';
import { ViewLoader, Views } from './views';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const featured = allProjects.find(
    (project) => project.slug === 'momentmeal'
  )!;
  const top2 = allProjects.find(
    (project) => project.slug === 'inverted-pendulum'
  )!;
  const top3 = allProjects.find((project) => project.slug === 'wishing-plan')!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <Container
      title={'Projects'}
      description={
        'Some of the projects are from work and some are on my own time.'
      }
    >
      <div className="relative pb-16">
        {/* <Navigation /> */}
        <div className="mx-auto max-w-7xl space-y-8 px-6 pt-20 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">
              Some of the projects are from work and some are on my own time.
            </p>
          </div>
          <div className="h-px w-full bg-zinc-800" />

          <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 ">
            <Card imageUrl={featured.imageUrl ?? ''}>
              <Link href={`/projects/${featured.slug}`}>
                <article className="relative h-full w-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
                      {featured.date ? (
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: 'medium',
                          }).format(new Date(featured.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="h-4 w-4" />
                      <Suspense fallback={<ViewLoader></ViewLoader>}>
                        <Views slug={featured.slug} />
                      </Suspense>
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="font-display mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-8 text-zinc-400 duration-150 group-hover:text-zinc-300">
                    {featured.description}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>

            <div className="mx-auto flex w-full flex-col gap-8 border-t border-zinc-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].map((project) => (
                <Card imageUrl={project.imageUrl ?? ''} key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden h-px w-full bg-zinc-800 md:block" />

          <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:mx-0">
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 0)
                .map((project) => (
                  <Card imageUrl={project.imageUrl ?? ''} key={project.slug}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 1)
                .map((project) => (
                  <Card imageUrl={project.imageUrl ?? ''} key={project.slug}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 2)
                .map((project) => (
                  <Card imageUrl={project.imageUrl ?? ''} key={project.slug}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
