import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useProfile(uid) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, `users/${uid}`)
    const unsub = onSnapshot(docRef, (snapshot) => {
      setData(snapshot.data())
      setIsLoading(false)
    })
    return () => unsub()
  }, [])
  return { data, isLoading }
}
