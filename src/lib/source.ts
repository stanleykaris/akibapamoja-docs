import { docs } from '@/.source';
import { type InferPageType, loader } from 'fumadocs-core/source';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [],
});

// Add error handling for getPages
const originalGetPages = source.getPages;
source.getPages = () => {
  try {
    const pages = originalGetPages();
    return Array.isArray(pages) ? pages : [];
  } catch (error) {
    console.error('Error getting pages:', error);
    return [];
  }
};

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
