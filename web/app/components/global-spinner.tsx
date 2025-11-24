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
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
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
                            className="absolute inset-0 size-24 rounded-full border-2 border-transparent border-t-red-500 border-r-red-400"
                        />

                        {/* Middle rotating ring (opposite direction) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-2 size-20 rounded-full border-2 border-transparent border-b-zinc-500 border-l-zinc-400"
                        />

                        {/* Inner pulsing circle */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative flex items-center justify-center size-16 rounded-full bg-linear-to-br from-slate-500/20 to-slate-500/20"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2Icon className="size-8 text-red-500" />
                            </motion.div>
                        </motion.div>


                        {/* Loading text with animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative mt-8 text-center"
                        >
                            <p className="text-sm font-medium text-white">
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
                                        className="size-1.5 rounded-full bg-red-500"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Progress line at bottom */}
                        <motion.div className="absolute -bottom-3 h-0.5 w-20 rounded-full bg-linear-to-r from-red-500 to-amber-500">
                            <motion.div
                                animate={{ scaleX: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-full w-full rounded-full bg-linear-to-r from-red-500 to-amber-500"
                            />
                        </motion.div>
                    </motion.div>


                </motion.div>
            )}
        </AnimatePresence>
    )
}
