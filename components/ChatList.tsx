import { authOptions } from "@/auth"
import { chatMembersCollectionGroupRef } from "@/lib/converters/Members"
import { getDocs } from "firebase/firestore"
import { getServerSession } from "next-auth"
import ChatListRows from "./ChatListRows"


async function ChatList() {
    const session = await getServerSession(authOptions)

    const chatsSnapshot = await getDocs(
        chatMembersCollectionGroupRef(session?.user.id!)
    )

    const initalChats = chatsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: null
    }))


  return (
    <ChatListRows initialChats={initalChats} />
  )
}

export default ChatList