import ChatButton from "@/components/ChatButton"
import ChatError from "@/components/ChatError"
import ChatList from "@/components/ChatList"

type Props = {
    params: {}
    searchParams: {
        error: string
    }
}


function ChatsPage({searchParams: {error}}:Props) {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatError />
        </div>
      )}
      <ChatList />
    </div>
  )
}

export default ChatsPage