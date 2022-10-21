import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CreateTeamBtn from '../components/createTeamBtn'
import CreateTeamModal from '../components/createTeamModal'
import JoinCard from '../components/joinCard'
import Layout from '../components/layout'
import Modal from '../components/modal'
import Nav from '../components/nav'
import TeamList from '../components/teamList'
import { useAuth } from '../context/AuthContext'
import useCreateTeam from '../hooks/useCreateTeam'
import useGetTeams from '../hooks/useGetTeams'
import useJoinTeam from '../hooks/useJoinTeam'
import styles from '../styles/Home.module.css'
import { createTeam } from '../utils/firebase'

export default function Home() {
  const [isModal, setIsModal] = useState(false)
  const [isCreate, setIsCreate] = useState(false)

  const { user } = useAuth()
  const { uid, displayName, photoURL } = user

  return (
    <>
      <div className={styles.body}>
        {isCreate && (
          <JoinCard
            setIsModal={setIsModal}
            uid={uid}
            photoURL={photoURL}
            displayName={displayName}
          />
        )}

        <TeamList uid={uid} />
      </div>
      {isModal && (
        <Modal setIsModal={setIsModal}>
          <CreateTeamModal
            setIsModal={setIsModal}
            uid={uid}
            photoURL={photoURL}
            displayName={displayName}
          />
        </Modal>
      )}
      <CreateTeamBtn setIsCreate={setIsCreate} isCreate={isCreate} />
    </>
  )
}
