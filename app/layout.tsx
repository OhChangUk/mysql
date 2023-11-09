import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Login from '@/components/login'
import { authOptions } from './api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Login session={session} />
        {children}
      </body>
    </html>
  )
}
