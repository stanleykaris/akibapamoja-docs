import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from './lib/openapi';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    APIPage: (props) => {
      // Use environment variable for OpenAPI URL, fallback to remote backend
      const documentUrl = process.env.NEXT_PUBLIC_OPENAPI_URL || 'https://akibapamoja-backend.onrender.com/?format=openapi';
      return <APIPage {...openapi.getAPIPageProps({...props, document: documentUrl})}/>;
    },
    ...components,
  };
}
