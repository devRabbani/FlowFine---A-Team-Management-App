import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { LOGOUT } from '../reducers/authReducer'

export default function useLogout() {
  const { dispatch } = useAuth()
  const router = useRouter()
  const logout = async () => {
    try {
      await signOut(auth)
      dispatch({ type: LOGOUT })
      // router.push('/welcome')
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }
  return { logout }
}
