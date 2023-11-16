'use client'

import {Skeleton} from '@/components/ui/skeleton'
import { Message, limitedSortedMessagesRef } from '@/lib/converters/Message'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function ChatListRow({chatId}: {chatId: string}) {
const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
)


  return (
    <div>ChatListRow</div>
  )
}

export default ChatListRow