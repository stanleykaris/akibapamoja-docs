export async function GET() {
  return new Response('Search temporarily disabled', { status: 503 });
}
