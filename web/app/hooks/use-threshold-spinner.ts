import { useTransition } from "react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai"

// Create an atom to track loading state globally
export const globalLoadingAtom = atom(false)

/**
 * Hook to manage the global threshold spinner
 * Use this in your router or app root to control when the spinner shows
 */
export function useThresholdSpinner() {
    const [, setIsLoading] = useAtom(globalLoadingAtom)

    const setLoading = (isLoading: boolean) => {
        setIsLoading(isLoading)
    }

    return { setLoading }
}

/**
 * Alternative hook using React's useTransition if you prefer built-in React features
 * Useful for tracking async operations
 */
export function useTransitionSpinner() {
    const [isPending, startTransition] = useTransition()
    return { isPending, startTransition }
}
