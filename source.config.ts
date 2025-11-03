import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
// Main docs configuration
// Note: This points to the root docs directory containing index.mdx
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const apiDocs = defineDocs({
  dir: 'content/docs/api',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    }
  },
  meta: {
    schema: metaSchema,
  }
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
