export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] dark:bg-zinc-950 dark:text-white">
      <div className="max-w-4xl mx-auto p-8">
        {children}
      </div>
    </div>
  );
}
