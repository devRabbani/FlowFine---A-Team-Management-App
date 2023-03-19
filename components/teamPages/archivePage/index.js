import usePaginatedData from '../../../hooks/usePaginatedData'
import Loading from '../../loading'
import ArchivedCard from './archivedCard'
import s from './archivePage.module.css'

export default function ArchivePage({ teamCode }) {
  // Local States

  // Getting Archives
  const { data, isLoading, hasMore, loadMore, btnLoading } = usePaginatedData(
    `teams/${teamCode}/archives`,
    6,
    'updatedAt',
    'desc'
  )

  return (
    <div>
      <div className="headerDiv flexBetween">
        <h3 className="header2">Archives</h3>
      </div>

      {isLoading ? (
        <Loading high="extrahigh" />
      ) : data?.length ? (
        <div className={s.archivesList}>
          {data.map((archiveTask) => (
            <ArchivedCard
              teamCode={teamCode}
              archiveTask={archiveTask}
              key={archiveTask?.id}
            />
          ))}
          {hasMore ? (
            <button disabled={btnLoading} onClick={loadMore}>
              {btnLoading ? 'Loading' : 'Load More'}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="noData">No Archived Tasks Found</p>
      )}
    </div>
  )
}
