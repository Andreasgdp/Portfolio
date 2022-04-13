import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { serialize } from 'next-mdx-remote/serialize';

const worksDirectory = path.join(process.cwd(), 'works');

export function getAllWorkIds() {
  const filenames = fs.readdirSync(worksDirectory);
  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, '')
      }
    };
  });
}

export async function getWorkData(id: string) {
  const fullPath = path.join(worksDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContent);

  // const processContent = await remark().use(html).process(matterResult.content);
  // const contentHtml = processContent.toString();

  const contentHtml = await serialize(matterResult.content);

  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}

export function getWorksData() {
  const filenames = fs.readdirSync(worksDirectory);
  const allWorksData = filenames.map((filename) => {
    const id = filename.replace(/\.md$/, '');

    const fullPath = path.join(worksDirectory, filename);
    const fileContent = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContent);

    return {
      id,
      ...matterResult.data
    };
  });

  return allWorksData;
}
