import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
 // ✅ Import your Navbar

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Liqwid',
  description: 'Custom login and dashboard',
  icons: {
    icon: '/fevicon.ico', //
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        {/* <Navbar /> ✅ Shows Navbar on every page */ }
        
        {children}
      </body>
    </html>
  );
}

//github change 1