import { docs } from '../../.source/server';
import { loader } from 'fumadocs-core/source';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';
import { openapi } from './openapi';

const openapiFiles = await openapiSource(openapi, {
  baseDir: 'api',
});

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    api: openapiFiles,
  },
  {
    baseUrl: '/docs',
    plugins: [
      openapiPlugin(),
    ],
  }
);
