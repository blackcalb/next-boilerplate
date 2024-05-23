import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { MenuWrapper } from '@/components/menu/Menu';
import { Navigation } from '@/components/navigation';
import Sidemenu from '@/components/ui/menu/Sidemenu';
import { MenuProvider } from '@/hooks/context/menu';
import { cn } from '@/utils/cn';

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
        <ThemeProvider enableSystem attribute="class">
          <MenuProvider>
            <Navigation />

            <div className="flex flex-1">
              <MenuWrapper>
                <Sidemenu />
              </MenuWrapper>
              {children}
            </div>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
