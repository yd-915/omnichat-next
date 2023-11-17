'use client'

import { Button } from "./ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog"
import { Input } from "./ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {doc, getDocs, serverTimestamp,setDoc} from "firebase/firestore"
import { addChatRef, ChatMembersRef } from "@/lib/converters/Members"
import { useSession } from "next-auth/react"
import {useState} from "react"
import {getUserByEmailRef} from "@/lib/converters/User"
import { useToast } from "./ui/use-toast"
import { PlusCircleIcon } from "lucide-react"
// import {ShareLink} from "./ShareLink"
import { useSubscriptionStore } from "@/store/store"
import { ToastAction } from "./ui/toast"
import { useRouter } from "next/navigation"
import useAdminId from "@/hooks/useAdminId"
import ShareLink from "./ShareLink"

const formSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
})
function InviteUserBtn({chatId}:{chatId:string}) {
    const {data:session} = useSession()
    const {toast} = useToast()
    const router = useRouter()
    const adminId = useAdminId({chatId})
    const subscription = useSubscriptionStore((state) => state.subscription)

    const[open,setOpen] = useState(false)
    const[openInviteLink,setOpenInviteLink] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!session?.user.id) return
        toast({
            title: 'Adding user to chat',
            description: 'Please wait...',
        })

        const noOfUsersInChat = (await getDocs(ChatMembersRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length

        const isPro = subscription?.role === 'pro' && subscription.status === 'active'

        if(!isPro && noOfUsersInChat >= 2){
            toast({
                title: 'User limit reached',
                description: 'Please upgrade your plan to add more users',
                variant: 'destructive',
                action: (
                    <ToastAction
                    altText="Upgrade"
                    onClick={() => router.push('/register')}
                    >
                    Upgrade to OmniPro</ToastAction>
                )
            })
            return
        }

        const querySnapshot = await getDocs(getUserByEmailRef(values.email))

        if(querySnapshot.empty){
            toast({
                title: 'User not found',
                description: 'Please ensure that the email is correct and that user is registered',
                variant: 'destructive',
            })
            return
        } else {

            const user = querySnapshot.docs[0].data()

            await setDoc(addChatRef(chatId,user.id), {
                userId: user.id!,
                email: user.email!,
                timestamp: serverTimestamp(),
                chatId,
                isAdmin: false,
                image: user.image || '',
            }).then(() => {
                setOpen(false)
                toast({
                    title: 'User added to chat',
                    description: 'User has been added to the chat',
                    className: 'bg-green-500 text-white',
                    duration: 3000,
                })

                setOpenInviteLink(true)
            }).catch(() => {
                toast({
                    title: 'Error adding user to chat',
                    description: 'Ooops... there was an error adding a user to the chat',
                    variant: 'destructive',
                })

                setOpen(false)
            })
        } 

        form.reset()

    }

  return (
    adminId === session?.user?.id && (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >
                    <PlusCircleIcon className="mr-1" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add user to chat</DialogTitle>
                    <DialogDescription>
                        Simply enter the email of the user you want to invite to the chat !
                    </DialogDescription>
                    <DialogDescription>
                       
                        <span className="text-indigo-400 font-bold">
                            (Note: They must be registered with OmniChat)
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2"
                    >

                        <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    placeholder="example@email.com"
                                    type="email"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button className="ml-auto sm:w-fit w-full" type="submit">
                            Invite
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

        <ShareLink
        isOpen={openInviteLink}
        setIsOpen={setOpenInviteLink}
        chatId={chatId}
        /> 
    </>
    )
  )
}

export default InviteUserBtn