import ImageBlur from '../imageBlur'
import styles from './teamTaskList.module.css'

export default function MembersList({ members }) {
  return (
    <div className={styles.memberLists}>
      {!members.length ? (
        <p className={styles.loading}>Getting Memberlists..</p>
      ) : (
        members.map((item) => (
          <div className={styles.memberCard} key={item.uid}>
            <div className={styles.img}>
              <ImageBlur src={item.photoURL} />
            </div>
            <p className={styles.memberName}>{item.displayName}</p>
          </div>
        ))
      )}
    </div>
  )
}
