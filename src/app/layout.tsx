import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frustration Magazine',
  description: 'Site du magazine de critique sociale Frustration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header></Header>
        {children}
        <footer></footer>
        </body>
    </html>
  )
}
