'use client'

import { LanguageSupported, LanguageSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store"
import { usePathname } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Loading from "./Loading"
import Link from "next/link"


function LanguageSwitcher() {
const [language, setLanguage, getLanguages, getNotSupportedLanguages]= useLanguageStore(state => [state.language, state.setLanguage, state.getLanguages, state.getNotSupportedLanguages])

const subscription = useSubscriptionStore(state => state.subscription)
const isPro = subscription?.role === "pro" && subscription?.status === "active"

const pathName = usePathname()
const isChatPage = pathName.includes("/chat")
 
return isChatPage && (
<div>
    <Select
    onValueChange={(value: LanguageSupported)=> setLanguage(value)}
    >
        <SelectTrigger className="w-[150px] text-primary">
            <SelectValue
            placeholder={LanguageSupportedMap[language]}
            className="cursor-pointer"
                />
        </SelectTrigger>

        <SelectContent>
            {subscription === undefined ? (
                <Loading />
            ):(
                <>
                {getLanguages(isPro).map((language) => (
                    <SelectItem
                    key={language}
                    value={language}
                    className="cursor-pointer"
                    >
                        {LanguageSupportedMap[language]}
                    </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((language) => (
                    <Link href={'/register'} key={language} prefetch={false}>
                    <SelectItem
                    key={language}
                    value={language}
                    disabled
                    className=" text-gray-500 bg-gray-300/50 dark:text-white py-2 my-1"
                    >
                        {LanguageSupportedMap[language]} (Pro only)
                    </SelectItem>
                    </Link>
                ))}
                </>
            )}
        </SelectContent>
    </Select>
</div>

)
}

export default LanguageSwitcher