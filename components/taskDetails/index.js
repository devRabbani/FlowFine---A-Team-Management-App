import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { RiCloseLine, RiEditLine } from 'react-icons/ri'
import TaskDetailsContextProvider from '../../context/TaskDetailsContext'
import useClickOutside from '../../hooks/useClickOutside'
import useDataDoc from '../../hooks/useDataDoc'
import useGetProfiles from '../../hooks/useGetProfiles'
import usePaginatedData from '../../hooks/usePaginatedData'
import Comments from './comments'
import Details from './details'
import s from './taskDetails.module.css'

export default function TaskDetails({ viewDetails, setViewDetails }) {
  const [isCommentMode, setIsCommentMode] = useState(false) //STate for subpage

  // Ref for click Outside Funstion
  const targetRef = useRef()

  const {
    query: { id },
  } = useRouter()

  //  Getting FUll Info of Task
  const { data, loading } = useDataDoc(`taskinfo/${viewDetails.id}`)

  //  Getting Profiles of Members
  const { profiles, loading: profilesLoading } = useGetProfiles(
    data?.assignedMembers
  )

  // Getting Comments
  const {
    data: comments,
    isLoading: commentsLoading,
    loadMore,
  } = usePaginatedData(`taskinfo/${viewDetails?.id}/comments`)

  // Custom Function
  // Handle Modal : Will set value to null
  const handleModal = () => {
    setViewDetails(null)
  }
  useClickOutside(targetRef, handleModal)

  console.count('Task Details')
  return (
    <div ref={targetRef} className={s.viewDetailsBody}>
      <TaskDetailsContextProvider
        shortInfo={viewDetails}
        fullInfo={data}
        fullInfoLoading={loading}
        profiles={profiles}
        profilesLoading={profilesLoading}
        handleModal={handleModal}
        teamCode={id}
        comments={comments}
        commentsLoading={commentsLoading}
        loadMore={loadMore}
      >
        <div className={`${s.viewDetails} wrapper`}>
          <div className={s.viewDetails_topBar}>
            <button onClick={() => setViewDetails(null)}>
              <RiEditLine /> Edit
            </button>
            <button onClick={handleModal}>
              <RiCloseLine /> Close
            </button>
          </div>

          <div className={s.viewDetails_nav}>
            <div
              className={`${s.viewDetails_nav_menu} ${
                isCommentMode ? '' : s.active
              }`}
              onClick={() => setIsCommentMode(false)}
            >
              Details
            </div>
            <div
              className={`${s.viewDetails_nav_menu} ${
                isCommentMode ? s.active : ''
              }`}
              onClick={() => setIsCommentMode(true)}
            >
              Comments
            </div>
          </div>
          {isCommentMode ? (
            <Comments />
          ) : (
            <Details
              shortInfo={viewDetails}
              fullInfo={data}
              loading={loading}
              profiles={profiles}
              profilesLoading={profilesLoading}
            />
          )}
        </div>
      </TaskDetailsContextProvider>
    </div>
  )
}
