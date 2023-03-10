import moment from 'moment/moment'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FaCheck, FaShareAlt } from 'react-icons/fa'
import { RiSettings3Line } from 'react-icons/ri'
import styles from './teamHeader.module.css'

export default function TeamHeader({
  name,
  code,
  updatedAt,
  tasks_loading,
  totalWorking,
  totalPending,
}) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div>
          <h1>{name}</h1>
        </div>
        <div className={styles.taskDiv}>
          {tasks_loading ? (
            'Getting Tasks Data...'
          ) : (
            <>
              <div>
                Tasks Pending : <span>{totalPending || 0}</span>
              </div>
              <div>
                Working : <span>{totalWorking || 0}</span>
              </div>
            </>
          )}
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.updates}>
            Last updates {moment.unix(updatedAt?.seconds).fromNow()}
          </p>
          <Link href={code + '/setting'}>
            <RiSettings3Line /> Team Setting
          </Link>
        </div>
      </div>
    </div>
  )
}
