'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useToast } from './ui/use-toast'
import { Copy, CopyCheck, CopyPlus } from 'lucide-react'

function ShareLink({
  isOpen,
  chatId,
  setIsOpen
}: {
  isOpen: boolean,
  chatId: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
}) {
  const { toast } = useToast()
  const host = window.location.host
  const [isCopied, setIsCopied] = useState(false) // Track if the link is copied or not

  const linkToChat = process.env.NODE_ENV === 'development' ? `http://${host}/chat/${chatId}` : `https://${host}/chat/${chatId}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(linkToChat)
      setIsCopied(true) // Update the state to indicate that the link is copied
      toast({
        title: 'Copied to clipboard',
        description: 'Share this link with your friends, (NOTE: They must be added to the chat to join)',
        className: 'bg-green-600 text-white',
        duration: 7000,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link, please try again',
        variant: 'destructive',
      })

    }
  }

  return (
    <Dialog
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}
    >
      <DialogTrigger asChild>
        <Button variant={'outline'}  >
          {isCopied ? <CopyPlus className="mr-2" /> : <Copy className="mr-2" />}
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
          <span className='text-indigo-400 font-bold'> 1. Add user to chat.</span>
          </DialogDescription>
          <DialogDescription>
            <span className='text-indigo-400 font-bold'> 2. Share this link with them ! </span> 
          </DialogDescription>
          <DialogDescription>
          Enjoy chatting with OmniChat
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>Link</Label>
            <Input id='link' defaultValue={linkToChat} readOnly />
          </div>
          <Button
            type='submit'
            onClick={() => copyLink()}
            size={'sm'}
            className='px-3'
          >
            <span className='sr-only'>Copy</span>
            {isCopied ? <CopyCheck className="h-6 w-6" /> : <CopyPlus className="h-6 w-6" />}
          </Button>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant={'secondary'}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareLink