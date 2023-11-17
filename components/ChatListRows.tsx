'use client'

import { ChatMembers, chatMembersCollectionGroupRef } from '@/lib/converters/Members'
import { MessageSquare } from 'lucide-react'
import { useSession } from 'next-auth/react'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import ChatButton from './ChatButton'
import ChatListRow from './ChatListRow'


function ChatListRows({initialChats}: {initialChats: ChatMembers[]}) {
    const {data:session} = useSession()
    const [members, loading, error] = useCollectionData<ChatMembers>(
        session && chatMembersCollectionGroupRef(session?.user.id!),
        {
            initialValue: initialChats,
        }
    )

    if(members?.length === 0)
    return(
        <div className='flex flex-col justify-center text-center items-center pt-40 space-y-2'>
            <MessageSquare className='h-10 w-10' />
            <h1 className='text-5xl font-extrabold text-center'>Welcome to OmniChats!</h1>
            <h2 className='pb-10'>Let's get you started by creating your first chat.</h2>

            <ChatButton  isLarge/>
        </div>
        )




  return (
    <div className=''>
        {members?.map((member,i) => (
            <ChatListRow key={member.chatId} chatId={member.chatId} />
        ))}
    </div>
  )
}

export default ChatListRows