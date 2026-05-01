import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

const DEFAULT_LIMIT = 100;
const WINDOW_MS = 15 * 60 * 1000;

function getIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: DEFAULT_LIMIT - 1, resetTime: now + WINDOW_MS };
  }

  record.count += 1;

  if (record.count > DEFAULT_LIMIT) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  return { allowed: true, remaining: DEFAULT_LIMIT - record.count, resetTime: record.resetTime };
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimit.entries()) {
    if (now > record.resetTime) {
      rateLimit.delete(ip);
    }
  }
}, WINDOW_MS * 2);

export function proxy(request: NextRequest) {
  const ip = getIp(request);
  const { allowed, remaining, resetTime } = checkRateLimit(ip);

  const response = NextResponse.next();

  response.headers.set('X-RateLimit-Limit', String(DEFAULT_LIMIT));
  response.headers.set('X-RateLimit-Remaining', String(remaining));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetTime / 1000)));

  if (!allowed) {
    return new NextResponse(
      JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded. Try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
        },
      }
    );
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
