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

const LANGUAGES_WITH_FREE = 3

interface LanguageState {
    language: LanguageSupported
    setLanguage: (language: LanguageSupported) => void
    getLanguages: (isPro: boolean) => LanguageSupported[]
    getNotSupportedLanguages: (isPro: boolean) => LanguageSupported[]
}

export const useLanguageStore = create<LanguageState>()((set,get) => ({
    language: "en",
    setLanguage: (language: LanguageSupported) => set({language}),
    getLanguages: (isPro: boolean) => {
        if(isPro)
            return Object.keys(LanguageSupportedMap) as LanguageSupported[]
        
        return Object.keys(LanguageSupportedMap).slice(0,LANGUAGES_WITH_FREE) as LanguageSupported[]
    },
    getNotSupportedLanguages: (isPro: boolean) => {
        if(isPro) return []

        return Object.keys(LanguageSupportedMap).slice(LANGUAGES_WITH_FREE) as LanguageSupported[]
            
    }
}))

interface SubscriptionState {
    subscription: Subscription | null | undefined
    setSubscription: (subscription: Subscription | null ) => void
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({subscription})
}))