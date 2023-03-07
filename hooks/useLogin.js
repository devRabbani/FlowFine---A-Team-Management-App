import { useState } from 'react'
import toast from 'react-hot-toast'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import { LOGIN } from '../reducers/authReducer'

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { dispatch } = useAuth()

  const signin = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Signing in please wait!</b>)
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider())
      if (res) {
        toast.success(<b>Welcome {res.user.displayName}</b>, { id })
        dispatch({ type: LOGIN, payload: res.user })
        setIsLoading(false)
      } else {
        throw new Error('Something went wrong please try again!')
      }
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsLoading(false)
    }
  }

  return { signin, isLoading }
}
