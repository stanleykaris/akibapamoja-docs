# akibapamoja-docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline using GitHub Actions that:

### Quality Checks
- **ESLint**: Code linting and style checking
- **TypeScript**: Type checking with `tsc --noEmit`
- **Build**: Production build validation

### API Documentation
- **Generate Docs**: Creates API documentation from OpenAPI spec
- **Update Docs**: Fetches latest API spec from live backend and regenerates docs

### Deployment (Production Only)
- **Vercel**: Automatic deployment to production on main branch pushes

### Setup Requirements

1. **Enable GitHub Actions**: Go to your repository Settings > Actions > General and enable "Allow all actions and reusable workflows"

2. **Vercel Deployment Secrets** (for production deployment):
   ```
   VERCEL_TOKEN      # Your Vercel token
   VERCEL_ORG_ID     # Your Vercel organization ID
   VERCEL_PROJECT_ID # Your Vercel project ID
   ```

   Get these from your Vercel dashboard under Settings > Tokens

3. **Environment Variables** (for API documentation):
   ```
   NEXT_PUBLIC_OPENAPI_URL  # URL for OpenAPI spec (default: '/api/openapi.json')
   OPENAPI_SOURCE_URL       # Source URL for fetching OpenAPI spec (default: production backend)
   ```

   - `NEXT_PUBLIC_OPENAPI_URL`: Used by the frontend to load the OpenAPI specification
   - `OPENAPI_SOURCE_URL`: Used by build scripts to fetch the latest OpenAPI spec from backend

3. **Branch Protection** (recommended):
   - Enable branch protection on `main` branch
   - Require status checks to pass before merging
   - Require up-to-date branches before merging

### Workflow Triggers

- **Push to main/develop**: Runs full pipeline including deployment
- **Pull Request to main/develop**: Runs quality checks and API docs validation
- **Manual trigger**: Can be triggered manually from GitHub Actions tab

### Pipeline Jobs

1. **quality-checks**: Validates code quality, types, and build
2. **api-docs**: Generates and validates API documentation
3. **deploy**: Deploys to production (main branch only)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run generate-docs` - Generate API docs from OpenAPI spec
- `npm run update-docs` - Update API docs from live backend

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.
- `scripts/generate-docs.ts` & `scripts/update-docs.ts`: API documentation generation scripts

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs
