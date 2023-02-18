import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getProfilesQuery } from '../utils/firebase'

export default function useGetProfiles(usernames) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub
    if (usernames?.length) {
      const q = getProfilesQuery(usernames)
      console.log(q, usernames)
      unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          console.log(snapshot)
          setProfiles(snapshot.docs.map((item) => item.data()))
        } else {
          setProfiles([])
        }
        setLoading(false)
      })
    }

    console.count('UseEffect useProfiles')

    return () => unsub && unsub()
  }, [usernames])

  return { profiles, loading }
}
