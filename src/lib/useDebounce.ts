import React from 'react'

export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState<string | undefined>()

    React.useEffect(() =>{
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}