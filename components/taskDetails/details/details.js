import DetailsBottomBar from './detailsBottomBar'
import s from '../taskDetails.module.css'
import DetailsTopInfo from './detailsTopInfo'
import Detailsdescription from './detailsDescription'
import DescriptionAttachments from './detailsAttachments'
import DetailsGroups from './detailsGroups'
import DetailsMembers from './detailsMembers'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import Loading from '../../loading'

export default function Details() {
  const { fullInfoLoading } = useTaskDetails()
  return (
    <>
      <div className={s.details}>
        {fullInfoLoading ? (
          <Loading high="memberhigh" />
        ) : (
          <>
            <DetailsTopInfo />
            <Detailsdescription />
            <DescriptionAttachments />
            <DetailsGroups />
            <DetailsMembers />
          </>
        )}
      </div>
      <DetailsBottomBar />
    </>
  )
}
