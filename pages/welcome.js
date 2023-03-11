import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Modal from "../components/modal"
import UsernamePage from "../components/usernamePage"
import HeroSection from "../components/welcomePage/heroSection"
import Nav from "../components/welcomePage/nav"
import { useAuth } from "../context/AuthContext"
import { useUser } from "../context/UserContext"
import useLogin from "../hooks/useLogin"
import s from "../styles/Welcome.module.css"

export default function Welcome() {
  const { user } = useAuth()
  const { signin, isLoading } = useLogin()

  const router = useRouter()

  const { username, loading } = useUser()

  useEffect(() => {
    if (!isLoading && user && username && !loading) {
      router.push("/")
    }
  }, [user, isLoading, username, loading])

  if (user && !username && !loading) {
    return <UsernamePage user={user} />
  }

  return (
    <div className={s.welcomePage}>
      <Nav />
      <HeroSection
        user={user}
        userName={username}
        loading={loading}
        isLoading={isLoading}
        signin={signin}
      />
    </div>
  )
}
