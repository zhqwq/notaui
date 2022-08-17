import { useEffect, useState } from 'react'

const useDebounce = (value: any, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
