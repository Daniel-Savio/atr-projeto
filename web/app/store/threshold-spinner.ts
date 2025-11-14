import { create } from "zustand"

interface ThresholdSpinnerStore {
    isLoading: boolean
    message: string
    setLoading: (isLoading: boolean, message?: string) => void
}

export const useThresholdSpinnerStore = create<ThresholdSpinnerStore>(
    (set) => ({
        isLoading: false,
        message: "Carregando...",
        setLoading: (isLoading, message = "Carregando...") =>
            set({ isLoading, message }),
    })
)
