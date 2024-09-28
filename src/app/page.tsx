"use client";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function Page() {
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
            <h1 className="text-2xl mb-5">Homepage</h1>
            <Separator />
        </motion.div>
    );
}
