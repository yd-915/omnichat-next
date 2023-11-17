import DeleteChatBtn from "./DeleteChatBtn"
import InviteUserBtn from "./InviteUserBtn"



function AdminControls({chatId}:{chatId:string}) {
  return (
    <div className="flex justify-end space-x-2 mb-0 m-5">
        <InviteUserBtn chatId={chatId} />
        <DeleteChatBtn  chatId={chatId} />
    </div>
  )
}

export default AdminControls