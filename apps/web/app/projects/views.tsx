import { Redis } from "@upstash/redis";

type Props = {
  slug: string;
};

const redis = Redis.fromEnv();

export const Views: React.FC<Props> = async ({ slug: projectName }) => {
  const views = (await redis.get<number>(
    ["pageviews", "projects", projectName].join(":"),
  )) as number;

  return (
    <>{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}</>
  );
};

export const ViewLoader: React.FC = () => {
  return <div className="loader"></div>;
};
