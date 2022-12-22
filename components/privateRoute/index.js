import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import FullLoading from '../fullLoading'

export default function PrivateRoute({ children }) {
  const { user, authReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && authReady) {
      router.push('/welcome')
    }
  }, [user?.uid, router, authReady])

  if (!authReady || !user) {
    return <FullLoading />
  }

  return children
}
