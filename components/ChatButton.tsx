'use client'

import { MessageSquarePlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useSubscriptionStore } from "@/store/store"
import { useToast } from "./ui/use-toast"
import Loading from "./Loading"
import {v4 as uuidv4} from 'uuid'
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/Members"
import { ToastAction } from "./ui/toast"



function ChatButton({isLarge}: {isLarge?: boolean}) {
    const router = useRouter()
    const{data:session} = useSession()
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const subscription = useSubscriptionStore((state) => state.subscription)
    

    const newChat = async () => {
      if(!session?.user.id)return 

      setLoading(true)
      toast({
        title: 'Creating new chat',
        description: 'Please wait while, chat is being created..',
        duration: 2000,
      })
      // restrictions for free members
      const numOfChats = (await getDocs(chatMembersCollectionGroupRef(session?.user.id))).docs.map(
        (doc) => doc.data()
      ).length



      const isPro = subscription?.role === 'pro' && subscription.status === 'active'

        if(!isPro && numOfChats >= 3){
          toast({
            title: 'Free plan reached',
            description: 'Please upgrade your plan to create more chats',
            variant: 'destructive',
            duration: 7000,
            action: (
              <ToastAction
              altText="Upgrade"
              onClick={() => router.push('/register')}
              >
              Upgrade to OmniPro</ToastAction>
            )
          })
          setLoading(false)
          return
        }


      const chatId = uuidv4()
      await setDoc(addChatRef(chatId, session?.user.id), {
        userId: session?.user.id!,
        email: session?.user.email!,
        timestamp: serverTimestamp(),
        isAdmin: true,
        chatId,
        image: session?.user.image || ''
      }).then(() => {
        toast({
          title: 'Chat created',
          description: 'Your chat has been created',
          duration: 2000,
          className: 'bg-green-600 text-white',
        })
        router.push(`/chat/${chatId}`)
        }).catch((error) => {
          console.error(error)
          toast({
            title: 'Error creating chat',
            description: 'Please try again later',
            duration: 2000,
            className: 'bg-red-600 text-white',
          })

      }).finally(() => {
        setLoading(false)
      })

    }

    if(isLarge)
    return (
      <div>
        <Button variant={'default'} onClick={newChat}>
          {loading? <Loading /> : 'New Chat'}
        </Button>
      </div>
      )

  return (
    <Button variant={'link'} size={'icon'} onClick={newChat}>
        <MessageSquarePlusIcon className="ml-2" />
    </Button>
  )
}

export default ChatButton