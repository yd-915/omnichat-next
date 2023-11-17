'use client'

import {useState} from "react"
import {Button} from "./ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog"
import { useToast } from "./ui/use-toast"
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import useAdminId from "@/hooks/useAdminId"

function DeleteChatBtn({chatId}:{chatId:string}) {
  const {data:session} = useSession()
  const [open,setOpen] = useState(false)
  const {toast} = useToast()
  const router = useRouter()
  const adminId = useAdminId({chatId})

  const handleDelete = async () => {

    toast({
      title: 'Deleting Chat',
      description: 'Please wait while we delete your chat...',
    })

    await fetch(`/api/chat/delete`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId
      })
    }).then((res) => {
      toast({
        title: 'Chat Deleted',
        description: 'Your chat has been deleted successfully',
        className: 'bg-green-600 text-white',
        duration: 3000,
      })

      router.replace(`/chat`)
    }).catch((error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete chat, please try again',
        variant: 'destructive',
      })
      console.error(error.message)
    }).finally(() => {
      setOpen(false)
    })
  }
  
  return (
    session?.user.id === adminId &&(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'destructive'} >
            Delete Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Are you sure ?
            </DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button
            variant={'destructive'}
            onClick={handleDelete}
            >
              Delete
            </Button>

            <Button variant={'outline'} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}

export default DeleteChatBtn