import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
// import { Homemade_Apple } from '@next/font/google';

// const homemadeApple = Homemade_Apple({ subsets: ['latin'], weight: ['400'], display: 'swap' })

export const metadata: Metadata = {
  title: 'SnackPot',
  description: 'snack exercise app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-white w-screen flex justify-center'>
      <head>
          <link
              rel="manifest"
              href="/manifest.json"
          />
      </head>
      <body  className={`bg-grayScreen w-screen max-w-[500px] min-h-screen`}>
        <header className='sticky top-0 z-20'>
          <Header />
        </header>
        <main className='w-screen max-w-[500px] min-h-[90vh] m-auto overflow-y-scroll no-scrollbar'>
          {children}
        </main>
        <footer className='sticky bottom-0 z-10'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
