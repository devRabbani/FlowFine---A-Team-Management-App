import Link from 'next/link'
import styles from './routeHelper.module.css'

export default function RouteHelper({ type, teamcode, task }) {
  const renderLinks = () => {
    switch (type) {
      case 'team':
        return <span>{teamcode}</span>
      case 'create':
        return (
          <>
            <Link href={'/team/' + teamcode}>
              <a>{teamcode}</a>
            </Link>
            &gt;
            <span>Create</span>
          </>
        )
      default:
        break
    }
  }

  return (
    <div className={styles.body}>
      <Link href="/">
        <a>Home</a>
      </Link>
      &gt;
      {renderLinks()}
    </div>
  )
}
