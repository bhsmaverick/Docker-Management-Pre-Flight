import type {Metadata} from 'next';
import './globals.css';
import { I18nProvider } from '@/components/I18nProvider';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Docker Management Panel',
  description: 'Self-Hosted Docker Management',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-300 antialiased selection:bg-neutral-800 relative">
        <I18nProvider>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
