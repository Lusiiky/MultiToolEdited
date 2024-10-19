"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import splash from "@/assets/lotties/splash.json";

export default function SplashPage() {
    return (
        <DotLottieReact
            className="-translate-y-[40px] h-full w-full"
            data={splash}
            autoplay
            data-tauri-drag-region
        />
    );
}
