import moment from 'moment/moment'
import usePaginatedData from '../../../../hooks/usePaginatedData'
import Loading from '../../../loading'
import s from './activity.module.css'

export default function ActivityLists({
  data,
  isLoading,
  hasMore,
  loadMore,
  btnLoading,
}) {
  if (isLoading) {
    return <Loading high="high" />
  }

  if (!data?.length) {
    return <p className="noData">No Activity Records Found</p>
  }

  return (
    <>
      {data.map((info, i) => (
        <div key={i} className={s.activity_card}>
          <p className={s.activity_card_info}>{info?.message}</p>
          <p className={s.activity_card_time}>
            {moment.unix(info?.timestamp?.seconds).fromNow()}
          </p>
        </div>
      ))}
      {hasMore ? (
        <button
          className={s.activity_loadmore}
          onClick={loadMore}
          disabled={btnLoading}
        >
          {btnLoading ? 'Loading' : 'Load More'}
        </button>
      ) : null}
    </>
  )
}
