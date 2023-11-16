import { authOptions } from "@/auth"
import PricingCards from "@/components/PricingCards"
import { getServerSession } from "next-auth"



async function RegisterPage() {
    const session = await getServerSession(authOptions)
    
  return (
    <div className="isolate h-full overflow-hidden bg-secondary pb-40">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-primary text-center lg:px-8">
            <div className="mx-auto max-w-4xl">
                <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                     Let's handle your account {session?.user?.name?.split(" ").map((part, index) => index === 0 ? part : part[0]).join(" ") + "."}
                </p>
            </div>
            <div className="relative mt-6">
                <svg viewBox="0 0 1208 1024" 
                className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
                >
                    <ellipse cx="604" cy="512" rx="604" ry="512" fill="url(#radial-gradient)"/>
                    <defs>
                        <radialGradient id="radial-gradient">
                            <stop stopColor="#9089FC" />
                            <stop offset="1" stopColor="#FF80B5" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>

        <PricingCards redirect={false} selectedCardIndex={1} />
    </div>
  )
}

export default RegisterPage