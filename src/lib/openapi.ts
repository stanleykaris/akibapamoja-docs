import { createOpenAPI } from 'fumadocs-openapi/server';

const OPENAPI_URL = 'https://akibapamoja-backend.onrender.com/?format=openapi';

async function verifyOpenApiSource(url: string): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json, */*;q=0.8' },
      signal: controller.signal,
      cache: 'no-store',
    } as RequestInit);

    if (!res.ok) {
      console.warn(`[openapi] Source check failed: ${res.status} ${res.statusText}`);
      return;
    }

    const text = await res.text();
    if (!text || text.trim().length === 0) {
      console.warn('[openapi] Source check: response body is empty.');
      return;
    }

    try {
      const json = JSON.parse(text);
      if (
        (Array.isArray(json) && json.length === 0) ||
        (typeof json === 'object' && json !== null && Object.keys(json).length === 0)
      ) {
        console.warn('[openapi] Source check: JSON parsed but appears empty.');
      }
    } catch {
      // Non-JSON is acceptable; we only care that something was returned.
    }
  } catch (err) {
    const reason = (err as Error)?.message ?? String(err);
    console.warn(`[openapi] Source check error: ${reason}`);
  } finally {
    clearTimeout(timeout);
  }
}

// Kick off verification in the background; does not block initialization.
void verifyOpenApiSource(OPENAPI_URL);

export const openapi = createOpenAPI({
    input: [OPENAPI_URL],
    
});