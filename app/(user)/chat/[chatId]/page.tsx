import { authOptions } from '@/auth'
import ChatInput from '@/components/ChatInput'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {
  params: {
    chatId: string
  }
}

async function ChatPage({ params: { chatId }}:Props) {
  const session = await getServerSession(authOptions)

  return (
    <>
  {/* Admin control */}

  {/* Chats member badge */}

  {/* Chat messages */}


  <ChatInput chatId={chatId}/>
       
    </>
  )
}

export default ChatPage