import { setting_object } from "./setting";


export type detect_language = {
    isReliable: boolean,
    languages: Array<{
        language: string,
        percentage: number
    }>
};

export interface browser_interface {
    i18n: {
        getMessage: (messageName: string, substitutions?: string | Array<string>) => string,
        detectLanguage: (text: string) => Promise<detect_language>
    },
    storage: {
        local: {
            set: (keys: { [key: string]: setting_object }) => Promise<void>,
            get: (keys: string) => Promise<{ setting: setting_object }>
        },
        onChanged: {
            addListener: (callback: (changes: { [key: string]: { oldValue: setting_object, newValue: setting_object } }, areaName: "sync" | "local" | "managed") => void) => void
        }
    },
    runtime: {
        getManifest: () => { [key: string]: string }
    }
}
