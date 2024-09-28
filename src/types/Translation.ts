export interface GamePaths {
    versions: {
        LIVE: string;
        PTU?: string;
        EPTU?: string;
        TECHPREVIEW?: string;
    };
}

export interface Link {
    id: number;
    name: string;
    url: string;
}

export interface LanguageConfig {
    folder: string;
    enabled: boolean;
    links: Link[];
}

export interface LocalizationConfig {
    fr: LanguageConfig;
    de: LanguageConfig;
    ita: LanguageConfig;
    es: LanguageConfig;
    en: LanguageConfig;
}

export const isLocalizationConfig = (
    value: any,
): value is LocalizationConfig => {
    return (
        value &&
        typeof value === "object" &&
        value.fr &&
        typeof value.fr === "object"
    );
};

export const isGamePaths = (value: any): value is GamePaths => {
    return (
        value &&
        typeof value === "object" &&
        value.versions &&
        typeof value.versions === "object"
    );
};
