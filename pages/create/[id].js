import { useRouter } from 'next/router'
import RouteHelper from '../../components/routeHelper'
import styles from '../../styles/Create.module.css'

export default function Create() {
  const router = useRouter()
  const { id, name } = router.query
  return (
    <>
      <RouteHelper teamcode={id} type="create" />
      <form className={styles.form}>
        <input type="text" placeholder="Heading of the task" />
      </form>
    </>
  )
}
