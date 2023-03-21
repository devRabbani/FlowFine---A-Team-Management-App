import moment from 'moment/moment'
import Link from 'next/link'
import s from './teamCard.module.css'

export default function TeamCardNormal({
  teamcode,
  teamname,
  updatedAt,
  privacy = 'private',
}) {
  return (
    <Link className={s.teamCard} href={'/team/' + teamcode}>
      <p className={s.name}>{teamname}</p>
      <div className={`${s.codePrivacyDiv} flexBetween`}>
        <p className={s.code}>{teamcode}</p>
        <p className={s.privacy}>{privacy}</p>
      </div>
      <p className={s.date}>
        Last update : {moment.unix(updatedAt?.seconds).fromNow()}
      </p>
    </Link>
  )
}
