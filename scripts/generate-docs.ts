import { openapi } from '../src/lib/openapi';
import {generateFiles} from 'fumadocs-openapi';

async function generateDocs() {
    try {
        await generateFiles({
            input: openapi,
            output: './content/docs/api',
            includeDescription: true,
        });
        console.log('API docs generated successfully');
    } catch (error) {
        console.error('Error generating API docs:', error);
        process.exit(1);
    }
}

generateDocs().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});