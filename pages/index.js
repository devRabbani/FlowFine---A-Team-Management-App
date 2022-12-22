import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CreateTeamBtn from '../components/createTeamBtn'
import CreateTeamModal from '../components/createTeamModal'
import JoinCard from '../components/joinCard'
import Modal from '../components/modal'
import TeamList from '../components/teamList'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [isModal, setIsModal] = useState(false)
  const [isCreate, setIsCreate] = useState(false)

  const { user } = useAuth()
  const { uid, displayName, photoURL } = user

  return (
    <>
      <div className={styles.body}>
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
    </>
  )
}
