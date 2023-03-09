import { useEffect } from 'react'

export default function useClickOutside(target, visibleFunction, avatarRef) {
  useEffect(() => {
    const handler = (e) => {
      if (
        !target.current.contains(e.target) &&
        (avatarRef ? !avatarRef?.current.contains(e.target) : true)
      ) {
        visibleFunction()
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
}
