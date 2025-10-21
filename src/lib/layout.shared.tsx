import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { FileText } from 'lucide-react';
import Image from 'next/image';
const Logo = '/Akiba-Pamoja.svg';

/**
 * Shared layout configurations
 *
 * you can customize layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <span className="rounded-md p-0.5">
            <Image
              src={Logo}
              alt="Logo"
              width={56}
              height={56}
              priority
              className="block"
              suppressHydrationWarning={true}
            />
          </span>
          <span>AkibaPamoja</span>
        </span>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Documentation",
        url: "/docs",
        icon: <FileText />,
        active: "nested-url",
      },
    ],
  };
}
