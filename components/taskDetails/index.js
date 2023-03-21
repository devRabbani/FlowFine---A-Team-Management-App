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
import s from './taskDetails.module.css'

export default function TaskDetails({
  taskData,
  handleCloseView,
  handleEditDetails,
}) {
  const [isCommentMode, setIsCommentMode] = useState(false) //STate for subpage

  // Ref for click Outside Funstion
  const targetRef = useRef()

  const {
    query: { id },
  } = useRouter()

  //  Getting FUll Info of Task
  const { data, loading } = useDataDoc(`taskinfo/${taskData?.id}`)

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
  } = usePaginatedData(`taskinfo/${taskData?.id}/comments`, 10)

  // Custom Function
  // Hook for triggering click outside to close modal
  useClickOutside(targetRef, handleCloseView)

  return (
    <div ref={targetRef} className={s.viewDetailsBody}>
      <TaskDetailsContextProvider
        shortInfo={taskData}
        fullInfo={data}
        fullInfoLoading={loading}
        profiles={profiles}
        profilesLoading={profilesLoading}
        handleModal={handleCloseView}
        teamCode={id}
        comments={comments}
        commentsLoading={commentsLoading}
        loadMore={loadMore}
        hasMore={hasMore}
        btnLoading={btnLoading}
      >
        <div className={`${s.viewDetails} wrapper`}>
          <div className={s.tabTopBarWrapper}>
            <div className={s.viewDetails_topBar}>
              <button onClick={() => handleEditDetails(data)}>
                <RiEditLine />
              </button>
              <button onClick={handleCloseView}>
                <RiCloseLine />
              </button>
            </div>
            <TabNav
              menu={isCommentMode}
              setMenu={setIsCommentMode}
              type="details"
            />
          </div>

          {isCommentMode ? <Comments /> : <Details />}
        </div>
      </TaskDetailsContextProvider>
    </div>
  )
}
