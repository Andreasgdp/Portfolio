import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Suspense } from "react";
import { ViewLoader, Views } from "./views";
import Image from "next/image";

type Props = {
  project: Project;
};

// component to show image if type is image, and show video if type is video of the param given to the component
const ImageOrVideo: React.FC<{ url: string }> = ({ url }) => {
  if (url.includes("mp4")) {
    return (
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ filter: "brightness(20%)" }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <Image
      src={url}
      alt="Project Image"
      layout="fill"
      objectFit="cover"
      style={{ filter: "brightness(20%)" }}
    />
  );
};

export const Article: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="relative p-4 md:p-8">
        <div className="absolute inset-0">
          <ImageOrVideo url={project.imageUrl ?? ""} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between gap-2 items-center">
            <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
              {project.date ? (
                <time dateTime={new Date(project.date).toISOString()}>
                  {Intl.DateTimeFormat(undefined, {
                    dateStyle: "medium",
                  }).format(new Date(project.date))}
                </time>
              ) : (
                <span>SOON</span>
              )}
            </span>
            <span className="text-zinc-500 text-xs  flex items-center gap-1">
              <Eye className="w-4 h-4" />{" "}
              <Suspense fallback={<ViewLoader></ViewLoader>}>
                <Views slug={project.slug} />
              </Suspense>
            </span>
          </div>
          <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
            {project.title}
          </h2>
          <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
            {project.description}
          </p>
        </div>
      </article>
    </Link>
  );
};
