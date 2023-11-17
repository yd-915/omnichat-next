'use client'
import Link from 'next/link'

import Text from '@carefully-coded/react-text-gradient';
import { MessageCircle } from 'lucide-react';
import bulle from '../public/bulle.svg'
// import logo from '../public/logo.svg'
// import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'

type Gradient = {
  type?: 'linear' | 'radial';
  from?: string;
  to?: string;
  degree?: number;
};


function Logo() {
  return (
    <Link href={'/'} prefetch={false} className='overflow-hidden'>
        <div className='flex items-center justify-center w-72 h-14'>
              
          <Text 
          gradient={{ from: '#6572E4', to: '#C84DD8' }} 
          animate
          animateDuration={4000} 
          >
        <h2 className='text-3xl font-extrabold tracking-wide'>OmniChat</h2> 
        </Text>
        <Image src={bulle} alt='bulle'className='h-8 w-8 ml-2' style={{transform:'scaleX(-1)'}}/>
        </div>
    </Link>
  )
}

export default Logo