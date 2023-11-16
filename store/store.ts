import {create} from "zustand"
import { Subscription } from "@/types/Subscription"

export type LanguageSupported = 
| "en"
|"es"
|"de"
|"fr"
|"hi"
|"ru"|"ar"|"ja"|"sv"|"tr"|"vi"|"el"

export const LanguageSupportedMap: Record<LanguageSupported, string> = {
    en: "English",
    es: "Spanish",
    de: "German",
    fr: "French",
    hi: "Hindi",
    ru: "Russian",
    ar: "Arabic",
    ja: "Japanese",
    sv: "Swedish",
    tr: "Turkish",
    vi: "Vietnamese",
    el: "Greek"
}

interface SubscriptionState {
    subscription: Subscription | null | undefined
    setSubscription: (subscription: Subscription | null ) => void
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({subscription})
}))