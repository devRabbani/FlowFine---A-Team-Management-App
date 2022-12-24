import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import FullLoading from '../fullLoading'

export default function PrivateRoute({ children }) {
  const { user, authReady } = useAuth()
  const { username, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if ((!user && authReady) || (!username && !loading)) {
      router.push('/welcome')
    }
  }, [user?.uid, router, authReady])

  if (!authReady || !user || loading) {
    return <FullLoading />
  }

  return children
}
