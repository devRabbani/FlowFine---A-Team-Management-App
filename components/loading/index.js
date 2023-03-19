import { BeatLoader } from 'react-spinners'
import s from './loading.module.css'

export default function Loading({ high }) {
  return (
    <div className={`${s.loadingDiv} ${high || ''}`}>
      <BeatLoader color="#7c9e96" />
    </div>
  )
}
