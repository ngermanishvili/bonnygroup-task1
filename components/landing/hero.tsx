"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { GlobeDemo } from "./globe";
import { LampDemo } from "./lamp-landing";
import CandlestickChart from "@/app/test/page";

export function HeroHighlightDemo() {
    return (
        <>
            <HeroHighlight>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    BonnyGroup Technical Task.
                    <Highlight className="text-black dark:text-white">
                        test, of a test, of a test.
                    </Highlight>
                </motion.h1>

            </HeroHighlight>
            <div className="w-full h-500px] overflow-x-auto cursor-pointer p-2">
                <CandlestickChart />
            </div>


            {/* <GlobeDemo /> */}


        </>

    );
}
