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

export default function usePaginatedData(
  colPath,
  LIMIT = 2,
  type = 'timestamp',
  order = 'desc'
) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [last, setLast] = useState(null)

  const loadMore = async () => {
    try {
      if (last === null) return
      setBtnLoading(true)
      let dataQuery = query(
        collection(db, colPath),
        orderBy(type, order),
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
    } catch (error) {
      setBtnLoading(false)
      console.log('Load More Error', error)
    }
  }

  useEffect(() => {
    let unsub
    if (colPath) {
      unsub = onSnapshot(
        query(collection(db, colPath), orderBy(type, order), limit(LIMIT)),
        (snapshot) => {
          if (!snapshot.empty) {
            setData(
              snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
            )
          } else {
            setData([])
          }
          console.count('Paginated DB Run')
          setLast(snapshot.docs[snapshot.docs.length - 1])
          setHasMore(snapshot.docs.length === LIMIT)
          setIsLoading(false)
        }
      )
    }
    return () => unsub && unsub()
  }, [colPath, type, order, LIMIT])

  return { data, isLoading, loadMore, btnLoading, hasMore }
}
