import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SearchTeams from '../components/searchTeams'
import TeamList from '../components/teamList'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [isModal, setIsModal] = useState(false)
  const [isCreate, setIsCreate] = useState(false)

  const { user } = useAuth()
  const { uid, displayName, photoURL } = user
  const { loading } = useUser()

  return (
    <div className={styles.body}>
      <TeamList uid={uid} />
      <SearchTeams uid={uid} />
    </div>
  )
}
