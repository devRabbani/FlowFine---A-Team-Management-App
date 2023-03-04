import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useGetComments(taskDocId) {
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, 'taskinfo', taskDocId, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          setComments(snapshot.docs.map((item) => item.data()))
        } else {
          setComments([])
        }
        setCommentsLoading(false)
      }
    )
    return () => unsub()
  }, [taskDocId])

  return { comments, commentsLoading }
}
