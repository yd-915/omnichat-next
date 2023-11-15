import React from 'react'
import Logo from './Logo'
import {ModeToggle }from './Darkmode'
import UserBtn from './UserBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { MessagesSquareIcon } from 'lucide-react'
import ChatButton from './ChatButton'

async function Header() {
    const session = await getServerSession(authOptions)
   
  return (
    <header className='sticky top-0 z-50 bg-secondary'>
     <nav className='flex flex-col sm:flex-row pl-2 bg-secondary max-w-7xl mx-auto items-center p-6'>
        <Logo />

        <div className='flex-1 flex items-center justify-end space-x-4'>
            {/* lang select */}
            {session ? (
                <>
                <Link href={'/chat'} prefetch={false} />
                <MessagesSquareIcon className='text-primary' />
                <ChatButton />
                </>
            ):(
                <Link href={'/pricing'} prefetch={true} >
                    Pricing
                </Link>
            )}

            <ModeToggle />
            <UserBtn session={session} />
        </div>
     </nav>

     {/* upgrade */}
    </header>
  )
}

export default Header