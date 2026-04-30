import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createAPIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/openapi';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

interface PageData {
  title?: string;
  description?: string;
  full?: boolean;
  toc?: Array<{ title: string; url: string; depth: number }>;
  body?: React.ComponentType<{ components?: Record<string, React.ComponentType<{}>> }>;
  _openapi?: { method?: string; webhook?: boolean };
  getAPIPageProps?: () => { document: string; operations?: Array<{ path: string; method: string }> };
}

const APIPage = createAPIPage(openapi);

export default async function Page(props: Readonly<PageProps>) {
  const { slug } = await props.params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const data = page.data as PageData;
  const toc = data.toc ?? [];

  // Handle OpenAPI virtual pages
  if (data._openapi && data.getAPIPageProps) {
    const apiProps = data.getAPIPageProps();
    return (
      <DocsPage toc={toc} full={data.full}>
        <DocsTitle>{data.title}</DocsTitle>
        {data.description && (
          <DocsDescription>{data.description}</DocsDescription>
        )}
        <DocsBody>
          <APIPage {...(apiProps as any)} />
        </DocsBody>
      </DocsPage>
    );
  }

  const MDX = data.body;
  if (!MDX) {
    notFound();
  }

  return (
    <DocsPage toc={toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      {data.description && (
        <DocsDescription>{data.description}</DocsDescription>
      )}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug);

  if (!page) {
    return {};
  }

  const data = page.data as PageData;
  return {
    title: data.title,
    description: data.description,
  };
}
