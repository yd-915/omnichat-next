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
    className="w-full rounded-none bg-gradient-to-r from-[#ae70ff] to-[#db70ff] text-center text-white px-5 py-2 hover:from-[#ae70ff] hover:to-[#db70ff] hover:shadow-md hover:opacity-75 transition-all "
    >
        Upgrade to OmniPro to unlock all features!
    </Button>
  )
}

export default Upgrade