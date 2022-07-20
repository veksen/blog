import { readdir, readFile } from "fs/promises";
import { join, resolve } from "path";
// import { default as matter } from "gray-matter";
import { getMDXExport } from "mdx-bundler/client";
import { bundleMDX } from "~/utils/compile-mdx.server";
// import type { TocEntry } from "@stefanprobst/rehype-extract-toc";
// import { rootUrl, author } from "/config";
const isProd = process.env.NODE_ENV === "production";

export type Frontmatter = {
  status: string;
  slug: string;
  hydrate?: boolean;
  title: string;
  description: string;
  canonical: string;
  cover: string;
  author: string;
  version: number;
  created: Date;
  published: Date;
  updated: Date;
  meta: { name: string; content: string }[];
  published_at: string;
  mdx: string;
  // text: string; // todo: add text version to Frontmatter
  excerpt?: string;
  // tableOfContents?: Array<TocEntry>;
};

export async function stripHtml(htmlString: string) {
  const [unified, rehypeParse, hastToString] = await Promise.all([
    // as seen in https://www.drk.wtf/g/digital-garden-with-obsidian-and-remix
    import("unified").then((mod) => mod.unified),
    import("rehype-parse").then((mod) => mod.default),
    import("hast-util-to-string").then((mod) => mod.toString),
  ]);
  const result = unified().use(rehypeParse).parse(htmlString);

  return hastToString(result);
}

export const getPostsList = async () => {
  const contentDir = resolve("app/content");
  const postDirs = await readdir(contentDir);
  const posts: Array<Frontmatter> = [];

  for (const postDir of postDirs) {
    const contentPath = join(contentDir, postDir);
    const slug = `/${contentPath}`;

    const source = await readFile(contentPath, { encoding: "utf-8" }).catch(
      () => {
        console.error(`Missing .mdx for "${slug}"`);
      }
    );

    if (!source) continue;
    // const { content, data, excerpt } = matter(source, { excerpt: true });
    // console.log(content);
    // posts.push({ ...data, excerpt } as Frontmatter);
    const mdx = await bundleMDX({
      cwd: contentPath,
      file: contentPath,
    }).catch((e) => console.error(e, `\n\nError bundleMDX for "${slug}"`));
    if (!mdx) {
      console.error(`Couldn't bundleMDX for "${slug}"`);
      continue;
    }
    const fm = mdx.frontmatter as Frontmatter;
    // const isPublished = fm.status === "published";
    // if (isProd && !isPublished) {
    //   continue;
    // } else if (!isPublished) {
    //   fm.title = `${fm.status.toUpperCase()}: ${fm.title}`;
    // }
    const { cover /*tableOfContents*/ } = getMDXExport(mdx.code);
    const canonical = `root/${fm?.slug}`;
    posts.push({
      ...fm,
      canonical,
      cover,
      // tableOfContents,
      // author,
      mdx: mdx.code,
    });
  }

  return posts.sort((a, z) => {
    const aTime = new Date(
      a.updated ?? a.published ?? a.created ?? null
    ).getTime();
    const zTime = new Date(
      z.updated ?? z.published ?? z.created ?? null
    ).getTime();
    return aTime > zTime ? -1 : aTime === zTime ? 0 : 1;
  });
};
