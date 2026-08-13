// src/components/common/Loader.tsx

import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import { CONSTANTS } from "@/lib/config/constants";

interface LoaderProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fullScreen?: boolean;
}

export function Loader({
    message = "Loading...",
    size = "md",
    className = "",
    primaryColor = CONSTANTS.DEFAULT_PRIMARY_COLOR,
    secondaryColor = CONSTANTS.DEFAULT_SECONDARY_COLOR,
    fullScreen = false,
}: LoaderProps) {
    const sizeMap = {
        sm: {
            wrapper: "min-h-[120px]",
            title: "text-[14px]",
            message: "text-[12px]",
            dot: "h-[7px] w-[7px]",
            line: "h-[3px] max-w-[150px]",
        },
        md: {
            wrapper: "min-h-[180px]",
            title: "text-[16px]",
            message: "text-[14px]",
            dot: "h-[9px] w-[9px]",
            line: "h-[4px] max-w-[190px]",
        },
        lg: {
            wrapper: "min-h-[240px]",
            title: "text-[18px]",
            message: "text-[15px]",
            dot: "h-[11px] w-[11px]",
            line: "h-[5px] max-w-[230px]",
        },
    };

    const currentSize = sizeMap[size];

    const cssVars = {
        "--primary": primaryColor,
        "--secondary": secondaryColor,
    } as CSSProperties;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={cssVars}
            className={[
                "flex w-full items-center justify-center font-['Inter',sans-serif]",
                fullScreen
                    ? "fixed inset-0 z-[9999] bg-[var(--secondary)]/90 backdrop-blur-sm"
                    : currentSize.wrapper,
                className,
            ].join(" ")}
        >
            <div className="flex w-full flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-[8px]">
                    {[0, 1, 2].map((item) => (
                        <motion.span
                            key={item}
                            animate={{
                                y: [0, -9, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 0.75,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item * 0.14,
                            }}
                            className={["rounded-full", currentSize.dot].join(" ")}
                            style={{ backgroundColor: primaryColor }}
                        />
                    ))}
                </div>

                <motion.h3
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className={[
                        "mt-[16px] font-bold leading-[22px] text-[#000B2E]",
                        currentSize.title,
                    ].join(" ")}
                >
                    Please wait
                </motion.h3>

                {message ? (
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                        className={[
                            "mt-[6px] font-medium leading-[20px] text-[#667085]",
                            currentSize.message,
                        ].join(" ")}
                    >
                        {message}
                    </motion.p>
                ) : null}

                <div
                    className={[
                        "mt-[18px] w-full overflow-hidden rounded-full bg-[#EAF0F7]",
                        currentSize.line,
                    ].join(" ")}
                >
                    <motion.div
                        animate={{ x: ["-100%", "220%"] }}
                        transition={{
                            duration: 1.15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="h-full w-[45%] rounded-full"
                        style={{
                            background: `linear-gradient(90deg, transparent 0%, ${primaryColor} 45%, transparent 100%)`,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}