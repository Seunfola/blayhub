'use client';
import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children, pageProps }) {
  const { session, ...restPageProps } = pageProps || {};

  return (
    <html lang="en">
      <Head>
        <title>Blayhub - Empowering Your Career Journey</title>
        <meta name="description" content="Blayhub connects talent with opportunity through innovative job search solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="job search, career, employment, job listings, resume building" />
        <meta property="og:title" content="Blayhub - Empowering Your Career Journey" />
        <meta property="og:description" content="Blayhub connects talent with opportunity through innovative job search solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blayhub.com" />
        <meta property="og:image" content="https://www.blayhub.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blayhub - Empowering Your Career Journey" />
        <meta name="twitter:description" content="Blayhub connects talent with opportunity through innovative job search solutions." />
        <meta name="twitter:image" content="https://www.blayhub.com/images/twitter-image.jpg" />
        <link rel="canonical" href="https://www.blayhub.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
