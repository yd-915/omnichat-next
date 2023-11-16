'use client'

import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

function Upgrade() {
    const subscription = useSubscriptionStore((state) => state.subscription)

    const isPro = subscription?.role === 'pro'
    const router = useRouter() 
    if(subscription === undefined || isPro) return null
  return (

    <Button
    onClick={() => router.push('/register')}
    className="w-full rounded-none bg-gradient-to-r from-[#6341bf] to-[#ff70d6] text-center text-white px-5 py-2 hover:from-[#6341bf] hover:to-[#ff70d6] hover:shadow-md hover:opacity-75 transition-all "
    >
        Upgrade to OmniPro to unlock all features!
    </Button>
  )
}

export default Upgrade