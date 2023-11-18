'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import { Session } from "next-auth"
import { Button } from "./ui/button"
import { signIn, signOut } from "next-auth/react"
import { useSubscriptionStore } from "@/store/store"
import Loading from "./Loading"
import { StarIcon } from "lucide-react"
// import ManageAccountBtn from "./ManageAccountBtn"
  
function UserBtn({session}:{session:Session | null}) {
  const subscription = useSubscriptionStore((state) => state.subscription)


    if(!session) return (
        <Button variant="outline" onClick={() => signIn()}>
            Sign in
        </Button>
    )
  return session && (
    <DropdownMenu>
  <DropdownMenuTrigger><UserAvatar name={session.user?.name} image={session.user?.image} /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />

    {subscription === undefined && (
      <DropdownMenuItem>
        <Loading />
      </DropdownMenuItem>
    )}

    {subscription?.role === "pro" && (
      <>
      <DropdownMenuLabel className="text-sm flex items-center justify-start space-x-1 text-[#C181EE] animate-pulse">
        <StarIcon fill="#C181EE" />
        <p>Pro Member</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {/* <DropdownMenuItem>
        <ManageAccountBtn />
      </DropdownMenuItem> */}
      </>
    )}
   
    <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserBtn