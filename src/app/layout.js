'use client';
import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children, pageProps }) {
  const { session, ...restPageProps } = pageProps || {};

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider session={session}>
            <div className='container'>
              <Navbar />
              {children}
              <Footer />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
