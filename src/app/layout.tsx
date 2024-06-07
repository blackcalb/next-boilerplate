import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header';
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
          'bg-white dark:bg-black',
        )}
      >
        <Providers>
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          <div className="flex-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
