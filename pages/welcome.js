import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Modal from '../components/modal'
import UsernamePage from '../components/usernamePage'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import useLogin from '../hooks/useLogin'
import styles from '../styles/Welcome.module.css'

export default function Welcome() {
  const { user } = useAuth()
  const { signin, isLoading } = useLogin()

  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     router.push('/')
  //   }
  // }, [user, isLoading])
  const { username, loading } = useUser()
  console.log(username, loading)

  if (user && !username && !loading) {
    return <UsernamePage user={user} />
  }

  return (
    <div className={`${styles.login} wrapper`}>
      <div className={styles.card}>
        <h1>Welcome to FlowFine</h1>
        <p>
          This is just temporary layout wait for our full version to release
        </p>
        {user && username ? (
          <Link href="/">
            <a>Go to Dashboard</a>
          </Link>
        ) : (
          <button disabled={isLoading || loading} onClick={signin}>
            {isLoading ? 'Signing In Please wait' : 'Try Out with Google'}
          </button>
        )}
      </div>
    </div>
  )
}
