import React from 'react'
import Logo from './Logo'
import {ModeToggle }from './Darkmode'
import UserBtn from './UserBtn'

function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-gray-900'>
     <nav className='flex flex-col sm:flex-row pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto items-center p-6'>
        <Logo />

        <div className='flex-1 flex items-center justify-end space-x-4'>
            {/* lang select */}
            <ModeToggle />
            <UserBtn />
        </div>
     </nav>

     {/* upgrade */}
    </header>
  )
}

export default Header