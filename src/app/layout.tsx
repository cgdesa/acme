import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import '@/app/global.css';

export const metadata: Metadata = {
  title: 'ACME'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-br'>
      <body className={ inter.className } >
        { children }
      </body>
    </html>
  );
};