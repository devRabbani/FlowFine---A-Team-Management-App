import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Modal from '../components/modal'
import UsernamePage from '../components/usernamePage'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import useLogin from '../hooks/useLogin'
import s from '../styles/Welcome.module.css'

export default function Welcome() {
  const { user } = useAuth()
  const { signin, isLoading } = useLogin()

  const router = useRouter()

  const { username, loading } = useUser()

  useEffect(() => {
    if (!isLoading && user && username && !loading) {
      router.push('/')
    }
  }, [user, isLoading, username, loading])

  if (user && !username && !loading) {
    return <UsernamePage user={user} />
  }

  return (
    <div className={s.welcomePage}>
      <section className={s.heroSection}>
        <div className={`${s.card} wrapper`}>
          <h1>Welcome to FlowFine</h1>
          <p>
            This is just temporary layout wait for our full version to release
          </p>
          {user && username ? (
            <Link className={s.heroBtn} href="/">
              Go to Dashboard
            </Link>
          ) : (
            <button
              className={s.heroBtn}
              disabled={isLoading || loading}
              onClick={signin}
            >
              {isLoading ? 'Signing In Please wait' : 'Get Started With Google'}
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
