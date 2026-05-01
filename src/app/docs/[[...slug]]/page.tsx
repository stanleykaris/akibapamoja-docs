import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] dark:bg-zinc-950 dark:text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
        <p className="text-lg mb-8">
          The documentation system is currently being updated. Please check back later.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Available Pages</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><Link href="/docs" className="text-blue-600 hover:underline">Documentation Index</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

