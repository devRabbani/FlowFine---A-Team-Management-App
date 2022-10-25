import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck, FaShareAlt } from 'react-icons/fa'
import { getTeam } from '../../utils/firebase'
import styles from './teamHeader.module.css'

export default function TeamHeader({ name, code, isLoading }) {
  const shareData = {
    title: `FlowFine Join to ${name}`,
    text: `Go to the app and paste this join code and join your team. TEAM CODE is ${code}`,
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

  return (
    <div className={styles.card}>
      {isLoading ? (
        <p>Getting Team Info...</p>
      ) : (
        <>
          <h1>{name}</h1>
          <div className={styles.codeDiv}>
            <p className={styles.code}>{code}</p>
            <FaShareAlt onClick={handleShare} />
          </div>
        </>
      )}
    </div>
  )
}
