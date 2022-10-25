import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import useLogin from '../hooks/useLogin'
import styles from '../styles/Login.module.css'

export default function Login() {
  const { user } = useAuth()
  const { signin, isLoading } = useLogin()

  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/')
    }
  }, [user, isLoading])

  return (
    <div className={`${styles.login} wrapper`}>
      <div className={styles.card}>
        <h1>Welcome to FlowFine</h1>
        <p>
          This is just temporary layout wait for our full version to release
        </p>
        <button disabled={isLoading} onClick={signin}>
          {isLoading ? 'Signing In Please wait' : 'Try Out with Google'}
        </button>
      </div>
    </div>
  )
}
