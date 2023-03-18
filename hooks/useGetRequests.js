import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useGetRequests(uid) {
  const [requests, setRequests] = useState([])
  const [requestLoading, setRequestLoading] = useState(true)

  useEffect(() => {
    let unsub
    try {
      setRequestLoading(true)
      unsub = onSnapshot(
        collection(db, 'users', uid, 'requests'),
        (snapshot) => {
          if (!snapshot.empty) {
            setRequests(
              snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
            )
          } else {
            setRequests([])
          }
          setRequestLoading(false)
        }
      )
    } catch (error) {
      console.log(error)
    }

    return () => unsub && unsub()
  }, [uid])

  return { requests, requestLoading }
}
