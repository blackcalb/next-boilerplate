import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import DarkModeButton from '@/components/buttons/DarkMode';
import { cn } from '@/utils/cn';

import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlackcalB',
  description: 'BlackcalB - A personal blog by Blackcalb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="size-full">
      <body
        className={cn(
          inter.className,
          'size-full flex flex-col',
          'bg-background',
        )}
      >
        <SpeedInsights />
        <Analytics />
        <Providers>
          <div className="flex-1">{children}</div>
          <div className="mx-auto py-4">
            <DarkModeButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
