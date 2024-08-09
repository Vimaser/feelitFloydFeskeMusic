import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPageMetadata(slug) {
  const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  return data;
}
