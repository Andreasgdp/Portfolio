import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Card } from "../components/card";
import { Container } from "../components/common/Container";

export default function ProjectsPage() {
  const featured = allProjects.find(
    (project) => project.slug === "momentmeal",
  )!;
  const top2 = allProjects.find(
    (project) => project.slug === "inverted-pendulum",
  )!;
  const top3 = allProjects.find((project) => project.slug === "wishing-plan")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <Container
      title={"Projects"}
      description={
        "Some of the projects are from work and some are on my own time."
      }
    >
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Projects</h1>
        <p className="mt-2 text-lg text-gray-600">
          Some of the projects are from work and some are on my own time.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured Project */}
          <Card>
            <Link
              href={`/projects/${featured.slug}`}
              className="block relative"
            >
              {/* Date */}
              <div className="absolute inset-x-0 top-0 px-4 py-2 text-xs font-semibold bg-gray-800 text-gray-100">
                {featured.date ? (
                  <time dateTime={new Date(featured.date).toISOString()}>
                    {Intl.DateTimeFormat(undefined, {
                      dateStyle: "medium",
                    }).format(new Date(featured.date))}
                  </time>
                ) : (
                  <span>SOON</span>
                )}
              </div>
              {/* Title */}
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                {featured.title}
              </h2>
              {/* Description */}
              <p className="mt-2 text-gray-600">{featured.description}</p>
            </Link>
          </Card>
          {/* Top 2 and Top 3 Projects */}
          {[top2, top3].map((project) => (
            <Card key={project.slug}>
              <Link className="block" href={`/projects/${project.slug}`}>
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600">{project.description}</p>
              </Link>
            </Card>
          ))}
          {/* Other Projects */}
          {sorted.map((project) => (
            <Card key={project.slug}>
              <Link className="block" href={`/projects/${project.slug}`}>
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600">{project.description}</p>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
