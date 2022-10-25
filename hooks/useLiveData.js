import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useLiveData(ref, col) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      col ? collection(db, ref) : doc(db, ref),
      (snapshot) => {
        if (col) {
          setData(
            snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
          )
        } else {
          setData({ ...snapshot.data(), id: snapshot.id })
        }
        setIsLoading(false)
      }
    )
    return () => unsub()
  }, [])

  return { data, isLoading }
}
