import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

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
          <ThemeProvider enableSystem attribute="class">
            <div className="flex flex-1">{children}</div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
