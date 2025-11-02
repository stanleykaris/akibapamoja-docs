import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  const options = baseOptions();
  return <HomeLayout {...options}>{children}</HomeLayout>;
}
