import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useTaskList(teamcode) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const colRef = collection(db, `teams/${teamcode}/tasks`)
    const unsub = onSnapshot(colRef, (snapshot) => {
      const res = snapshot.docs.map((item) => item.data())
      setData(res)
      setIsLoading(false)
    })
    return () => unsub()
  }, [])
  return { data, isLoading }
}
