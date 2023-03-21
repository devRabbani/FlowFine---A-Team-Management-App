import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Modal from "../components/modal"
import UsernamePage from "../components/usernamePage"
import Features from "../components/welcomePage/features"
import Footer from "../components/welcomePage/footer"
import HeroSection from "../components/welcomePage/heroSection"
import Video from "../components/welcomePage/video"
import { useAuth } from "../context/AuthContext"
import { useUser } from "../context/UserContext"
import useLogin from "../hooks/useLogin"

import Pricing from "../components/welcomePage/Pricing"

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
    <>
      <HeroSection
        user={user}
        userName={username}
        loading={loading}
        isLoading={isLoading}
        signin={signin}
      />
      <Features id="features" />
      <Video id="video" />
      <Pricing
        user={user}
        userName={username}
        loading={loading}
        isLoading={isLoading}
        signin={signin}
      />
      <Footer />
    </>
  )
}
