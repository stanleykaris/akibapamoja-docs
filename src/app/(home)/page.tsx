'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Shield, Zap, BarChart3, ArrowRight, ChevronRight,
  Lock, Users, Banknote, Key, LogOut, UserPlus, UserCheck,
  FolderPlus, FolderOpen, UserCircle, ListChecks, PlusCircle,
  Eye, Pencil, Trash2, RotateCcw, Check, Clipboard, Globe,
  Terminal as TerminalIcon,
} from 'lucide-react';

// ─── Endpoint Data ───────────────────────────────────────────

const endpointCategories = [
  {
    title: 'Authentication',
    icon: Lock,
    endpoints: [
      { method: 'POST', path: '/users/auth/', label: 'Register', route: '/docs/api/users_auth_create' },
      { method: 'POST', path: '/users/auth/login/', label: 'Login', route: '/docs/api/users_auth_login' },
      { method: 'POST', path: '/users/auth/logout/', label: 'Logout', route: '/docs/api/users_auth_logout' },
      { method: 'POST', path: '/users/auth/obtain-pair/', label: 'Get Token Pair', route: '/docs/api/users_auth_obtain-pair_create' },
      { method: 'POST', path: '/users/auth/refresh/', label: 'Refresh Token', route: '/docs/api/users_auth_refresh_create' },
      { method: 'GET', path: '/users/me/', label: 'Profile', route: '/docs/api/users_me_list' },
    ],
  },
  {
    title: 'Groups (Chama)',
    icon: Users,
    endpoints: [
      { method: 'POST', path: '/groups/', label: 'Create Group', route: '/docs/api/groups_create' },
      { method: 'GET', path: '/groups/', label: 'List Groups', route: '/docs/api/groups_read' },
      { method: 'POST', path: '/groups/join/', label: 'Join Group', route: '/docs/api/groups_join_create' },
      { method: 'POST', path: '/groups/{id}/members/add/', label: 'Add Member', route: '/docs/api/groups_members_add_create' },
      { method: 'GET', path: '/groups/{id}/members/list/', label: 'List Members', route: '/docs/api/groups_members_list_list' },
    ],
  },
  {
    title: 'Contributions',
    icon: Banknote,
    endpoints: [
      { method: 'GET', path: '/contributions/', label: 'List All', route: '/docs/api/contributions_list' },
      { method: 'POST', path: '/contributions/', label: 'Create', route: '/docs/api/contributions_create' },
      { method: 'GET', path: '/contributions/{id}/', label: 'Read', route: '/docs/api/contributions_read' },
      { method: 'PATCH', path: '/contributions/{id}/', label: 'Partial Update', route: '/docs/api/contributions_partial_update' },
      { method: 'PUT', path: '/contributions/{id}/', label: 'Full Update', route: '/docs/api/contributions_update' },
      { method: 'DELETE', path: '/contributions/{id}/', label: 'Delete', route: '/docs/api/contributions_delete' },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PATCH: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  PUT: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const methodColorsLight: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  POST: 'bg-blue-100 text-blue-700 border-blue-200',
  PATCH: 'bg-amber-100 text-amber-700 border-amber-200',
  PUT: 'bg-orange-100 text-orange-700 border-orange-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
};

// ─── Typing Terminal ─────────────────────────────────────────

const terminalLines = [
  {
    command: 'curl -X POST "https://akibapamoja-backend.onrender.com/groups/" \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "Savanna Sacco", "type": "merry-go-round"}\'',
    response: JSON.stringify({
      id: 'grp_01JF8K2N...',
      name: 'Savanna Sacco',
      type: 'merry-go-round',
      members: 1,
      created_at: '2025-10-03T14:22:00Z',
    }, null, 2),
  },
];

function TypingTerminal() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'showing-response' | 'clearing' | 'waiting'>('waiting');
  const [showResponse, setShowResponse] = useState(false);
  const line = terminalLines[0];
  const fullText = line.command;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      timeout = setTimeout(() => setPhase('typing'), 800);
    } else if (phase === 'typing') {
      if (text.length < fullText.length) {
        const charDelay = Math.random() * 30 + 15;
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, charDelay);
      } else {
        setPhase('showing-response');
        timeout = setTimeout(() => setShowResponse(true), 300);
      }
    } else if (phase === 'showing-response') {
      timeout = setTimeout(() => {
        setPhase('clearing');
      }, 5000);
    } else if (phase === 'clearing') {
      timeout = setTimeout(() => {
        setText('');
        setShowResponse(false);
        setPhase('waiting');
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, fullText]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-[#4B189B]/20 blur-xl" />

      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d12] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/40 font-mono">terminal</span>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="p-5 min-h-[200px]">
          {/* Prompt */}
          <div className="font-mono text-sm leading-relaxed">
            <span className="text-[#4B189B] font-semibold">$ </span>
            <span className="text-white/90">
              {text.split('\n').map((l, i) => (
                <span key={`line-${i}-${l.slice(0, 15)}`}>
                  {i > 0 && <br />}
                  {l}
                </span>
              ))}
              {phase === 'typing' && <span className="terminal-cursor text-[#4B189B]">▊</span>}
            </span>
          </div>

          {/* Response */}
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 font-mono text-xs leading-relaxed"
            >
              <span className="text-white/30">{'// Response 201 Created'}</span>
              <pre className="mt-1 text-emerald-400 whitespace-pre-wrap">{line.response}</pre>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tabbed Code Block ───────────────────────────────────────

const codeTabs = [
  {
    label: 'cURL',
    icon: TerminalIcon,
    code: String.raw`curl -X POST "https://akibapamoja-backend.onrender.com/groups/" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Savanna Sacco",
    "type": "merry-go-round"
  }'`,
  },
  {
    label: 'Node.js',
    icon: Globe,
    code: String.raw`const res = await fetch(
  "https://akibapamoja-backend.onrender.com/groups/",
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Savanna Sacco",
      type: "merry-go-round",
    }),
  }
);

const group = await res.json();
console.log(group.id);`,
  },
  {
    label: 'Python',
    icon: Globe,
    code: `import requests

resp = requests.post(
    url="https://akibapamoja-backend.onrender.com/groups/",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "name": "Savanna Sacco",
        "type": "merry-go-round",
    },
)

group = resp.json()
print(group["id"])`,
  },
];

function TabbedCodeBlock() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeTabs[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -inset-1 rounded-2xl bg-[#4B189B]/10 blur-xl" />

      <div className="relative rounded-xl overflow-hidden border border-white/10 dark:border-white/10 bg-[#0d0d12] dark:bg-[#0d0d12] shadow-2xl">
        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-white/5 px-2 pt-2">
          <div className="flex gap-1">
            {codeTabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === i
                      ? 'bg-[#4B189B]/30 text-white'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Code */}
        <div className="p-5 font-mono text-sm leading-relaxed text-white/90 overflow-x-auto">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-pre"
          >
            {codeTabs[activeTab].code}
          </motion.pre>
        </div>

        {/* Response preview */}
        <div className="border-t border-white/5 px-5 py-3 bg-black/20">
          <span className="text-xs text-white/30 font-mono">{'// Response 201 Created'}</span>
          <pre className="mt-1 font-mono text-xs text-emerald-400 overflow-x-auto">{`{
  "id": "grp_01JF8K2N...",
  "name": "Savanna Sacco",
  "type": "merry-go-round",
  "members": 1,
  "created_at": "2025-10-03T14:22:00Z"
}`}</pre>
        </div>
      </div>
    </div>
  );
}

// ─── Animated Section Wrapper ─────────────────────────────────

function AnimatedSection({ children, className = '', delay = 0 }: Readonly<{ children: React.ReactNode; className?: string; delay?: number }>) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
      animate={inView || shouldReduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduce ? 0 : 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Endpoint Card ───────────────────────────────────────────

function EndpointCard({ method, path, label, route }: Readonly<{ method: string; path: string; label: string; route: string }>) {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const colors = isDark ? methodColors[method] : methodColorsLight[method];

  return (
    <Link
      href={route}
      className="group block p-3 rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-[#4B189B]/40 dark:hover:border-[#4B189B]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#4B189B]/5"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider border ${colors}`}>
          {method}
        </span>
        <span className="font-mono text-xs text-slate-600 dark:text-white/50 truncate">{path}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800 dark:text-white/80">{label}</span>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#4B189B] group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}

// ─── Main Page ───────────────────────────────────────────────

export default function HomePage() {
  return (
    <main id="main" className="min-h-screen">
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden noise-overlay">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50/50 dark:from-[#0a0515] dark:via-[#0f0a1f] dark:to-[#1a0a30]" />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#4B189B]/5 dark:bg-[#4B189B]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-400/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-[#BFA4FF]/5 dark:bg-[#BFA4FF]/5 rounded-full blur-2xl animate-float" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
          {/* Status badge */}
          <AnimatedSection className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              API Online — v2.0
            </span>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection className="text-center" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              The API for
              <span className="bg-gradient-to-r from-[#4B189B] via-purple-600 to-[#BFA4FF] dark:from-purple-400 dark:via-[#BFA4FF] dark:to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Chama &amp; Savings
              </span>
              <span className="block">Groups</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-6" delay={0.2}>
            <p className="mx-auto max-w-xl text-base sm:text-lg text-slate-600 dark:text-white/60 leading-relaxed">
              Build financial tools for African savings communities. Manage groups, track contributions, and automate member workflows with a single, secure API.
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8" delay={0.3}>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#4B189B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4B189B]/25 hover:bg-[#3d147f] hover:shadow-xl hover:shadow-[#4B189B]/30 transition-all duration-300"
            >
              Get started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://akibapamoja-backend.onrender.com/?format=openapi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 px-6 py-3 text-sm font-medium text-slate-700 dark:text-white/80 hover:border-[#4B189B]/40 dark:hover:border-[#4B189B]/30 hover:bg-white dark:hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <TerminalIcon className="h-4 w-4" />
              View OpenAPI
            </a>
          </AnimatedSection>

          {/* Terminal */}
          <div className="mt-16 md:mt-20">
            <AnimatedSection delay={0.4}>
              <TypingTerminal />
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#0a0515] to-transparent" />
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[#0a0515]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4B189B]">How it works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Three steps to your first contribution</h2>
          </AnimatedSection>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-[#4B189B]/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { step: '01', icon: Key, title: 'Authenticate', desc: 'Get your API key from the dashboard. Every request uses Bearer token auth.' },
                { step: '02', icon: Users, title: 'Create a Group', desc: 'Set up your chama or savings group. Invite members to join.' },
                { step: '03', icon: Banknote, title: 'Record Contributions', desc: 'Track member deposits, view balances, and automate cycles.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={item.step} delay={i * 0.15}>
                    <div className="relative flex flex-col items-center text-center group">
                      {/* Step number */}
                      <div className="relative mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#4B189B] flex items-center justify-center shadow-lg shadow-[#4B189B]/20 group-hover:shadow-xl group-hover:shadow-[#4B189B]/30 transition-shadow">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-[#4B189B] flex items-center justify-center border-2 border-white dark:border-[#0a0515]">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-white/50 leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Interactive Quickstart ═══ */}
      <section className="relative py-20 md:py-28 bg-slate-50 dark:bg-[#0d0818]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4B189B]">Quickstart</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Try it in your language</h2>
            <p className="mt-3 text-slate-600 dark:text-white/50 max-w-lg mx-auto">Create a group in seconds. Pick your preferred language and copy the code.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <TabbedCodeBlock />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ Endpoint Explorer ═══ */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[#0a0515]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4B189B]">API Reference</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Explore all endpoints</h2>
            <p className="mt-3 text-slate-600 dark:text-white/50 max-w-lg mx-auto">16 endpoints across 3 categories. Click any endpoint for full documentation.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {endpointCategories.map((category, ci) => {
              const Icon = category.icon;
              return (
                <AnimatedSection key={category.title} delay={ci * 0.1}>
                  <div className="h-full">
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-[#4B189B]/10 dark:bg-[#4B189B]/15 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-[#4B189B]" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                      <span className="ml-auto text-xs text-slate-400">{category.endpoints.length}</span>
                    </div>

                    {/* Endpoints list */}
                    <div className="space-y-2">
                      {category.endpoints.map((ep) => (
                        <EndpointCard key={`${ep.method}-${ep.path}`} {...ep} />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Built for Production ═══ */}
      <section className="relative py-20 md:py-28 bg-slate-50 dark:bg-[#0d0818]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4B189B]">Infrastructure</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Built for production</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                stat: 'Bearer',
                label: 'Token Auth',
                desc: 'Every request authenticated. HTTPS enforced. Secrets never leave your server.',
              },
              {
                icon: Zap,
                stat: '<200ms',
                label: 'Response Time',
                desc: 'Optimized endpoints with minimal overhead. Your users won\'t wait.',
              },
              {
                icon: BarChart3,
                stat: '99.9%',
                label: 'Uptime',
                desc: 'Standard HTTP status codes. Structured error responses. Retry-friendly.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.label} delay={i * 0.1}>
                  <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-[#4B189B]/30 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-[#4B189B]/10 dark:bg-[#4B189B]/15 flex items-center justify-center mb-4 group-hover:bg-[#4B189B]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#4B189B]" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{item.stat}</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-white/80 mb-2">{item.label}</div>
                    <p className="text-sm text-slate-600 dark:text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA Footer ═══ */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-[#0d0818] dark:to-[#0a0515]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4B189B]/5 dark:bg-[#4B189B]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-24 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to integrate?
            </h2>
            <p className="text-slate-600 dark:text-white/50 mb-8 max-w-lg mx-auto">
              Get your API key and start building in minutes. Full documentation, code samples, and support included.
            </p>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#4B189B] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#4B189B]/25 hover:bg-[#3d147f] hover:shadow-xl hover:shadow-[#4B189B]/30 transition-all duration-300"
            >
              Get started with docs
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="mt-6 text-xs text-slate-400 dark:text-white/30 font-mono">
              Base URL: https://akibapamoja-backend.onrender.com
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500 dark:text-white/40">
            © {new Date().getFullYear()} AkibaPamoja. Built for developers.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://akibapamoja-backend.onrender.com/?format=openapi"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-500 dark:text-white/40 hover:text-[#4B189B] dark:hover:text-[#BFA4FF] transition-colors"
            >
              OpenAPI Spec
            </a>
            <Link
              href="/docs"
              className="text-sm text-slate-500 dark:text-white/40 hover:text-[#4B189B] dark:hover:text-[#BFA4FF] transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
