import { CheckIcon } from "lucide-react"
import Link from "next/link"
import CheckoutBtn from "./CheckoutBtn"



const pricing = [
    {
        name: 'Free',
        id: 'free' ,
        href: '#',
        priceMonthly: null,
        description: 'Get started with chatting with OmniChat.',
        features: [
          '20 messages chat limit',
          '2 users limit in a room',
          '3 chat rooms',
          'Supports 3 languages',
          '48-hour support response time',
        ],

    },
    {
        name: 'OmniPro',
        id: 'pro',
        href: '#',
        priceMonthly: '$9.99',
        description: 'Unlock the full potential of OmniChat.',
        features: [
          'Unlimited messages in chats',
          'Unlimited users in a chats',
          'Unlimited chat rooms',
          'Supports more than 10 languages',
          '24-hour support response time',
        //   'Early access to new features',
        ],
    }
]

function PricingCards({redirect,selectedCardIndex}: {redirect: boolean,selectedCardIndex: number }) {
    
  return (
    <div>
        <div className="mx-auto grid max-w-md gap-8 m-10 sm:flex md:flex-col">
            {pricing.map((price, index) => (
               index === selectedCardIndex && (
               <div
                key={price.id}
                className="flex flex-col justify-between rounded-3xl m-4 bg-primary shadow-xl ring-1 ring-secondary/10 p-10 sm:p-10"
                >
                    <div className="">
                        <h3 id={price.id + price.name}
                        className="text-base font-semibold leading-6 text-indigo-600"
                        >{price.name}</h3>
                        <div className="mt-4 flex items-baseline gap-x-2">
                            {price.priceMonthly ? (
                                <>
                                <span className="text-5xl font-bold tracking-tight text-secondary">{price.priceMonthly}</span>
                                <span className="text-base font-semibold leading-6 text-secondary">/mo</span>
                                </>
                            ): (
                                <span className="text-5xl font-bold tracking-tight text-secondary">Starter</span>
                            )}
                        </div>
                        <p className="mt-6 text-base leading-7 text-secondary">{price.description}</p>
                        <ul
                        role="list"
                        className="mt-8 space-y-4 text-sm leading-7 text-secondary"
                        >
                            {price.features.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600"/>
                                    {feature}
                                </li>
                            
                            ))}
                        </ul> 
                    </div>

                    {redirect ? (
                        <Link href='/register' className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center cursor-pointer">
                            Get started
                        </Link>
                    ):(
                        price.id  && (
                            <CheckoutBtn />
                        )
                    )}
                </div> 
               )
            ))}
        </div>
    </div>
  )
}

export default PricingCards