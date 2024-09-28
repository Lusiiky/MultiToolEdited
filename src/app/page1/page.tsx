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

export default function Page() {
    const [paths, setPaths] = useState<GamePaths | null>();
    const [translations, setTranslations] =
        useState<LocalizationConfig | null>();

    const defaultLanguage = "fr"; // TODO : Dynamic language Selection

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
    }, []);

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
                                        {value}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        <Select>
                                            <SelectTrigger className="w-[70%]">
                                                <SelectValue placeholder="Sélectionner la traduction" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {translations &&
                                                    translations[
                                                        defaultLanguage
                                                    ].links.map(
                                                        (link: Link) => {
                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        link.id
                                                                    }
                                                                    value={
                                                                        link.url
                                                                    }
                                                                >
                                                                    {link.name}
                                                                </SelectItem>
                                                            );
                                                        },
                                                    )}
                                            </SelectContent>
                                        </Select>
                                    </CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <button className="btn">Télécharger</button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
            </div>
        </motion.div>
    );
}
