import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function usePaginatedData(colPath) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [last, setLast] = useState(null)

  const LIMIT = 2

  const loadMore = async () => {
    if (last === null) return
    setBtnLoading(true)
    const dataQuery = query(
      collection(db, colPath),
      orderBy('timestamp', 'desc'),
      startAfter(last),
      limit(LIMIT)
    )

    const snapshot = await getDocs(dataQuery)
    const newData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setData((prev) => [...prev, ...newData])
    setBtnLoading(false)
    setHasMore(snapshot.docs.length === LIMIT)
    setLast(snapshot.docs[snapshot.docs.length - 1])
  }

  useEffect(() => {
    let unsub
    if (colPath) {
      unsub = onSnapshot(
        query(
          collection(db, colPath),
          orderBy('timestamp', 'desc'),
          limit(LIMIT)
        ),
        (snapshot) => {
          if (!snapshot.empty) {
            setData(snapshot.docs.map((item) => item.data()))
          } else {
            setData([])
          }
          setLast(snapshot.docs[snapshot.docs.length - 1])
          setHasMore(snapshot.docs.length === LIMIT)
          setIsLoading(false)
        }
      )
    }
    return () => unsub && unsub()
  }, [colPath])

  return { data, isLoading, loadMore, btnLoading, hasMore }
}
