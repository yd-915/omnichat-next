import Link from 'next/link'
import logo from '../public/logo.svg'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'

function Logo() {
  return (
    <Link href={'/'} prefetch={false} className='overflow-hidden'>
        <div className='flex items-center justify-center w-72 h-14'>
               <h2 className='text-3xl  '>OmniChat </h2>
           
        </div>
    </Link>
  )
}

export default Logo