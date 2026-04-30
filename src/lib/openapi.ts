import { resolve } from 'node:path';
import { createOpenAPI } from 'fumadocs-openapi/server';

const specPath = resolve(process.cwd(), 'public/api/openapi.json');

export const openapi = createOpenAPI({
  input: [specPath],
});
