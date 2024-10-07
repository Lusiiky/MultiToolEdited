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
            className="flex min-h-screen flex-col items-center justify-center mt-[-50px]"
        >
            <h1 className="text-4xl text-primary font-bold">MultiTool Beta</h1>
            <h3 className="text-xl mb-6">
                Bienvenue sur la version Beta de Multitool
            </h3>
            <p>Les fonctionnalités disponibles dans cette bêta sont :</p>
            <ul className="flex flex-col items-center justify-center mt-3">
                <li>
                    <p>
                        - Traduction du jeu avec amélioration de la détection de
                        l{"'"}emplacement d{"'"}installation du jeu
                    </p>
                </li>
                <li>
                    <p>
                        - Personnalisation de la couleur principale du logiciel
                        (Sans système de sauvegarde)
                    </p>
                </li>
            </ul>
            <p className="text-center mt-3">
                Votre test étant une contribution à l{"'"}amélioration de l{"'"}
                application, avant sa publication V1.0, si vous le souhaitez,
                vous serez répertorié dans les crédits de l{"'"}application en
                tant que testeurs. Si vous ne le souhaitez pas faites le moi
                savoir, bon test !
            </p>
        </motion.div>
    );
}
