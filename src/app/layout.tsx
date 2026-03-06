import type { Metadata } from 'next';
import { inter } from './ui/fonts';
import './global.css';

export const metadata: Metadata = {
  title: 'ACME',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
