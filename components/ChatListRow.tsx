'use client'

import {Skeleton} from '@/components/ui/skeleton'

function ChatListRow({chatId}: {chatId: string}) {
const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
)


  return (
    <div>ChatListRow</div>
  )
}

export default ChatListRow