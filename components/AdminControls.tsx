import DeleteChatBtn from "./DeleteChatBtn"
import InviteUserBtn from "./InviteUserBtn"



function AdminControls({chatId}:{chatId:string}) {
  return (
    <div className="flex justify-end space-x-2 mb-0">
        {/* <DeleteChatBtn  chatId={chatId} /> */}
        <InviteUserBtn chatId={chatId} />
    </div>
  )
}

export default AdminControls