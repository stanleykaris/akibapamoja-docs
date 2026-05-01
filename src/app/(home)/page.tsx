'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Users, HandCoins, BookOpen, Code2, ArrowRight, Clipboard, Check } from 'lucide-react';

export default function HomePage() {
  const endpoints = [
    {
      icon: <User className="w-6 h-6 text-white" aria-hidden="true" />,
      title: 'Users',
      description: 'Authenticate and manage user profiles securely.',
      route: '/docs/users',
      method: 'POST',
      path: '/auth/login',
    },
    {
      icon: <Users className="w-6 h-6 text-white" aria-hidden="true" />,
      title: 'Groups',
      description: 'Create and manage chama groups and memberships.',
      route: '/docs/groups',
      method: 'GET',
      path: '/groups/',
    },
    {
      icon: <HandCoins className="w-6 h-6 text-white" aria-hidden="true" />,
      title: 'Contributions',
      description: 'Track and record member contributions with ease.',
      route: '/docs/contributions',
      method: 'POST',
      path: '/contributions/',
    },
  ];

  const curlExample = `curl -X POST "https://akibapamoja-backend.onrender.com/contributions/" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "amount": 1000,
    "member": 123,
    "group": 456,
    "date": "2025-10-03"
  }'`;

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(curlExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <main id="main" className="min-h-screen bg-white text-[#0f172a] dark:bg-zinc-950 dark:text-white">
        {/* Hero */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4B189B] bg-[#4B189B]/10 px-3 py-1 text-xs font-medium text-[#4B189B] dark:bg-[#4B189B]/15 dark:text-white/90">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Developer Platform
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a] dark:text-white">
              Build with confidence using <span className="block bg-gradient-to-r from-[#4B189B] to-[#BFA4FF] dark:from-white dark:to-[#BFA4FF] bg-clip-text text-transparent">
                AkibaPamoja APIs
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-700 dark:text-white/80">
              A clear, stable, and secure API for managing users, groups, and member contributions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md bg-[#4B189B] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(75,24,155,0.7)] hover:bg-[#3d147f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4B189B] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0718] transition-colors"
              >
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="https://akibapamoja-backend.onrender.com/?format=openapi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-sm text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white"
                aria-label="View OpenAPI spec"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                View OpenAPI
              </a>
            </div>
          </div>
        </section>

        {/* Quickstart */}
        <section id="quickstart" className="mx-auto max-w-7xl px-4 md:px-8 pb-8">
          <div className="rounded-xl border border-[#4B189B] bg-slate-50 shadow-sm dark:bg-black/50 dark:shadow-[0_0_50px_-10px_rgba(75,24,155,0.6)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
              </div>
              <span className="font-source-code-pro text-xs sm:text-sm text-slate-700 dark:text-white/80">
                Quickstart: Create a Contribution
              </span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4B189B] focus-visible:ring-offset-slate-50 dark:border-white/20 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15 dark:focus-visible:ring-offset-black"
                aria-label={copied ? 'Copied' : 'Copy code to clipboard'}
                title={copied ? 'Copied' : 'Copy'}
              >
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 sm:p-6 text-left">
              <div className="rounded-lg bg-slate-900 p-4 text-slate-100 overflow-x-auto">
                <pre className="font-azeret-mono text-[12px] sm:text-[14px] leading-6">
                  <code>
                    <span className="text-[#BFA4FF]">curl</span>
                    <span> </span>
                    <span className="text-[#BFA4FF]">-X POST</span>
                    <span> &#34;https://akibapamoja-backend.onrender.com/contributions/&#34; </span>
                    <span className="text-[#BFA4FF]">\</span>
                    <br />
                    <span className="text-[#BFA4FF]">-H</span>
                    <span> &#34;Content-Type: application/json&#34;</span>
                    <br />
                    <span className="text-[#BFA4FF]">-H</span>
                    <span> &#34;Authorization: Bearer YOUR_API_KEY&#34;</span>
                    <br />
                    <span className="text-[#BFA4FF]">-d</span>
                    <span> &#39;{'{'}</span>
                    <br />
                    <span>  &#34;amount&#34;: 1000,</span>
                    <br />
                    <span>  &#34;member&#34;: 123,</span>
                    <br />
                    <span>  &#34;group&#34;: 456,</span>
                    <br />
                    <span>  &#34;date&#34;: &#34;2025-10-03&#34;</span>
                    <br />
                    <span>{'}'}&#39;</span>
                    <br />
                    <br />
                    <span className="text-slate-400"># Response</span>
                    <br />
                    <span>{'{'}</span>
                    <br />
                    <span>  &#34;id&#34;: 987,</span>
                    <br />
                    <span>  &#34;amount&#34;: 1000,</span>
                    <br />
                    <span>  &#34;member&#34;: 123,</span>
                    <br />
                    <span>  &#34;group&#34;: 456,</span>
                    <br />
                    <span>  &#34;date&#34;: &#34;2025-10-03&#34;,</span>
                    <br />
                    <span>  &#34;created_at&#34;: &#34;2025-10-03T12:34:56Z&#34;</span>
                    <br />
                    <span>{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoint overview */}
        <section id="endpoints" className="mx-auto max-w-7xl px-4 md:px-8 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] dark:text-white">
              Explore endpoints
            </h2>
            <Link
              href="/docs"
              className="text-sm text-[#4B189B] hover:text-[#3d147f] transition-colors dark:text-[#BFA4FF] dark:hover:text-white"
            >
              View full documentation →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {endpoints.map((ep) => (
              <Link
                key={ep.title}
                href={ep.route}
                className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-[#4B189B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B189B] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all dark:border-white/10 dark:bg-white/[0.03] dark:focus-visible:ring-offset-[#0b0718] dark:hover:shadow-[0_10px_30px_-10px_rgba(75,24,155,0.5)]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#4B189B] p-2 shadow-[0_0_24px_rgba(75,24,155,0.45)]">
                    {ep.icon}
                  </div>
                  <div>
                    <div className="text-sm inline-flex items-center gap-2">
                      <span className="rounded-sm border border-[#4B189B]/50 bg-[#4B189B]/20 px-1.5 py-0.5 text-[11px] tracking-wide text-slate-800 dark:text-white">
                        {ep.method}
                      </span>
                      <span className="text-slate-600 dark:text-white/70">{ep.path}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-[#0f172a] dark:text-white">{ep.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-white/70">{ep.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 text-sm text-slate-500 dark:text-white/60">
            © {new Date().getFullYear()} AkibaPamoja. Built for developers.
          </div>
        </footer>
      </main>
  );
}
