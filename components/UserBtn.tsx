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
  
function UserBtn({session}:{session:Session | null}) {
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
   
    <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserBtn