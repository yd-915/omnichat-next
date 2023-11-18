import React from 'react'
import Logo from './Logo'
import {ModeToggle }from './Darkmode'
import UserBtn from './UserBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { MessagesSquareIcon } from 'lucide-react'
import ChatButton from './ChatButton'
import Upgrade from './Upgrade'
import LanguageSwitcher from './LanguageSwitcher'
import { Button } from './ui/button'

async function Header() {
    const session = await getServerSession(authOptions)
   
  return (
    <header className='sticky top-0 z-50 bg-secondary'>
    <nav className='flex flex-col sm:flex-row pl-2 bg-secondary max-w-7xl mx-auto items-center p-6'>
        <Logo />

        <div className='flex-1 flex items-center justify-end space-x-1'>
            <LanguageSwitcher />

            {session ? (
                <>
                    <Link href={'/chat'} prefetch={false}>
                        <div className='flex ml-3 items-center '>
                            <MessagesSquareIcon className='text-primary' />
                            <ChatButton />
                        </div>
                    </Link>
                </>
            ) : (
                <Link href={'/pricing'} prefetch={true}>
                    <Button variant='outline' >
                        Pricing
                    </Button>
                </Link>
            )}

            <ModeToggle />
            <UserBtn session={session} />
        </div>
    </nav>

    <Upgrade />
</header>
  )
}

export default Header