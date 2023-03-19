import { BarLoader } from 'react-spinners'
import s from './fullLoading.module.css'

export default function FullLoading({ isTeamPage }) {
  return (
    <div className={`${s.body} ${isTeamPage ? s.teamPage : ''}`}>
      <div className={s.loadingDiv}>
        <p>FlowFine</p>
        <BarLoader color="#45645b" />
      </div>
    </div>
  )
}
