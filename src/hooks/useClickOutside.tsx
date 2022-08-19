import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listner) // 将监听器挂载到 document
    return () => {
      document.removeEventListener('click', listner)
    }
  }, [ref, handler])
}

export default useClickOutside
