
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Modal from '@/components/modals/Modal'

import ClientOnly from '@/components/ClientOnly'
import Navbar from '@/components/Navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import ToasterProvider from '@/context/ToastProvider'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from '@/actions/getCurrentUser'
import { User } from '@prisma/client'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'


const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rentify',
  description: 'Airbnb your home!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={user} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
