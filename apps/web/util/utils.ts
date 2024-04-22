import * as fs from 'node:fs/promises';
import path from 'node:path';
import type { DocumentGen } from 'contentlayer/core';
import { simpleGit, SimpleGit } from 'simple-git';

export const contentDirPath = 'content';

export const urlFromFilePath = (doc: DocumentGen): string => {
  let urlPath = doc._raw.flattenedPath.replace(/^pages\/?/, '/');
  if (!urlPath.startsWith('/')) urlPath = `/${urlPath}`;
  if ('global_id' in doc) urlPath += `-${doc.global_id}`;

  // Remove preceding indexes from path segments
  urlPath = urlPath
    .split('/')
    .map((segment) => segment.replace(/^\d\d\d\-/, ''))
    .join('/');

  return urlPath.toLowerCase();
};

export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
  const sourceFilePath = path.join(contentDirPath, doc._raw.sourceFilePath);
  try {
    const git: SimpleGit = simpleGit();
    const lastCommit = await git.log({ file: sourceFilePath });

    if (lastCommit.latest === null || lastCommit.latest.date === null) {
      throw new Error('No commit found');
    }

    return new Date(lastCommit.latest.date);
  } catch (error) {
    console.error(error);
  }
  const stats = await fs.stat(path.join(sourceFilePath));
  return stats.mtime;
};
