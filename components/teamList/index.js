import moment from 'moment/moment'
import Link from 'next/link'
import styles from './teamList.module.css'

export default function TeamList({ uid }) {
  const { data, isLoading } = {}

  return (
    <div className={styles.body}>
      <h3 className="header2">Recent Teams</h3>
      <div className={styles.teamWrapper}>
        {isLoading ? (
          <p className={styles.loading}>Getting Teamlist..</p>
        ) : data?.length ? (
          data?.map((item) => (
            <Link href={`/team/${item?.id}`} key={item?.id}>
              <a className={styles.card}>
                <p className={styles.name}>{item?.teamName}</p>
                <p className={styles.code}>{item?.id}</p>
                <p className={styles.date}>
                  Created : {moment.unix(item?.timestamp.seconds).fromNow()}
                </p>
              </a>
            </Link>
          ))
        ) : (
          <p className={styles.loading}>No Team Found</p>
        )}
      </div>
    </div>
  )
}
