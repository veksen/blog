import * as mdxBundler from "mdx-bundler";
// import { remarkMdxImages } from "remark-mdx-images";
import { join, resolve } from "path";

type IBundleMdx = {
  cwd: string;
  file: string;
};

// `resolve` won't work in a non `.server.ts` file
export const getContentPath = (slug: string) => resolve("app/content", slug);

export const getFilePath = (contentPath: string, filename: string) =>
  resolve(contentPath, filename);

export const bundleMDX = async ({ cwd, file }: IBundleMdx) => {
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: remarkBreaks } = await import("remark-breaks");
  const { default: remarkFootnotes } = await import("remark-footnotes");
  const { default: rehypeSlug } = await import("rehype-slug");
  const { default: linkHeadings } = await import("rehype-autolink-headings");

  return mdxBundler.bundleMDX({
    cwd,
    file,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // remarkMdxImages,
        remarkGfm,
        remarkBreaks,
        [remarkFootnotes, { inlineNotes: true }],
      ];

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        linkHeadings,
      ];

      return options;
    },
    esbuildOptions: (options) => {
      // Set the `outdir` to a public location for this bundle.
      options.outdir = resolve("public/build/_assets");
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
      };
      // Set the public path to /img/about
      options.publicPath = join("/build/_assets");

      // Set write to true so that esbuild will output the files.
      options.write = true;

      return options;
    },
  });
};
