import type { DocumentGen } from "contentlayer/core";
import path from "node:path";
import { simpleGit, SimpleGit, CleanOptions } from "simple-git";

export const contentDirPath = "content";

export const urlFromFilePath = (doc: DocumentGen): string => {
  let urlPath = doc._raw.flattenedPath.replace(/^pages\/?/, "/");
  if (!urlPath.startsWith("/")) urlPath = `/${urlPath}`;
  if ("global_id" in doc) urlPath += `-${doc.global_id}`;

  // Remove preceding indexes from path segments
  urlPath = urlPath
    .split("/")
    .map((segment) => segment.replace(/^\d\d\d\-/, ""))
    .join("/");

  return urlPath.toLowerCase();
};

export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
  const sourceFilePath = path.join(contentDirPath, doc._raw.sourceFilePath);
  const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);
  const lastCommit = await git.log({ file: sourceFilePath });

  if (lastCommit.latest === null) {
    return new Date();
  }

  return new Date(lastCommit.latest.date);
};
