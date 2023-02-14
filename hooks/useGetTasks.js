import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useGetTasks(teamcode) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'teams', teamcode, 'tasks'), orderBy('updatedAt')),
      (snapshot) => {
        if (!snapshot.empty) {
          setTasks(
            snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
          )
        } else {
          setTasks([])
        }
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  return { tasks, loading }
}
