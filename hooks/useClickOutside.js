import { useEffect } from 'react'

export default function useClickOutside(target, visibleFunction) {
  useEffect(() => {
    const handler = (e) => {
      if (!target.current.contains(e.target)) {
        visibleFunction()
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
}
