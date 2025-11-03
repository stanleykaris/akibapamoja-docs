export async function GET() {
  return new Response('LLM text generation temporarily disabled', { status: 503 });
}
