"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
    GamePaths,
    isGamePaths,
    LocalizationConfig,
    isLocalizationConfig,
    Link,
    TranslationsChoosen,
} from "@/types/Translation";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [paths, setPaths] = useState<GamePaths | null>();
    const [earlyChecked, setEarlyChecked] = useState<boolean>(false);
    const [translations, setTranslations] =
        useState<LocalizationConfig | null>();

    const [translationsSelected, setTranslationsSelected] = useState<TranslationsChoosen>({
        LIVE: null,
        PTU: null,
        EPTU: null,
        TECHPREVIEW: null,
    });

    const defaultLanguage = "fr";


    useEffect(() => {
        try {
            invoke("get_star_citizen_versions").then((value) => {
                if (isGamePaths(value)) {
                    setPaths(value);
                }
            });
            invoke("get_translations").then((value) => {
                if (isLocalizationConfig(value)) {
                    setTranslations(value);
                }
            });
        } catch (e) {
            console.error(e);
        }
        async function loadData() {
            try {
                const data: TranslationsChoosen = await invoke('load_translations_selected');
                if (data && typeof data === 'object') {
                    setTranslationsSelected(data);
                    console.log('Données chargées', data);
                } else {
                    setTranslationsSelected({
                        LIVE: null,
                        PTU: null,
                        EPTU: null,
                        TECHPREVIEW: null,
                    });
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données :', error);
                setTranslationsSelected({
                    LIVE: null,
                    PTU: null,
                    EPTU: null,
                    TECHPREVIEW: null,
                });
            }
        }

        loadData();
    }, []);

    const saveSelectedTranslations = async (newTranslationsSelected: TranslationsChoosen) => {
        try {
            await invoke('save_translations_selected', { data: newTranslationsSelected });
            console.log('Données sauvegardées', newTranslationsSelected);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données :', error);
        }
    };

    const CheckTranslationsState = async (paths: GamePaths) => {
        const updatedPaths = { ...paths };
        await Promise.all(
            Object.entries(paths.versions).map(async ([key, value]) => {
                const translated: boolean = await invoke("is_game_translated", { path: value.path, lang: defaultLanguage });
                const upToDate: boolean = translationsSelected[key as keyof TranslationsChoosen] !== null
                    ? await invoke("is_translation_up_to_date", {
                        path: value.path,
                        translationLink: translationsSelected[key as keyof TranslationsChoosen],
                        lang: defaultLanguage,
                    })
                    : value.up_to_date;

                updatedPaths.versions[key as keyof GamePaths['versions']] = {
                    path: value.path,
                    translated: translated,
                    up_to_date: upToDate,
                };
            })
        );
        setPaths(updatedPaths);
    };

    
    const translationsSelectorHandler = (version: string, link: string) => {
        const data = {
            ...translationsSelected,
            [version]: link,
        }
        setTranslationsSelected(data);
        saveSelectedTranslations(data);
    };

    useEffect(() => {
        if (!paths) return;
        if (earlyChecked) return;
        CheckTranslationsState(paths).then(() => {
            setEarlyChecked(true);
        });
    }, [paths]);    
    
    useEffect(() => {
        if (!translationsSelected || !paths) return;
        CheckTranslationsState(paths!);
    }, [translationsSelected]);

    const handleUpdateTranslation = async (versionPath: string, translationLink: string) => {
        invoke("update_translation", {path: versionPath, translationLink: translationLink, lang: defaultLanguage})
        .then(() => {
            CheckTranslationsState(paths!);
        });
    };

    const handleInstallTranslation = async (versionPath: string, translationLink: string) => {
        invoke("init_translation_files", {path: versionPath, translationLink: translationLink, lang: defaultLanguage})
        .then(() => {
            CheckTranslationsState(paths!);
        });
    };

    const handleUninstallTranslation = async (versionPath: string) => {
        invoke("uninstall_translation", {path: versionPath})
        .then(() => {
            CheckTranslationsState(paths!);
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex min-h-screen flex-col"
        >
            <h1 className="text-2xl mb-5">Traduction du jeu</h1>
            <Separator />

            <div className="grid grid-cols-2 gap-4 mt-5">
                {paths &&
                    Object.entries(paths.versions).map(([key, value]) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.4,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            className="flex min-h-screen flex-col"
                        >
                            <Card className="col-span-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        </span>
                                        {key}
                                    </CardTitle>
                                    <p className="text-xs text-gray-600">
                                        {value.path}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        <p className="font-bold mb-2">Traduction à installer :</p>
                                        <Select
                                            value={translationsSelected[key as keyof TranslationsChoosen] || ''}
                                            onValueChange={(value) => translationsSelectorHandler(key, value)}
                                        >
                                            <SelectTrigger className="w-[70%]">
                                                <SelectValue placeholder="Sélectionner la traduction" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {translations &&
                                                    translations[defaultLanguage].links.map((link: Link) => (
                                                        <SelectItem key={link.id} value={link.url}>
                                                            {link.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="grid grid-cols-2 gap-5">
                                    {
                                        value.translated ? (
                                            <Button variant={"destructive"} 
                                                onClick={ () => handleUninstallTranslation(value.path) }> Désinstaller </Button>
                                        )  : (
                                            <Button disabled={translationsSelected[key as keyof TranslationsChoosen] === null}
                                                onClick={ () => handleInstallTranslation(value.path, translationsSelected[key as keyof TranslationsChoosen]!)}> Installer la traduction </Button>
                                        )
                                    }
                                    {
                                        value.translated && !value.up_to_date ? (
                                            <Button variant={"secondary"} 
                                                onClick={() => handleInstallTranslation(value.path, translationsSelected[key as keyof TranslationsChoosen]!)}> Mettre à jour </Button>
                                        ) : null
                                    }
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
            </div>
        </motion.div>
    );
}
