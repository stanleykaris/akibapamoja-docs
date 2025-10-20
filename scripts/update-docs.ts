import { writeFileSync } from "node:fs";
import { generateFiles} from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";
import path from "node:path";

const OPENAPI_URL = process.env.OPENAPI_SOURCE_URL || "https://akibapamoja-backend.onrender.com/?format=openapi";

async function updateDocs() {
    try {
        console.log("Fetching latest OpenAPI spec...");

        // Fetch OpenAPI JSON from backend
        const response = await fetch(OPENAPI_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`)
        }

        const openapiJson = await response.json();

        // Save the JSON to a file for reference
        const localPath = path.join(process.cwd(), 'openapi.json');
        writeFileSync(localPath, JSON.stringify(openapiJson, null, 2));
        console.log('OpenAPI spec saved to openapi.json');

        // Create OpenAPI instance with fresh data
        const openapi = createOpenAPI({
            input: [openapiJson],
        });

        // Generate documentation files
        await generateFiles({
            input: openapi,
            output: './content/docs/api',
            includeDescription: true,
        });

        console.log('API documentation generated successfully');
    } catch (error) {
        console.error('Error updating documentation:', error);
        process.exit(1);
    }
}

updateDocs();