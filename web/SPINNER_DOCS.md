# Global Threshold Spinner Documentation

A beautiful, animated global loading spinner component that displays after a 300ms threshold delay (prevents flashing for quick operations).

## Features

✨ **Smooth Animations**
- Multi-layer rotating rings
- Pulsing center circle
- Animated orbiting dots
- Animated text indicators
- Accent animations with electric effects

🎯 **Smart Threshold**
- Only shows after 300ms of loading
- Prevents UI flashing for quick operations
- Smooth fade-in/out transitions

🎨 **Customizable**
- Custom loading message
- Dark mode support
- Gradient colors with blue and purple theme

## Setup

### 1. Add to your root layout (e.g., `root.tsx`):

```tsx
import { GlobalThresholdSpinner } from '~/components/global-spinner'

export default function Root() {
  return (
    <>
      <GlobalThresholdSpinner />
      {/* Your other components */}
    </>
  )
}
```

### 2. Use the store to control loading state:

```tsx
import { useThresholdSpinnerStore } from '~/store/threshold-spinner'

export function MyComponent() {
  const setLoading = useThresholdSpinnerStore((state) => state.setLoading)

  const handleClick = async () => {
    setLoading(true, "Processando pedido...")
    
    try {
      await fetchData()
    } finally {
      setLoading(false)
    }
  }

  return <button onClick={handleClick}>Click me</button>
}
```

## API

### `useThresholdSpinnerStore()`

Returns a Zustand store with the following state and actions:

#### State:
- `isLoading: boolean` - Whether the spinner is visible
- `message: string` - The loading message to display

#### Actions:
- `setLoading(isLoading: boolean, message?: string)` - Control the spinner

## Example with async operation:

```tsx
import { useThresholdSpinnerStore } from '~/store/threshold-spinner'

export function DataFetcher() {
  const { setLoading } = useThresholdSpinnerStore()

  const loadData = async () => {
    setLoading(true, "Carregando dados...")
    
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      // Handle data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return <button onClick={loadData}>Load Data</button>
}
```

## Example with React Router Navigation:

```tsx
import { useNavigation } from 'react-router'
import { useEffect } from 'react'
import { useThresholdSpinnerStore } from '~/store/threshold-spinner'

export function NavigationSpinner() {
  const navigation = useNavigation()
  const setLoading = useThresholdSpinnerStore((state) => state.setLoading)

  useEffect(() => {
    setLoading(navigation.state !== 'idle', 'Navegando...')
  }, [navigation.state, setLoading])

  return null
}

// Add this component to your root layout
```

## Customization

To change colors, edit the Tailwind classes in `global-spinner.tsx`:
- `text-blue-500` → change to your primary color
- `text-purple-500` → change to your secondary color
- `bg-black/30` → change overlay background

## Performance

- ✅ Lazy renders with `AnimatePresence`
- ✅ Only animates when visible
- ✅ Uses Zustand for efficient state management
- ✅ Minimal re-renders with atomic selectors
