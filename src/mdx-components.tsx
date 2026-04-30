import defaultMdxComponents from 'fumadocs-ui/mdx';
import { resolve } from 'node:path';
import { createAPIPage } from 'fumadocs-openapi/ui';
import { openapi } from './lib/openapi';

const APIPage = createAPIPage(openapi);
const specPath = resolve(process.cwd(), 'public/api/openapi.json');

export function getMDXComponents(): Record<string, React.ComponentType<any>> {
  return {
    ...defaultMdxComponents,
    APIPage: (props: Record<string, unknown>) => {
      const { document: _doc, ...rest } = props;
      return <APIPage document={specPath} {...rest} />;
    },
  };
}
