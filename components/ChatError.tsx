import { AlertCircle } from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from './ui/alert'
import { Button } from "./ui/button"
import Link from "next/link"

function ChatError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex-1">
        <p className="flex-1">You don't have permission to access this page
        <br />
        <span className="font-bold">
        Please ask the chat Administrator to add you in the chat.
        </span>
        </p>
        <Link href='/chat' replace>
        <Button variant="destructive">Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default ChatError