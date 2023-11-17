'use client'

import { ChatMemberAdminRef } from "@/lib/converters/Members"
import { getDocs } from "firebase/firestore"
import { useEffect,useState } from "react"

function useAdminId({chatId}:{chatId:string}) {
const [adminId,setAdminId] = useState<string>('')

    useEffect(()=>{
        const fetchAdminStatus = async () => {
            const adminId = (await getDocs(ChatMemberAdminRef(chatId))).docs.map(
                (doc) => doc.id
            )[0]

            setAdminId(adminId)
        }

        fetchAdminStatus()
    },[chatId])

    
  return adminId
}

export default useAdminId