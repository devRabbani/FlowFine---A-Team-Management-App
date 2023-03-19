import RandomTeam from '../components/randomTeam'
import SearchTeams from '../components/searchTeams'
import TeamList from '../components/teamList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.body}>
      <div>
        <TeamList />
      </div>
      <div className={styles.rightDiv}>
        <SearchTeams />
        <RandomTeam />
      </div>
    </div>
  )
}
