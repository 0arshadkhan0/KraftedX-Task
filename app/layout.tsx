import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Background from './components/Background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiqwidX',
  description: 'Next.js App with JWT Authentication',
  icons:{
    icon: '/fevicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background />
        {children}
      </body>
    </html>
  );
}
