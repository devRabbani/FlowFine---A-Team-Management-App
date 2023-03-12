import moment from 'moment/moment'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck, FaShareAlt } from 'react-icons/fa'
import { RiSettings3Line } from 'react-icons/ri'
import Modal from '../../../modal'
import styles from './teamHeader.module.css'

export default function TeamHeader({
  name,
  code,
  updatedAt,
  tasks_loading,
  totalWorking,
  totalPending,
}) {
  const [isTeamSetting, setIsTeamSetting] = useState(false)

  //  Handle Close Team Setting Modal
  const handleClose = () => setIsTeamSetting(false)
  return (
    <>
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
            <button onClick={() => setIsTeamSetting(true)}>
              <RiSettings3Line /> Team Setting
            </button>
          </div>
        </div>
      </div>

      {isTeamSetting ? (
        <Modal title="Team Settings" handleClose={handleClose}>
          Team Setting
        </Modal>
      ) : null}
    </>
  )
}
