import { setting_object } from "./load_setting";

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
        }
    }
}
