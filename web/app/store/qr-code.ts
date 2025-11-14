import { create } from 'zustand'
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner"

let QrCodeValue: IDetectedBarcode | string = "null";
export const useQrCode = create((set) => ({
  value: QrCodeValue,
  setValue: (newValue: IDetectedBarcode) => set({ value: newValue }),
}))