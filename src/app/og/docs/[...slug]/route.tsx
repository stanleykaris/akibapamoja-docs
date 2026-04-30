import type { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<ImageResponse> {
  const { slug } = await params;
  const title = slug.at(-1)?.replaceAll('-', ' ').replaceAll(/\b\w/g, (c) => c.toUpperCase()) ?? 'AkibaPamoja Docs';

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4B189B"/>
          <stop offset="100%" stop-color="#1a0a30"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="60" y="280" font-family="system-ui" font-size="56" font-weight="700" fill="white">${escapeXml(title)}</text>
      <text x="60" y="360" font-family="system-ui" font-size="32" fill="rgba(255,255,255,0.7)">AkibaPamoja Developer Documentation</text>
      <text x="60" y="540" font-family="system-ui" font-size="24" fill="rgba(255,255,255,0.5)">akibapamoja-backend.onrender.com</text>
    </svg>`,
    {
      headers: { 'Content-Type': 'image/svg+xml' },
    }
  );
}

function escapeXml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;');
}
