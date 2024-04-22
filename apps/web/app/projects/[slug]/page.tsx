import { Mdx } from '@/app/components/mdx';
import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Header } from './header';
import './mdx.css';
import { Container } from '@/app/components/common/Container';
import { Redis } from '@upstash/redis';
import { ReportView } from './view';

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(['pageviews', 'projects', slug].join(':'))) ?? 0;

  return (
    <Container
      showGradient={false}
      title={project.title + ' – Projects'}
      description={project.description}
    >
      <div className="min-h-screen">
        <Header project={project} views={views} />
        <ReportView slug={project.slug} />

        <article className="prose-quoteless prose prose-slate prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-zinc-200 dark:prose-invert dark:prose-a:text-zinc-400 dark:prose-hr:border-zinc-800 mx-auto mb-4 shrink p-4 px-4 py-12 pb-8 md:mb-8 md:px-8">
          <Mdx code={project.body.code} />
        </article>
      </div>
    </Container>
  );
}
