import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck, FaShareAlt } from 'react-icons/fa'
import { getTeam } from '../../utils/firebase'
import styles from './teamHeader.module.css'

export default function TeamHeader({ name, code, updated }) {
  const shareData = {
    title: `FlowFine Join to ${name?.toUpperCase()}`,
    text: `Go to the app , search ${name} and request to join.`,
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
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <h1>{name}</h1>
        <div className={styles.codeDiv}>
          <p className={styles.code}>{code}</p>
          <FaShareAlt onClick={handleShare} />
        </div>
        <p>Last updates {moment.unix(updated.seconds).fromNow()}</p>
      </div>
    </div>
  )
}
