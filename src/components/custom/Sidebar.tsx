"use client";

import Link from "next/link";
import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import { ColorPicker } from "./ColorPicker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomMenu } from "@/components/custom/CustomMenu";
import { DarkModeSelector } from "@/components/custom/DarkModeSelector";
import { DiscordIcon } from "@/components/custom/DiscordIcon";

import {
    Home,
    Settings,
    Languages,
    Maximize2,
    Minimize2,
    Github,
    DatabaseZap,
} from "lucide-react";

import appInfos from "@/utils/appInfos.json";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useThemeStore } from "@/stores/themeStore";

interface Theme {
    primary_color: string;
}

export const Sidebar = () => {
    const [fullWidth, setFullWidth] = useState(false);
    const { setPrimaryColor } = useThemeStore();

    useEffect(() => {
        async function loadTheme() {
            try {
                const theme: Theme = await invoke('load_theme_selected');
                setPrimaryColor(theme.primary_color);
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        }

        loadTheme();
    }, [setPrimaryColor]);

    const openExternalLink = async (url: string) => {
        await invoke("open_external", { url });
    };

    return (
        <div
            className={`border-r bg-card relative transition-size duration-150 ${
                fullWidth ? "w-[280px]" : "w-[100px]"
            }`}
        >
            <Button
                size={fullWidth ? "icon" : "iconSm"}
                onClick={() => setFullWidth(!fullWidth)}
                className="absolute right-0 top-[50%] translate-y-[-50%] translate-x-1/2"
            >
                {fullWidth ? <Minimize2 /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <div className="flex h-full max-h-screen flex-col ">
                <CustomMenu fullWidth={fullWidth} />
                <Separator />
                <div className="flex flex-col justify-between h-full pb-4">
                    <nav
                        className={`${
                            !fullWidth && "gap-3"
                        } grid items-start text-sm font-medium px-4 pt-3`}
                    >
                        {fullWidth && (
                            <>
                                <p className="text-primary font-medium">
                                    Pages
                                </p>
                            </>
                        )}
                        <Link
                            href="/"
                            className={`${
                                !fullWidth && "justify-center pl-0"
                            } flex items-center gap-3 rounded-lg py-2 pl-2 text-muted-foreground transition-all hover:text-primary`}
                        >
                            <TooltipProvider delayDuration={10}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Home className="h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Homepage</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {fullWidth && "Homepage"}
                        </Link>
                        {fullWidth && (
                            <p className="text-primary font-medium mt-6">
                                Fonctionnalités
                            </p>
                        )}
                        <Link
                            href="/traduction"
                            className={`${
                                !fullWidth && "justify-center pl-0"
                            } flex items-center gap-3 rounded-lg py-2 pl-2 text-muted-foreground transition-all hover:text-primary`}
                        >
                            <TooltipProvider delayDuration={50}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Languages className="h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Traduction</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {fullWidth && "Traduction"}
                        </Link>
                        <Link
                            href="/clear_cache"
                            className={`${
                                !fullWidth && "justify-center pl-0"
                            } flex items-center gap-3 rounded-lg py-2 pl-2 text-muted-foreground transition-all hover:text-primary`}
                        >
                            <TooltipProvider delayDuration={50}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <DatabaseZap className="h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Gestion du cache</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {fullWidth && "Gestion du cache"}
                        </Link>
                        {fullWidth && (
                            <p className="text-primary font-medium mt-6">
                                Liens externes
                            </p>
                        )}
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                openExternalLink(
                                    "https://discord.gg/aUEEdMdS6j",
                                );
                            }}
                            className={`${
                                !fullWidth && "justify-center pl-0"
                            } group flex items-center gap-3 rounded-lg py-2 pl-2 text-muted-foreground transition-all hover:text-primary`}
                        >
                            <TooltipProvider delayDuration={50}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <DiscordIcon className="h-4 w-4 fill-muted-foreground group-hover:fill-primary transition-all" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Discord</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {fullWidth && "Discord"}
                        </Link>
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                openExternalLink(
                                    "https://github.com/Onivoid/MultiTool",
                                );
                            }}
                            className={`${
                                !fullWidth && "justify-center pl-0"
                            } group flex items-center gap-3 rounded-lg py-2 pl-2 text-muted-foreground transition-all hover:text-primary`}
                        >
                            <TooltipProvider delayDuration={50}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Github className="h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Github</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {fullWidth && "Github"}
                        </Link>
                    </nav>
                    <div
                        className={`flex ${
                            fullWidth ? "justify-between" : "justify-center"
                        } items-center px-4`}
                    >
                        {fullWidth && (
                            <p className="text-xs text-muted-foreground text-nowrap">
                                <span className="text-primary">
                                    Multitool {appInfos.version}
                                </span>{" "}
                                - by Onivoid
                            </p>
                        )}
                        <Dialog>
                            <DialogTrigger className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary">
                                <TooltipProvider delayDuration={50}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Settings className="h-4 w-4" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Settings</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Settings</DialogTitle>
                                    <DialogDescription asChild>
                                        <div>
                                            <ul className="text-foreground flex flex-col gap-4 mt-4">
                                                <li className="flex items-center gap-5 text-foreground">
                                                    <p className="min-w-[100px]">
                                                        DarkMode :{" "}
                                                    </p>
                                                    <DarkModeSelector />
                                                </li>
                                                <li className="flex items-center gap-5 text-foreground">
                                                    <p className="min-w-[100px]">
                                                        Color Picker :{" "}
                                                    </p>
                                                    <ColorPicker />
                                                </li>
                                            </ul>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};