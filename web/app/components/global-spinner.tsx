import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Loader2Icon, Zap } from "lucide-react"
import { useThresholdSpinnerStore } from "~/store/threshold-spinner"

export function GlobalSpinner() {
    const isLoading = useThresholdSpinnerStore((state) => state.isLoading)
    const message = useThresholdSpinnerStore((state) => state.message)
    const [displaySpinner, setDisplaySpinner] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)

    // Threshold delay - spinner shows after 300ms
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (isLoading) {
            timeout = setTimeout(() => {
                setDisplaySpinner(true)
            }, 300)
        } else {
            setDisplaySpinner(false)
        }
        return () => clearTimeout(timeout)
    }, [isLoading])

    // Track elapsed time for progress visualization
    useEffect(() => {
        if (!displaySpinner) {
            setTimeElapsed(0)
            return
        }

        const interval = setInterval(() => {
            setTimeElapsed((prev) => (prev + 1) % 100)
        }, 50)

        return () => clearInterval(interval)
    }, [displaySpinner])

    return (
        <AnimatePresence>
            {displaySpinner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                        className="relative flex flex-col items-center gap-6"
                    >
                        {/* Outer rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 size-24 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-400"
                        />

                        {/* Middle rotating ring (opposite direction) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-2 size-20 rounded-full border-2 border-transparent border-b-purple-500 border-l-purple-400"
                        />

                        {/* Inner pulsing circle */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative flex items-center justify-center size-16 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2Icon className="size-8 text-blue-500" />
                            </motion.div>
                        </motion.div>

                        {/* Animated dots around the spinner */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: Math.cos((i * Math.PI * 2) / 3 + (timeElapsed / 10)) * 40,
                                    y: Math.sin((i * Math.PI * 2) / 3 + (timeElapsed / 10)) * 40,
                                }}
                                className="absolute size-2 rounded-full bg-blue-500"
                            />
                        ))}

                        {/* Loading text with animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative mt-8 text-center"
                        >
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {message}
                            </p>

                            {/* Animated dots indicator */}
                            <div className="mt-3 flex justify-center gap-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{
                                            duration: 1.4,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                        className="size-1.5 rounded-full bg-blue-500"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Progress line at bottom */}
                        <motion.div className="absolute -bottom-3 h-0.5 w-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500">
                            <motion.div
                                animate={{ scaleX: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-full w-full rounded-full bg-linear-to-r from-blue-500 to-purple-500"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Optional: Zap icon animation for extra flair */}
                    <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/4 right-1/4 text-yellow-400/30"
                    >
                        <Zap className="size-8" />
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1.2, 0.8, 1.2] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute bottom-1/4 left-1/4 text-cyan-400/30"
                    >
                        <Zap className="size-8" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
