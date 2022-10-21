import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import FullLoading from '../fullLoading'

export default function PrivateRoute({ children }) {
  const { user, authReady } = useAuth()
  const router = useRouter()

  console.log(user, !user, authReady, !user && authReady)
  useEffect(() => {
    if (!user && authReady) {
      router.push('/login')
    }
  }, [user, router, authReady])

  return authReady && user ? children : <FullLoading />
}
