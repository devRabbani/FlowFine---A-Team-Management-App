import debounce from 'lodash.debounce'
import { useEffect, useState } from 'react'

export default function useCheckWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 300)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width > 980
}
