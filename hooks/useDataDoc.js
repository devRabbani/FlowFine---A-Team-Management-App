import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useDataDoc(loc) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(doc(db, loc), (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.data(), id: snapshot.id })
      } else {
        setData({})
      }
      setLoading(false)
    })
    return () => unsub()
  }, [loc])

  return { data, loading }
}
