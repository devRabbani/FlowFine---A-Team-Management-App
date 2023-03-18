import SearchTeams from '../components/searchTeams'
import TeamList from '../components/teamList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.body}>
      <TeamList />
      <SearchTeams />
    </div>
  )
}
