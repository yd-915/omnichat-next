'use client'

import { MessageSquarePlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"



function ChatButton() {
    const router = useRouter()

    const newChat = async () => {
        router.push('/chat/new')
    }
  return (
    <Button variant="ghost" onClick={newChat}>
        <MessageSquarePlusIcon  />
    </Button>
  )
}

export default ChatButton