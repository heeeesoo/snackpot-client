import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

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
    <html lang="en" className='bg-black w-screen flex justify-center'>
      <body className='bg-grayScreen w-screen max-w-[500px] min-h-screen'>
        <header className='sticky top-0'>
          <Header />
        </header>
        <main className='w-screen max-w-[500px] min-h-[90vh] m-auto overflow-y-scroll no-scrollbar'>
          {children}
        </main>
        <footer className='sticky bottom-0'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
