import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useGetTeams(uid) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const colRef = collection(db, `users/${uid}/teams`)
    const unsub = onSnapshot(colRef, (snapshot) => {
      const res = snapshot.docs.map((item) => ({
        ...item.data(),
        teamCode: item.id,
      }))
      if (res) {
        setData(res)
      }
      setIsLoading(false)
    })
    return () => unsub()
  }, [])
  return { data, isLoading }
}
