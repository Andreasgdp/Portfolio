import { Redis } from "@upstash/redis";

type Props = {
  slug: string;
};

const redis = Redis.fromEnv();

export const Views: React.FC<Props> = async ({ slug: projectName }) => {
  const views = (await redis.get<number>(
    ["pageviews", "projects", projectName].join(":"),
  )) as number;

  // const views = 1000000;
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}</>
  );
};
