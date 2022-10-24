import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck, FaShareAlt } from 'react-icons/fa'
import { getTeam } from '../../utils/firebase'
import styles from './teamHeader.module.css'

export default function TeamHeader({ teamCode, teamName }) {
  const shareData = {
    title: `FlowFine Join to ${teamName}`,
    text: `Go to the app and paste this join code and join your team. TEAM CODE is ${teamCode}`,
    url: 'https://flowfine.vercel.app',
  }

  const handleShare = async () => {
    try {
      await navigator.share(shareData)
    } catch (error) {
      toast.error(<b>{error?.message}</b>)
      console.log(error.message)
    }
  }

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await getTeam(teamCode)
        if (res) {
        } else {
          throw new Error('SOmething went wrong try to reload the page')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }, [])

  return (
    <div className={styles.card}>
      <h1>{teamName}</h1>
      <div className={styles.codeDiv}>
        <p className={styles.code}>{teamCode}</p>
        <FaShareAlt onClick={handleShare} />
      </div>
    </div>
  )
}
