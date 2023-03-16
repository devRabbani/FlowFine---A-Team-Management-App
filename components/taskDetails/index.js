import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { RiCloseLine, RiEditLine } from 'react-icons/ri'
import TaskDetailsContextProvider from '../../context/TaskDetailsContext'
import useClickOutside from '../../hooks/useClickOutside'
import useDataDoc from '../../hooks/useDataDoc'
import useGetProfiles from '../../hooks/useGetProfiles'
import usePaginatedData from '../../hooks/usePaginatedData'
import TabNav from '../tabNav'
import Comments from './comments/comments'
import Details from './details/details'
import Modal from '../modal'
import s from './taskDetails.module.css'

export default function TaskDetails({
  viewDetails,
  setViewDetails,
  handleEditDetails,
}) {
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
    hasMore,
    btnLoading,
  } = usePaginatedData(`taskinfo/${viewDetails?.id}/comments`, 10)

  // Custom Function
  // Handle Modal : Will set value to null
  const handleModal = () => {
    setViewDetails(null)
  }

  // Hook for triggering click outside to close modal
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
        hasMore={hasMore}
        btnLoading={btnLoading}
      >
        <div className={`${s.viewDetails} wrapper`}>
          <div className={s.viewDetails_topBar}>
            <button onClick={() => handleEditDetails(data)}>
              <RiEditLine />
            </button>
            <button onClick={handleModal}>
              <RiCloseLine />
            </button>
          </div>
          <TabNav
            menu={isCommentMode}
            setMenu={setIsCommentMode}
            type="details"
          />
          {isCommentMode ? <Comments /> : <Details />}
        </div>
      </TaskDetailsContextProvider>
    </div>
  )
}
