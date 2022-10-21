import moment from 'moment/moment'
import Link from 'next/link'
import useGetTeams from '../../hooks/useGetTeams'
import useLiveData from '../../hooks/useLiveData'
import styles from './teamList.module.css'
export default function TeamList({ uid }) {
  // const { data, isLoading } = useGetTeams(uid)
  const { data, isLoading } = useLiveData(`users/${uid}/teams`, true)

  return (
    <div className={styles.body}>
      {console.count('Teamlist')}
      <h3 className="header2">Recent Teams</h3>
      <div className={styles.teamWrapper}>
        {isLoading ? (
          <p className={styles.loading}>Getting Teamlist..</p>
        ) : data.length ? (
          data.map((item) => (
            <Link
              href={{
                pathname: `/team/${item?.id}`,
                query: { name: item?.teamName },
              }}
              key={item?.teamCode}
            >
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
